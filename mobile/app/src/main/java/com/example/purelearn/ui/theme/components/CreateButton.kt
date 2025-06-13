package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.purelearn.ui.theme.AppColors

@Preview
@Composable
fun CreateButton(onClick: () -> Unit) {
//    TextButton(
//        onClick = onClick,
//        modifier = Modifier
//            .height(36.dp)
//            .background(
//                color = AppColors.foreground,
//                shape = RoundedCornerShape(8.dp)
//            )
//            .padding(horizontal = 8.dp),
//        shape = RoundedCornerShape(8.dp)
//    ) {

    TextButton(
        onClick = onClick,
        modifier = Modifier
            .height(48.dp) // Match typical Material button height
            .background(
                color = AppColors.foreground,
                shape = RoundedCornerShape(8.dp)
            )
            .padding(horizontal = 16.dp), // Adjust padding as needed
        shape = RoundedCornerShape(8.dp)
    ) {
            Text(
                text = "Create",
                color = AppColors.background
            )
    }
}