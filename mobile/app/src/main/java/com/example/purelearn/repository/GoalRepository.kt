package com.example.purelearn.repository

import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.GoalResponse
import kotlinx.coroutines.flow.Flow

interface GoalRepository {


    suspend fun addGoal(goal: Goal): Flow<GoalResponse>

    suspend fun getGoal(categoryId: Int): Flow<List<GoalResponse>>

    suspend fun deleteGoal(id: Int): Flow<GoalResponse>

    suspend fun updateGoal(id: Int, goal:Goal): Flow<GoalResponse>

}