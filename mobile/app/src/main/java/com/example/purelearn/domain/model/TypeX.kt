package com.example.purelearn.domain.model

data class TypeX(
    val deletedAt: String,
    val id: Int,
    val learner: String,
    val learnerId: Int,
    val learningResources: List<String>,
    val name: String,
    val unitType: String
)