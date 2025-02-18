package com.example.purelearn.repository

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import kotlinx.coroutines.flow.Flow

interface CategoryRepository{



    suspend fun addCategory(category: Category): Flow<CategoryResponse>

    suspend fun getCategory(): Flow<List<CategoryResponse>>

    suspend fun deleteCategory(id: Int): Flow<CategoryResponse>

    suspend fun updateCategory(id: Int, category:Category): Flow<CategoryResponse>

}