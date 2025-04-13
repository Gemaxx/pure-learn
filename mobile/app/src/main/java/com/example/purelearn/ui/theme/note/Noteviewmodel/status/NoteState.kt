package com.example.purelearn.ui.theme.note.Noteviewmodel.status

import com.example.purelearn.domain.model.NoteRequest
import com.example.purelearn.domain.model.NoteResponse


data class NoteState(
    val data: List<NoteResponse> = emptyList(),
    val error: String = "",
    val isLoading: Boolean = false
)