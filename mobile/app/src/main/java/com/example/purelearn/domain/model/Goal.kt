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

data class GoalDetails(
    val id: Int,
    val categoryId: Int,
    val title: String,
    val term: String,
    val status: String,
    val description: String?,
    val motivation: String?,
    val createdAt: String,
    val updatedAt: String,
    val completionDate: String?,
    val tasks: List<TaskDto>,
    val learningResources: List<LearningResourceDto>,
    val notes: List<NoteDto>
)

data class TaskDto(
    val id: Long,
    val goalId: Long,
    val title: String,
    val isCompleted: Boolean,
    val typeId: Long,
    val kanbanStatusId: Long,
    val eisenhowerStatus: String?,
    val createdAt: String,
    val updatedAt: String,
    val deletedAt: String?,
    val isDeleted: Boolean
)

data class LearningResourceDto(
    val id: Long,
    val goalId: Long,
    val title: String,
    val status: String,
    val typeId: Long,
    val totalUnits: Int,
    val progress: Int,
    val progressPercentage: Int,
    val link: String?
)

data class NoteDto(
    val id: Long,
    val goalId: Long,
    val title: String,
    val body: String
)
