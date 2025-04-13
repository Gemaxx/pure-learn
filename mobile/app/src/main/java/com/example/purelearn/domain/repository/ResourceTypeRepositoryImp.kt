package com.example.purelearn.domain.repository

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.ResourceType
import com.example.purelearn.domain.model.ResourceTypeResponse
import com.example.purelearn.domain.network.KtorService
import com.example.purelearn.domain.network.RetrofitService
import com.example.purelearn.repository.ResourceTypeRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import javax.inject.Inject

data class ResourceTypeRepositoryImp @Inject constructor(
    private val apiService: KtorService,
    private val retrofitService: RetrofitService
): ResourceTypeRepository
{

    override suspend fun getResourceType(): Flow<List<ResourceTypeResponse>> = flow {
        emit(retrofitService.getResourceType(
            learnerId = 1
        ))
    }.flowOn(Dispatchers.IO)


    override suspend fun addResourceType(resourceType: ResourceType): Flow<ResourceTypeResponse> = flow {
        emit(retrofitService.addResourceType(
            learnerId = 1,
            resourceType = resourceType
        ))
    }.flowOn(Dispatchers.IO)


    override suspend fun deleteResourceType(id: Int): Flow<ResourceTypeResponse> = flow {
        emit(retrofitService.deleteResourceType(
            learnerId = 1,
            learningResourceTypeId = id,
        ))
    }.flowOn(Dispatchers.IO)


    override suspend fun updateResourceType(id: Int, resourceType: ResourceType): Flow<ResourceTypeResponse> = flow {
        emit(retrofitService.updateResourceType(
            learnerId = 1,
            resourceTypeId = id,
            resourceType = resourceType,
        ))
    }.flowOn(Dispatchers.IO)
}

