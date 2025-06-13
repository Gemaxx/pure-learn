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
data class ResourceDetails(
    val id: Int,
    val goalId: Int,
    val title: String,
    val status: String?,
    val typeId: Int,
    val typeName: String,
    val typeUnitType: String,
    val totalUnits: Int,
    val progress: Int,
    val progressPercentage: Int,
    val link: String,
    val createdAt: String,
    val updatedAt: String,
    val deletedAt: String?,
    val isDeleted: Boolean
)