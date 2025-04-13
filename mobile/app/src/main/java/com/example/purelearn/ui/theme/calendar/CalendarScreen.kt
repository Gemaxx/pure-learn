
package com.example.purelearn.ui.theme.calendar

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.time.LocalTime
import java.time.YearMonth
import java.time.format.DateTimeFormatter

@Preview
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CalendarScreen(
    navController: NavController
    ) {
    var selectedDate by remember { mutableStateOf(LocalDate.now()) }
    var selectedDay by remember { mutableStateOf(LocalDate.now().dayOfMonth) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Calendar",
                        color =MaterialTheme.colorScheme.primary,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold
                    )
                },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = "Back"
                            ,  tint =MaterialTheme.colorScheme.primary)
                    }
                },
                colors = TopAppBarDefaults.mediumTopAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background
                )
            )
        },
        ) {
            paddingValues ->
        Column(modifier = Modifier.padding(paddingValues)) {
            MonthSelector(selectedDate) { newDate ->
                selectedDate = newDate.withDayOfMonth(1)
                selectedDay =
                    if (newDate.monthValue == LocalDate.now().monthValue) LocalDate.now().dayOfMonth else 1
            }

            MonthlyView(selectedDate, selectedDay) { newDay ->
                selectedDay = newDay
                selectedDate = selectedDate.withDayOfMonth(newDay)
            }

            DailyView(selectedDate) {}
        }
    }
}

@Composable
fun MonthSelector(selectedDate: LocalDate, onMonthSelected: (LocalDate) -> Unit) {
    val years = (2025..2100).toList()
    val months = (1..12).toList()

    LazyRow(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
    ) {
        items(years) { year ->
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.padding(horizontal = 8.dp)
            ) {

                Text(
                    text = year.toString(),
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    modifier = Modifier.padding(vertical = 4.dp)
                )

                months.forEach { month ->
                    val isSelected = selectedDate.year == year && selectedDate.monthValue == month
                    val monthName = YearMonth.of(year, month).month.name.take(3)

                    Text(
                        text = monthName,
                        modifier = Modifier
                            .padding(horizontal = 6.dp, vertical = 4.dp)
                            .clickable { onMonthSelected(LocalDate.of(year, month, 1)) }
                            .background(
                                if (isSelected) MaterialTheme.colorScheme.primary else Color.Transparent,
                                shape = RoundedCornerShape(12.dp)
                            )
                            .padding(8.dp),
                        color = if (isSelected) MaterialTheme.colorScheme.background else MaterialTheme.colorScheme.primary,
                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                    )
                }
            }
        }
    }
}


@Composable
fun MonthlyView(selectedDate: LocalDate, selectedDay: Int?, onDateSelected: (Int) -> Unit) {
    val daysInMonth = selectedDate.lengthOfMonth()
    val listState = rememberLazyListState()

    LaunchedEffect(selectedDate) {
        if (selectedDate.monthValue == LocalDate.now().monthValue && selectedDate.year == LocalDate.now().year) {
            listState.scrollToItem(LocalDate.now().dayOfMonth - 1)
        }
    }

    LazyRow(state = listState, modifier = Modifier.padding(vertical = 8.dp)) {
        items((1..daysInMonth).toList()) { day ->
            val isSelected = selectedDay == day
            val date = selectedDate.withDayOfMonth(day)
            val dayName = date.dayOfWeek.name.take(3)

            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                    .padding(4.dp)
                    .clickable { onDateSelected(day) }
                    .background(if (isSelected) MaterialTheme.colorScheme.primary else Color.Transparent, shape = RoundedCornerShape(8.dp))
                    .padding(8.dp)
            ) {
                Text(
                    text = day.toString(),
                    color = if (isSelected) MaterialTheme.colorScheme.background else MaterialTheme.colorScheme.primary,
                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                    textAlign = TextAlign.Center
                )
                Text(
                    text = dayName,
                    color = if (isSelected) MaterialTheme.colorScheme.background else MaterialTheme.colorScheme.primary,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Light,
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}




@Composable
fun DailyView(selectedDate: LocalDate, onBack: () -> Unit) {
    val hours = (0..23).map { LocalTime.of(it, 0) }
    val currentTime = remember { mutableStateOf(LocalTime.now()) }
    val coroutineScope = rememberCoroutineScope()
    val isToday = selectedDate == LocalDate.now()

    LaunchedEffect(Unit) {
        coroutineScope.launch {
            while (true) {
                currentTime.value = LocalTime.now()
                delay(60000)
            }
        }
    }

    Scaffold(
        floatingActionButton = {
            FloatingActionButton(
                onClick = { /* Add task */ },
                containerColor = MaterialTheme.colorScheme.primary
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Task", tint = MaterialTheme.colorScheme.background)
            }
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            LazyColumn(
                modifier = Modifier.fillMaxSize()
            ) {
                items(hours) { hour ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = hour.format(DateTimeFormatter.ofPattern("hh:mm ")),
                            fontSize = 14.sp,
                            fontWeight = FontWeight.ExtraLight,
                            modifier = Modifier.padding(start = 16.dp)
                        )

                        val dayNumber = selectedDate.dayOfMonth
                        Text(
                            text = dayNumber.toString(),
                            fontSize = 10.sp,
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                            modifier = Modifier
                                .weight(1f)
                                .padding(end = 16.dp),
                            textAlign = TextAlign.End
                        )

                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(1.dp)
                                .background(MaterialTheme.colorScheme.surface.copy(alpha = 0.5f))
                              //  .padding(16.dp)
                        )
                    }

                    if (isToday && hour.hour == currentTime.value.hour) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(2.dp)
                                .background(MaterialTheme.colorScheme.primary)
                        )
                    }
                }
            }
        }
    }
}
