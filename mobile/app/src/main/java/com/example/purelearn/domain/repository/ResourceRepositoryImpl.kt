package com.example.purelearn.domain.repository

import com.example.purelearn.domain.model.Resource
import com.example.purelearn.domain.model.ResourceResponse
import com.example.purelearn.domain.network.KtorService
import com.example.purelearn.domain.network.RetrofitService
import com.example.purelearn.repository.ResourceRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import javax.inject.Inject


class ResourceRepositoryImpl  @Inject constructor(
    private val apiService: KtorService,
    private val retrofitService: RetrofitService
) : ResourceRepository {


    override suspend fun addResource(resource: Resource): Flow<ResourceResponse> = flow {
        emit(retrofitService.addResource(
            learnerId = 1,
            resource = resource
        ))
    }.flowOn(Dispatchers.IO)

    override suspend fun getResource(learningResourceId: Int): Flow<List<ResourceResponse>> = flow {
        emit(retrofitService.getResource(
             learnerId = 1,
//            isDeleted = false,
            goalId = learningResourceId
        ))
    }.flowOn(Dispatchers.IO)



    override suspend fun deleteResource(id: Int): Flow<ResourceResponse> = flow {
        emit(retrofitService.deleteResource(
            learnerId = 1,
            learningResourceId = id,
        ))
    }.flowOn(Dispatchers.IO)


    override suspend fun updateResource(id: Int, resource: Resource): Flow<ResourceResponse> = flow {
        emit(retrofitService.updateResource(
            learnerId = 1,
            learningResourcesId = id,
            resource = resource,
        ))
    }.flowOn(Dispatchers.IO)


}
