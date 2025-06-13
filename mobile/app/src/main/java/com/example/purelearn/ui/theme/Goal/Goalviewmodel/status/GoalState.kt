package com.example.purelearn.ui.theme.Goal.Goalviewmodel.status

import com.example.purelearn.domain.model.GoalResponse

//data class GoalState(
//    val data: List<GoalResponse> = emptyList(),
//    val error: String = "",
//    val isLoading: Boolean = false
//)


data class GoalState<T>(
    val data: T? = null,
    val error: String = "",
    val isLoading: Boolean = false
)
