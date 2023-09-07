import {createClient} from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto'

export const client =  createClient(
    "https://gkokqqrjyfteuhvackpb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrb2txcXJqeWZ0ZXVodmFja3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwOTg0NzgsImV4cCI6MjAwOTY3NDQ3OH0.4Qmeo9YHtuE1YdVXPzh-r3fMUufFCOPJzAZqjhxnPJw",
    {
        auth: {
            persistSession: false
        }
    }
)