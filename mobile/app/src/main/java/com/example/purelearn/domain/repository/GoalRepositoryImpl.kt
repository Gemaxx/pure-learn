package com.example.purelearn.domain.repository

import android.util.Log
import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryDetails
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.GoalDetails
import com.example.purelearn.domain.model.GoalResponse
import com.example.purelearn.domain.model.MessageResponse
import com.example.purelearn.domain.network.KtorService
import com.example.purelearn.domain.network.RetrofitService
import com.example.purelearn.repository.GoalRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import javax.inject.Inject

class GoalRepositoryImpl  @Inject constructor(
    private val apiService: KtorService,
    private val retrofitService: RetrofitService
) : GoalRepository {


    override suspend fun addGoal(goal: Goal): Flow<GoalResponse> = flow {
        emit(retrofitService.addGoal(
            learnerId = 1,
            goal = goal
        ))
    }.flowOn(Dispatchers.IO)

    override suspend fun getGoal(): Flow<List<GoalResponse>> = flow {
        emit(retrofitService.getGoal(
            learnerId = 1,
          //  categoryId = categoryId,
            isDeleted = false
        ))
    }.flowOn(Dispatchers.IO)



    override suspend fun deleteGoal(id: Int): Flow<GoalResponse> = flow {
        emit(retrofitService.deleteGoal(
            learnerId = 1,
            goalId = id,
        ))
    }.flowOn(Dispatchers.IO)


    override suspend fun updateGoal(id: Int, goal: Goal): Flow<GoalResponse> = flow {
        emit(retrofitService.updateGoal(
            learnerId = 1,
            goalId = id,
            goal = goal,
        ))
    }.flowOn(Dispatchers.IO)



    override suspend fun getGoalById(id: Int): Flow<GoalDetails> = flow {
        try {
            // Make the API call to Retrofit
            val result = retrofitService.getGoalById(
                learnerId = 1,
                goalId = id,   // Use the learnerId as required
            )

            // Log the entire result to check if it's valid
            Log.d("Repo", "Fetched goal: $result")

            // Check if the result is null and log it
            if (result == null) {
                Log.e("Repo", "goal data is null for id=$id")
            } else {
                // If the result is not null, log its properties (like title and description)
                Log.d("Repo", "goal fetched: Title = ${result.title}, Description = ${result.description}")
            }

            // Emit the result (valid data or null)
            emit(result)
        } catch (e: Exception) {
            // Catch and log any errors that occur during the API call
            Log.e("Repo", "Error fetching goal: ${e.message}")
            // Optionally emit a failure state here if necessary
        }
    }.flowOn(Dispatchers.IO)


    override suspend fun softDeleteGoal(id: Int): Flow<MessageResponse> = flow {
        val response = retrofitService.softDeleteGoal(
            learnerId = 1,
            goalId = id,
        )
        if (response.isSuccessful) {
            emit(response.body() ?: throw Exception("Empty response body"))
        } else {
            throw Exception("Failed to soft delete goal: ${response.code()}")
        }
    }.flowOn(Dispatchers.IO)


    override suspend fun restoreGoal(id: Int): Flow<MessageResponse> = flow {
        val response = retrofitService.restoreGoal(learnerId = 1, goalId = id)
        if (response.isSuccessful) {
            emit(response.body() ?: throw Exception("Empty response body"))
        } else {
            throw Exception("Failed to restore goal: ${response.code()}")
        }
    }.flowOn(Dispatchers.IO)

}
