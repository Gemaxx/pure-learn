package com.example.purelearn.ui.theme.components

import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.window.Dialog
import com.example.purelearn.ui.theme.Red

@Composable
fun LoadingBar() {
    Dialog(onDismissRequest = {}) {
        CircularProgressIndicator(color = Red)
    }
}

@Preview(showBackground = true)
@Composable
fun LoadingBarPreview() {
    LoadingBar()
}