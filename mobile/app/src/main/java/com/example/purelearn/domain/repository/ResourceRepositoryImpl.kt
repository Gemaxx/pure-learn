package com.example.purelearn.domain.repository

import android.util.Log
import com.example.purelearn.domain.model.GoalDetails
import com.example.purelearn.domain.model.MessageResponse
import com.example.purelearn.domain.model.Resource
import com.example.purelearn.domain.model.ResourceDetails
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




    override suspend fun getResourceById(id: Int): Flow<ResourceDetails> = flow {
        try {
            // Make the API call to Retrofit
            val result = retrofitService.getResourceById(
                learnerId = 1,
                learningResourceId = id
            )

            // Log the entire result to check if it's valid
            Log.d("Repo", "Fetched Resource: $result")

            // Check if the result is null and log it
            if (result == null) {
                Log.e("Repo", "Resource data is null for id=$id")
            } else {
                // If the result is not null, log its properties (like title and description)
                Log.d("Repo", "Resource fetched: Title = ${result.title}")
            }

            // Emit the result (valid data or null)
            emit(result)
        } catch (e: Exception) {
            // Catch and log any errors that occur during the API call
            Log.e("Repo", "Error fetching Resource: ${e.message}")
            // Optionally emit a failure state here if necessary
        }
    }.flowOn(Dispatchers.IO)


    override suspend fun softDeleteResource(id: Int): Flow<MessageResponse> = flow {
        val response = retrofitService.softDeleteResource(
            learnerId = 1,
            learningResourceId = id,
        )
        if (response.isSuccessful) {
            emit(response.body() ?: throw Exception("Empty response body"))
        } else {
            throw Exception("Failed to soft delete Resource: ${response.code()}")
        }
    }.flowOn(Dispatchers.IO)


    override suspend fun restoreResource(id: Int): Flow<MessageResponse> = flow {
        val response = retrofitService.restoreResource(
            learnerId = 1,
            learningResourceId = id
        )
        if (response.isSuccessful) {
            emit(response.body() ?: throw Exception("Empty response body"))
        } else {
            throw Exception("Failed to restore Resource: ${response.code()}")
        }
    }.flowOn(Dispatchers.IO)


}
