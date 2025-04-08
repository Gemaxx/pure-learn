package com.example.purelearn.ui.theme.screenTime

import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.drawable.Drawable
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.navigation.NavHostController
import coil.compose.rememberAsyncImagePainter
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.components.Description
import com.github.mikephil.charting.data.Entry
import com.github.mikephil.charting.data.LineData
import com.github.mikephil.charting.data.LineDataSet
import java.util.Calendar

fun getAppIcon(context: Context, packageName: String): Drawable? {
    return try {
        context.packageManager.getApplicationIcon(packageName)
    } catch (e: PackageManager.NameNotFoundException) {
        null
    }
}

fun getAppName(context: Context, packageName: String): String {
    return try {
        context.packageManager.getApplicationLabel(
            context.packageManager.getApplicationInfo(packageName, 0)
        ).toString()
    } catch (e: PackageManager.NameNotFoundException) {
        packageName
    }
}

fun formatTime(milliseconds: Long): String {
    val minutes = (milliseconds / 1000) / 60
    val hours = minutes / 60
    return if (hours > 0) "${hours}h ${minutes % 60}m" else "${minutes}m"
}


fun getHourlyUsageStats(context: Context, daysAgo: Int): List<Pair<Int, Long>> {
    val usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
    val calendar = Calendar.getInstance().apply {
        add(Calendar.DAY_OF_YEAR, -daysAgo)
        set(Calendar.HOUR_OF_DAY, 0)
        set(Calendar.MINUTE, 0)
        set(Calendar.SECOND, 0)
        set(Calendar.MILLISECOND, 0)
    }
    val startTime = calendar.timeInMillis
    calendar.set(Calendar.HOUR_OF_DAY, 23)
    calendar.set(Calendar.MINUTE, 59)
    calendar.set(Calendar.SECOND, 59)
    calendar.set(Calendar.MILLISECOND, 999)
    val endTime = calendar.timeInMillis

    val usageEvents = usageStatsManager.queryEvents(startTime, endTime)
    val event = UsageEvents.Event()
    val hourlyUsage = MutableList(24) { 0L }
    val activeSessions = mutableMapOf<String, Long>()

    while (usageEvents.hasNextEvent()) {
        usageEvents.getNextEvent(event)
        when (event.eventType) {
            UsageEvents.Event.ACTIVITY_RESUMED -> activeSessions[event.packageName] = event.timeStamp
            UsageEvents.Event.ACTIVITY_PAUSED -> {
                val startTimestamp = activeSessions.remove(event.packageName)
                if (startTimestamp != null) {
                    val duration = event.timeStamp - startTimestamp
                    if (duration > 0) {
                        val hour = Calendar.getInstance().apply { timeInMillis = startTimestamp }.get(Calendar.HOUR_OF_DAY)
                        hourlyUsage[hour] += duration
                    }
                }
            }
        }
    }
    return hourlyUsage.mapIndexed { index, usage -> index to usage }
}

@Composable
fun UsageChart(hourlyUsage: List<Pair<Int, Long>>) {
    val context = LocalContext.current
    val isDarkMode = !isSystemInDarkTheme()

    val primaryColor = MaterialTheme.colorScheme.primaryContainer.toArgb()
    val axisTextColor = if (isDarkMode) android.graphics.Color.WHITE else android.graphics.Color.BLACK

    val entries = remember(hourlyUsage) {
        hourlyUsage.map { Entry(it.first.toFloat(), (it.second / (1000 * 60)).toFloat()) }
    }

    val dataSet = remember(entries) {
        LineDataSet(entries, "Usage Time").apply {
            color = primaryColor
            setDrawValues(false)
        }
    }

    val lineData = remember(dataSet) { LineData(dataSet) }

    AndroidView(
        factory = { ctx ->
            LineChart(ctx).apply {
                data = lineData
                description = Description().apply { text = "Usage through the day" }

                xAxis.textColor = axisTextColor
                axisLeft.textColor = axisTextColor
                axisRight.textColor = axisTextColor

                invalidate()
            }
        },
        update = { chart ->
            chart.data = lineData
            chart.xAxis.textColor = axisTextColor
            chart.axisLeft.textColor = axisTextColor
            chart.axisRight.textColor = axisTextColor
            chart.invalidate()
        },
        modifier = Modifier.fillMaxWidth().height(200.dp)
    )
}



