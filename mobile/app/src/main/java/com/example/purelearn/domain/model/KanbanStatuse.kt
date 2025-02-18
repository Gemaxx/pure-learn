package com.example.purelearn.domain.model

data class KanbanStatuse(
    val deletedAt: String,
    val id: Int,
    val learner: String,
    val learnerId: Int,
    val maxTasks: Int,
    val name: String,
    val tasks: List<String>
)