package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.SegmentedButtonDefaults.Icon
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
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.purelearn.R
import com.example.purelearn.ui.theme.AppColors

@Composable
fun CustomSearchBar(
    query: String,
    onQueryChange: (String) -> Unit,
    placeholder:String,
    modifier: Modifier = Modifier
) {


    TextField(
        value = query,
        onValueChange = onQueryChange,
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
        textStyle = TextStyle(
            color = AppColors.foreground,
            fontSize = 16.sp
        ),
        leadingIcon = {
            androidx.compose.material3.Icon(
                painter = painterResource(id = R.drawable.search),
                contentDescription = "search",
                tint = AppColors.mutedForeground,
                modifier = Modifier.size(40.dp)
            )
        },
    )

//    TextField(
//        value = query,
//        onValueChange = onQueryChange,
//        placeholder = {
//            Text("Search the Goals...", color = AppColors.mutedForeground)
//        },
//        leadingIcon = {
//            androidx.compose.material3.Icon(
//                painter = painterResource(id = R.drawable.search),
//                contentDescription = "search",
//                tint = AppColors.mutedForeground,
//                modifier = Modifier.size(16.dp)
//            )
//        },
//        singleLine = true,
//        colors = TextFieldDefaults.colors(
//            unfocusedContainerColor = AppColors.background,
//            focusedContainerColor = AppColors.background,
//            unfocusedIndicatorColor = Color.Transparent,
//            focusedIndicatorColor = Color.Transparent
//        ),
//        shape = RoundedCornerShape(8.dp),
//        modifier = modifier
//            .fillMaxWidth()
//            .height(48.dp)
//    )
}
@Preview(showBackground = true, backgroundColor = 0xFF121212)
@Composable
fun SearchBarPreview() {
    var searchText by remember { mutableStateOf("") }
    CustomSearchBar(
        query = searchText, onQueryChange = { searchText = it },
        placeholder = "Search the Goals...",
        //modifier = TODO()
    )
}
