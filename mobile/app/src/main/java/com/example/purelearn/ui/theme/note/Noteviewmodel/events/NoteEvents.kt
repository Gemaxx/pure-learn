package com.example.purelearn.ui.theme.home.homeviewmodel.events

import com.example.purelearn.domain.model.NoteRequest
import com.example.purelearn.domain.model.NoteResponse

sealed class NoteEvents {


    data class AddNotesEvent(val data: NoteRequest, val goalId: Int) : NoteEvents()
    data class DeleteNotesEvent(val id: Int) : NoteEvents()
    data class UpdateNotesEvent(val id: Int, val note: NoteRequest) : NoteEvents()
    // object ShowGoal : GoalEvents()
    data class ShowNotes(
        val goalId: Int
    ) : NoteEvents()

}



sealed class NoteUiEvents {
    data class Success(val data: NoteRequest) :NoteUiEvents()
    data class Failure(val msg: String) : NoteUiEvents()
    object Loading : NoteUiEvents()

}