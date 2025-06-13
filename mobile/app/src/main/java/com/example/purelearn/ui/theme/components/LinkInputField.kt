package com.example.purelearn.ui.theme.components

import android.content.Intent
import android.net.Uri
import android.util.Patterns
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.anew.ui.theme.PureLearnTheme
import com.example.purelearn.R
import com.example.purelearn.ui.theme.AppColors
//
//@Composable
//fun LinkInputField( linkText: String,
//                    onLinkTextChange: (String) -> Unit) {
//   // var linkText by remember { mutableStateOf("") }
//    val context = LocalContext.current
//
//    Row(
//        verticalAlignment = Alignment.CenterVertically,
//        modifier = Modifier
//           // .fillMaxWidth()
//            .padding(8.dp)
//    ) {
//        TextField(
//            value = linkText,
//            onValueChange = {onLinkTextChange(it) },
//            placeholder = { Text("Link") },
//            modifier = Modifier
//              //  .fillMaxWidth()
//                .background(AppColors.background, shape = RoundedCornerShape(8.dp))
//                .border(
//                    width = 1.dp,
//                    color = AppColors.input,
//                    shape = RoundedCornerShape(8.dp)
//                ),
//            colors = TextFieldDefaults.colors(
//                unfocusedContainerColor = AppColors.background,
//                focusedContainerColor = AppColors.background,
//                unfocusedIndicatorColor = Color.Transparent,
//                focusedIndicatorColor = Color.Transparent
//            ),
//            shape = RoundedCornerShape(8.dp),
//            singleLine = true,
//            textStyle = androidx.compose.ui.text.TextStyle(
//                color = AppColors.foreground,
//                fontSize = 16.sp
//            )
//        )
//
//        Spacer(modifier = Modifier.width(8.dp))
//        IconButton(
//            modifier =Modifier.background(AppColors.background, shape = RoundedCornerShape(8.dp))
//        .border(
//        width = 1.dp,
//        color = AppColors.input,
//        shape = RoundedCornerShape(8.dp)
//          ),
//
//            onClick = {
//                var url = linkText.trim()
//                if (!url.startsWith("http://") && !url.startsWith("https://")) {
//                    url = "https://$url"
//                }
//
//                if (Patterns.WEB_URL.matcher(url).matches()) {
//                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
//                    context.startActivity(intent)
//                } else {
//                    Toast.makeText(context, "Invalid URL", Toast.LENGTH_SHORT).show()
//                }
//            }
//        ) {
//            Icon(
//                painter = painterResource(id = R.drawable.linkicon),
//                contentDescription = "goto link",
//                tint = AppColors.mutedForeground,
//                modifier = Modifier.size(16.dp)
//            )
//        }
//    }
//}
//@Preview
//@Composable
//fun LinkInputFieldPreview(modifier: Modifier = Modifier) {
//    PureLearnTheme {
//       // LinkInputField()
//    }
//}



@Composable
fun LinkInputField(
    linkText: String,
    onLinkTextChange: (String) -> Unit
) {
    val context = LocalContext.current
    val shape = RoundedCornerShape(8.dp)
    val height = 56.dp

    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            //.padding(8.dp)
            .fillMaxWidth()
            .height(height)
    ) {
        TextField(
            value = linkText,
            onValueChange = onLinkTextChange,
            placeholder = { Text("Link", color = AppColors.mutedForeground) },
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .height(height)
                .background(AppColors.background, shape)
                .border(1.dp, AppColors.input, shape),
            colors = TextFieldDefaults.colors(
                unfocusedContainerColor = AppColors.background,
                focusedContainerColor = AppColors.background,
                unfocusedIndicatorColor = Color.Transparent,
                focusedIndicatorColor = Color.Transparent
            ),
            shape = shape,
            singleLine = true,
            textStyle = androidx.compose.ui.text.TextStyle(
                color = AppColors.foreground,
                fontSize = 16.sp
            )
        )

        Spacer(modifier = Modifier.width(8.dp))

        IconButton(
            onClick = {
                var url = linkText.trim()
                if (!url.startsWith("http://") && !url.startsWith("https://")) {
                    url = "https://$url"
                }

                if (Patterns.WEB_URL.matcher(url).matches()) {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                    context.startActivity(intent)
                } else {
                    Toast.makeText(context, "Invalid URL", Toast.LENGTH_SHORT).show()
                }
            },
            modifier = Modifier
                .size(height) // Make square button same height as text field
                .background(AppColors.background, shape)
                .border(1.dp, AppColors.input, shape)
        ) {
            Icon(
                painter = painterResource(id = R.drawable.linkicon),
                contentDescription = "Go to link",
                tint = AppColors.mutedForeground,
                modifier = Modifier.size(20.dp)
            )
        }
    }
}
