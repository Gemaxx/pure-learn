package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.purelearn.ui.theme.AppColors

@Composable
fun CancelButton(onClick: () -> Unit) {
    TextButton(
        onClick = onClick,
        modifier = Modifier
            .height(48.dp) // Match typical Material button height
            .border(
                width = 1.dp,
                color = AppColors.input,
                shape = RoundedCornerShape(8.dp)
            ).background(
                color = AppColors.background,
                shape = RoundedCornerShape(8.dp)
    )
            .padding(horizontal = 16.dp), // Adjust padding as needed
        shape = RoundedCornerShape(8.dp)
    ) {

        Text(
            text = "Cancel",
            color = AppColors.foreground
        )

    }
}