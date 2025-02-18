package com.example.purelearn.ui.theme.components


import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun AppTextField(
    text: String,
    placeholder: String,
    modifier: Modifier = Modifier,
    singleLine: Boolean = false,
    imeAction: ImeAction = ImeAction.Default,
    keyboardActions: KeyboardActions = KeyboardActions(),
    onNext: () -> Unit = {},
    onDone: () -> Unit = {},
    onValueChange: (String) -> Unit
) {

    TextField(
        value = text,
        onValueChange = onValueChange,
        placeholder = {
            Text(
                text = placeholder, style = TextStyle(
                    color = Color.DarkGray, fontSize = 14.sp, fontWeight = FontWeight.Normal
                )
            )
        },
        modifier = modifier.fillMaxWidth()
        .padding(vertical = 4.dp),
        colors = TextFieldDefaults.colors(
            unfocusedContainerColor = Color.Gray,
            focusedContainerColor = Color.LightGray,
            unfocusedIndicatorColor = Color.Transparent,  // Hides the underline when not focused
            focusedIndicatorColor = Color.Transparent  // Hides the underline when focused
        ),
        shape = RoundedCornerShape(12.dp),


        singleLine = singleLine,
        keyboardActions = KeyboardActions(
            onDone = { onDone() },
            onNext = { onNext() }
        ),
        keyboardOptions = KeyboardOptions(
            imeAction = imeAction
        )
    )

}

@Preview(showBackground = true)
@Composable
fun AppTextFieldPreview() {
    AppTextField(text = "", placeholder = "", onValueChange = {})
}