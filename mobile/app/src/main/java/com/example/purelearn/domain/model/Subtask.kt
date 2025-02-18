package com.example.purelearn.domain.model

data class Subtask(
    val createdAt: String,
    val deletedAt: String,
    val id: Int,
    val status: String,
    val task: String,
    val taskId: Int,
    val title: String,
    val updatedAt: String
)