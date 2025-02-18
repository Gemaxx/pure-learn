package com.example.purelearn.domain.repository

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.network.KtorService
import com.example.purelearn.domain.network.RetrofitService
import com.example.purelearn.repository.CategoryRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import javax.inject.Inject

class CategoryRepositoryImpl @Inject constructor(
    private val apiService: KtorService,
    private val retrofitService: RetrofitService
) : CategoryRepository {



    override suspend fun addCategory(category: Category): Flow<CategoryResponse> = flow {
        emit(retrofitService.addCategory(category))
    }.flowOn(Dispatchers.IO)

    override suspend fun getCategory(): Flow<List<CategoryResponse>> = flow {
        emit(retrofitService.getCategory())
    }.flowOn(Dispatchers.IO)

    override suspend fun deleteCategory(id: Int): Flow<CategoryResponse> = flow {
        emit(retrofitService.deleteCategory(id))
    }.flowOn(Dispatchers.IO)

    override suspend fun updateCategory(id: Int, category: Category): Flow<CategoryResponse> = flow {
        emit(retrofitService.updateCategory(id, category))
    }.flowOn(Dispatchers.IO)
}