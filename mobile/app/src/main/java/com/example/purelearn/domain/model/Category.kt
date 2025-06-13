package com.example.purelearn.domain.model


data class CategoryResponse(
    val id: Int,
    val title: String,
    val color: String
)

data class Category(
    val id: Int,
    val title: String,
    val description:String,
    val color: String,
)
data class MessageResponse(
    val message: String
)
data class CategoryDetails(
    val id: Int,
    val title: String,
    val color: String,
    val description: String,
    val parentCategoryId: Int?,
    val learnerId: Int,
    val isDeleted: Boolean,
    val createdAt: String,
    val updatedAt: String
)
