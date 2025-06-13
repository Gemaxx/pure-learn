package com.example.purelearn.domain.model

data class KanbanStatusResponse(
    val id: Int,
    val name: String,
    val maxTasks: Int?,
    val createdAt: String?,
    val updatedAt: String?
)
data class KanbanStatusRequest(
    val name: String,
    val maxTasks: Int?
)
