import { createContext, ReactNode, useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { User } from '@supabase/supabase-js';

const UserContext = createContext(null as any);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null as User | null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session }
            } = await supabase.auth.getSession();

            setAuthenticated(!!session);

            if(session?.user)
            {
                const { data: profile, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", session.user.id)
                    .single();

                if(error)
                {
                    console.error("Error de perfil:", error.message);
                    setUser(null)
                }
                else
                {
                    setUser(profile);
                }
            }
            else
            {
                setUser(null);
            }

            setLoading(false);
        }

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setAuthenticated(!!session);
            setUser(session?.user || null);
        });

        return () => {
            listener.subscription.unsubscribe();
        }
    }, []);

    return  (
        <UserContext.Provider value={{ authenticated, user, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }