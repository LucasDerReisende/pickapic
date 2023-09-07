import { View, Alert, Image, FlatList, Text } from "react-native";
import {
  usePermissions,
  getAssetsAsync,
  PagedInfo,
  Asset,
  getAssetInfoAsync,
} from "expo-media-library";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Button } from "react-native-paper";
import { imageBucket } from "../lib/supabaseClient";
import uuid from "react-native-uuid";
import { useSupabase } from "../components/SupabaseContext";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../state/slices";
import { User } from "../lib/user";
import { RootState } from "../state/store";
import { useRouter } from "expo-router";

const DRAW_SIZE = 15;

export default function PhotoUploadScreen() {
  const [permission, requestPermission] = usePermissions({
    request: true,
    get: true,
  });

  const [photos, setPhotos] = useState<Asset[]>();
  const [uploaded, setUploaded] = useState(0);

  const refresh = useCallback(async () => {
    if (!permission) return;
    if (!permission.granted) {
      if (!permission.canAskAgain) {
        Alert.alert("Go to settings to give access");
        return;
      }

      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert("Go to settings to give access");
        return;
      }
    }

    const pickedPhotos: Asset[] = [];

    let page: PagedInfo<Asset> | null = null;
    while (
      (page === null || page.hasNextPage) &&
      pickedPhotos.length <= DRAW_SIZE
    ) {
      page = await getAssetsAsync({
        mediaType: "photo",
        sortBy: "creationTime",
        after: page?.endCursor,
      });

      for (const photo of page.assets) {
        const isPicked = Math.random() > 0.99;
        if (isPicked) {
          pickedPhotos.push(photo);
        }
      }
    }

    setPhotos(pickedPhotos.slice(0, DRAW_SIZE));
  }, [setPhotos, photos, permission]);

  const { supabaseChannel } = useSupabase();
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.state.name);
  const users = useSelector((state: RootState) => state.state.users);

  const router = useRouter()

  const upload = useCallback(async () => {
    if (!photos) throw new Error("expecting assets to exist");

    const filenames = await Promise.all(
      photos.map(async (asset) => {
        const fileName = uuid.v4() as string;

        const info = await getAssetInfoAsync(asset);

        const file = await fetch(info.localUri!);

        const { error } = await imageBucket.upload(
          fileName,
          await file.arrayBuffer(),
          {
            upsert: true,
            contentType: file.headers.get("content-type")!,
          }
        );
        if (error) {
          throw error;
        }

        setUploaded((v) => v + 1);

        return fileName;
      })
    );

    dispatch(
      setUsers(
        users.map((user: User) => {
          if (user.name == name) {
            return {
              name: name,
              uuid: user.uuid,
              images: filenames,
            };
          }
          return user;
        })
      )
    );

    if (supabaseChannel == null) return;
    const user = (users as User[]).find((user: User) => user.name == name);
    if (user == undefined) return;
    await supabaseChannel.track({
      user: name,
      images: filenames,
    });

    router.push("/LobbyScreen")
  }, [photos, setUploaded, name, users, supabaseChannel, dispatch]);

  useEffect(() => {
    if (permission) {
      refresh();
    }
  }, [permission?.status]);

  if (!photos) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={photos}
        renderItem={({ item: asset }) => (
          <Image
            source={{ uri: asset.uri }}
            style={{ width: 100, height: 100 }}
          />
        )}
        keyExtractor={(asset) => asset.id}
        numColumns={3}
      />

      <Button onPress={upload}>Upload</Button>
      <Button onPress={refresh}>Refresh</Button>

      {uploaded > 0 && (
        <Text>
          {uploaded} / {photos.length} uploaded
        </Text>
      )}
    </View>
  );
}
