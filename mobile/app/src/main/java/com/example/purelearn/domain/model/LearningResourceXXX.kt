package com.example.purelearn.domain.model

data class LearningResourceXXX(
    val category: String,
    val categoryId: Int,
    val createdAt: String,
    val deletedAt: String,
    val goal: String,
    val goalId: Int,
    val id: Int,
    val learner: String,
    val learnerId: Int,
    val link: String,
    val progress: Int,
    val subgoal: SubgoalXXXXXXXXX,
    val subgoalId: Int,
    val tasks: List<TaskXXXXXXXXXXXX>,
    val title: String,
    val totalUnits: Int,
    val type: TypeX,
    val typeId: Int,
    val updatedAt: String
)