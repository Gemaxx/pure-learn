package com.example.purelearn.domain.model

data class ResourceResponse(
    val id: Int,
    val goalId: Int?,
    val title: String,
    val typeId: Int,
    val totalUnits: Int,
    val progress: Int,
    val progressPercentage: Double
)
data class Resource(
    val goalId: Int,
    val title: String,
    val typeId: Int,
    val totalUnits: Int,
    val progress: Int,
    val link :String
)