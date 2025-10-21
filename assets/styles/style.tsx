import { LinearGradient } from 'expo-linear-gradient';

export const COLORS = {
    primary: {
        main: '#A855F7',
        light: '#C084FC',
        dark: '#7E22CE',
        gradient: ['#9333EA', '#EC4899', '#F97316'],
    },
    background: {
        primary: '#0F172A',
        secondary: '#1E293B',
        tertiary: '#334155',
        gradient: ['#0F172A', '#581C87', '#0F172A'],
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#94A3B8',
        tertiary: '#64748B',
        disabled: '#475569',
    },
    success: {
        main: '#22C55E',
        light: '#4ADE80',
        bg: 'rgba(34, 197, 94, 0.2)',
    },
    error: {
        main: '#EF4444',
        light: '#F87171',
        bg: 'rgba(239, 68, 68, 0.2)',
    },
    warning: {
        main: '#F97316',
        light: '#FB923C',
        bg: 'rgba(249, 115, 22, 0.2)',
    },
    info: {
        main: '#3B82F6',
        light: '#60A5FA',
        bg: 'rgba(59, 130, 246, 0.2)',
    },
    card: {
        background: 'rgba(30, 41, 59, 0.5)',
        border: '#334155',
        overlay: 'rgba(255, 255, 255, 0.1)',
    },
    income: '#22C55E',
    expense: '#EF4444',
    balance: '#A855F7',
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const TYPOGRAPHY = {
    sizes: {
        xs: 10,
        sm: 12,
        base: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 32,
        huge: 48,
    },
    weights: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.8,
    },
};

export const BORDER_RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 40,
    full: 9999,
};

export const SHADOWS = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 12,
    },
};

export const COMMON_STYLES = {
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary, // ✅ pas un tableau
    },

    glassCard: {
        backgroundColor: COLORS.error.bg,
        borderRadius: BORDER_RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.error.main,
        margin: 8,
        marginTop:16,
        padding:40
    },

    gradientCard: {
        borderRadius: BORDER_RADIUS.xxl,
        padding: SPACING.lg,
        overflow: 'hidden',
    },

    primaryButton: {
        backgroundColor: COLORS.primary.main,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
    },

    secondaryButton: {
        backgroundColor: COLORS.card.overlay,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleText: {
        fontSize: TYPOGRAPHY.sizes.xxl,
        fontWeight: '700', // ✅ compatible avec TextStyle
        color: COLORS.text.primary,
        marginHorizontal: 8,
    },
    cardText:{
        fontSize: TYPOGRAPHY.sizes.xl,
        fontWeight: '700', // ✅ compatible avec TextStyle
        color: COLORS.text.primary,
        marginHorizontal: 8,
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        title: {
            color: '#fff',
            fontSize: 14,
            fontWeight: '600',
        },
        amount: {
            color: '#fff',
            fontSize: 32,
            fontWeight: '700',
            marginVertical: 10,
        },
        statusContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 4,
            alignSelf: 'flex-start',
        },
        statusDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#22C55E',
            marginRight: 6,
        },
        statusText: {
            color: '#fff',
            fontSize: 12,
        },

    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginTop: -30,
        marginLeft:-25
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '400',
    },
    amount: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '700',
        marginVertical: 10,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginLeft: -20,
        marginEnd:-20,
        paddingVertical: 1,
        alignSelf: 'flex-start',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22C55E',
        marginRight: 6,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
    },


    /////////////////////////////////////////////////////////////////

    subtitleText: {
        fontSize: TYPOGRAPHY.sizes.md,
        fontWeight: '500',
        color: COLORS.text.secondary,
        margin: 8,
    },

    bodyText: {
        fontSize: TYPOGRAPHY.sizes.base,
        fontWeight: '400', // ✅
        color: COLORS.text.primary,
    },

    captionText: {
        fontSize: TYPOGRAPHY.sizes.sm,
        fontWeight: '400', // ✅
        color: COLORS.text.secondary,
    },

    badge: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.card.overlay,
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.card.border,
        marginVertical: SPACING.md,
    },

    input: {
        backgroundColor: COLORS.card.background,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.card.border,
        padding: SPACING.md,
        fontSize: TYPOGRAPHY.sizes.base,
        color: COLORS.text.primary,
    },

    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export const Small_Card={
    smallCard: {
        flex: 1,
        maxWidth: 150,
        minHeight: 100,
        padding: 20,
        margin: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgb(225,64,224)',
        backgroundColor: 'rgba(219,6,62,0.05)',
    },
    smallCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    smallCardTitle: {
        color: '#ccc',
        fontSize: 13,
        fontWeight: '1000',
    },
    smallCardAmount: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginTop: 10,
    },
    smallCardSub: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    smallCardSubText: {
        fontSize: 12,
        color: '#aaa',
        marginLeft: 4,
    },
}

export const GRADIENTS = {
    primary: ['#9333EA', '#EC4899', '#F97316'],
    background: ['#0F172A', '#581C87', '#0F172A'],
    success: ['#22C55E', '#10B981'],
    error: ['#EF4444', '#DC2626'],
    purple: ['#A855F7', '#7E22CE'],
    blue: ['#3B82F6', '#1D4ED8'],
};

export const ANIMATION = {
    duration: {
        fast: 200,
        normal: 300,
        slow: 500,
    },
    easing: {
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
    },
};

export const getResponsiveSize = (baseSize, screenWidth) => {
    const scale = screenWidth / 375;
    return Math.round(baseSize * scale);
};

export const withOpacity = (color, opacity) => {
    return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

export default {
    COLORS,
    SPACING,
    TYPOGRAPHY,
    BORDER_RADIUS,
    SHADOWS,
    COMMON_STYLES,
    GRADIENTS,
    ANIMATION,
    getResponsiveSize,
    withOpacity,
};
