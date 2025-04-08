package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
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
        modifier = Modifier.fillMaxSize().padding(start = 17.dp),
        // horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {

        Box (modifier = Modifier
            .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(12.dp))
            .padding(17.dp)
            //.fillMaxWidth()
        ){
            Row(
                horizontalArrangement = Arrangement.Center,
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.padding(start = 17.dp).clickable {
                    isDropDownExpanded.value = true
                }
            ) {
                Text(text = usernames[itemPosition.value])
                Image(
                    painter = painterResource(id = R.drawable.drop_down_ic),
                    contentDescription = "DropDown Icon"
                )
            }
            DropdownMenu(

                expanded = isDropDownExpanded.value,
                onDismissRequest = {
                    isDropDownExpanded.value = false
                }) {
                usernames.forEachIndexed { index, status ->
                    DropdownMenuItem(text = {
                        Text(text = status)
                    },
                        onClick = {
                            isDropDownExpanded.value = false
                            itemPosition.value = index
                            onStatusChange(status)
                        })
                }
            }
        }

    }
}



@Preview(showBackground = true)
@Composable
fun GoalStatusDropDownListPreview() {

//    Surface(
//        modifier = Modifier.fillMaxSize(),
//        color = MaterialTheme.colorScheme.background
//    ) {
//        GoalStatusDropDownList()
//    }

}