package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.anew.ui.theme.PureLearnTheme
import com.example.purelearn.ui.theme.AppColors

@Composable
fun TitleTextField(
    title: String,
    value: String,
    onValueChange: (String) -> Unit,
    placeholder: String,
    totalWords: Int
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
           // .padding(16.dp)
    ) {
        Text(
            text = title,
            color = AppColors.foreground,
            fontSize = 14.sp,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        TextField(
            value = value,
            onValueChange = { if (it.length <= totalWords) onValueChange(it) },
            placeholder = { Text(text = placeholder, color = AppColors.mutedForeground) },
            modifier = Modifier
                .fillMaxWidth()
                .background(AppColors.background, shape = RoundedCornerShape(8.dp))
                .border(
                    width = 1.dp,
                    color = AppColors.input,
                    shape = RoundedCornerShape(8.dp)
                ),
            colors = TextFieldDefaults.colors(
                unfocusedContainerColor = AppColors.background,
                focusedContainerColor = AppColors.background,
                unfocusedIndicatorColor = Color.Transparent,
                focusedIndicatorColor = Color.Transparent
            ),
            shape = RoundedCornerShape(8.dp),
            singleLine = true,
            textStyle = androidx.compose.ui.text.TextStyle(
                color = AppColors.foreground,
                fontSize = 16.sp
            )
        )

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 4.dp),
            horizontalArrangement = Arrangement.End
        ) {
            Text(
                text = "${value.length}/$totalWords",
                color = AppColors.mutedForeground,
                fontSize = 12.sp
            )
        }
    }
}
@Preview
@Composable
fun TitleTextFieldPreview() {
    var titleText by remember { mutableStateOf("") }

    PureLearnTheme {
        TitleTextField(
            title = "Title",
            value = titleText,
            onValueChange = { titleText = it },
            placeholder = "Title of your",
            totalWords = 100
        )
    }
}
