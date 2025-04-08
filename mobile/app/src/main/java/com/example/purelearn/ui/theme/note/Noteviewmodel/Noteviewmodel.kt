package com.example.purelearn.ui.theme.home.noteviewmodel


import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.purelearn.repository.NoteRepository
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceEvents
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceUiEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.NoteEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.NoteUiEvents
import com.example.purelearn.ui.theme.note.Noteviewmodel.status.NoteState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.onStart
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class NoteViewModel @Inject constructor(
    private val repository: NoteRepository
):ViewModel (){
    private val _noteResponseEvent= mutableStateOf(NoteState())
    var noteResponseEvent:State<NoteState> = _noteResponseEvent
        private set


    private val _addNoteEvent: MutableSharedFlow<NoteUiEvents> = MutableSharedFlow()
    var addNoteEvent = _addNoteEvent.asSharedFlow()
        private set

    private val _deleteNoteEvent: MutableSharedFlow<NoteUiEvents> = MutableSharedFlow()
    var deleteNoteEvent = _deleteNoteEvent.asSharedFlow()
        private set


    private val _updateNoteEvent: MutableSharedFlow<NoteUiEvents> = MutableSharedFlow()
    var updateNoteEvent = _updateNoteEvent.asSharedFlow()
        private set



    fun onEvent(events: NoteEvents){
        when (events){

            is NoteEvents.AddNotesEvent->{
                viewModelScope.launch {
                    repository.addNote(events.data)
                        .onStart {
                            _addNoteEvent.emit(
                                NoteUiEvents.Loading
                            )
                        }.catch {
                            _addNoteEvent.emit(
                                NoteUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _addNoteEvent.emit(
                                NoteUiEvents.Success(it)
                            )
                            onEvent(NoteEvents.ShowNotes(events.goalId))
                        }
                }
            }

           is NoteEvents.ShowNotes -> {
                viewModelScope.launch {
                    repository.getNote(events.goalId)
                        .onStart {
                            _noteResponseEvent.value = NoteState(
                                isLoading = true
                            )
                        }.catch {
                            _noteResponseEvent.value = NoteState(
                                error = it.message ?: "Something went wrong"
                            )
                        }.collect {
                            _noteResponseEvent.value = NoteState(
                                data = it
                            )
                        }
                }
            }



//            is NoteEvents.DeleteNotesEvent->{
//                viewModelScope.launch {
//                    repository.deleteNote(events.id)
//                        .onStart {
//                            _deleteNoteEvent.emit(
//                                NoteUiEvents.Loading
//                            )
//                        }.catch {
//                            _deleteNoteEvent.emit(
//                                NoteUiEvents.Failure(it.message?:"Something went wrong")
//                            )
//                        }.collect{
//                            _deleteNoteEvent.emit(
//                                NoteUiEvents.Success(it)
//                            )
//                        }
//                }
//            }

//            is NoteEvents.UpdateNotesEvent->{
//                viewModelScope.launch {
//                    repository.updateNote(events.id,events.note)
//                        .onStart {
//                            _updateNoteEvent.emit(
//                                NoteUiEvents.Loading
//                            )
//                        }.catch {
//                            _updateNoteEvent.emit(
//                                NoteUiEvents.Failure(it.message?:"Something went wrong")
//                            )
//                        }.collect{
//                            _updateNoteEvent.emit(
//                                NoteUiEvents.Success(it)
//                            )
//                        }
//                }
//            }

            is NoteEvents.UpdateNotesEvent->{
                viewModelScope.launch {
                    repository.updateNote(events.id,events.note)
                        .onStart {
                            _updateNoteEvent.emit(
                                NoteUiEvents.Loading
                            )
                        }.catch {
                            _updateNoteEvent.emit(
                                NoteUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _updateNoteEvent.emit(
                                NoteUiEvents.Success(it)
                            )
                        }
                }
            }

            else -> {}
        }
    }
}