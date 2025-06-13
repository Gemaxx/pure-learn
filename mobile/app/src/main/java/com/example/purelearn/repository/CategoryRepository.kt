package com.example.purelearn.repository

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryDetails
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.MessageResponse
import kotlinx.coroutines.flow.Flow

interface CategoryRepository{



    suspend fun addCategory(category: Category): Flow<CategoryResponse>

    suspend fun getCategory(): Flow<List<CategoryResponse>>

    suspend fun getCategoryById(id: Int): Flow<CategoryDetails>

    suspend fun deleteCategory(id: Int): Flow<CategoryResponse>


    suspend fun updateCategory(id: Int, category:Category): Flow<CategoryResponse>

    suspend fun restoreCategory(id: Int): Flow<MessageResponse>

    suspend fun softDeleteCategory(id: Int): Flow<MessageResponse>

}