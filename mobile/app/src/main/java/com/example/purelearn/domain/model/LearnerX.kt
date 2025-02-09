package com.example.purelearn.domain.model

data class LearnerX(
    val bio: String,
    val categories: List<String>,
    val createdAt: String,
    val deletedAt: String,
    val email: String,
    val goals: List<String>,
    val id: Int,
    val kanbanStatuses: List<KanbanStatuse>,
    val lastLogin: String,
    val learningResourceTypes: List<LearningResourceType>,
    val learningResources: List<LearningResourceXXX>,
    val name: String,
    val notes: List<NoteXXXX>,
    val passwordHash: String,
    val profilePicture: String,
    val taskTypes: List<TaskType>,
    val tasks: List<TaskXXXXXXXXXXXX>,
    val updatedAt: String
)