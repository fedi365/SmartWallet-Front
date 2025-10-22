import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    // Container avec le même gradient que MainPage
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        justifyContent: 'center',
    },

    // Gradient Background (à utiliser avec LinearGradient)
    gradientBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    // Illustration
    illustration: {
        width: width * 0.6,
        height: width * 0.6,
        alignSelf: 'center',
        marginBottom: 40,
        resizeMode: 'contain',
    },

    // Title avec le même style que MainPage
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E293B',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.5,
    },

    subtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: '500',
        letterSpacing: 0.3,
    },

    // Error Box - Style moderne avec ombre
    errorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#FCA5A5',
        gap: 10,
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    errorText: {
        flex: 1,
        color: '#DC2626',
        fontSize: 14,
        fontWeight: '600',
    },

    // Inputs - Style identique aux cards de MainPage
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        fontSize: 16,
        color: '#1E293B',
        borderWidth: 2,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
        fontWeight: '500',
    },
    inputFocused: {
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.02)',
        shadowColor: '#8B5CF6',
        shadowOpacity: 0.15,
    },
    errorInput: {
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.02)',
    },

    // Button - Gradient violet comme dans MainPage
    button: {
        borderRadius: 20,
        marginTop: 10,
        overflow: 'hidden',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
    },
    buttonGradient: {
        padding: 18,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    buttonDisabled: {
        opacity: 0.6,
    },

    // Footer
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        gap: 6,
    },
    footerText: {
        color: '#64748B',
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.3,
    },
    linkText: {
        color: '#8B5CF6',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.3,
    },

    // OTP Section - Style moderne
    otpSection: {
        marginBottom: 20,
    },
    otpTitle: {
        color: '#1E293B',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.3,
    },
    otpSubtitle: {
        color: '#64748B',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 12,
    },
    otpInput: {
        width: 56,
        height: 64,
        backgroundColor: '#fff',
        borderRadius: 16,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E293B',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    otpInputFocused: {
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
        shadowColor: '#8B5CF6',
        shadowOpacity: 0.2,
    },
    otpInputFilled: {
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
    },

    // Success Box
    successBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#6EE7B7',
        gap: 10,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    successText: {
        flex: 1,
        color: '#059669',
        fontSize: 14,
        fontWeight: '600',
    },

    // Info Card - Style moderne
    infoCard: {
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
    infoText: {
        color: '#6B21A8',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
        fontWeight: '500',
    },

    // Divider
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E2E8F0',
    },
    dividerText: {
        color: '#94A3B8',
        fontSize: 14,
        marginHorizontal: 16,
        fontWeight: '500',
    },

    // Card générique (style MainPage)
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 22,
        marginBottom: 20,
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },

    // Loading State - Identique à MainPage
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
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
    loadingText: {
        color: '#6B21A8',
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },

    // Header avec icône (style MainPage)
    headerWithIcon: {
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
        letterSpacing: 0.3,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 2,
        fontWeight: '500',
    },
    headerIcon: {
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#8B5CF6',
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

    // Welcome Card avec gradient
    welcomeCard: {
        marginBottom: 30,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    welcomeGradient: {
        padding: 30,
        alignItems: 'center',
    },
    welcomeIcon: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    welcomeTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    welcomeSubtitle: {
        color: '#fff',
        fontSize: 15,
        opacity: 0.95,
        textAlign: 'center',
        fontWeight: '500',
    },
});

// Couleurs du gradient pour LinearGradient (à utiliser dans vos composants)
export const GRADIENT_COLORS = {
    background: ['#F0F9FF', '#E0F2FE', '#FEF3C7'],
    primary: ['#8B5CF6', '#A78BFA'],
    primaryExtended: ['#8B5CF6', '#A78BFA', '#DDD6FE'],
    success: ['#10B981', '#34D399'],
    error: ['#EF4444', '#F87171'],
    warning: ['#F59E0B', '#FBBF24'],
};
