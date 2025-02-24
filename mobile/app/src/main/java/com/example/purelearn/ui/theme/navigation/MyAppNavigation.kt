package com.example.purelearn.ui.theme.navigation

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.purelearn.ui.theme.Goal.GoalScreen
import com.example.purelearn.ui.theme.Resource.ResourceScreen
import com.example.purelearn.ui.theme.calendar.CalendarScreen
import com.example.purelearn.ui.theme.chatpot.ChatBotScreen
import com.example.purelearn.ui.theme.home.HomeScreen
import com.example.purelearn.ui.theme.timer.TimerScreen

@Composable
fun MyAppNavigation(navController: NavHostController) {


    NavHost(navController=navController, startDestination = Routes.HomeScreen, builder = {

        composable(Routes.HomeScreen) {
            HomeScreen(navController)
        }
        composable("GoalScreen/{categoryId}") { backStackEntry ->
            val categoryId = backStackEntry.arguments?.getString("categoryId")?.toIntOrNull()
            GoalScreen(
                navController = navController,
                categoryId = categoryId,
                viewModel = hiltViewModel()
            )
        }

        composable("ResourceScreen/{goalId}") { backStackEntry ->
            val goalId = backStackEntry.arguments?.getString("goalId")?.toIntOrNull()
            goalId?.let {
                ResourceScreen(goalId = it)
            } ?: Log.e("NAVIGATION", "goalId is null")
        }
        composable(Routes.CalendarScreen,)
        {
            CalendarScreen(navController)
        }
        composable(Routes.ChatBotScreen,)
        {
            ChatBotScreen(navController)
        }
        composable(Routes.TimerScreen,)
        {
            TimerScreen(navController)
        }
        })
}