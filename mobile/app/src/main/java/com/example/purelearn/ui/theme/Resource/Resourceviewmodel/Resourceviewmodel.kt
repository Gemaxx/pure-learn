package com.example.purelearn.ui.theme.Resource.Resourceviewmodel

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.purelearn.repository.ResourceRepository
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
    private val _resourceResponseEvent= mutableStateOf(ResourceState())
    var resourceResponseEvent: State<ResourceState> = _resourceResponseEvent
        private set

    private val _addResourceEvent: MutableSharedFlow<ResourceUiEvents> = MutableSharedFlow()
    var addResourceEvent = _addResourceEvent.asSharedFlow()
        private set

    private val _deleteResourceEvent: MutableSharedFlow<ResourceUiEvents> = MutableSharedFlow()
    var deleteResourceEvent = _deleteResourceEvent.asSharedFlow()
        private set


    private val _updateResourceEvent: MutableSharedFlow<ResourceUiEvents> = MutableSharedFlow()
    var updateResourceEvent = _updateResourceEvent.asSharedFlow()
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
                   val resources = repository.getResource(events.goalId)
                   Log.d("ViewModel", "Received Resources: $resources")
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

        }
    }
}