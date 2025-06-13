package com.example.purelearn.ui.theme.Goal.Goalviewmodel

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.purelearn.domain.model.CategoryDetails
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.GoalDetails
import com.example.purelearn.domain.model.GoalResponse
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
//    private val _goalResponseEvent= mutableStateOf(GoalState())
//    var goalResponseEvent: State<GoalState> = _goalResponseEvent
//        private set


    private val _goalResponseEvent = mutableStateOf(GoalState<List<GoalResponse>>())
    val goalResponseEvent: State<GoalState<List<GoalResponse>>> = _goalResponseEvent


    private val _addGoalEvent: MutableSharedFlow<GoalUiEvents> = MutableSharedFlow()
    var addGoalEvent = _addGoalEvent.asSharedFlow()
        private set

    private val _deleteGoalEvent: MutableSharedFlow<GoalUiEvents> = MutableSharedFlow()
    var deleteGoalEvent = _deleteGoalEvent.asSharedFlow()
        private set


    private val _updateGoalEvent: MutableSharedFlow<GoalUiEvents> = MutableSharedFlow()
    var updateGoalEvent = _updateGoalEvent.asSharedFlow()
        private set

    private val _getGoalByIdResponseEvent = mutableStateOf(GoalState<GoalDetails>())
    val getGoalByIdResponseEvent: State<GoalState<GoalDetails>> = _getGoalByIdResponseEvent


    private val _restoreGoalEvent: MutableSharedFlow<GoalUiEvents> = MutableSharedFlow()
    var restoreGoalEvent = _restoreGoalEvent.asSharedFlow()
        private set

    private val _softDeleteGoalEvent: MutableSharedFlow<GoalUiEvents> = MutableSharedFlow()
    var softDeleteGoalEvent = _softDeleteGoalEvent.asSharedFlow()
        private set


    fun onEvent(events:GoalEvents){
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
                            onEvent(GoalEvents.ShowGoal)
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






            is GoalEvents.GetGoalByIdEvent -> {
                viewModelScope.launch {
                    repository.getGoalById(
                        id = events.id
                    )
                        .onStart {
                            _getGoalByIdResponseEvent.value = GoalState(
                                isLoading = true
                            )
                        }.catch {
                            _getGoalByIdResponseEvent.value = GoalState(
                                error = it.message ?: "Something went wrong"
                            )
                        }.collect {
                            _getGoalByIdResponseEvent.value = GoalState(
                                data = it
                            )
                        }
                }
            }

            is GoalEvents.SoftDeleteGoalEvent->{
                viewModelScope.launch {
                    repository.softDeleteGoal(events.id)
                        .onStart {
                            _softDeleteGoalEvent.emit(
                                GoalUiEvents.Loading
                            )
                        }.catch {
                            _softDeleteGoalEvent.emit(
                                GoalUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }
                        .collect {
                            val dummyGoal = GoalResponse(
                                id = -1, // or reuse category.id if available
                                title = "Restored",
                                categoryId = -1,
                                term = "Short-Term",
                                status ="Not-Started",
                            )
                            _softDeleteGoalEvent.emit(GoalUiEvents.Success(dummyGoal))
                        }

//                        .collect{
//                            _softDeleteGoalEvent.emit(
//                                GoalUiEvents.Success(it)
//                            )
//                        }
                }
            }



            is GoalEvents.RestoreGoalEvent->{
                viewModelScope.launch {
                    repository.restoreGoal(events.id)
                        .onStart {
                            _restoreGoalEvent.emit(
                                GoalUiEvents.Loading
                            )
                        }.catch {
                            _restoreGoalEvent.emit(
                                GoalUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect {
                            val dummyGoal = GoalResponse(
                                id = -1, // or reuse category.id if available
                                title = "Restored",
                                categoryId = -1,
                                term = "Short-Term",
                                status ="Not-Started",
                            )
                            _restoreGoalEvent.emit(GoalUiEvents.Success(dummyGoal))
                        }

//                        .collect{
//                            _restoreCategoryEvent.emit(
//                                CategoryUiEvents.Success(it)
//                            )
//                        }
                }
            }

            is GoalEvents.ShowGoal -> {
                viewModelScope.launch {
                    Log.d("GoalDebug", "Fetching goals...")

                    repository.getGoal()
                        .onStart {
                            Log.d("GoalDebug", "Loading started")

                            _goalResponseEvent.value = GoalState(
                                isLoading = true
                            )
                        }.catch {e ->
                            Log.e("GoalDebug", "Error fetching goals", e)

                            _goalResponseEvent.value = GoalState(
                                error = e.message ?: "Something went wrong"
                            )
                        }.collect {
                                goals ->
                            Log.d("GoalDebug", "Received ${goals.size} goals")
                            goals.forEach { goal ->
                                Log.d("GoalDebug", "Goal: ${goal.title}, Category: ${goal.categoryId}")
                            }

                            _goalResponseEvent.value = GoalState(
                                data = goals
                            )
                        }
                }
            }

        }
    }
}