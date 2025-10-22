import {useAuth} from "@clerk/clerk-expo";
import {useEffect} from "react";
import {ActivityIndicator, View} from "react-native";
import {Redirect} from "expo-router";

export default function Index() {
    const { isLoaded, isSignedIn, userId } = useAuth()

    // DEBUG 1: Afficher l'état de Clerk dans la console
    useEffect(() => {
        console.log('===== INDEX.TSX DEBUG =====')
        console.log('isLoaded:', isLoaded)
        console.log('isSignedIn:', isSignedIn)
        console.log('userId:', userId)
        console.log('==========================')
    }, [isLoaded, isSignedIn, userId])

    // Afficher l'état à l'écran pendant le debug
    if (!isLoaded) {
        // @ts-ignore
        // @ts-ignore
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F9FF' }}>
                <ActivityIndicator size="large" color="#8B5CF6" />
                <Text style={{ marginTop: 20, fontSize: 16, color: '#64748B' }}>
                    🔄 Chargement de Clerk...
                </Text>
                <Text style={{ marginTop: 10, fontSize: 12, color: '#94A3B8' }}>
                    isLoaded: {String(isLoaded)}
                </Text>
            </View>
        )
    }

    // 🔍 DEBUG 2: Afficher où on va rediriger
    console.log('🎯 REDIRECTION:', isSignedIn ? '/(home)' : '/(auth)/sign-in')

    if (isSignedIn) {
        return <Redirect href="/(home)" />
    }

    return <Redirect href="/(auth)/sign-in" />
}