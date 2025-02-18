package com.example.purelearn.ui.theme.navigation

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.purelearn.ui.theme.Goal.AddGoalScreen
import com.example.purelearn.ui.theme.Task.AddTaskScreen
import com.example.purelearn.ui.theme.calendar.CalendarScreen
import com.example.purelearn.ui.theme.chatpot.ChatBotScreen
import com.example.purelearn.ui.theme.home.HomeScreen
import com.example.purelearn.ui.theme.timer.TimerScreen

@Composable
fun MyAppNavigation(modifier: Modifier = Modifier) {

    val navController= rememberNavController()
    //val dashboardViewModel: CategoryViewModel = androidx.lifecycle.viewmodel.compose.viewModel()

    NavHost(navController=navController, startDestination = Routes.HomeScreen, builder = {

//        composable(Routes.MainScreen,)
//        {
//            MainScreen(navController)
//        }
            composable(Routes.HomeScreen,)
            {
                HomeScreen(
                   // viewModel = hiltViewModel(),
                    //navController = navController
                )
            }
//        composable(Routes.GoalScreen,)
//        {
//           // AddGoalScreen(navController)
//        }
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