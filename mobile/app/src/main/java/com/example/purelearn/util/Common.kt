package com.example.purelearn.util

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.Green
import androidx.compose.ui.graphics.Color.Companion.Red


enum class Priority(val title:String, val color: Color, val value:Int ) {
    UrgentAndImportant(title = "UrgentAndImportant",color= Red,value=0),
    NotUrgentButImportant(title="NotUrgentButImportant",color= Red,value=1),
    UrgentButImportant(title="NotUrgentButImportant",color= Red,value=1),
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