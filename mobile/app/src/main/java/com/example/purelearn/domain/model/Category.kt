package com.example.purelearn.domain.model


data class CategoryResponse(
    val id: Int,
    val title: String,
    val color: String
)

data class Category(
    val id: Int,
    val title: String,
    val color: String,
)
