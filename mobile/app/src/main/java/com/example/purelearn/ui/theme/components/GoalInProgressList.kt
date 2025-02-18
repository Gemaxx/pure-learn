package com.example.purelearn.ui.theme.components


import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.goals


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