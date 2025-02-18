package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.background
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
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.layout.wrapContentWidth
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults

import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.Black
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.purelearn.R
import com.example.purelearn.domain.model.Task
import com.example.purelearn.tasks
import com.example.purelearn.ui.theme.Blue
import java.time.format.DateTimeFormatter


fun LazyListScope.TaskInProgressList(
    emptyListText:String,
    tasks:List<Task>,
    onDeleteIconClick: (Task) -> Unit
)
{

    if(tasks.isEmpty())
    {
        item{
            Column (
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ){

            }
        }

    }

    items(tasks)
    {task->

        InProgressTaskCard(
            task =task ,
            onClick = {  },
            onDeleteIconClick = { }
        )

    }

}

@Composable
fun InProgressTaskCard(
    task: Task,
    onClick: () -> Unit,
    containerColor: Color = Blue,
    primaryColor: Color = Black,
    secondaryColor: Color = Color.LightGray,
    backgroundColor: Color = White,
    onDeleteIconClick:()->Unit
) {
    Card(
        modifier = Modifier
            .padding(bottom = 8.dp)
            .fillMaxWidth()
            .height(130.dp)
            .padding(horizontal = 25.dp)
            .wrapContentHeight()
            .clickable {
                onClick()
            },
        colors = CardDefaults.cardColors(
            containerColor = containerColor
        ),
        shape = RoundedCornerShape(15.dp)
    ) {


        Column(
            horizontalAlignment = Alignment.Start,
            verticalArrangement = Arrangement.SpaceEvenly,
            modifier = Modifier
                .fillMaxSize()
                .padding(10.dp)
        ) {

            Row{
                Box(
                    modifier = Modifier
                        .width(250.dp)
                        .height(33.dp)
                        .background(backgroundColor, shape = RoundedCornerShape(18.dp))
                        .padding(5.dp)
                        .wrapContentWidth()
                    ,
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = task.priority,
                        fontSize = 12.sp,
                        color =  primaryColor,
                        fontWeight = FontWeight.Medium
                    )
                }


                Surface(
                    shape = CircleShape,
                    modifier = Modifier
                        .padding(start = 70.dp)

                        .size(32.dp),
                    color = Color.Transparent,
                    // border = BorderStroke(width = 1.dp, color = Color.Black),

                ) {
                    Icon(
                        painter = painterResource(id = R.drawable.delete),
                        contentDescription = "Delete icon"
                    )
                }


            }

            Spacer(modifier = Modifier.height(10.dp))

            Row {
                Text(
                    text = task.title,
                    // fontSize = 20.sp,
                    color = primaryColor,
                    fontFamily = FontFamily.Monospace,
                    fontStyle = FontStyle.Normal,
                    modifier = Modifier.padding(start = 5.dp)
                        .weight(1f),
                    // fontWeight = FontWeight.Medium,
                    maxLines = 2
                )

                CheckBox(
                    modifier = Modifier.weight(1f),
                    isComplete =false
                ) {}
            }

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(7.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 2.dp)
                    .wrapContentHeight()
            ) {

                Icon(
                    painter = painterResource(id = R.drawable.calendar_icon),
                    contentDescription = null,
                    tint = primaryColor,
                    modifier = Modifier.size(16.dp)
//                        .padding(bottom = 10.dp)
                )

                Text(
                    text = DateTimeFormatter.ofPattern("dd MMM").format(task.dueDate),
                    fontSize = 13.sp,
                    color =  primaryColor,
                    fontWeight = FontWeight.Medium,
                    //  modifier = Modifier.padding(bottom = 10.dp)
                )



            }


        }

    }
}

@Preview(showSystemUi = true)
@Composable
fun TaskInProgressPreview(modifier: Modifier = Modifier) {
    LazyColumn  {
        TaskInProgressList(
            emptyListText = "",
            tasks = tasks,
            onDeleteIconClick = {}
        )
    }
}