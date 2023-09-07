import { Slot } from 'expo-router';
import {Provider} from "react-redux";
import store from "../state/store";
import {SupabaseProvider} from "../components/SupabaseContext";

export default function App() {


    return (
        <Provider store={store}>
            <SupabaseProvider>
                <Slot/>
            </SupabaseProvider>
        </Provider>
    )
}