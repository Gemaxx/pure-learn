package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeTopAppBar(userName:String) {


    TopAppBar(
        title = {
            // Row that holds the circular avatar and user name
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Extract the first character (uppercase if you want)
                val firstChar = userName.firstOrNull()?.toString()?.uppercase() ?: "?"

                // Circular avatar
                Box(
                    modifier =Modifier
                        .size(30.dp)
                        .clip(CircleShape)
                        .background(Color.Magenta), // You can pick any color or from your theme
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = firstChar,
                        color = Color.White,
                        style = MaterialTheme.typography.bodyLarge
                    )
                }

                Spacer(modifier = Modifier.width(8.dp))

                // User name
                Text(
                    text = userName,
                    style = MaterialTheme.typography.titleLarge,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        },
        colors = TopAppBarDefaults.mediumTopAppBarColors(
            containerColor = MaterialTheme.colorScheme.background // Dynamic TopBar color
        )
    )
}
