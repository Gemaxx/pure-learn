package com.example.purelearn.domain.network

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.GoalResponse
import com.example.purelearn.domain.model.Resource
import com.example.purelearn.domain.model.ResourceResponse
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
        const val baseUrl = "http://192.168.1.8:5115/api/"
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





    @GET("learners/{learnerId}/goals")
    suspend fun getGoal(
        @Path("learnerId") learnerId: Int,
        @Query("IsDeleted") isDeleted: Boolean? = null,
        @Query("CategoryId") categoryId: Int? = null,
        @Query("Status") status: String? = null,
        @Query("Term") term: String? = null,
        @Query("SortBy") sortBy: String? = null,
        @Query("IsSortAscending") isSortAscending: Boolean? = null
    ): List<GoalResponse>

    @POST("learners/{learnerId}/goals")
    suspend fun addGoal(
        @Path("learnerId") learnerId: Int,
        @Body goal: Goal
    ): GoalResponse


    @PATCH("learners/{learnerId}/goals/{goalId}")
    suspend fun updateGoal(
        @Path("learnerId") learnerId: Int,
        @Path("goalId") goalId: Int,
        @Body goal: Goal
    ): GoalResponse


    @DELETE("learners/{learnerId}/goals/{goalId}/hard-delete")
    suspend fun deleteGoal(
        @Path("learnerId") learnerId: Int,
        @Path("goalId") goalId: Int
    ): GoalResponse






    @GET("learners/{learnerId}/LearningResources")
    suspend fun getResource(
         @Path("learnerId") learnerId: Int,
        @Query("GoalId") goalId: Int? = null
    ): List<ResourceResponse>

    @POST("learners/{learnerId}/LearningResources")
    suspend fun addResource(
        @Path("learnerId") learnerId: Int,
        @Body resource: Resource
    ): ResourceResponse


    @PATCH("learners/{learnerId}/LearningResources/{learningResourcesId}")
    suspend fun updateResource(
        @Path("learnerId") learnerId: Int,
        @Path("learningResourcesId") learningResourcesId: Int,
        @Body resource: Resource
    ): ResourceResponse


    @DELETE("learners/{learnerId}/LearningResources/{learningResourceId}/hard-delete")
    suspend fun deleteResource(
        @Path("learnerId") learnerId: Int,
        @Path("learningResourceId") learningResourceId: Int,
    ): ResourceResponse


}