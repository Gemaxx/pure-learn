package com.example.purelearn.ui.theme.Goal.Goalviewmodel

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.purelearn.repository.CategoryRepository
import com.example.purelearn.repository.GoalRepository
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalEvents
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalUiEvents
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.status.GoalState
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryUiEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.status.CategoryState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.onStart
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class GoalViewModel @Inject constructor(
    private val repository: GoalRepository
): ViewModel(){
    private val _goalResponseEvent= mutableStateOf(GoalState())
    var goalResponseEvent: State<GoalState> = _goalResponseEvent
        private set

    private val _addGoalEvent: MutableSharedFlow<GoalUiEvents> = MutableSharedFlow()
    var addGoalEvent = _addGoalEvent.asSharedFlow()
        private set

    private val _deleteGoalEvent: MutableSharedFlow<GoalUiEvents> = MutableSharedFlow()
    var deleteGoalEvent = _deleteGoalEvent.asSharedFlow()
        private set


    private val _updateGoalEvent: MutableSharedFlow<GoalUiEvents> = MutableSharedFlow()
    var updateGoalEvent = _updateGoalEvent.asSharedFlow()
        private set


    fun onEvent(events: GoalEvents){
        when (events){

            is GoalEvents.AddGoalEvent->{
                viewModelScope.launch {
                    repository.addGoal(events.data)
                        .onStart {
                            _addGoalEvent.emit(
                                GoalUiEvents.Loading
                            )
                        }.catch {
                            _addGoalEvent.emit(
                                GoalUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _addGoalEvent.emit(
                                GoalUiEvents.Success(it)
                            )
                            onEvent(GoalEvents.ShowGoal(events.categoryId))
                        }
                }
            }

            is GoalEvents.DeleteGoalEvent->{
                viewModelScope.launch {
                    repository.deleteGoal(events.id)
                        .onStart {
                            _deleteGoalEvent.emit(
                                GoalUiEvents.Loading
                            )
                        }.catch {
                            _deleteGoalEvent.emit(
                                GoalUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _deleteGoalEvent.emit(
                                GoalUiEvents.Success(it)
                            )
                        }
                }
            }

            is GoalEvents.UpdateGoalEvent->{
                viewModelScope.launch {
                    repository.updateGoal(events.id,events.goal)
                        .onStart {
                            _updateGoalEvent.emit(
                                GoalUiEvents.Loading
                            )
                        }.catch {
                            _updateGoalEvent.emit(
                                GoalUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _updateGoalEvent.emit(
                                GoalUiEvents.Success(it)
                            )
                        }
                }
            }

           is GoalEvents.ShowGoal -> {
                viewModelScope.launch {
                    repository.getGoal(events.categoryId)
                        .onStart {
                            _goalResponseEvent.value = GoalState(
                                isLoading = true
                            )
                        }.catch {
                            _goalResponseEvent.value = GoalState(
                                error = it.message ?: "Something went wrong"
                            )
                        }.collect {
                            _goalResponseEvent.value = GoalState(
                                data = it
                            )
                        }
                }
            }

        }
    }
}