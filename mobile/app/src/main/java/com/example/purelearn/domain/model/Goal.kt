package com.example.purelearn.domain.model

import java.time.LocalDate

data class Goal(
    val goalId:Int,
    val title:String,
    val description:String,
    val motivation:String,
    val status :String,
    val isComplete:Boolean,
    val kanbanStatus:String,
//    val startDate:String,
  val dueDate: LocalDate = LocalDate.now(),
//    val timeSpent:String,
//    val tasks:List<Task>,
//    val notes:List<Note>,
//    val resources:List<Resource>
)
