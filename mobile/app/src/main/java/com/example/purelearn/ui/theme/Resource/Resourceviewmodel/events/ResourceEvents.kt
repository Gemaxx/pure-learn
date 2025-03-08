package com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.Resource
import com.example.purelearn.domain.model.ResourceResponse
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalEvents

sealed class ResourceEvents {
    data class AddResourceEvent(val data: Resource) : ResourceEvents()
    data class DeleteResourceEvent(val id: Int) : ResourceEvents()
    data class UpdateResourceEvent(val id: Int, val resource: Resource) : ResourceEvents()
    //object ShowResources : ResourceEvents()
    data class ShowResources(
        val goalId: Int
    ) : ResourceEvents()

}

sealed class ResourceUiEvents {
    data class Success(val data: ResourceResponse) :ResourceUiEvents()
    data class Failure(val msg: String) : ResourceUiEvents()
    object Loading : ResourceUiEvents()

}