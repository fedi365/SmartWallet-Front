import { LinearGradient } from 'expo-linear-gradient';
import { ViewStyle, TextStyle } from 'react-native';

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
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
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
        backgroundColor: COLORS.background.primary,
    } as ViewStyle,

    glassCard: {
        backgroundColor: COLORS.error.bg,
        borderRadius: BORDER_RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.error.main,
        margin: 8,
        marginTop: 16,
        padding: 40,
    } as ViewStyle,

    gradientCard: {
        borderRadius: BORDER_RADIUS.xxl,
        padding: SPACING.lg,
        overflow: 'hidden',
    } as ViewStyle,

    primaryButton: {
        backgroundColor: COLORS.primary.main,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    secondaryButton: {
        backgroundColor: COLORS.card.overlay,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    titleText: {
        fontSize: TYPOGRAPHY.sizes.xxl,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginHorizontal: 8,
    } as TextStyle,

    cardText: {
        fontSize: TYPOGRAPHY.sizes.xl,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginHorizontal: 8,
    } as TextStyle,

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: -30,
        marginLeft: -25,
    } as ViewStyle,

    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '400',
    } as TextStyle,

    amount: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '700',
        marginVertical: 10,
    } as TextStyle,

    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginLeft: -20,
        marginEnd: -20,
        paddingVertical: 1,
        alignSelf: 'flex-start',
    } as ViewStyle,

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22C55E',
        marginRight: 6,
    } as ViewStyle,

    statusText: {
        color: '#fff',
        fontSize: 12,
    } as TextStyle,

    subtitleText: {
        fontSize: TYPOGRAPHY.sizes.md,
        fontWeight: '500',
        color: COLORS.text.secondary,
        margin: 8,
    } as TextStyle,

    bodyText: {
        fontSize: TYPOGRAPHY.sizes.base,
        fontWeight: '400',
        color: COLORS.text.primary,
    } as TextStyle,

    captionText: {
        fontSize: TYPOGRAPHY.sizes.sm,
        fontWeight: '400',
        color: COLORS.text.secondary,
    } as TextStyle,

    badge: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.card.overlay,
    } as ViewStyle,

    divider: {
        height: 1,
        backgroundColor: COLORS.card.border,
        marginVertical: SPACING.md,
    } as ViewStyle,

    input: {
        backgroundColor: COLORS.card.background,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.card.border,
        padding: SPACING.md,
        fontSize: TYPOGRAPHY.sizes.base,
        color: COLORS.text.primary,
    } as TextStyle,

    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
};

export const Small_Card = {
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
    } as ViewStyle,

    smallCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    } as ViewStyle,

    smallCardTitle: {
        color: '#ccc',
        fontSize: 13,
        fontWeight: '900', // Correction: '1000' n'existe pas, max = '900'
    } as TextStyle,

    smallCardAmount: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginTop: 10,
    } as TextStyle,

    smallCardSub: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    } as ViewStyle,

    smallCardSubText: {
        fontSize: 12,
        color: '#aaa',
        marginLeft: 4,
    } as TextStyle,
};

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

export const getResponsiveSize = (baseSize: number, screenWidth: number): number => {
    const scale = screenWidth / 375;
    return Math.round(baseSize * scale);
};

export const withOpacity = (color: string, opacity: number): string => {
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
    Small_Card,
    getResponsiveSize,
    withOpacity,
};