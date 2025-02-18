package com.example.purelearn.ui.theme.home.homeviewmodel.status

import com.example.purelearn.domain.model.CategoryResponse

data class CategoryState(
    val data: List<CategoryResponse> = emptyList(),
    val error: String = "",
    val isLoading: Boolean = false
)