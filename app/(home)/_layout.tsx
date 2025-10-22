import { Redirect, Slot } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function HomeRoutesLayout() {
    const { isLoaded, isSignedIn } = useAuth()

    // Attendre que Clerk soit chargé
    if (!isLoaded) return null

    // Si non connecté, rediriger vers sign-in
    if (!isSignedIn) {
        return <Redirect href="/(auth)/sign-in" />
    }

    // Sinon, afficher les routes protégées
    return <Slot />
}