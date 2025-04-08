package com.example.purelearn.ui.theme.timer

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.NavHostController
import com.example.purelearn.ui.theme.timer.Timerviewmodel.TimerViewModel
import kotlinx.coroutines.launch




@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(
    navController: NavHostController,
    studySession: Int,
    shortBreak: Int,
    pomodoros: Int,
    longBreak: Int,
    viewModel: TimerViewModel
) {
    var studySessionState by remember { mutableStateOf(studySession) }
    var shortBreakState by remember { mutableStateOf(shortBreak) }
    var pomodorosState by remember { mutableStateOf(pomodoros) }
    var longBreakState by remember { mutableStateOf(longBreak) }

    val numberRange = (1..99).toList()

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Pomodoro Settings",
                        color = MaterialTheme.colorScheme.primary,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold
                    )
                },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(
                            Icons.Filled.ArrowBack, contentDescription = "Back",
                            tint = MaterialTheme.colorScheme.primary
                        )
                    }
                },
                colors = TopAppBarDefaults.mediumTopAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background
                )
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colorScheme.background)
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.Top,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(modifier = Modifier.height(24.dp))

            WheelPicker("Study Session", numberRange, studySessionState) { studySessionState = it }

            WheelPicker("Short Break", numberRange, shortBreakState) { shortBreakState = it }

            WheelPicker("Pomodoros", numberRange, pomodorosState) { pomodorosState = it }

            WheelPicker("Long Break", numberRange, longBreakState) { longBreakState = it }

            Spacer(modifier = Modifier.height(32.dp))

            Button(
                onClick = {
                    Log.d(
                        "to timer",
                        "\"TimerScreen/${studySessionState * 60}/${shortBreakState * 60}/${pomodorosState * 60}/${longBreakState}\""
                    )
                    navController.navigate("TimerScreen/${studySessionState * 60}/${shortBreakState * 60}/${pomodorosState * 60}/${longBreakState}")
                },
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                modifier = Modifier
                    .fillMaxWidth(0.5f)
                    .padding(16.dp)
                    .height(55.dp),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text("Save", color = MaterialTheme.colorScheme.background, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun WheelPicker(title: String, options: List<Int>, initialSelected: Int, onValueSelected: (Int) -> Unit) {
    val state = rememberLazyListState(initialSelected - options.first())
    val coroutineScope = rememberCoroutineScope()
    var selectedValue by remember { mutableStateOf(initialSelected) }

    LaunchedEffect(selectedValue) {
        coroutineScope.launch {
            state.animateScrollToItem(options.indexOf(selectedValue))
        }
    }

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            title,
            fontSize = 18.sp,
            fontWeight = FontWeight.SemiBold,
            color = MaterialTheme.colorScheme.primary
        )

        Box(
            modifier = Modifier
                .height(80.dp)
                .fillMaxWidth()
                .padding(top = 8.dp),
            contentAlignment = Alignment.Center
        ) {
            LazyRow(
                state = state,
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Center
            ) {
                items(options.size) { index ->
                    val item = options[index]
                    val isSelected = selectedValue == item

                    Box(
                        modifier = Modifier
                            .width(60.dp)
                            .height(60.dp)
                            .clip(CircleShape)
                            .background(if (isSelected) MaterialTheme.colorScheme.primary else Color.Transparent)
                            .clickable {
                                selectedValue = item
                                coroutineScope.launch {
                                    state.animateScrollToItem(index)
                                }
                                onValueSelected(item)
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = item.toString(),
                            fontSize = 22.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                            color = if (isSelected) MaterialTheme.colorScheme.background else MaterialTheme.colorScheme.primary
                        )
                    }
                }
            }
        }
    }
}
