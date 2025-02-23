//package com.example.purelearn.ui.theme.components
//
//
//import androidx.compose.foundation.layout.Column
//import androidx.compose.foundation.layout.fillMaxWidth
//import androidx.compose.foundation.lazy.LazyColumn
//import androidx.compose.foundation.lazy.LazyListScope
//import androidx.compose.foundation.lazy.items
//import androidx.compose.runtime.Composable
//import androidx.compose.ui.Alignment
//import androidx.compose.ui.Modifier
//import androidx.compose.ui.tooling.preview.Preview
//import androidx.navigation.NavController
//import com.example.purelearn.domain.model.Goal
//import com.example.purelearn.goals
//import com.example.purelearn.ui.theme.navigation.Routes
//import okhttp3.Route
//
//
//fun LazyListScope.GoalToDoList(
//   // navController: NavController,
//    emptyListText:String,
//    goals:List<Goal>,
//    onDeleteIconClick: (Goal) -> Unit
//)
//{
//
//    if(goals.isEmpty())
//    {
//        item{
//            Column (
//                modifier = Modifier.fillMaxWidth(),
//                horizontalAlignment = Alignment.CenterHorizontally
//            ){
//
//            }
//        }
//
//    }
//
//    items(goals)
//    {goal->
//
//        GoalCard(
//            title = "Achieve some thing",
//            progress = 0.50f,
//            status = "In-Progress"
//        )
//
//    }
//
//}
//
////@Preview(showSystemUi = true)
////@Composable
////fun GoalToDoListPreview(modifier: Modifier = Modifier) {
////    LazyColumn  {
////        GoalToDoList(
////            emptyListText = "",
////            goals = goals,
////            onDeleteIconClick = {}
////        )
////    }
////}