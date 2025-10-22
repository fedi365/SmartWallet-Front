// app/(auth)/_layout.tsx
import { Redirect, Slot } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
    const { isLoaded, isSignedIn } = useAuth()

    // Don’t decide until Clerk has loaded
    if (!isLoaded) return null

    // If already signed in, push users to the home group
    if (isSignedIn) {
        return <Redirect href="/(home)" />
    }

    // Otherwise, render the auth routes (sign-in, sign-up, etc.)
    return <Slot />
}