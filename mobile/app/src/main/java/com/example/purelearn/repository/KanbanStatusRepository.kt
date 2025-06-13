package com.example.purelearn.repository

import com.example.purelearn.domain.model.KanbanStatusRequest
import com.example.purelearn.domain.model.KanbanStatusResponse

import kotlinx.coroutines.flow.Flow

interface KanbanStatusRepository {

    suspend fun getKanbanStatus(goalId: Int): Flow<List<KanbanStatusResponse>>

    suspend fun addKanbanStatus(goalId: Int,kanbanStatus: KanbanStatusRequest): Flow<KanbanStatusRequest>


    // suspend fun deleteKanbanStatus(goalId: Int,id: Int): Flow<KanbanStatusResponse>


    suspend fun deleteKanbanStatus(goalId: Int, id: Int): Flow<Unit>


    suspend fun updateKanbanStatus(goalId: Int, id: Int, kanbanStatus: KanbanStatusRequest): Flow<KanbanStatusRequest>
}

