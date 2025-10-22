import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { transactionService } from "@/app/api/transactionService";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

interface Depense {
    title: string;
    amount: number;
    category: string;
}

const categories = [
    { name: "Transport", icon: "car", colors: ['#8B5CF6', '#A78BFA'] },
    { name: "Nourriture", icon: "fast-food", colors: ['#EF4444', '#F87171'] },
    { name: "Shopping", icon: "cart", colors: ['#EC4899', '#F472B6'] },
    { name: "Santé", icon: "fitness", colors: ['#10B981', '#34D399'] },
    { name: "Loisirs", icon: "game-controller", colors: ['#F59E0B', '#FBBF24'] },
    { name: "Autre", icon: "ellipsis-horizontal", colors: ['#06B6D4', '#22D3EE'] },
];

export default function Depense() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [depense, setDepense] = useState<Depense>({
        title: "",
        amount: 0,
        category: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/(auth)/sign-in");
        }
    }, [isLoaded, isSignedIn]);

    const loaddata = async () => {
        // Validation
        if (!depense.title.trim()) {
            Alert.alert("Erreur", "Veuillez entrer un titre");
            return;
        }
        if (depense.amount <= 0) {
            Alert.alert("Erreur", "Veuillez entrer un montant valide");
            return;
        }
        if (!depense.category) {
            Alert.alert("Erreur", "Veuillez sélectionner une catégorie");
            return;
        }

        try {
            setLoading(true);
            if (!user) return;

            const userId = user.id;
            const transactionToSend = {
                user_id: userId,
                title: depense.title,
                amount: -Math.abs(depense.amount), // Négatif pour dépense
                category: depense.category,
            };

            console.log("📦 Données envoyées :", transactionToSend);
            const data = await transactionService.addTransaction(transactionToSend);

            Alert.alert("Succès ✅", "Dépense ajoutée avec succès !");
            console.log("✅ Réponse backend :", data);

            // Reset du formulaire
            setDepense({ title: "", amount: 0, category: "" });

            // Retour à la page principale après 1.5s
            setTimeout(() => {
                router.back();
            }, 1500);

        } catch (e) {
            console.log("❌ Erreur envoi :", e);
            Alert.alert("Erreur", "Impossible d'ajouter la dépense");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#F0F9FF', '#E0F2FE', '#FEF3C7']}
            style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}>

                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
                        </TouchableOpacity>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerTitle}>Nouvelle Dépense</Text>
                            <Text style={styles.headerSubtitle}>Ajoutez vos dépenses</Text>
                        </View>
                        <View style={styles.headerIcon}>
                            <LinearGradient
                                colors={['#EF4444', '#F87171']}
                                style={styles.headerIconGradient}>
                                <Ionicons name="trending-down" size={28} color="#fff" />
                            </LinearGradient>
                        </View>
                    </View>

                    {/* Montant Card */}
                    <View style={styles.amountCard}>
                        <LinearGradient
                            colors={['#8B5CF6', '#A78BFA', '#DDD6FE']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.amountGradient}>
                            <Text style={styles.amountLabel}>Montant</Text>
                            <View style={styles.amountInputContainer}>
                                <TextInput
                                    style={styles.amountInput}
                                    placeholder="0.00"
                                    placeholderTextColor="rgba(255,255,255,0.6)"
                                    keyboardType="decimal-pad"
                                    value={depense.amount > 0 ? depense.amount.toString() : ""}
                                    onChangeText={(text) =>
                                        setDepense({ ...depense, amount: parseFloat(text) || 0 })
                                    }
                                />
                                <Text style={styles.currency}>DT</Text>
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Titre Input */}
                    <View style={styles.inputCard}>
                        <View style={styles.inputHeader}>
                            <Ionicons name="create-outline" size={20} color="#8B5CF6" />
                            <Text style={styles.inputLabel}>Titre de la dépense</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Courses du mois"
                            placeholderTextColor="#94A3B8"
                            value={depense.title}
                            onChangeText={(text) => setDepense({ ...depense, title: text })}
                        />
                    </View>

                    {/* Catégories */}
                    <View style={styles.categorySection}>
                        <View style={styles.categoryHeader}>
                            <Ionicons name="grid-outline" size={20} color="#8B5CF6" />
                            <Text style={styles.sectionTitle}>Catégorie</Text>
                        </View>
                        <View style={styles.categoriesGrid}>
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat.name}
                                    style={[
                                        styles.categoryButton,
                                        depense.category === cat.name && styles.categoryButtonActive
                                    ]}
                                    onPress={() => setDepense({ ...depense, category: cat.name })}>
                                    <LinearGradient
                                        colors={depense.category === cat.name ? cat.colors : ['#fff', '#fff']}
                                        style={styles.categoryIconContainer}>
                                        <Ionicons
                                            name={cat.icon as any}
                                            size={24}
                                            color={depense.category === cat.name ? "#fff" : "#64748B"}
                                        />
                                    </LinearGradient>
                                    <Text style={[
                                        styles.categoryText,
                                        depense.category === cat.name && styles.categoryTextActive
                                    ]}>
                                        {cat.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Summary Card */}
                    {depense.amount > 0 && depense.title && depense.category && (
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryTitle}>Résumé</Text>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Titre:</Text>
                                <Text style={styles.summaryValue}>{depense.title}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Catégorie:</Text>
                                <Text style={styles.summaryValue}>{depense.category}</Text>
                            </View>
                            <View style={[styles.summaryRow, styles.summaryTotal]}>
                                <Text style={styles.summaryTotalLabel}>Total:</Text>
                                <Text style={styles.summaryTotalValue}>
                                    -{depense.amount.toFixed(2)} DT
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                        onPress={loaddata}
                        disabled={loading}>
                        <LinearGradient
                            colors={loading ? ['#94A3B8', '#CBD5E1'] : ['#8B5CF6', '#A78BFA']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.submitGradient}>
                            {loading ? (
                                <>
                                    <Ionicons name="hourglass-outline" size={24} color="#fff" />
                                    <Text style={styles.submitText}>Envoi en cours...</Text>
                                </>
                            ) : (
                                <>
                                    <Ionicons name="checkmark-circle" size={24} color="#fff" />
                                    <Text style={styles.submitText}>Ajouter la dépense</Text>
                                </>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 40,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        gap: 15,
    },
    backButton: {
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        color: '#1E293B',
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 2,
    },
    headerIcon: {
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    headerIconGradient: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Amount Card
    amountCard: {
        marginBottom: 20,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 10,
    },
    amountGradient: {
        padding: 24,
    },
    amountLabel: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        opacity: 0.9,
    },
    amountInputContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    amountInput: {
        color: '#fff',
        fontSize: 48,
        fontWeight: 'bold',
        flex: 1,
        padding: 0,
    },
    currency: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '600',
        marginLeft: 8,
    },

    // Input Card
    inputCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
    },
    inputHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    inputLabel: {
        color: '#8B5CF6',
        fontSize: 14,
        fontWeight: '600',
    },
    input: {
        color: '#1E293B',
        fontSize: 16,
        padding: 12,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },

    // Categories
    categorySection: {
        marginBottom: 20,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    sectionTitle: {
        color: '#1E293B',
        fontSize: 18,
        fontWeight: 'bold',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    categoryButton: {
        width: (width - 64) / 3,
        alignItems: 'center',
        padding: 12,
        borderRadius: 18,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    categoryButtonActive: {
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
        shadowColor: '#8B5CF6',
        shadowOpacity: 0.15,
    },
    categoryIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryText: {
        color: '#64748B',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    categoryTextActive: {
        color: '#8B5CF6',
    },

    // Summary Card
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#DDD6FE',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    summaryTitle: {
        color: '#8B5CF6',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        color: '#64748B',
        fontSize: 14,
    },
    summaryValue: {
        color: '#1E293B',
        fontSize: 14,
        fontWeight: '600',
    },
    summaryTotal: {
        marginTop: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    summaryTotalLabel: {
        color: '#1E293B',
        fontSize: 16,
        fontWeight: 'bold',
    },
    summaryTotalValue: {
        color: '#EF4444',
        fontSize: 20,
        fontWeight: 'bold',
    },

    // Submit Button
    submitButton: {
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
    },
    submitButtonDisabled: {
        opacity: 0.7,
    },
    submitGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        gap: 10,
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});