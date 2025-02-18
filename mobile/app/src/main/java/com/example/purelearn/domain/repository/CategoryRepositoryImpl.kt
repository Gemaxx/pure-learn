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
        emit(retrofitService.addCategory(
            category = category,
            learnerId = 1
        ))
    }.flowOn(Dispatchers.IO)

    override suspend fun getCategory(): Flow<List<CategoryResponse>> = flow {
        emit(retrofitService.getCategory(
            learnerId = 1,
            isDeleted = false
        ))
    }.flowOn(Dispatchers.IO)



    override suspend fun deleteCategory(id: Int): Flow<CategoryResponse> = flow {
        emit(retrofitService.deleteCategory(
            learnerId = 1,
            categoryId = id
        ))
    }.flowOn(Dispatchers.IO)


     override suspend fun updateCategory(id: Int, category: Category): Flow<CategoryResponse> = flow {
           emit(retrofitService.updateCategory(
               learnerId =1,
               categoryId = id,
               isDeleted = false,
               category = category
           ))
        }.flowOn(Dispatchers.IO)
}