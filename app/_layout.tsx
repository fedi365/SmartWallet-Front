import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Stack } from 'expo-router'

export default function RootLayout() {
    return (
        <ClerkProvider tokenCache={tokenCache}>
            <ClerkLoaded>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: 'transparent' }
                    }}
                />
            </ClerkLoaded>
        </ClerkProvider>
    )
}