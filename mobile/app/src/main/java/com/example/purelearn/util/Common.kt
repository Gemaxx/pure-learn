package com.example.purelearn.util

import androidx.compose.ui.graphics.Color
import com.example.purelearn.ui.theme.Green
import com.example.purelearn.ui.theme.Orange
import com.example.purelearn.ui.theme.Red
import com.example.purelearn.util.Priority.NotUrgentButImportant


enum class Priority(val title:String, val color: Color, val value:Int ) {
    UrgentAndImportant(title = "UrgentAndImportant",color= Red,value=0),
    NotUrgentButImportant(title="NotUrgentButImportant",color= Orange,value=1),
    UrgentButImportant(title="NotUrgentButImportant",color= Orange,value=1),
    NotUrgentAndNotImportant(title="NotUrgentAndNotImportant",color=Green,value=2);

    companion object{
        fun fromInt(value:Int)= values().firstOrNull { it.value==value }?:NotUrgentButImportant
    }
}

enum class KanbanStatus(val title:String, val value:Int )
{
    TODO(title = "ToDo", value = 0),
    InProgress(title = "In-Progress", value = 1),
    Done(title = "Done", value = 2);

    companion object{
        fun fromInt(value:Int)= KanbanStatus.values()
            .firstOrNull { it.value==value }?: TODO
    }
}