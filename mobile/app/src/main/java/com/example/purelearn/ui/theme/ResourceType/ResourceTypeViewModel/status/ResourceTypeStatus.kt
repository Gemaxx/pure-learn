package com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.status

import com.example.purelearn.domain.model.ResourceTypeResponse

//data class ResourceTypeState(
//    val data: List<ResourceTypeResponse> = emptyList(),
//    val error: String = "",
//    val isLoading: Boolean = false
//)

data class ResourceTypeState<T>(
    val data: T? = null,
    val error: String = "",
    val isLoading: Boolean = false
)
