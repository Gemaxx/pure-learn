package com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.events

import com.example.purelearn.domain.model.ResourceType
import com.example.purelearn.domain.model.ResourceTypeResponse
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceEvents


sealed class ResourceTypeEvents {

    data class AddResourceTypeEvent(val data: ResourceType) : ResourceTypeEvents()
    data class DeleteResourceTypeEvent(val id: Int) : ResourceTypeEvents()
    data class UpdateResourceTypeEvent(val id: Int, val resourceType: ResourceType) : ResourceTypeEvents()
    data class GetResourceTypeByIdEvent(val id: Int) : ResourceTypeEvents()
    object ShowResourceType : ResourceTypeEvents()
}

sealed class ResourceTypeUiEvents {
    data class Success(val data: ResourceTypeResponse) :ResourceTypeUiEvents()
    data class Failure(val msg: String) : ResourceTypeUiEvents()
    object Loading : ResourceTypeUiEvents()

}