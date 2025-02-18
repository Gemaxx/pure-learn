package com.example.purelearn.ui.theme.Task

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.purelearn.tasks
import com.example.purelearn.ui.theme.components.AddTaskScreenContent
import com.example.purelearn.ui.theme.components.HomeTopAppBar
import com.example.purelearn.ui.theme.components.TaskDoneList
import com.example.purelearn.ui.theme.components.TaskInProgressList
import com.example.purelearn.ui.theme.components.TaskToDoList

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddTaskScreen(navController: NavController, modifier: Modifier = Modifier) {

    val sheetState = rememberModalBottomSheetState(
        skipPartiallyExpanded = true
    )

    var isSheetOpen by remember {
        mutableStateOf(true)
    }

  //  val scope = rememberCoroutineScope()


            Scaffold(modifier = Modifier.fillMaxSize(),
            topBar = { HomeTopAppBar(
                userName = "Fatema"
            ) }
        )
            { paddingValues ->
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(paddingValues)
                ) {
                    item {
                        Text(
                            text = "Goal Name",
                            modifier = Modifier.padding(30.dp),
                            fontSize = 30.sp

                        )
                    }
                    item {
                        Row {
                            Text(
                                text = "ToDo",
                                modifier = Modifier
                                    .weight(1.5f)
                                    .padding(start = 30.dp),
                                textAlign = TextAlign.Start,
                                style = MaterialTheme.typography.bodySmall,
                            )
                            Text(
                                text = "Add Task",
                                modifier = Modifier.weight(1f),
                                textAlign = TextAlign.End,
                                style = MaterialTheme.typography.bodySmall,
                            )
                            Icon(imageVector = Icons.Default.Add,
                                contentDescription = "Add goal",
                                modifier = Modifier.clickable {
                                    isSheetOpen = true
                                }
                                    .padding(end = 30.dp))

                        }
                    }

                    TaskToDoList(

                        emptyListText = "You do not have any goals.\n" +
                                "add new goal from the + button.",
                        tasks = tasks,
                        onDeleteIconClick = { }
                    )

                    item {
                        Spacer(modifier = Modifier.height(20.dp))
                    }
                    item {
                        Text(
                            text = "In-Progress",
                            modifier = Modifier
                                //.weight(1.5f)
                                .padding(start = 30.dp),
                            textAlign = TextAlign.Start,
                            style = MaterialTheme.typography.bodySmall,
                        )
                    }
                    TaskInProgressList(
                        emptyListText = "",
                        tasks = tasks,
                        onDeleteIconClick = {},
                    )


                    item {
                        Spacer(modifier = Modifier.height(20.dp))
                    }
                    item {
                        Text(
                            text = "Done",
                            modifier = Modifier
                                //.weight(1.5f)
                                .padding(start = 30.dp),
                            textAlign = TextAlign.Start,
                            style = MaterialTheme.typography.bodySmall,
                        )
                    }
                    TaskDoneList(
                        emptyListText = "",
                        tasks = tasks,
                        onDeleteIconClick = {}
                    )


                }
            }




                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center,
                    modifier = Modifier.fillMaxSize()
                ) {

                    if (isSheetOpen) {
                        ModalBottomSheet(
                            sheetState = sheetState,
                            onDismissRequest = {
                                isSheetOpen = false
                            },
                            containerColor = White,
                            modifier = Modifier.padding(top = 7.dp)
                        ) {
                            Column(
                                modifier = Modifier
                                    .fillMaxSize()
                                    .padding(4.dp),
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.Top
                            ) {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(horizontal = 17.dp)
                                ) {
                                    Text(
                                        text = "Cancel",
                                        fontSize = 16.sp,
                                        color = Color(0xFF40629B),
                                        fontWeight = FontWeight.Medium,
                                        modifier = Modifier.clickable {
//                                            scope.launch {
//                                                sheetState.hide()
//                                            }
                                        }
                                    )
                                    Text(
                                        text = "New Task",
                                        fontSize = 16.sp,
                                        color = White,
                                        fontWeight = FontWeight.Medium,
                                        modifier = Modifier.padding(end = 10.dp)
                                    )
                                    Text(
                                        text = "Done",
                                        fontSize = 16.sp,
                                        color = Color(0xFF40629B),
                                        fontWeight = FontWeight.Medium,
                                        modifier = Modifier.clickable {
                                        }
                                    )
                                }

                                AddTaskScreenContent(

                                    dueDateValue = "",
                                    estimatedTimeValue = ""
                                )
                            }
                        }
                    }
                }

    }


@Preview(showSystemUi = true)
@Composable
fun AddTaskScreenPreview(modifier: Modifier = Modifier) {

   // AddTaskScreen()
}


