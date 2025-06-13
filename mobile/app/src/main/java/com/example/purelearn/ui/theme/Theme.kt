package com.example.anew.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.AppTypography
import com.example.purelearn.ui.theme.DarkAccent
import com.example.purelearn.ui.theme.DarkAccentForeground
import com.example.purelearn.ui.theme.DarkBackground
import com.example.purelearn.ui.theme.DarkBorder
import com.example.purelearn.ui.theme.DarkCard
import com.example.purelearn.ui.theme.DarkCardForeground
import com.example.purelearn.ui.theme.DarkDestructive
import com.example.purelearn.ui.theme.DarkDestructiveForeground
import com.example.purelearn.ui.theme.DarkForeground
import com.example.purelearn.ui.theme.DarkInput
import com.example.purelearn.ui.theme.DarkMuted
import com.example.purelearn.ui.theme.DarkMutedForeground
import com.example.purelearn.ui.theme.DarkPopover
import com.example.purelearn.ui.theme.DarkPopoverForeground
import com.example.purelearn.ui.theme.DarkPrimary
import com.example.purelearn.ui.theme.DarkPrimaryForeground
import com.example.purelearn.ui.theme.DarkRing
import com.example.purelearn.ui.theme.DarkSecondary
import com.example.purelearn.ui.theme.DarkSecondaryForeground
import com.example.purelearn.ui.theme.DarkSidebarAccent
import com.example.purelearn.ui.theme.DarkSidebarAccentForeground
import com.example.purelearn.ui.theme.DarkSidebarBackground
import com.example.purelearn.ui.theme.DarkSidebarForeground
import com.example.purelearn.ui.theme.DarkSidebarPrimary
import com.example.purelearn.ui.theme.DarkSidebarPrimaryForeground
import com.example.purelearn.ui.theme.ExtendedColors
import com.example.purelearn.ui.theme.LightBackground
import com.example.purelearn.ui.theme.LightFAB
import com.example.purelearn.ui.theme.LightPrimary
import com.example.purelearn.ui.theme.LightSecondary
import com.example.purelearn.ui.theme.LightSurface
import com.example.purelearn.ui.theme.LocalExtendedColors
import com.example.purelearn.ui.theme.SansSerifTypography


//private val DarkColorScheme = darkColorScheme(
//    primary = DarkPrimary,
//    onPrimary = DarkPrimaryForeground,
//    secondary = DarkSecondary,
//    onSecondary = DarkSecondaryForeground,
//    background = DarkBackground,
//    onBackground = DarkForeground,
//    surface = DarkCard,
//    onSurface = DarkCardForeground,
//    surfaceVariant = DarkMuted,
//    onSurfaceVariant = DarkMutedForeground,
//    error = DarkDestructive,
//    onError = DarkDestructiveForeground,
//    outline = DarkBorder,
//    outlineVariant = DarkRing,
//    inverseSurface = DarkPopover,
//    inverseOnSurface = DarkPopoverForeground,
//    inversePrimary = DarkSidebarPrimary,
//
//    // Custom color mappings (not directly used in default theme but can be used via extension or custom implementation)
//    tertiary = DarkAccent,
//    onTertiary = DarkAccentForeground,
//)

private val DarkColorScheme = darkColorScheme(
    background = AppColors.background,
    surface = AppColors.card,
    onBackground = AppColors.foreground,
    onSurface = AppColors.cardForeground,
    primary = AppColors.primary,
    onPrimary = AppColors.primaryForeground,
    secondary = AppColors.secondary,
    onSecondary = AppColors.secondaryForeground,
    error = AppColors.destructive,
    onError = AppColors.destructiveForeground,
    outline = AppColors.border
)

private val darkExtendedColors = ExtendedColors(
    blurBackground = AppColors.blurBackground,
    card = AppColors.card,
    cardForeground = AppColors.cardForeground,
    popover = AppColors.popover,
    popoverForeground = AppColors.popoverForeground,
    primaryForeground = AppColors.primaryForeground,
    secondaryForeground = AppColors.secondaryForeground,
    muted = AppColors.muted,
    mutedForeground = AppColors.mutedForeground,
    accent = AppColors.accent,
    accentForeground = AppColors.accentForeground,
    destructive = AppColors.destructive,
    destructiveForeground = AppColors.destructiveForeground,
    input = AppColors.input,
    border = AppColors.border,
    ring = AppColors.ring,
    chart1 = AppColors.chart1,
    chart2 = AppColors.chart2,
    chart3 = AppColors.chart3,
    chart4 = AppColors.chart4,
    chart5 = AppColors.chart5,
    sidebarForeground = AppColors.sidebarForeground,
    sidebarPrimary = AppColors.sidebarPrimary,
    sidebarPrimaryForeground = AppColors.sidebarPrimaryForeground,
    sidebarAccent = AppColors.sidebarAccent,
    sidebarAccentForeground = AppColors.sidebarAccentForeground,
    sidebarBorder = AppColors.sidebarBorder,
    sidebarRing = AppColors.sidebarRing
)

private val LightColorScheme = lightColorScheme(
    background = LightBackground,
    surface = LightSurface,
    primary = LightPrimary,
    secondary = LightSecondary,
    primaryContainer = LightFAB,



/* Other default colors to override
background = Color(0xFFFFFBFE),
surface = Color(0xFFFFFBFE),
onPrimary = Color.White,
onSecondary = Color.White,
onTertiary = Color.White,
onBackground = Color(0xFF1C1B1F),
onSurface = Color(0xFF1C1B1F),
*/
)

@Composable
fun PureLearnTheme(
    darkTheme: Boolean = true,
        //isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    val extendedColors = darkExtendedColors

    CompositionLocalProvider(LocalExtendedColors provides extendedColors) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography =MaterialTheme.typography ,
            content = content
        )
    }
//        when {
//        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
//            val context = LocalContext.current
//            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
//        }


//        darkTheme -> DarkColorScheme
//        else -> LightColorScheme


//    MaterialTheme(
//        colorScheme = colorScheme,
//        typography = AppTypography,
//        content = content
//    )
}


object AppTheme {
    val extendedColors: ExtendedColors
        @Composable get() = LocalExtendedColors.current
}