package com.example.purelearn

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.navigation.compose.rememberNavController
import com.example.anew.ui.theme.PureLearnTheme
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.Task
import com.example.purelearn.ui.theme.Goal.GoalScreen
import com.example.purelearn.ui.theme.home.HomeScreen
import com.example.purelearn.ui.theme.navigation.MyAppNavigation
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val navController = rememberNavController()
            PureLearnTheme {
           //   GoalScreen()
            //  HomeScreen()
              MyAppNavigation(
                  navController = navController
              )
            }
        }
    }
}

val tasks= listOf(
    Task(
        taskId = 1,
        title = "DO MY HOME WORK",
        kanbanStatus = 1,
        priority = "Important and Urgent",
        startDate = 10,
        isComplete = true,
        //dueDate = TODO(),
//        dueDate = ,
//        timeSpent = TODO(),
//        estimatedTime = TODO(),
        //learnerID = 1
        //  relatedToGoal =
    ),
    Task(
        taskId = 1,
        title = "DO MY HOME WORK",
        kanbanStatus = 1,
        priority = "Not Important and Not Urgent",
        startDate = 10,
        isComplete = false,
       // dueDate = TODO(),
//        dueDate = ,
//        timeSpent = TODO(),
//        estimatedTime = TODO(),
        //learnerID = 1
        //  relatedToGoal =
    ),

)
val goals= listOf(
    Goal(
        categoryId = 1,
        title = "achieve some thing",
        description = "",
        motivation = "",
        term = "",
        status = ""
    ),
    Goal(
        categoryId = 1,
        title = "achieve some thing",
        description = "",
        motivation = "",
        term = "",
        status = ""
    ),
    Goal(
        categoryId = 1,
        title = "achieve some thing",
        description = "",
        motivation = "",
        term = "",
        status = ""
    ),
)

//val categories= listOf(
//    Category(
//    categoryId = 1,
//    title = "Category1",
//    colors =CategoryCardColors[0],
//    description = "",
//    goals = goals
//),
//    Category(
//        categoryId = 1,
//        title = "Category1",
//        colors =CategoryCardColors[0],
//        description = "",
//        goals = goals
//    ),
//    Category(
//        categoryId = 1,
//        title = "Category1",
//        colors =CategoryCardColors[0],
//        description = "",
//        goals = goals
//    ),
//    Category(
//        categoryId = 1,
//        title = "Category1",
//        colors =CategoryCardColors[0],
//        description = "",
//        goals = goals
//    ),
//    Category(
//        categoryId = 1,
//        title = "Category1",
//        colors =CategoryCardColors[0],
//        description = "",
//        goals = goals
//    ),
//    Category(
//        categoryId = 1,
//        title = "Category1",
//        colors =CategoryCardColors[0],
//        description = "",
//        goals = goals
//    ),
//    Category(
//        categoryId = 1,
//        title = "Category1",
//        colors =CategoryCardColors[0],
//        description = "",
//        goals = goals
//    ),
//    Category(
//        categoryId = 1,
//        title = "Category1",
//        colors =CategoryCardColors[0],
//        description = "",
//        goals = goals
//    ),
//    Category(
//        categoryId = 1,
//        title = "Category1",
//        colors =CategoryCardColors[0],
//        description = "",
//        goals = goals
//    ),
//    Category(
//        categoryId = 1,
//        title = "Category1",
//        colors =CategoryCardColors[0],
//        description = "",
//        goals = goals
//    ),
//)