package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowRight
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.Black
import androidx.compose.ui.graphics.Color.Companion.Blue
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.purelearn.R
import com.example.purelearn.domain.model.Goal

import java.time.format.DateTimeFormatter

@Preview(showSystemUi = true)
@Composable
fun GoalCard(
    goal: Goal,
    onClick: () -> Unit,
    containerColor: Color = Blue,
    primaryColor: Color = Black,
    secondaryColor: Color = Color.LightGray,
    backgroundColor: Color = White,
    onDeleteIconClick:()->Unit
) {
    val isDropDownExpanded = remember {
        mutableStateOf(false)
    }

    val itemPosition = remember {
        mutableStateOf(0)
    }

    val usernames = listOf("ToDo", "In-Progress", "Done")


    ElevatedCard(
        modifier = Modifier
            .padding(bottom = 8.dp)
            .fillMaxWidth()
            .height(100.dp)
          //  .padding(horizontal = 25.dp)
            .clickable {
                onClick()
            },
        colors = CardDefaults.cardColors(
            containerColor = containerColor
        ),
        shape = RoundedCornerShape(150.dp)
    ) {

        Row(
            modifier = Modifier,
            //verticalAlignment = Alignment.CenterVertically
        ) {
            GoalProgress(
                modifier = Modifier.padding(top=10.dp, bottom = 10.dp,start = 20.dp),
                totalTasks = 10,
                doneTasks = 5,
                progress = 0.5f
            )
            Spacer(modifier = Modifier.width(10.dp))
            Column (
                verticalArrangement = Arrangement.spacedBy(16.dp),
             //   modifier = Modifier.padding(start = 6.dp)
            ){
                Text(
                    modifier = Modifier.padding(10.dp),
                    text = "Achieve Some thing",
                    fontFamily = FontFamily.Monospace,
                    fontStyle = FontStyle.Normal,
                    fontWeight = FontWeight.Bold
                )
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(7.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 2.dp)
                ) {

                    Icon(
                        painter = painterResource(id = R.drawable.calendar_icon),
                        contentDescription = null,
                        tint = primaryColor,
                        modifier = Modifier.size(16.dp)
//                        .padding(bottom = 10.dp)
                    )



                    Text(
                        text = DateTimeFormatter.ofPattern("dd MMM").format(goal.dueDate),
                        fontSize = 13.sp,
                        color = primaryColor,
                        fontWeight = FontWeight.Medium,
                        //  modifier = Modifier.padding(bottom = 10.dp)
                    )


                    StatusArow()
                }



            }

        }

    }


}

@Composable
private fun GoalProgress(
    modifier: Modifier,
    totalTasks:Int,
    doneTasks:Int,
    progress:Float
) {

    val percentageProgress= remember (progress){
        (progress*100).toInt().coerceIn(0,100)
    }
    Row (
        modifier=modifier,
        horizontalArrangement = Arrangement.SpaceAround,
        verticalAlignment = Alignment.CenterVertically
    ){


        Box(modifier = Modifier.size(75.dp),
            contentAlignment = Alignment.Center)
        {
            CircularProgressIndicator(
                modifier = Modifier.fillMaxSize(),
                progress = 50f,
                strokeWidth = 4.dp,
                strokeCap = StrokeCap.Round,
                color = MaterialTheme.colorScheme.surfaceVariant

            )
            CircularProgressIndicator(
                modifier = Modifier.fillMaxSize(),
                progress = progress,
                strokeWidth = 4.dp,
                strokeCap = StrokeCap.Round,
                color = Color.Red

            )
            Text(text = "$percentageProgress%")
        }
    }
}
//@Preview(showSystemUi = true)
//@Composable
//fun GoalCardPreview(modifier: Modifier = Modifier) {
//    LazyColumn  {
//        GoalCard(
//            goal = goals,
//            onClick = TODO(),
//            containerColor = TODO(),
//            primaryColor = TODO(),
//            secondaryColor = TODO(),
//            backgroundColor = TODO(),
//            onDeleteIconClick = TODO()
//        )
//    }
//}