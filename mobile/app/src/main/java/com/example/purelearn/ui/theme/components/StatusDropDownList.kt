package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.purelearn.R
import com.example.purelearn.ui.theme.AppColors


@Composable
fun GoalStatusDropDownList(
    selectedStatus: String,
    onStatusChange: (String) -> Unit
) {

    val isDropDownExpanded = remember {
        mutableStateOf(false)
    }

    val itemPosition = remember {
        mutableStateOf(0)
    }

    val usernames = listOf("Not-Started", "In-Progress", "Done","On-Hold","Cancelled")

    Column(
        modifier = Modifier
            .fillMaxSize()
            // .padding(start = 17.dp)
            .border(
                width = 1.dp,
                color = AppColors.input,
                shape = RoundedCornerShape(8.dp)
            ),
        // horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {

        Box (modifier = Modifier
            .background(AppColors.background, RoundedCornerShape(8.dp))
            .padding(17.dp)
            //.fillMaxWidth()
        ){
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .padding(start = 17.dp)
                    .clickable {
                        isDropDownExpanded.value = true
                    }
                    .fillMaxWidth()
            ) {
                Text(text = selectedStatus,
                //usernames[itemPosition.value],
                    color = AppColors.foreground,
                )

                Icon(
                    painter = painterResource(id = R.drawable.chevrondown),
                    contentDescription = "dropdown",
                    tint = AppColors.mutedForeground,
                    modifier = Modifier.size(16.dp)
                )
            }
            DropdownMenu(
                expanded = isDropDownExpanded.value,
                onDismissRequest = {
                    isDropDownExpanded.value = false
                }) {
                usernames.forEachIndexed { index, term ->
                    DropdownMenuItem(text = {
                        Text(text = term)
                    },
                        onClick = {
                            isDropDownExpanded.value = false
                            itemPosition.value = index
                            onStatusChange(term)
                        })
                }
            }
        }

    }
}



//@Preview(showBackground = true)
//@Composable
//fun GoalStatusDropDownListPreview() {
//
////    Surface(
////        modifier = Modifier.fillMaxSize(),
////        color = MaterialTheme.colorScheme.background
////    ) {
////        GoalStatusDropDownList()
////    }
//
//}