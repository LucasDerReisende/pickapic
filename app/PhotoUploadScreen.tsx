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

const DRAW_SIZE = 15;

export default function PhotoUploadScreen() {
  const [permission, requestPermission] = usePermissions({
    request: true,
    get: true,
  });

  const [photos, setPhotos] = useState<Asset[]>();
  const [uploaded, setUploaded] = useState(0)

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

  const upload = useCallback(async () => {
    if (!photos) throw new Error("expecting assets to exist");

    const filenames = await Promise.all(
      photos.map(async (asset) => {
        const fileName = uuid.v4() as string;

        const info = await getAssetInfoAsync(asset);

        const file = await fetch(info.localUri!)

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

        setUploaded(v => v + 1)

        return fileName;
      })
    );

    // TODO: in filenames sind jetzt die bilder drin, und können in anderen screens gelesen werden
    alert(JSON.stringify(filenames));
  }, [photos, setUploaded]);

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
        <Text>{uploaded} / {photos.length} uploaded</Text>
      )}
      
    </View>
  );
}
