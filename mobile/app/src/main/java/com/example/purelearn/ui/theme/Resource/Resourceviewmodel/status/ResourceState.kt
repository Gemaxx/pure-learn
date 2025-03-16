package com.example.purelearn.ui.theme.Resource.Resourceviewmodel.status

import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.ResourceResponse

data class ResourceState(
    val data: List<ResourceResponse> = emptyList(),
    val error: String = "",
    val isLoading: Boolean = false
)