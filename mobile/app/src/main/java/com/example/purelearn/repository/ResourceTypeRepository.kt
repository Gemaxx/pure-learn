package com.example.purelearn.repository

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.ResourceDetails
import com.example.purelearn.domain.model.ResourceType
import com.example.purelearn.domain.model.ResourceTypeDetails
import com.example.purelearn.domain.model.ResourceTypeResponse
import kotlinx.coroutines.flow.Flow

interface ResourceTypeRepository {


    suspend fun getResourceType(): Flow<List<ResourceTypeResponse>>
    suspend fun addResourceType(resourceType: ResourceType): Flow<ResourceTypeResponse>
    suspend fun deleteResourceType(id: Int): Flow<ResourceTypeResponse>
    suspend fun getResourceTypeById(id: Int): Flow<ResourceTypeDetails>

    suspend fun updateResourceType(id: Int, resourceType:ResourceType): Flow<ResourceTypeResponse>}