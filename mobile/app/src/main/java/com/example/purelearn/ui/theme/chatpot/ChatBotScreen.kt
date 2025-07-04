package com.example.purelearn.ui.theme.chatpot

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController

@Composable
fun ChatBotScreen( navController: NavController,modifier: Modifier = Modifier) {
    Column(
        modifier=modifier
            .fillMaxSize()
            .background(Color(0xFF1976D2))
    ) {
        Text(
            text = "chatbot Page",
            fontSize = 40.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color.White
        )
    }
}

