package com.example.purelearn.repository

import com.example.purelearn.domain.model.CategoryDetails
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.GoalDetails
import com.example.purelearn.domain.model.GoalResponse
import com.example.purelearn.domain.model.MessageResponse
import kotlinx.coroutines.flow.Flow

interface GoalRepository {


    suspend fun addGoal(goal: Goal): Flow<GoalResponse>

   // suspend fun getGoal(categoryId: Int): Flow<List<GoalResponse>>
  //  suspend fun getGoal(): Flow<List<GoalResponse>>
   suspend fun getGoal(
//       learnerId: Long,
//       title: String? = null,
//       categoryId: Long? = null,
//       status: String? = null,
//       term: String? = null,
//       isDeleted: Boolean? = null,
//       isSortAscending: Boolean? = null,
//       sortBy: String? = null,
//       isDescending: Boolean? = null,
//       pageNumber: Int? = null,
//       pageSize: Int? = null
   ): Flow<List<GoalResponse>>
    suspend fun deleteGoal(id: Int): Flow<GoalResponse>

    suspend fun updateGoal(id: Int, goal:Goal): Flow<GoalResponse>

    suspend fun getGoalById(id: Int): Flow<GoalDetails>

    suspend fun restoreGoal(id: Int): Flow<MessageResponse>

    suspend fun softDeleteGoal(id: Int): Flow<MessageResponse>

}