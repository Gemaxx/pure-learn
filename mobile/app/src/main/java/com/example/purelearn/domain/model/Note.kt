package com.example.purelearn.domain.model


data class Note(
    val id: Long,
    val goalId: Long,
    val title: String,
    val body: String,
    val createdAt: String?,
    val updatedAt: String?,
    val deletedAt: String?,
    val learnerId: Long,
    val isDeleted: Boolean
)

data class NoteResponse(
    val id: Long,
    val goalId: Int?,
    val title: String,
    val body: String
)
data class NoteRequest(
    val goalId: Int?,
    val title: String,
    val body: String
)