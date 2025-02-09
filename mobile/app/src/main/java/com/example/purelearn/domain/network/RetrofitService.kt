package com.example.purelearn.domain.network

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface RetrofitService {

    //physical device  "http://192.168.1.6:5115/api/"
    //emulator  "http://10.0.2.2:5115/api/"
    companion object {
        const val baseUrl = "http://192.168.1.6:5115/api/"
    }

    @GET("Categories")
    suspend fun getCategory(): List<CategoryResponse>

    @POST("Categories")
    suspend fun addCategory(
        @Body category:Category
    ): CategoryResponse

    @PUT("Categories/{id}/")
    suspend fun updateCategory(
        @Path("id") id: Int,
        @Body category:Category
    ): CategoryResponse

    @DELETE("Categories/{id}/")
    suspend fun deleteCategory(
        @Path("id") id: Int
    ): CategoryResponse
}