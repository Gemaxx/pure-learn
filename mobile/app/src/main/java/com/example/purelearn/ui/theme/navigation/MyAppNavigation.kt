package com.example.purelearn.ui.theme.navigation

import androidx.compose.runtime.Composable
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.example.purelearn.ui.theme.Goal.GoalScreen
import com.example.purelearn.ui.theme.Resource.ResourceScreen
import com.example.purelearn.ui.theme.calendar.CalendarScreen
import com.example.purelearn.ui.theme.chatpot.ChatBotScreen
import com.example.purelearn.ui.theme.home.HomeScreen
import com.example.purelearn.ui.theme.note.AddNoteScreen
import com.example.purelearn.ui.theme.note.NoteScreen
import com.example.purelearn.ui.theme.note.UpdateNoteScreen
import com.example.purelearn.ui.theme.screenTime.ScreenTimeScreen
import com.example.purelearn.ui.theme.timer.SettingsScreen
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
            ResourceScreen(
                navController = navController,
                goalId = goalId,
                viewModel = hiltViewModel(),
            )
        }
        composable("NoteScreen/{goalId}") { backStackEntry ->
            val goalId = backStackEntry.arguments?.getString("goalId")?.toIntOrNull()
            NoteScreen(
                navController = navController,
                goalId = goalId,
                viewModel = hiltViewModel(),
            )
        }

        composable("AddNoteScreen/{goalId}") { backStackEntry ->
            val goalId = backStackEntry.arguments?.getString("goalId")?.toIntOrNull()
            AddNoteScreen(
                navController = navController,
                goalId = goalId,
                viewModel = hiltViewModel(),
            )
        }
        composable("UpdateNoteScreen/{goalId}/{noteId}/{title}/{body}") { backStackEntry ->
            val goalId = backStackEntry.arguments?.getString("goalId")?.toIntOrNull()
            val noteId = backStackEntry.arguments?.getString("noteId")?.toIntOrNull()
            val title = backStackEntry.arguments?.getString("title")?: ""
            val body = backStackEntry.arguments?.getString("body")?: ""
           UpdateNoteScreen(
               navController = navController,
               goalId = goalId,
               noteId=noteId,
               viewModel = hiltViewModel(),
               initialTitle = title,
               initialBody = body
           )
        }
        composable(Routes.CalendarScreen,)
        {
            CalendarScreen(navController)
        }

        composable(Routes.ScreenTimeScreen,)
        {
            ScreenTimeScreen(
                navController
            )
        }

        
        
        composable(Routes.ChatBotScreen,)
        {
            ChatBotScreen(navController)
        }

        composable(
            "TimerScreen/{studySession}/{shortBreak}/{pomodoros}/{longBreak}",
            arguments = listOf(
                navArgument("studySession") { type = NavType.IntType },
                navArgument("shortBreak") { type = NavType.IntType },
                navArgument("pomodoros") { type = NavType.IntType },
                navArgument("longBreak") { type = NavType.IntType }
            )
        ) { backStackEntry ->
            val studySession = backStackEntry.arguments?.getInt("studySession") ?: 25
            val shortBreak = backStackEntry.arguments?.getInt("shortBreak") ?: 5
            val pomodoros = backStackEntry.arguments?.getInt("pomodoros") ?: 6
            val longBreak = backStackEntry.arguments?.getInt("longBreak") ?: 15

            TimerScreen(
                navController = navController,
                studySession = studySession,
                shortBreak = shortBreak,
                pomodoros = pomodoros,
                longBreak = longBreak
            )
        }

        composable(
            "SettingsScreen/{studySession}/{shortBreak}/{pomodoros}/{longBreak}",
            arguments = listOf(
                navArgument("studySession") { type = NavType.IntType },
                navArgument("shortBreak") { type = NavType.IntType },
                navArgument("pomodoros") { type = NavType.IntType },
                navArgument("longBreak") { type = NavType.IntType }
            )
        ) { backStackEntry ->
            val studySession = backStackEntry.arguments?.getInt("studySession") ?: 25
            val shortBreak = backStackEntry.arguments?.getInt("shortBreak") ?: 5
            val pomodoros = backStackEntry.arguments?.getInt("pomodoros") ?: 6
            val longBreak = backStackEntry.arguments?.getInt("longBreak") ?: 15

            SettingsScreen(
                navController = navController,
                studySession = studySession,
                shortBreak = shortBreak,
                pomodoros = pomodoros,
                longBreak = longBreak,
                viewModel = hiltViewModel()
            )
        }

    })
}