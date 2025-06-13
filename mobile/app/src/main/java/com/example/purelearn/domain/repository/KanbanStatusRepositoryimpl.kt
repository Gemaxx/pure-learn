package com.example.purelearn.domain.repository

import com.example.purelearn.domain.model.KanbanStatusRequest
import com.example.purelearn.domain.model.KanbanStatusResponse
import com.example.purelearn.domain.network.KtorService
import com.example.purelearn.domain.network.RetrofitService
import com.example.purelearn.repository.KanbanStatusRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import retrofit2.Response
import javax.inject.Inject

class KanbanStatusRepositoryImpl  @Inject constructor(
    private val apiService: KtorService,
    private val retrofitService: RetrofitService
) : KanbanStatusRepository {


    override suspend fun getKanbanStatus(goalId: Int): Flow<List<KanbanStatusResponse>> = flow {
        emit(retrofitService.getKanbanStatus(
            goalId = goalId,
        ))
    }.flowOn(Dispatchers.IO)




    override suspend fun addKanbanStatus(goalId: Int , kanbanStatus: KanbanStatusRequest): Flow<KanbanStatusRequest> = flow {
        emit(retrofitService.addKanbanStatus(
            goalId = goalId,
            kanbanStatus = kanbanStatus
        ))
    }.flowOn(Dispatchers.IO)



    override suspend fun updateKanbanStatus(goalId: Int, id: Int, kanbanStatus: KanbanStatusRequest): Flow<KanbanStatusRequest> = flow {
        emit(retrofitService.updateKanbanStatus(
            goalId = goalId,
            statusId = id,
            kanbanStatus = kanbanStatus
        ))
    }.flowOn(Dispatchers.IO)


//    override suspend fun deleteKanbanStatus(goalId: Int , id: Int): Flow<Response<Unit>> = flow {
//        emit(retrofitService.deleteKanbanStatus(
//            goalId = goalId,
//            statusId = id
//        ))
//    }.flowOn(Dispatchers.IO)

    override suspend fun deleteKanbanStatus(goalId: Int, id: Int): Flow<Unit> = flow {
        val response = retrofitService.deleteKanbanStatus(goalId, statusId = id)
        if (response.isSuccessful) {
            emit(Unit) // Just emit Unit since there's no response body
        } else {
            throw Exception("Failed to delete Kanban Status: ${response.code()}")
        }
    }.flowOn(Dispatchers.IO)


}
