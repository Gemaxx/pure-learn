package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowRight
import androidx.compose.material3.AssistChip
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
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
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.GoalResponse
import com.example.purelearn.goals

import java.time.format.DateTimeFormatter

@Preview(showSystemUi = true)
@Composable
fun GoalCard(
    goal: GoalResponse,
    onClick:()->Unit,
    onUpdateGoal:()->Unit
) {
    val isDropDownExpanded = remember {
        mutableStateOf(false)
    }

    val itemPosition = remember {
        mutableStateOf(0)
    }

    val usernames = listOf("ToDo", "In-Progress", "Done")

    Card(
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        shape = RoundedCornerShape(16.dp),
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp)
            .clickable { onClick() }
    )  {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(8.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column(modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.Top,
                horizontalAlignment = Alignment.Start
                ) {
                Text(
                    text = goal.title,
                    style = MaterialTheme.typography.headlineSmall,
                    color = MaterialTheme.colorScheme.background

                )
                Spacer(modifier = Modifier.height(8.dp))
                Box(
                    modifier = Modifier.fillMaxWidth(),
                    contentAlignment = Alignment.Center
                ) {
                    Button(
                    onClick = {onUpdateGoal()},
                    colors = ButtonDefaults.buttonColors(containerColor = getStatusColor(goal.status)),
                        shape = RoundedCornerShape(15.dp),
                    modifier = Modifier
                        .fillMaxWidth(0.5f)
                        .height(40.dp)
                        .padding(vertical = 4.dp),
                ) {
                    Text(text = goal.status, color = Black, fontSize = 12.sp)
                }
                }
            }

            GoalProgress(
                progress = 0.5f,
                modifier = Modifier
            )
        }
    }



}

@Composable
private fun GoalProgress(
    modifier: Modifier,
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


        Box(modifier =Modifier.size(75.dp),
            contentAlignment = Alignment.Center)
        {
            CircularProgressIndicator(
                modifier = Modifier.size(50.dp),
                progress = 1f,
                strokeWidth = 4.dp,
                strokeCap = StrokeCap.Round,
                color = MaterialTheme.colorScheme.surfaceVariant


            )
            CircularProgressIndicator(
                modifier = Modifier.size(50.dp),
                progress = progress,
                strokeWidth = 4.dp,
                strokeCap = StrokeCap.Round,
                )
            Text(text = "$percentageProgress%")
        }
    }
}


@Composable
fun getStatusColor(status: String): Color {
    return when (status) {
        "Not-Started" -> Color(0xFFD3D3D3)
        "In-Progress" ->Color(0xFF007BFF)
        "Done" -> Color(0xFF28A745)
        "Canceled" -> Color(0xFFDC3545)
        "On-Hold" ->  Color(0xFFFFA500)
        else -> Color.LightGray
    }
}


@Preview(showSystemUi = true)
@Composable
fun GoalCardPreview(modifier: Modifier = Modifier) {
//    GoalCard(
//        title = "Achieve something",
//        progress = 0.50f,
//        status = "Done"
//    )
}
