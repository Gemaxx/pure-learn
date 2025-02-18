package com.example.purelearn.ui.theme.components


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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowRight
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.Black
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
import com.example.purelearn.goals
import com.example.purelearn.ui.theme.Blue
import com.example.purelearn.ui.theme.Orange
import java.time.format.DateTimeFormatter


fun LazyListScope.GoalInProgressList(
    emptyListText:String,
    goals:List<Goal>,
    onDeleteIconClick: (Goal) -> Unit
)
{

    if(goals.isEmpty())
    {
        item{
            Column (
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ){

            }
        }

    }

    items(goals)
    {goal->

        GoalCard(
            goal =goal,
            onClick = {  },
            onDeleteIconClick = { }
        )

    }

}


@Preview(showSystemUi = true)
@Composable
fun GoalInProgressListPreview(modifier: Modifier = Modifier) {
    LazyColumn  {
        GoalInProgressList(
            emptyListText = "",
            goals = goals,
            onDeleteIconClick = {}
        )
    }
}