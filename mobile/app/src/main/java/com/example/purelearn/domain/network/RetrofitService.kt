package com.example.purelearn.domain.network

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query
import retrofit2.http.PATCH

interface RetrofitService {

    //physical device  "http://192.168.1.6:5115/api/"
    //emulator  "http://10.0.2.2:5115/api/"
    companion object {
        const val baseUrl = "http://192.168.1.12:5115/api/"
    }

    @GET("learners/{learnerId}/categories")
    suspend fun getCategory(
        @Path("learnerId") learnerId: Int,
        @Query("IsDeleted") isDeleted: Boolean = false
    ): List<CategoryResponse>

    @POST("learners/{learnerId}/categories")
    suspend fun addCategory(
        @Path("learnerId") learnerId: Int,
        @Body category:Category
    ): CategoryResponse

//    @PUT("Categories/{id}/")
//    suspend fun updateCategory(
//        @Path("id") id: Int,
//        @Body category:Category
//    ): CategoryResponse
//

    @PATCH("learners/{learnerId}/categories/{categoryId}")
    suspend fun updateCategory(
        @Path("learnerId") learnerId: Int,
        @Path("categoryId") categoryId: Int,
        @Query("IsDeleted") isDeleted: Boolean = false,
        @Body category: Category
    ): CategoryResponse

    @DELETE("learners/{learnerId}/categories/{categoryId}")
    suspend fun deleteCategory(
    @Path("learnerId") learnerId: Int,
    @Path("categoryId") categoryId: Int
    ): CategoryResponse
}