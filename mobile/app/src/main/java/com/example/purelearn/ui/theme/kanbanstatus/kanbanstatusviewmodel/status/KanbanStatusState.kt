package com.example.purelearn.ui.theme.kanbanstatus.kanbanstatusviewmodel.status

import com.example.purelearn.domain.model.KanbanStatusResponse
import com.example.purelearn.domain.model.NoteResponse


data class KanbanStatusState(
    val data: List<KanbanStatusResponse> = emptyList(),
    val error: String = "",
    val isLoading: Boolean = false
)