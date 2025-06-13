package com.example.purelearn.ui.theme.components

import android.net.Uri
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Tab
import androidx.compose.material3.TabPosition
import androidx.compose.material3.TabRow
import androidx.compose.material3.TabRowDefaults
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.purelearn.ui.theme.AppColors

@Composable
fun ChipTabs(
    tabs: List<String>,
    selectedTabIndex: Int,
    onTabSelected: (Int) -> Unit
) {
    val indicator = @Composable { tabPositions: List<TabPosition> ->
        TabRowDefaults.Indicator(
            Modifier
                .tabIndicatorOffset(tabPositions[selectedTabIndex])
                .height(2.dp),
            color = Color.White
        )
    }

    ScrollableTabRow( // use this instead of TabRow to reduce spacing and allow overflow scroll
        selectedTabIndex = selectedTabIndex,
        containerColor = AppColors.background,
        contentColor = AppColors.foreground,
        edgePadding = 2.dp,
        indicator = indicator,
        divider = {}
    ) {
        tabs.forEachIndexed { index, title ->
            Tab(
                selected = selectedTabIndex == index,
                onClick = { onTabSelected(index) },
                modifier = Modifier.padding(horizontal = 2.dp),
                text = {
                    Text(
                        text = title,
                        fontSize = 12.sp,
                        maxLines = 1,
                        color = if (selectedTabIndex == index) AppColors.foreground else AppColors.mutedForeground
                    )
                }
            )
        }
    }
}

@Composable
fun Tabs(
    navController: NavController,
    goalId: Int,
    goalName: String
) {
    val tabs = listOf("Resources", "Tasks", "Notes", "About")
    val routes = listOf(
        "ResourceScreen/$goalId/$goalName",
        "TaskScreen/$goalId/$goalName",
        "NoteScreen/$goalId/$goalName",
        "AboutGoalScreen/$goalId/$goalName"
    )

    // Track current route to update selected tab
    val navBackStackEntry = navController.currentBackStackEntry
    val currentRoute = navBackStackEntry?.destination?.route

    var selectedTabIndex by remember {
        mutableStateOf(
            routes.indexOfFirst { route -> currentRoute?.startsWith(route.substringBefore("/$goalId")) == true }
                .coerceAtLeast(0)
        )
    }

    Column {
        ChipTabs(
            tabs = tabs,
            selectedTabIndex = selectedTabIndex
        ) { newIndex ->
            selectedTabIndex = newIndex
            val route = routes[newIndex]
            if (currentRoute != route) {
                navController.navigate(route)
            }
        }
    }
}
