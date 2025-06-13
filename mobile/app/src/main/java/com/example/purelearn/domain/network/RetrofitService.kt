package com.example.purelearn.domain.network

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryDetails
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.GoalDetails
import com.example.purelearn.domain.model.GoalResponse
import com.example.purelearn.domain.model.KanbanStatusRequest
import com.example.purelearn.domain.model.KanbanStatusResponse
import com.example.purelearn.domain.model.MessageResponse
import com.example.purelearn.domain.model.NoteRequest
import com.example.purelearn.domain.model.NoteResponse
import com.example.purelearn.domain.model.Resource
import com.example.purelearn.domain.model.ResourceDetails
import com.example.purelearn.domain.model.ResourceResponse
import com.example.purelearn.domain.model.ResourceType
import com.example.purelearn.domain.model.ResourceTypeDetails
import com.example.purelearn.domain.model.ResourceTypeResponse
import retrofit2.Response
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
        const val baseUrl = "http://192.168.1.9:5115/api/"
    }

    @GET("learners/{learnerId}/categories")
    suspend fun getCategory(
        @Path("learnerId") learnerId: Int,
        @Query("IsDeleted") isDeleted: Boolean = false,
        @Query("PageNumber") page: Int = 1,
        @Query("PageSize") size: Int = 100
    ): List<CategoryResponse>


    @GET("learners/{learnerId}/categories/{categoryId}")
    suspend fun getCategoryById(
        @Path("learnerId") learnerId: Int,
        @Path("categoryId") categoryId: Int
    ): CategoryDetails

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

    @PATCH("learners/{learnerId}/categories/restore/{categoryId}")
    suspend fun restoreCategory(
        @Path("learnerId") learnerId: Int,
        @Path("categoryId") categoryId: Int
    ): Response<MessageResponse>

    @DELETE("learners/{learnerId}/categories/{categoryId}")
    suspend fun deleteCategory(
    @Path("learnerId") learnerId: Int,
    @Path("categoryId") categoryId: Int
    ): CategoryResponse

    @DELETE("learners/{learnerId}/categories/softDelete/{categoryId}")
    suspend fun softDeleteCategory(
        @Path("learnerId") learnerId: Int,
        @Path("categoryId") categoryId: Int
    ): Response<MessageResponse>

    @GET("learners/{learnerId}/goals")
    suspend fun getGoal(
        @Path("learnerId") learnerId: Int,
        @Query("Title") title: String? = null,
        @Query("CategoryId") categoryId: Long? = null,
        @Query("Status") status: String? = null,
        @Query("Term") term: String? = null,
        @Query("IsDeleted") isDeleted: Boolean? = null,
        @Query("IsSortAscending") isSortAscending: Boolean? = null,
        @Query("SortBy") sortBy: String? = null,
        @Query("IsDescending") isDescending: Boolean? = null,
        @Query("PageNumber") pageNumber: Int? = null,
        @Query("PageSize") pageSize: Int? = null
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


    @GET("learners/{learnerId}/goals/{goalId}")
    suspend fun getGoalById(
        @Path("learnerId") learnerId: Int,
        @Path("goalId") goalId: Int
    ): GoalDetails



    @PATCH("learners/{learnerId}/goals/{goalId}/restore")
    suspend fun restoreGoal(
        @Path("learnerId") learnerId: Int,
        @Path("goalId") goalId: Int
    ): Response<MessageResponse>


    @DELETE("learners/{learnerId}/goals/{goalId}/soft-delete")
    suspend fun softDeleteGoal(
        @Path("learnerId") learnerId: Int,
        @Path("goalId") goalId: Int
    ): Response<MessageResponse>


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




    @GET("learners/{learnerId}/LearningResources/{learningResourceId}")
    suspend fun getResourceById(
        @Path("learnerId") learnerId: Int,
        @Path("learningResourceId") learningResourceId: Int
    ): ResourceDetails


    @PATCH("learners/{learnerId}/LearningResources/{learningResourceId}/restore")
    suspend fun restoreResource(
        @Path("learnerId") learnerId: Int,
        @Path("learningResourceId") learningResourceId: Int
    ): Response<MessageResponse>


    @DELETE("learners/{learnerId}/LearningResources/{learningResourceId}/soft-delete")
    suspend fun softDeleteResource(
        @Path("learnerId") learnerId: Int,
        @Path("learningResourceId") learningResourceId: Int
    ): Response<MessageResponse>


    @GET("learners/{learnerId}/learningResourceTypes")
    suspend fun getResourceType(
        @Path("learnerId") learnerId: Int
    ): List<ResourceTypeResponse>


    @POST("learners/{learnerId}/learningResourceTypes")
    suspend fun addResourceType(
        @Path("learnerId") learnerId: Int,
        @Body resourceType : ResourceType
    ): ResourceTypeResponse


    @GET("learners/{learnerId}/learningResourceTypes/{learningResourceTypeId}")
    suspend fun getResourceTypeById(
        @Path("learnerId") learnerId: Int,
        @Path("learningResourceTypeId ") learningResourceTypeId : Int
    ): ResourceTypeDetails

    @PATCH("learners/{learnerId}/learningResourceTypes/{learningResourceTypeId}")
    suspend fun updateResourceType(
        @Path("learnerId") learnerId: Int,
        @Path("learningResourceTypeId") resourceTypeId: Int,
        @Body resourceType: ResourceType
    ): ResourceTypeResponse

    @DELETE("learners/{learnerId}/learningResourceTypes/{learningResourceTypeId}/hard-delete")
    suspend fun deleteResourceType(
        @Path("learnerId") learnerId: Int,
        @Path("learningResourceTypeId") learningResourceTypeId: Int
    ): ResourceTypeResponse




    @GET("learners/{learnerId}/Notes")
    suspend fun getNote(
        @Path("learnerId") learnerId: Int,
        @Query("goalId") goalId: Int,
        @Query("IsDeleted") isDeleted: Boolean = false
    ): List<NoteResponse>


    @POST("learners/{learnerId}/Notes")
    suspend fun addNote(
        @Path("learnerId") learnerId: Int,
        @Body note: NoteRequest
    ): NoteRequest


    @PATCH("learners/{learnerId}/Notes/{noteId}")
    suspend fun updateNote(
        @Path("learnerId") learnerId: Int,
        @Path("noteId") noteId: Int,
        @Body note: NoteRequest
    ): NoteRequest


    @DELETE("learners/{learnerId}/Notes/{noteId}/hard-delete")
    suspend fun deleteNote(
        @Path("learnerId") learnerId: Int,
        @Path("noteId") noteId: Int
    ): NoteResponse






    @GET("goals/{goalId}/kanbanstatuses")
    suspend fun getKanbanStatus(
        @Path("goalId") goalId : Int,
    ): List<KanbanStatusResponse>


    @POST("goals/{goalId}/kanbanstatuses")
    suspend fun addKanbanStatus(
        @Path("goalId") goalId : Int,
        @Body kanbanStatus: KanbanStatusRequest
    ): KanbanStatusRequest


    @PATCH("goals/{goalId}/kanbanstatuses/{statusId}")
    suspend fun updateKanbanStatus(
        @Path("goalId") goalId : Int,
        @Path("statusId") statusId: Int,
        @Body kanbanStatus: KanbanStatusRequest
    ): KanbanStatusRequest


    @DELETE("goals/{goalId}/kanbanstatuses/{statusId}")
    suspend fun deleteKanbanStatus(
        @Path("goalId") goalId : Int,
        @Path("statusId") statusId : Int
    ): Response<Unit>
            //KanbanStatusResponse
}