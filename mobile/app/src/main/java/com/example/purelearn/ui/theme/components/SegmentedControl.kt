package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.material3.*
import androidx.navigation.NavController


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SegmentedControl(navController: NavController, goalId: Int) {
    val options = listOf("Tasks", "Resources", "Notes")

    val routes = mapOf(
        "Tasks" to "TaskScreen",
        "Resources" to "ResourceScreen",
        "Notes" to "NoteScreen"
    )

    val currentRoute = navController.currentBackStackEntry?.destination?.route?.substringBefore("/") ?: "TaskScreen"

    val selectedOption = routes.entries.find { it.value == currentRoute }?.key ?: "Tasks"

    SingleChoiceSegmentedButtonRow(
        modifier = Modifier.padding(16.dp)
    ) {
        options.forEachIndexed { index, option ->
            SegmentedButton(
                selected = selectedOption == option,
                onClick = {
                    if (selectedOption != option) { // Prevent unnecessary navigation
                        navController.navigate("${routes[option]}/$goalId")
                    }
                },
                shape = when (index) {
                    0 -> RoundedCornerShape(topStart = 50.dp, bottomStart = 50.dp)
                    options.lastIndex -> RoundedCornerShape(topEnd = 50.dp, bottomEnd = 50.dp)
                    else -> RoundedCornerShape(0.dp)
                },
                colors = SegmentedButtonDefaults.colors(
                    activeContainerColor = Color(0xFFAA66FF),
                    activeContentColor = Color.Black,
                    inactiveContainerColor = Color.Transparent,
                    inactiveContentColor = Color.White
                )
            ) {
                Text(
                    text = option,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Normal
                )
            }
        }
    }
}



@Composable
fun SegmentedControlScreen(navController: NavController, goalId: Int) {
    var selectedOption by remember { mutableStateOf("Tasks") }
    Column(
        modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp)
           // .background(Color.Black),
                ,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        SegmentedControl(
//            selectedOption = selectedOption,
//            onOptionSelected = { selectedOption = it },
            navController = navController,
            goalId = goalId
        )    }
}
