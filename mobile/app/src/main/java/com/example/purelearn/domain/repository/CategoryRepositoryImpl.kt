package com.example.purelearn.domain.repository

import android.util.Log
import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryDetails
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.MessageResponse
import com.example.purelearn.domain.network.KtorService
import com.example.purelearn.domain.network.RetrofitService
import com.example.purelearn.repository.CategoryRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import retrofit2.Response
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



//    override suspend fun getCategoryById(id: Int): Flow<CategoryDetails> = flow {
//        Log.d("Repo", "getCategoryById() called with id=$id") // ← Add this
//
//        val result = retrofitService.getCategoryById(
//            learnerId = 1,
//            categoryId = id
//        )
//        Log.d("Repo", "Fetched Category: $result")
//        emit(result)
//    }.flowOn(Dispatchers.IO)

    override suspend fun getCategoryById(id: Int): Flow<CategoryDetails> = flow {
        try {
            // Make the API call to Retrofit
            val result = retrofitService.getCategoryById(
                learnerId = 1,   // Use the learnerId as required
                categoryId = id  // Pass the categoryId received
            )

            // Log the entire result to check if it's valid
            Log.d("Repo", "Fetched Category: $result")

            // Check if the result is null and log it
            if (result == null) {
                Log.e("Repo", "Category data is null for id=$id")
            } else {
                // If the result is not null, log its properties (like title and description)
                Log.d("Repo", "Category fetched: Title = ${result.title}, Description = ${result.description}")
            }

            // Emit the result (valid data or null)
            emit(result)
        } catch (e: Exception) {
            // Catch and log any errors that occur during the API call
            Log.e("Repo", "Error fetching category: ${e.message}")
            // Optionally emit a failure state here if necessary
        }
    }.flowOn(Dispatchers.IO)

    override suspend fun deleteCategory(id: Int): Flow<CategoryResponse> = flow {
        emit(retrofitService.deleteCategory(
            learnerId = 1,
            categoryId = id
        ))
    }.flowOn(Dispatchers.IO)


//    override suspend fun softDeleteCategory(id: Int): Flow<MessageResponse> = flow {
//        emit(retrofitService.softDeleteCategory(
//            learnerId = 1,
//            categoryId = id
//        ))
//    }.flowOn(Dispatchers.IO)


    override suspend fun softDeleteCategory(id: Int): Flow<MessageResponse> = flow {
        val response = retrofitService.softDeleteCategory(
            learnerId = 1,
            categoryId = id
        )
        if (response.isSuccessful) {
            emit(response.body() ?: throw Exception("Empty response body"))
        } else {
            throw Exception("Failed to soft delete category: ${response.code()}")
        }
    }.flowOn(Dispatchers.IO)


    override suspend fun restoreCategory(id: Int): Flow<MessageResponse> = flow {
        val response = retrofitService.restoreCategory(learnerId = 1, categoryId = id)
        if (response.isSuccessful) {
            emit(response.body() ?: throw Exception("Empty response body"))
        } else {
            throw Exception("Failed to restore category: ${response.code()}")
        }
    }.flowOn(Dispatchers.IO)


    override suspend fun updateCategory(id: Int, category: Category): Flow<CategoryResponse> = flow {
           emit(retrofitService.updateCategory(
               learnerId =1,
               categoryId = id,
               isDeleted = false,
               category = category
           ))
        }.flowOn(Dispatchers.IO)


//    override suspend fun restoreCategory(id: Int): Flow<MessageResponse> = flow {
//        val response = retrofitService.restoreCategory(learnerId = 1, categoryId = id)
//        if (response.isSuccessful) {
//            emit(response.body() ?: throw Exception("Empty response body"))
//        } else {
//            throw Exception("Failed to restore category: ${response.code()}")
//        }
//    }.flowOn(Dispatchers.IO)




//    override suspend fun restoreCategory(id: Int): Flow<MessageResponse> = flow {
//        val response = retrofitService.restoreCategory(learnerId = 1, categoryId = id)
//        if (response.isSuccessful) {
//            emit(Unit)
//        } else {
//            throw Exception("Failed to restore category")
//        }
//    }.flowOn(Dispatchers.IO)

}