@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ScreenTimeScreen(navController: NavHostController) {
    val context = LocalContext.current
    val selectedDay = remember { mutableStateOf(0) }

    // Ensure hourlyUsage updates when selectedDay changes
    var hourlyUsage by remember { mutableStateOf(emptyList<Pair<Int, Long>>()) }
    var usageStats by remember { mutableStateOf(emptyList<Pair<String, Long>>()) }

    LaunchedEffect(selectedDay.value) {
        hourlyUsage = getHourlyUsageStats(context, selectedDay.value)
        usageStats = getAppUsageStats(context, selectedDay.value)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Your Screen Time", fontSize = 20.sp, fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background,
                    titleContentColor = MaterialTheme.colorScheme.primary,
                    navigationIconContentColor = MaterialTheme.colorScheme.primary
                )
            )
        },
    ) { paddingValues ->
        Column(modifier = Modifier.fillMaxSize().padding(paddingValues)) {
            // Day selection row
            LazyRow(modifier = Modifier.fillMaxWidth()) {
                items(7) { day ->
                    val label = if (day == 0) "Today" else "${day}d ago"
                    Text(
                        text = label,
                        fontSize = 16.sp,
                        modifier = Modifier
                            .padding(8.dp)
                            .clickable { selectedDay.value = day }
                    )
                }
            }
            Spacer(modifier = Modifier.height(16.dp))

            // **Updated Usage Chart**
            UsageChart(hourlyUsage)

            Spacer(modifier = Modifier.height(16.dp))

            // **List of app usage**
            LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp)) {
                items(usageStats) { (packageName, totalUsage) ->
                    AppUsageItem(packageName, totalUsage)
                }
            }
        }
    }
}


fun getAppUsageStats(context: Context, daysAgo: Int): List<Pair<String, Long>> {
    val usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
    val calendar = Calendar.getInstance().apply {
        add(Calendar.DAY_OF_YEAR, -daysAgo)
        set(Calendar.HOUR_OF_DAY, 0)
        set(Calendar.MINUTE, 0)
        set(Calendar.SECOND, 0)
        set(Calendar.MILLISECOND, 0)
    }
    val startTime = calendar.timeInMillis
    calendar.set(Calendar.HOUR_OF_DAY, 23)
    calendar.set(Calendar.MINUTE, 59)
    calendar.set(Calendar.SECOND, 59)
    calendar.set(Calendar.MILLISECOND, 999)
    val endTime = calendar.timeInMillis

    val usageEvents = usageStatsManager.queryEvents(startTime, endTime)
    val event = UsageEvents.Event()
    val usageMap = mutableMapOf<String, Long>()
    val activeSessions = mutableMapOf<String, Long>()

    while (usageEvents.hasNextEvent()) {
        usageEvents.getNextEvent(event)
        when (event.eventType) {
            UsageEvents.Event.ACTIVITY_RESUMED -> activeSessions[event.packageName] = event.timeStamp
            UsageEvents.Event.ACTIVITY_PAUSED -> {
                val startTimestamp = activeSessions.remove(event.packageName)
                if (startTimestamp != null) {
                    val duration = event.timeStamp - startTimestamp
                    if (duration > 0) {
                        usageMap[event.packageName] = usageMap.getOrDefault(event.packageName, 0L) + duration
                    }
                }
            }
        }
    }
    return usageMap.toList().sortedByDescending { it.second }
}

@Composable
fun AppUsageItem(packageName: String, usageTime: Long) {
    val context = LocalContext.current
    val appIcon by remember(packageName) { mutableStateOf(getAppIcon(context, packageName)) }
    val appName by remember(packageName) { mutableStateOf(getAppName(context, packageName)) }

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        appIcon?.let {
            Image(
                painter = rememberAsyncImagePainter(it),
                contentDescription = null,
                modifier = Modifier.size(40.dp)
            )
        }
        Spacer(modifier = Modifier.width(8.dp))
        Column {
            Text(text = appName, fontSize = 16.sp, fontWeight = FontWeight.Bold)
            Text(text = formatTime(usageTime), fontSize = 14.sp)
        }
    }
}
