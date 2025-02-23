package com.example.purelearn.domain.repository

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.GoalResponse
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

    override suspend fun getGoal(categoryId: Int): Flow<List<GoalResponse>> = flow {
        emit(retrofitService.getGoal(
            learnerId = 1,
            categoryId = categoryId,
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


}
