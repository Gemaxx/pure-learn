package com.example.anew.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color.Companion.Black
import androidx.compose.ui.graphics.Color.Companion.Gray
import androidx.compose.ui.graphics.Color.Companion.LightGray
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.platform.LocalContext
import androidx.compose.material3.*
import com.example.purelearn.ui.theme.DarkBackground
import com.example.purelearn.ui.theme.DarkFAB
import com.example.purelearn.ui.theme.DarkPrimary
import com.example.purelearn.ui.theme.DarkSecondary
import com.example.purelearn.ui.theme.DarkSurface
import com.example.purelearn.ui.theme.LightBackground
import com.example.purelearn.ui.theme.LightFAB
import com.example.purelearn.ui.theme.LightPrimary
import com.example.purelearn.ui.theme.LightSecondary
import com.example.purelearn.ui.theme.LightSurface
import com.example.purelearn.ui.theme.SansSerifTypography


private val DarkColorScheme = darkColorScheme(
    background = DarkBackground,
    surface = DarkSurface,
    primary = DarkPrimary,
    secondary = DarkSecondary,
    primaryContainer = DarkFAB
)

private val LightColorScheme = lightColorScheme(
    background = LightBackground,
    surface = LightSurface,
    primary = LightPrimary,
    secondary = LightSecondary,
    primaryContainer = LightFAB
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
//        when {
//        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
//            val context = LocalContext.current
//            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
//        }


//        darkTheme -> DarkColorScheme
//        else -> LightColorScheme


    MaterialTheme(
        colorScheme = colorScheme,
        typography = SansSerifTypography,
        content = content
    )
}