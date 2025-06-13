package com.example.purelearn.ui.theme.Resource.Resourceviewmodel

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.purelearn.domain.model.GoalDetails
import com.example.purelearn.domain.model.GoalResponse
import com.example.purelearn.domain.model.ResourceDetails
import com.example.purelearn.domain.model.ResourceResponse
import com.example.purelearn.repository.ResourceRepository
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalEvents
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalUiEvents
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.status.GoalState
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceEvents
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceUiEvents
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.status.ResourceState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.onStart
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class ResourceViewModel @Inject constructor(
    private val repository: ResourceRepository
): ViewModel(){
//    private val _resourceResponseEvent= mutableStateOf(ResourceState())
//    var resourceResponseEvent: State<ResourceState> = _resourceResponseEvent
//        private set



    private val _resourceResponseEvent = mutableStateOf(ResourceState<List<ResourceResponse>>())
    val resourceResponseEvent: State<ResourceState<List<ResourceResponse>>> = _resourceResponseEvent


    private val _addResourceEvent: MutableSharedFlow<ResourceUiEvents> = MutableSharedFlow()
    var addResourceEvent = _addResourceEvent.asSharedFlow()
        private set

    private val _deleteResourceEvent: MutableSharedFlow<ResourceUiEvents> = MutableSharedFlow()
    var deleteResourceEvent = _deleteResourceEvent.asSharedFlow()
        private set


    private val _updateResourceEvent: MutableSharedFlow<ResourceUiEvents> = MutableSharedFlow()
    var updateResourceEvent = _updateResourceEvent.asSharedFlow()
        private set



    private val _getResourceByIdResponseEvent = mutableStateOf(ResourceState<ResourceDetails>())
    val getResourceByIdResponseEvent: State<ResourceState<ResourceDetails>> = _getResourceByIdResponseEvent


    private val _restoreResourceEvent: MutableSharedFlow<ResourceUiEvents> = MutableSharedFlow()
    var restoreResourceEvent = _restoreResourceEvent.asSharedFlow()
        private set

    private val _softDeleteResourceEvent: MutableSharedFlow<ResourceUiEvents> = MutableSharedFlow()
    var softDeleteResourceEvent = _softDeleteResourceEvent.asSharedFlow()
        private set



    fun onEvent(events: ResourceEvents){
        when (events){

            is ResourceEvents.AddResourceEvent->{
                viewModelScope.launch {
                    repository.addResource(events.data)
                        .onStart {
                            _addResourceEvent.emit(
                                ResourceUiEvents.Loading
                            )
                        }.catch {
                            _addResourceEvent.emit(
                                ResourceUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _addResourceEvent.emit(
                                ResourceUiEvents.Success(it)
                            )
                        }
                }
            }

            is ResourceEvents.DeleteResourceEvent->{
                viewModelScope.launch {
                    repository.deleteResource(events.id)
                        .onStart {
                            _deleteResourceEvent.emit(
                                ResourceUiEvents.Loading
                            )
                        }.catch {
                            _deleteResourceEvent.emit(
                                ResourceUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _deleteResourceEvent.emit(
                                ResourceUiEvents.Success(it)
                            )
                        }
                }
            }

            is ResourceEvents.UpdateResourceEvent->{
                viewModelScope.launch {
                    repository.updateResource(events.id,events.resource)
                        .onStart {
                            _updateResourceEvent.emit(
                                ResourceUiEvents.Loading
                            )
                        }.catch {
                            _updateResourceEvent.emit(
                                ResourceUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _updateResourceEvent.emit(
                                ResourceUiEvents.Success(it)
                            )
                        }
                }
            }

           is ResourceEvents.ShowResources -> {
               Log.e("ViewModel", "Fetching resources for goalId: ${events.goalId}") // Debugging

               viewModelScope.launch {
                 //  val resources = repository.getResource(events.goalId)
                 //  Log.d("ViewModel", "Received Resources: $resources")
                    repository.getResource(events.goalId)
                        .onStart {
                            _resourceResponseEvent.value = ResourceState(
                                isLoading = true
                            )
                        }.catch {
                            _resourceResponseEvent.value = ResourceState(
                                error = it.message ?: "Something went wrong"
                            )
                        }.collect {
                            _resourceResponseEvent.value = ResourceState(
                                data = it
                            )
                        }
                }
            }



            is  ResourceEvents.GetResourceByIdEvent -> {
                viewModelScope.launch {
                    repository.getResourceById(
                        id = events.id
                    )
                        .onStart {
                            _getResourceByIdResponseEvent.value = ResourceState(
                                isLoading = true
                            )
                        }.catch {
                            _getResourceByIdResponseEvent.value = ResourceState(
                                error = it.message ?: "Something went wrong"
                            )
                        }.collect {
                            _getResourceByIdResponseEvent.value = ResourceState(
                                data = it
                            )
                        }
                }
            }

            is ResourceEvents.SoftDeleteResourceEvent->{
                viewModelScope.launch {
                    repository.softDeleteResource(events.id)
                        .onStart {
                            _softDeleteResourceEvent.emit(
                                ResourceUiEvents.Loading
                            )
                        }.catch {
                            _softDeleteResourceEvent.emit(
                                ResourceUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }
                        .collect {
                            val dummyResource = ResourceResponse(
                                id = -1, // or reuse category.id if available
                                title = "Restored",
                                goalId = -1,
                                typeId = 0,
                                totalUnits = 0,
                                progress = 0,
                                progressPercentage = 0.5,
                            )
                            _softDeleteResourceEvent.emit(ResourceUiEvents.Success(dummyResource))
                        }

//                        .collect{
//                            _softDeleteGoalEvent.emit(
//                                GoalUiEvents.Success(it)
//                            )
//                        }
                }
            }



            is ResourceEvents.RestoreResourceEvent->{
                viewModelScope.launch {
                    repository.restoreResource(events.id)
                        .onStart {
                            _restoreResourceEvent.emit(
                                ResourceUiEvents.Loading
                            )
                        }.catch {
                            _restoreResourceEvent.emit(
                                ResourceUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect {
                            val dummyResource = ResourceResponse(
                                id = -1, // or reuse category.id if available
                                title = "Restored",
                                goalId = -1,
                                typeId = 0,
                                totalUnits = 0,
                                progress = 0,
                                progressPercentage = 0.5,
                            )
                            _restoreResourceEvent.emit(ResourceUiEvents.Success(dummyResource))
                        }

//                        .collect{
//                            _restoreCategoryEvent.emit(
//                                CategoryUiEvents.Success(it)
//                            )
//                        }
                }
            }



        }
    }
}