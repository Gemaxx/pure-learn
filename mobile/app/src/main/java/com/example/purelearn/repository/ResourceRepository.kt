package com.example.purelearn.repository

import com.example.purelearn.domain.model.GoalDetails
import com.example.purelearn.domain.model.MessageResponse
import com.example.purelearn.domain.model.Resource
import com.example.purelearn.domain.model.ResourceDetails
import com.example.purelearn.domain.model.ResourceResponse
import kotlinx.coroutines.flow.Flow

interface ResourceRepository {

    suspend fun addResource(resource: Resource): Flow<ResourceResponse>

    suspend fun getResource(learningResourceId: Int): Flow<List<ResourceResponse>>

    suspend fun deleteResource(id: Int): Flow<ResourceResponse>

    suspend fun updateResource(id: Int, resource: Resource): Flow<ResourceResponse>

    suspend fun getResourceById(id: Int): Flow<ResourceDetails>

    suspend fun restoreResource(id: Int): Flow<MessageResponse>

    suspend fun softDeleteResource(id: Int): Flow<MessageResponse>

}