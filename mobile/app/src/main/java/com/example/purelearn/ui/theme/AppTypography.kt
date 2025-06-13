package com.example.purelearn.ui.theme


import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

object AppTypography {

    // Heading styles
    val h1 = TextStyle(
        fontSize = 48.sp,
        lineHeight = 56.sp,
        fontWeight = FontWeight.ExtraBold,
        color = AppColors.foreground
    )

    val h2 = TextStyle(
        fontSize = 36.sp,
        lineHeight = 44.sp,
        fontWeight = FontWeight.Bold,
        color = AppColors.foreground
    )

    val h3 = TextStyle(
        fontSize = 30.sp,
        lineHeight = 40.sp,
        fontWeight = FontWeight.SemiBold,
        color = AppColors.foreground
    )

    val h4 = TextStyle(
        fontSize = 24.sp,
        lineHeight = 32.sp,
        fontWeight = FontWeight.SemiBold,
        color = AppColors.foreground
    )

    // Body styles
    val body = TextStyle(
        fontSize = 16.sp,
        lineHeight = 28.sp,
        fontWeight = FontWeight.Normal,
        color = AppColors.foreground
    )

    val lead = TextStyle(
        fontSize = 24.sp,
        lineHeight = 28.sp,
        fontWeight = FontWeight.Normal,
        color = AppColors.mutedForeground
    )

    val large = TextStyle(
        fontSize = 24.sp,
        lineHeight = 28.sp,
        fontWeight = FontWeight.SemiBold,
        letterSpacing = 0.1.sp,
        color = AppColors.foreground
    )

    val blockquote = TextStyle(
        fontSize = 18.sp,
        lineHeight = 28.sp,
        fontWeight = FontWeight.Normal,
        color = AppColors.foreground
    )

    val muted = TextStyle(
        fontSize = 14.sp,
        lineHeight = 20.sp,
        fontWeight = FontWeight.Normal,
        letterSpacing = 0.1.sp,
        color = AppColors.mutedForeground
    )

    // List Item
    val listItem = TextStyle(
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.2.sp,
        color = AppColors.foreground
    )
    val buttonText=TextStyle(
        fontSize = 14.sp,
        lineHeight = 20.sp,
        fontWeight =FontWeight.Normal,
        color = AppColors.foreground
    )
}
