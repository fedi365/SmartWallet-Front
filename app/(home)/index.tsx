import {useAuth, useUser} from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, View, ActivityIndicator, Alert, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native'
import { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { transactionService } from '@/app/api/transactionService';

const { width } = Dimensions.get('window');

export default function MainPage() {
    const { isLoaded, isSignedIn, user } = useUser()
    const router = useRouter()
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const { signOut } = useAuth();
    const [summary, setSummary] = useState({
        balance: 0,
        incomes: 0,
        expenses: 0
    });
    const [loading, setLoading] = useState(true);
    const [savingsRate, setSavingsRate] = useState(0);
    const [isLoggingOut, setIsLoggingOut] = useState(false);


    useEffect(() => {
        if (user) {
            loadFinancialData();
        }
    }, [user])

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true); // ✅ Activer le loading
            await signOut(); // ✅ Déconnecte l'utilisateur
            // Le loading restera affiché jusqu'à la redirection automatique par index.tsx
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
            setIsLoggingOut(false); // ✅ Désactiver le loading en cas d'erreur
            Alert.alert('Erreur', 'Impossible de se déconnecter');
        }
    };

    const loadFinancialData = async () => {
        try {
            setLoading(true);
            // @ts-ignore
            const userId = user.id;
            const data = await transactionService.getSummary(userId);

            setSummary({
                balance: parseFloat(data.balance) || 0,
                incomes: parseFloat(data.incomes) || 0,
                expenses: Math.abs(parseFloat(data.expenses)) || 0
            });

            if (data.incomes > 0) {
                const rate = ((data.incomes - Math.abs(data.expenses)) / data.incomes) * 100;
                setSavingsRate(Math.max(0, Math.min(100, rate)));
            }
        } catch (error) {
            console.error('Erreur chargement données:', error);
            Alert.alert('Erreur', 'Impossible de charger les données financières');
        } finally {
            setLoading(false);
        }
    };

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    if (!isLoaded || loading) {
        return (
            <LinearGradient
                colors={['#F0F9FF', '#E0F2FE', '#FEF3C7']}
                style={[styles.container, styles.centerContent]}>
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingIconWrapper}>
                        <LinearGradient
                            colors={['#8B5CF6', '#A78BFA']}
                            style={styles.loadingIconGradient}>
                            <Ionicons name="wallet" size={32} color="#fff" />
                        </LinearGradient>
                    </View>
                    <ActivityIndicator size="large" color="#8B5CF6" style={styles.spinner} />
                    <Text style={styles.loadingText}>Chargement de vos finances...</Text>
                </View>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={['#F0F9FF', '#E0F2FE', '#FEF3C7']}
            style={styles.container}>

            {/* ✅ Modal de Loading pour le Logout */}
            <Modal
                visible={isLoggingOut}
                transparent={true}
                animationType="fade">
                <View style={styles.logoutModalOverlay}>
                    <View style={styles.logoutModalContent}>
                        <LinearGradient
                            colors={['#8B5CF6', '#A78BFA']}
                            style={styles.logoutIconGradient}>
                            <Ionicons name="log-out-outline" size={32} color="#fff" />
                        </LinearGradient>
                        <ActivityIndicator size="large" color="#8B5CF6" style={styles.logoutSpinner} />
                        <Text style={styles.logoutText}>Déconnexion en cours...</Text>
                        <Text style={styles.logoutSubtext}>Nettoyage des données</Text>
                    </View>
                </View>
            </Modal>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                {/* Header Élégant */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.greeting}>Bonjour 👋</Text>
                        <Text style={styles.userName}>
                            {user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'Utilisateur'}
                        </Text>
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={styles.logoutButtonInline}
                            disabled={isLoggingOut}>
                            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                            <Text style={styles.logoutButtonText}>Se déconnecter</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.avatarContainer}>
                        <LinearGradient
                            colors={['#8B5CF6', '#A78BFA']}
                            style={styles.avatarGradient}>
                            <Ionicons name="person" size={24} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Carte Solde Total Premium */}
                <View style={styles.balanceCard}>
                    <LinearGradient
                        colors={['#8B5CF6', '#A78BFA', '#DDD6FE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.balanceGradient}>

                        <View style={styles.balanceHeader}>
                            <View style={styles.balanceHeaderLeft}>
                                <View style={styles.balanceIconContainer}>
                                    <Ionicons name="wallet" size={20} color="#fff" />
                                </View>
                                <Text style={styles.balanceLabel}>Solde Total</Text>
                            </View>
                            <TouchableOpacity
                                onPress={toggleBalanceVisibility}
                                style={styles.eyeButton}>
                                <Ionicons
                                    name={isBalanceVisible ? "eye" : "eye-off"}
                                    size={22}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.balanceAmount}>
                            {isBalanceVisible ? `${summary.balance.toFixed(2)}` : '••••••'}
                        </Text>
                        <Text style={styles.balanceCurrency}>DT</Text>

                        <View style={styles.balanceFooter}>
                            <View style={styles.statusBadge}>
                                <View style={[
                                    styles.statusDot,
                                    { backgroundColor: summary.balance >= 0 ? '#10B981' : '#EF4444' }
                                ]} />
                                <Text style={styles.statusText}>
                                    {summary.balance >= 0 ? 'Positif' : 'Négatif'}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.refreshButton}
                                onPress={loadFinancialData}>
                                <Ionicons name="refresh" size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>

                {/* Revenus et Dépenses Moderne */}
                <View style={styles.statsContainer}>
                    {/* Revenus */}
                    <View style={styles.statCard}>
                        <View style={styles.statContent}>
                            <View style={styles.statHeader}>
                                <View style={styles.statIconWrapper}>
                                    <LinearGradient
                                        colors={['#10B981', '#34D399']}
                                        style={styles.statIcon}>
                                        <Ionicons name="trending-up" size={20} color="#fff" />
                                    </LinearGradient>
                                </View>
                                <Text style={styles.statLabel}>Revenus</Text>
                            </View>
                            <View style={styles.statAmountContainer}>
                                <Text style={styles.statAmount}>
                                    {isBalanceVisible ? `+${summary.incomes.toFixed(2)}` : '••••'}
                                </Text>
                                <Text style={styles.statCurrency}>DT</Text>
                            </View>
                            <View style={[styles.statBorder, { backgroundColor: '#10B981' }]} />
                        </View>
                    </View>

                    {/* Dépenses */}
                    <View style={styles.statCard}>
                        <View style={styles.statContent}>
                            <View style={styles.statHeader}>
                                <View style={styles.statIconWrapper}>
                                    <LinearGradient
                                        colors={['#EF4444', '#F87171']}
                                        style={styles.statIcon}>
                                        <Ionicons name="trending-down" size={20} color="#fff" />
                                    </LinearGradient>
                                </View>
                                <Text style={styles.statLabel}>Dépenses</Text>
                            </View>
                            <View style={styles.statAmountContainer}>
                                <Text style={styles.statAmount}>
                                    {isBalanceVisible ? `-${summary.expenses.toFixed(2)}` : '••••'}
                                </Text>
                                <Text style={styles.statCurrency}>DT</Text>
                            </View>
                            <View style={[styles.statBorder, { backgroundColor: '#EF4444' }]} />
                        </View>
                    </View>
                </View>

                {/* Taux d'Épargne Premium */}
                <View style={styles.savingsCard}>
                    <View style={styles.savingsHeader}>
                        <View>
                            <View style={styles.savingsTitleRow}>
                                <Ionicons name="pie-chart" size={20} color="#8B5CF6" />
                                <Text style={styles.savingsTitle}>Taux d'Épargne</Text>
                            </View>
                            <Text style={styles.savingsSubtitle}>
                                {savingsRate >= 20 ? 'Excellent travail! 🎉' :
                                    savingsRate >= 10 ? 'Bon progrès 👍' :
                                        'Continuez vos efforts 💪'}
                            </Text>
                        </View>
                        <View style={styles.percentageContainer}>
                            <LinearGradient
                                colors={
                                    savingsRate >= 20 ? ['#10B981', '#34D399'] :
                                        savingsRate >= 10 ? ['#F59E0B', '#FBBF24'] :
                                            ['#EF4444', '#F87171']
                                }
                                style={styles.percentageGradient}>
                                <Text style={styles.percentageValue}>
                                    {savingsRate.toFixed(0)}%
                                </Text>
                            </LinearGradient>
                        </View>
                    </View>

                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarBackground}>
                            <LinearGradient
                                colors={
                                    savingsRate >= 20 ? ['#10B981', '#34D399'] :
                                        savingsRate >= 10 ? ['#F59E0B', '#FBBF24'] :
                                            ['#EF4444', '#F87171']
                                }
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.progressBarFill, { width: `${savingsRate}%` }]}
                            />
                        </View>
                        <View style={styles.progressLabels}>
                            <Text style={styles.progressLabel}>0%</Text>
                            <Text style={styles.progressLabel}>50%</Text>
                            <Text style={styles.progressLabel}>100%</Text>
                        </View>
                    </View>
                </View>

                {/* Actions Rapides Premium */}
                <View style={styles.quickActions}>
                    <Text style={styles.sectionTitle}>Actions rapides</Text>
                    <View style={styles.actionsGrid}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => router.push('/(home)/depense')}>
                            <LinearGradient
                                colors={['#8B5CF6', '#A78BFA']}
                                style={styles.actionGradient}>
                                <Ionicons name="add-circle" size={26} color="#fff" />
                            </LinearGradient>
                            <Text style={styles.actionText}>Ajouter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <LinearGradient
                                colors={['#EC4899', '#F472B6']}
                                style={styles.actionGradient}>
                                <Ionicons name="list" size={26} color="#fff" />
                            </LinearGradient>
                            <Text style={styles.actionText}>Historique</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <LinearGradient
                                colors={['#06B6D4', '#22D3EE']}
                                style={styles.actionGradient}>
                                <Ionicons name="stats-chart" size={26} color="#fff" />
                            </LinearGradient>
                            <Text style={styles.actionText}>Stats</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton}>
                            <LinearGradient
                                colors={['#F59E0B', '#FBBF24']}
                                style={styles.actionGradient}>
                                <Ionicons name="settings" size={26} color="#fff" />
                            </LinearGradient>
                            <Text style={styles.actionText}>Réglages</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </LinearGradient>
    )
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
        paddingBottom: 100,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Loading Premium
    loadingContainer: {
        alignItems: 'center',
    },
    loadingIconWrapper: {
        marginBottom: 20,
    },
    loadingIconGradient: {
        width: 80,
        height: 80,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
    },
    spinner: {
        marginVertical: 15,
    },
    loadingText: {
        color: '#6B21A8',
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },

    // ✅ Logout Modal Styles
    logoutModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutModalContent: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
        minWidth: 280,
    },
    logoutIconGradient: {
        width: 70,
        height: 70,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    logoutSpinner: {
        marginVertical: 12,
    },
    logoutText: {
        color: '#1E293B',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        letterSpacing: 0.3,
    },
    logoutSubtext: {
        color: '#64748B',
        fontSize: 14,
        marginTop: 6,
        fontWeight: '500',
    },
    logoutButtonInline: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    logoutButtonText: {
        marginLeft: 5,
        color: "#EF4444",
        fontSize: 14,
        fontWeight: '600',
    },

    // Header Élégant
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    headerLeft: {
        flex: 1,
    },
    greeting: {
        fontSize: 15,
        color: '#64748B',
        fontWeight: '500',
        letterSpacing: 0.3,
    },
    userName: {
        fontSize: 26,
        color: '#1E293B',
        fontWeight: 'bold',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    avatarContainer: {
        borderRadius: 18,
        overflow: 'hidden',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    avatarGradient: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Balance Card Premium
    balanceCard: {
        marginBottom: 20,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    balanceGradient: {
        padding: 24,
    },
    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    balanceHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    balanceIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    balanceLabel: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    eyeButton: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    balanceAmount: {
        color: '#fff',
        fontSize: 44,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 2,
    },
    balanceCurrency: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        opacity: 0.95,
    },
    balanceFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    statusText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    refreshButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },

    // Stats Container Moderne
    statsContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#fff',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
    },
    statContent: {
        padding: 18,
        position: 'relative',
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    statIconWrapper: {
        marginRight: 8,
    },
    statIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statLabel: {
        color: '#64748B',
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    statAmountContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    statAmount: {
        color: '#1E293B',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    statCurrency: {
        color: '#64748B',
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 4,
    },
    statBorder: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },

    // Savings Card Premium
    savingsCard: {
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 22,
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    savingsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    savingsTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 8,
    },
    savingsTitle: {
        color: '#1E293B',
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: 0.3,
    },
    savingsSubtitle: {
        color: '#64748B',
        fontSize: 13,
        fontWeight: '500',
    },
    percentageContainer: {
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    percentageGradient: {
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    percentageValue: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    progressBarContainer: {
        marginTop: 10,
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: '#E2E8F0',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 10,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    progressLabel: {
        color: '#94A3B8',
        fontSize: 11,
        fontWeight: '500',
    },

    // Quick Actions Premium
    quickActions: {
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#1E293B',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 16,
        letterSpacing: 0.3,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    actionButton: {
        width: (width - 65) / 4,
        alignItems: 'center',
    },
    actionGradient: {
        width: 60,
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    actionText: {
        color: '#64748B',
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.2,
    },
});