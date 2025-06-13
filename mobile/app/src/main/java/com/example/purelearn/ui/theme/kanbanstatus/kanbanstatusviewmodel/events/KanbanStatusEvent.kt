package com.example.purelearn.ui.theme.kanbanstatus.kanbanstatusviewmodel.events

import com.example.purelearn.domain.model.KanbanStatusRequest

sealed class KanbanStatusEvents {


    data class AddKanbanStatusEvent(val kanbanStatus: KanbanStatusRequest, val goalId: Int) : KanbanStatusEvents()
    data class DeleteKanbanStatusEvent(val goalId:Int , val id: Int) : KanbanStatusEvents()
    data class UpdateKanbanStatusEvent(val goalId: Int, val id: Int, val kanbanStatus: KanbanStatusRequest) : KanbanStatusEvents()

    data class ShowKanbanStatus(
        val goalId: Int
    ) : KanbanStatusEvents()

}



sealed class KanbanStatusUiEvents {
    data class Success<T>(val data: T) : KanbanStatusUiEvents()

    // data class Success(val data: KanbanStatusRequest) :KanbanStatusUiEvents()
    data class Failure(val msg: String) : KanbanStatusUiEvents()
    object Loading : KanbanStatusUiEvents()

}