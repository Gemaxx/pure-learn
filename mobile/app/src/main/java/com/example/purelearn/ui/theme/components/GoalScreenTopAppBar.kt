package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.AppTypography

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GoalScreenTopAppBar() {
    Column(
        modifier = Modifier.border(
            border = BorderStroke(1.dp, AppColors.border)
        )
    ) {
        TopAppBar(
            title = {
                Text(
                    text = "Your Goals",
                    color = AppColors.foreground,
                    style = AppTypography.h4
                )
            },

            colors = TopAppBarDefaults.mediumTopAppBarColors(
                containerColor = MaterialTheme.colorScheme.background
            ),
            modifier = Modifier
                .fillMaxWidth()
                .height(64.dp)
        )
    }
}