package com.example.purelearn.ui.theme.kanbanstatus.kanbanstatusviewmodel

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.purelearn.repository.KanbanStatusRepository
import com.example.purelearn.ui.theme.kanbanstatus.kanbanstatusviewmodel.events.KanbanStatusEvents
import com.example.purelearn.ui.theme.kanbanstatus.kanbanstatusviewmodel.events.KanbanStatusUiEvents
import com.example.purelearn.ui.theme.kanbanstatus.kanbanstatusviewmodel.status.KanbanStatusState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.onStart
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class KanbanStatusViewModel @Inject constructor(
    private val repository: KanbanStatusRepository
): ViewModel(){
    private val _kanbanStatusResponseEvent= mutableStateOf(KanbanStatusState())
    var kanbanStatusResponseEvent: State<KanbanStatusState> = _kanbanStatusResponseEvent
        private set


    private val _addKanbanStatusEvent: MutableSharedFlow<KanbanStatusUiEvents> = MutableSharedFlow()
    var addKanbanStatusEvent = _addKanbanStatusEvent.asSharedFlow()
        private set

//    private val _deleteKanbanStatusEvent: MutableSharedFlow<KanbanStatusUiEvents> = MutableSharedFlow()
//    var deleteKanbanStatusEvent = _deleteKanbanStatusEvent.asSharedFlow()
//        private set

    private val _deleteKanbanStatusEvent = MutableStateFlow<KanbanStatusUiEvents?>(null)
    val deleteKanbanStatusEvent = _deleteKanbanStatusEvent.asStateFlow()

    fun clearDeleteKanbanStatusEvent() {
        _deleteKanbanStatusEvent.value = null
    }

    private val _updateKanbanStatusEvent: MutableSharedFlow<KanbanStatusUiEvents> = MutableSharedFlow()
    var updateKanbanStatusEvent = _updateKanbanStatusEvent.asSharedFlow()
        private set




    fun onEvent(events: KanbanStatusEvents){
        when (events){

            is KanbanStatusEvents.AddKanbanStatusEvent->{
                viewModelScope.launch {
                    repository.addKanbanStatus(
                        goalId = events.goalId,
                        kanbanStatus = events.kanbanStatus
                    )
                        .onStart {
                            _addKanbanStatusEvent.emit(
                                KanbanStatusUiEvents.Loading
                            )
                        }.catch {
                            _addKanbanStatusEvent.emit(
                                KanbanStatusUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _addKanbanStatusEvent.emit(
                                KanbanStatusUiEvents.Success(it)
                            )
                            onEvent(KanbanStatusEvents.ShowKanbanStatus(events.goalId))
                        }
                }
            }

            is KanbanStatusEvents.ShowKanbanStatus -> {
                viewModelScope.launch {
                    repository.getKanbanStatus(events.goalId)
                        .onStart {
                            _kanbanStatusResponseEvent.value = KanbanStatusState(
                                isLoading = true
                            )
                        }.catch {
                            _kanbanStatusResponseEvent.value = KanbanStatusState(
                                error = it.message ?: "Something went wrong"
                            )
                        }.collect {
                            _kanbanStatusResponseEvent.value = KanbanStatusState(
                                data = it
                            )
                        }
                }
            }

            is KanbanStatusEvents.UpdateKanbanStatusEvent->{
                viewModelScope.launch {
                    repository.updateKanbanStatus(
                        goalId = events.goalId,
                        id =  events.id,
                        kanbanStatus = events.kanbanStatus

                    )
                        .onStart {
                            _updateKanbanStatusEvent.emit(
                                KanbanStatusUiEvents.Loading
                            )
                        }.catch {
                            _updateKanbanStatusEvent.emit(
                                KanbanStatusUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _updateKanbanStatusEvent.emit(
                                KanbanStatusUiEvents.Success(it)
                            )
                        }
                }
            }



            is KanbanStatusEvents.DeleteKanbanStatusEvent -> {
                viewModelScope.launch {
                    repository.deleteKanbanStatus(
                        goalId = events.goalId,
                        id = events.id
                    )
                        .onStart {
                            _deleteKanbanStatusEvent.value = KanbanStatusUiEvents.Loading
                        }.catch {
                            _deleteKanbanStatusEvent.value =
                                KanbanStatusUiEvents.Failure(it.message ?: "Something went wrong")
                        }.collect {
                            _deleteKanbanStatusEvent.value = KanbanStatusUiEvents.Success(Unit)
                        }
                }
            }


//            is KanbanStatusEvents.DeleteKanbanStatusEvent->{
//                viewModelScope.launch {
//                    repository.deleteKanbanStatus(
//                        goalId = events.goalId,
//                        id = events.id
//                    )
//                        .onStart {
//                            _deleteKanbanStatusEvent.emit(
//                                KanbanStatusUiEvents.Loading
//                            )
//                        }.catch {
//                            _deleteKanbanStatusEvent.emit(
//                                KanbanStatusUiEvents.Failure(it.message?:"Something went wrong")
//                            )
//                        }.collect{
//                            _deleteKanbanStatusEvent.emit(
//                                KanbanStatusUiEvents.Success(Unit)
//                            )
//                        }
//                }
//            }

        }
    }
}