package com.example.purelearn.domain.model

import java.time.LocalDate

data class Task(
    val taskId:Int,
    val title:String,
    val isComplete:Boolean,
    val kanbanStatus:Int,
    val priority:String,
    val startDate:Long,
    val dueDate: LocalDate = LocalDate.now(),
//    val timeSpent:Long,
//    val estimatedTime:Long,
//    val learnerID:Int,
//    val relatedToGoal:String
)
