import React, {createContext, ReactNode, useContext, useState} from 'react';
import {RealtimeChannel} from "@supabase/supabase-js";

interface SupabaseContextType {
    supabaseChannel: RealtimeChannel | null;
    setSupabaseChannel: (channel: RealtimeChannel) => void;
}


const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const useSupabase = (): SupabaseContextType => {
    const context = useContext(SupabaseContext);
    if (context === undefined) {
        throw new Error('useSupabase must be used within a SupabaseProvider');
    }
    return context;
};

interface SupabaseProviderProps {
    children: ReactNode;
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
    const [supabaseChannel, setSupabaseChannel] = useState<null | RealtimeChannel>(null);

    const value = {
        supabaseChannel,
        setSupabaseChannel,
    };

    return (
        <SupabaseContext.Provider value={value}>
            {children}
        </SupabaseContext.Provider>
    );
};
