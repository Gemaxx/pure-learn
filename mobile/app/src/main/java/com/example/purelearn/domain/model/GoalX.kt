package com.example.purelearn.domain.model

data class GoalX(
    val category: String,
    val categoryId: Int,
    val completionDate: String,
    val createdAt: String,
    val deletedAt: String,
    val description: String,
    val id: Int,
    val learner: LearnerX,
    val learnerId: Int,
    val learningResources: List<LearningResourceXXX>,
    val motivation: String,
    val notes: List<NoteXXXX>,
    val status: String,
    val subgoals: List<SubgoalXXXXXXXXX>,
    val tasks: List<TaskXXXXXXXXXXXX>,
    val term: String,
    val title: String,
    val updatedAt: String
)