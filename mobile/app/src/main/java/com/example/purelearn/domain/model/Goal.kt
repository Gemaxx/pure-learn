package com.example.purelearn.domain.model

import java.time.LocalDate

data class GoalResponse(
    val id: Int,
    val categoryId: Int?,
    val title: String,
    val term: String,
    val status: String
)

data class Goal(
    val categoryId: Int,
    val title: String,
    val description: String,
    val motivation: String,
     val term : String,
    val status: String
)
