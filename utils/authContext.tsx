import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";


SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  username: string | null;
  logIn: (username: string, password: string) => Promise<void>;
  logOut: () => void;
  signUp: (username: string, password: string) => Promise<void>;
};


const authStorageKey = "auth-key-county-fair-app";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  username: null,
  logIn: async () => {},
  logOut: () => {},
  signUp: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    const router = useRouter();

    const storeAuthState = async (newState: { isLoggedIn: boolean, loggedInUserID: string }) => {
        try{
            const authKeyToJSON = JSON.stringify(newState);
            await AsyncStorage.setItem(authStorageKey, authKeyToJSON);
        } catch(error){
            console.log("Error storing auth state", error);
        }
    };

    const signUp = async (username: string, password: string) => {
    try {
        const response = await fetch(process.env.EXPO_PUBLIC_API_LINK_SIGNUP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        });

        if (!response.ok) throw new Error("Signup failed");

        alert("Account created! Now log in.");
        router.replace("/login");
    } catch (error) {
        alert("Signup failed: User might already exist");
    }
    };

    const logIn = async (username: string, password: string) => {
    try {
        const response = await fetch(process.env.EXPO_PUBLIC_API_LINK_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        });

        if (!response.ok) throw new Error("Login failed");

        const data = await response.json();
        setIsLoggedIn(true);
        await storeAuthState({ isLoggedIn: true, loggedInUserID: username });
        router.replace("/");
    } catch (error) {
        alert("Invalid login");
    }
    };

    const logOut = () => {
        setIsLoggedIn(false);
        storeAuthState( { isLoggedIn: false, loggedInUserID: "" } );
        router.replace("/login")
    }

    useEffect(() => {
        const getAuthFromStorage = async () => {
            await new Promise((res) => setTimeout(() => res(null), 1000));

            try{
                const value = await AsyncStorage.getItem(authStorageKey);
                if(value !== null){
                    const auth = JSON.parse(value);
                    setIsLoggedIn(auth.isLoggedIn);
                    setUsername(auth.loggedInUserID);
                }
            } catch(error) {
                console.log("Error fetching from storage", error)
            }
            setIsReady(true);
        };
        getAuthFromStorage();
    }, []);

    useEffect(() => {
        if(isReady){
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isReady, username, logIn, logOut, signUp }}>
        {children}
        </AuthContext.Provider>

    )
}