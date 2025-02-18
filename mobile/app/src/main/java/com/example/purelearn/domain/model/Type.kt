package com.example.purelearn.domain.model

data class Type(
    val deletedAt: String,
    val description: String,
    val icon: String,
    val id: Int,
    val learner: String,
    val learnerId: Int,
    val name: String,
    val tasks: List<String>
)