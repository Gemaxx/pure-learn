package com.example.purelearn

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import com.example.anew.ui.theme.PureLearnTheme
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.Task
import com.example.purelearn.ui.theme.Goal.AddGoalScreen
import com.example.purelearn.ui.theme.home.HomeScreen
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
              PureLearnTheme {
                 // AddGoalScreen()
               HomeScreen()
          //  MyAppNavigation()
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
        goalId = 1,
        title = "Achieve some thing",
        description = "",
        motivation = "",
        status = "",
        isComplete = false,
        kanbanStatus = "",
   //     startDate = "",
//        dueDate = ,
//        timeSpent = TODO(),
//        tasks = TODO(),
//        notes = TODO(),
//        resources = TODO()
    ),
    Goal(
        goalId = 1,
        title = "Achieve some thing",
        description = "",
        motivation = "",
        status = "",
        isComplete = false,
        kanbanStatus = "",
 //       startDate = "",
//        dueDate = ,
//        timeSpent = TODO(),
//        tasks = TODO(),
//        notes = TODO(),
//        resources = TODO()
    )
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