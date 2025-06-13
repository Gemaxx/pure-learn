package com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.purelearn.domain.model.ResourceDetails
import com.example.purelearn.domain.model.ResourceResponse
import com.example.purelearn.domain.model.ResourceTypeDetails
import com.example.purelearn.domain.model.ResourceTypeResponse
import com.example.purelearn.repository.ResourceTypeRepository
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceEvents
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.status.ResourceState
import com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.events.ResourceTypeEvents
import com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.events.ResourceTypeUiEvents
import com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.status.ResourceTypeState
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryUiEvents
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.onStart
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class ResourceTypeViewModel @Inject constructor(
    private val repository: ResourceTypeRepository
): ViewModel(){
//    private val _resourceTypeResponseEvent= mutableStateOf(ResourceTypeState())
//    var resourceTypeResponseEvent: State<ResourceTypeState> = _resourceTypeResponseEvent
//        private set


    private val _resourceTypes = mutableStateOf<List<ResourceTypeDetails>>(emptyList())
    val resourceTypes: State<List<ResourceTypeDetails>> = _resourceTypes



    private val _resourceTypeResponseEvent = mutableStateOf(ResourceTypeState<List<ResourceTypeResponse>>())
    val resourceTypeResponseEvent: State<ResourceTypeState<List<ResourceTypeResponse>>> = _resourceTypeResponseEvent



    private val _addResourceTypeEvent: MutableSharedFlow<ResourceTypeUiEvents> = MutableSharedFlow()
    var addResourceTypeEvent = _addResourceTypeEvent.asSharedFlow()
        private set

    private val _deleteResourceTypeEvent: MutableSharedFlow<ResourceTypeUiEvents> = MutableSharedFlow()
    var deleteResourceTypeEvent = _deleteResourceTypeEvent.asSharedFlow()
        private set


    private val _updateResourceTypeEvent: MutableSharedFlow<ResourceTypeUiEvents> = MutableSharedFlow()
    var updateResourceTypeEvent = _updateResourceTypeEvent.asSharedFlow()
        private set


    private val _getResourceTypeByIdResponseEvent = mutableStateOf(ResourceTypeState<ResourceTypeDetails>())
    val getResourceTypeByIdResponseEvent: State<ResourceTypeState<ResourceTypeDetails>> = _getResourceTypeByIdResponseEvent




    fun onEvent(events: ResourceTypeEvents){
        when (events){

            is ResourceTypeEvents.AddResourceTypeEvent->{
                viewModelScope.launch {
                    repository.addResourceType(events.data)
                        .onStart {
                            _addResourceTypeEvent.emit(
                                ResourceTypeUiEvents.Loading
                            )
                        }.catch {
                            _addResourceTypeEvent.emit(
                                ResourceTypeUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _addResourceTypeEvent.emit(
                                ResourceTypeUiEvents.Success(it)
                            )
                        }
                }
            }




            ResourceTypeEvents.ShowResourceType -> {
                viewModelScope.launch {
                    repository.getResourceType()
                        .onStart {
                            _resourceTypeResponseEvent.value = ResourceTypeState(
                                isLoading = true
                            )
                        }.catch {
                            _resourceTypeResponseEvent.value = ResourceTypeState(
                                error = it.message ?: "Something went wrong"
                            )
                        }.collect {
                            _resourceTypeResponseEvent.value = ResourceTypeState(
                                data = it
                            )
                        }
                }
            }

            is ResourceTypeEvents.DeleteResourceTypeEvent->{
                viewModelScope.launch {
                    repository.deleteResourceType(events.id)
                        .onStart {
                            _deleteResourceTypeEvent.emit(
                                ResourceTypeUiEvents.Loading
                            )
                        }.catch {
                            _deleteResourceTypeEvent.emit(
                                ResourceTypeUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _deleteResourceTypeEvent.emit(
                                ResourceTypeUiEvents.Success(it)
                            )
                        }
                }
            }

            is ResourceTypeEvents.UpdateResourceTypeEvent->{
                viewModelScope.launch {
                    repository.updateResourceType(events.id,events.resourceType)
                        .onStart {
                            _updateResourceTypeEvent.emit(
                                ResourceTypeUiEvents.Loading
                            )
                        }.catch {
                            _updateResourceTypeEvent.emit(
                                ResourceTypeUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _updateResourceTypeEvent.emit(
                                ResourceTypeUiEvents.Success(it)
                            )
                        }
                }
            }



            is  ResourceTypeEvents.GetResourceTypeByIdEvent -> {
                viewModelScope.launch {
                    repository.getResourceTypeById(
                        id = events.id
                    )
                        .onStart {
                            _getResourceTypeByIdResponseEvent.value = ResourceTypeState(
                                isLoading = true
                            )
                        }.catch {
                            _getResourceTypeByIdResponseEvent.value = ResourceTypeState(
                                error = it.message ?: "Something went wrong"
                            )
                        }.collect {
                            _getResourceTypeByIdResponseEvent.value = ResourceTypeState(
                                data = it
                            )
                        }
                }
            }


        }
    }
}

