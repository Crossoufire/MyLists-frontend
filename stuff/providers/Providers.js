"use client";
import FlashProvider from "@/stuff/providers/FlashProvider";
import ApiProvider from "@/stuff/providers/ApiProvider";
import UserProvider from "@/stuff/providers/UserProvider";


export default function Providers({ children }) {
    return (
        <FlashProvider>
            <ApiProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </ApiProvider>
        </FlashProvider>
    );
}