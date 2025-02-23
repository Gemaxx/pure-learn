package com.example.purelearn.ui.theme.navigation

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.purelearn.ui.theme.Goal.GoalScreen
import com.example.purelearn.ui.theme.Task.AddTaskScreen
import com.example.purelearn.ui.theme.calendar.CalendarScreen
import com.example.purelearn.ui.theme.chatpot.ChatBotScreen
import com.example.purelearn.ui.theme.home.HomeScreen
import com.example.purelearn.ui.theme.navigation.Routes.GoalScreen
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

        composable(Routes.AddTaskScreen,)
        {
            AddTaskScreen(navController)
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