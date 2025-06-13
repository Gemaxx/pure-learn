package com.example.purelearn.domain.network

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryDetails
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.GoalResponse
import com.example.purelearn.domain.model.KanbanStatusRequest
import com.example.purelearn.domain.model.KanbanStatusResponse
import com.example.purelearn.domain.model.Note
import com.example.purelearn.domain.model.NoteRequest
import com.example.purelearn.domain.model.NoteResponse
import com.example.purelearn.domain.model.Resource
import com.example.purelearn.domain.model.ResourceDetails
import com.example.purelearn.domain.model.ResourceResponse
import com.example.purelearn.domain.model.ResourceType
import com.example.purelearn.domain.model.ResourceTypeDetails
import com.example.purelearn.domain.model.ResourceTypeResponse

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.timeout
import io.ktor.client.request.*
import io.ktor.client.statement.HttpResponse
import io.ktor.client.utils.EmptyContent.contentType
import io.ktor.http.*
import io.ktor.util.*
import okhttp3.OkHttpClient
import javax.inject.Inject


class KtorService @Inject constructor(
    private val httpClient: HttpClient
) {
     //physical device  "http://192.168.1.6:5115/api/"
    //emulator  "http://10.0.2.2:5115/api/"

    private val baseUrl = "http://192.168.1.9:5115/api/"

    suspend fun getCategory(): List<CategoryResponse> {
        return httpClient.get {
            url(baseUrl){
                timeout { requestTimeoutMillis=60000 }
            }
        }.body()
    }

    @OptIn(InternalAPI::class)
    suspend fun addCategory(category:Category): CategoryResponse {
        return httpClient.post {
            contentType(ContentType.Application.Json)
            url(baseUrl)
            setBody(category)

        }.body()
    }

    suspend fun deleteCategory(id: Int): HttpResponse {
        return httpClient.delete("$baseUrl/$id")
    }
    suspend fun softDeleteCategory(id: Int): HttpResponse {
        return httpClient.delete("$baseUrl/$id")
    }

    @OptIn(InternalAPI::class)
    suspend fun restoreCategory(learnerId: Int, categoryId: Int): CategoryResponse {
        return httpClient.patch {
            url("$baseUrl/api/learners/$learnerId/categories/restore/$categoryId")
            contentType(ContentType.Application.Json)
          //  setBody(category)
        }.body()
    }


    @OptIn(InternalAPI::class)
    suspend fun updateCategory(learnerId: Int, categoryId: Int, category: Category): CategoryResponse {
        return httpClient.patch {
            url("$baseUrl/api/learners/$learnerId/categories/$categoryId")
            contentType(ContentType.Application.Json)
            setBody(category)
        }.body()
    }



    @OptIn(InternalAPI::class)
    suspend fun getCategoryById(learnerId: Int, categoryId: Int): CategoryDetails {
        return httpClient.get {
            url("$baseUrl/api/learners/$learnerId/categories/$categoryId")
            contentType(ContentType.Application.Json)
          //  setBody(category)
        }.body()
    }




    suspend fun getGoal(): List<GoalResponse> {
        return httpClient.get {
            url(baseUrl){
                timeout { requestTimeoutMillis=60000 }
            }
        }.body()
    }

    @OptIn(InternalAPI::class)
    suspend fun addGoal(goal: Goal): GoalResponse {
        return httpClient.post {
            contentType(ContentType.Application.Json)
            url(baseUrl)
            setBody(goal)

        }.body()
    }

    suspend fun deleteGoal(id: Int): HttpResponse {
        return httpClient.delete("$baseUrl/$id")
    }

    @OptIn(InternalAPI::class)
    suspend fun updateGoal(learnerId: Int, goalId: Int, goal: Goal): GoalResponse {
        return httpClient.patch {
            url("$baseUrl/api/learners/$learnerId/goals/$goalId")
            contentType(ContentType.Application.Json)
            setBody(goal)
        }.body()
    }


    suspend fun getGoalById(learnerId: Int, goalId: Int): CategoryDetails {
        return httpClient.get {
            url("$baseUrl/api/learners/$learnerId/goals/$goalId")
            contentType(ContentType.Application.Json)
            //  setBody(category)
        }.body()
    }


    suspend fun softDeleteGoal(id: Int): HttpResponse {
        return httpClient.delete("$baseUrl/$id")
    }

    @OptIn(InternalAPI::class)
    suspend fun restoreGoal(learnerId: Int, goalId: Int): GoalResponse {
        return httpClient.patch {
            url("$baseUrl/api/learners/$learnerId/goals/$goalId/restore")
            contentType(ContentType.Application.Json)
            //  setBody(category)
        }.body()
    }



    suspend fun getResource(): List<ResourceResponse> {
        return httpClient.get {
            url(baseUrl){
                timeout { requestTimeoutMillis=60000 }
            }
        }.body()
    }

    @OptIn(InternalAPI::class)
    suspend fun addResource(resource: Resource): ResourceResponse {
        return httpClient.post {
            contentType(ContentType.Application.Json)
            url(baseUrl)
            setBody(resource)

        }.body()
    }

    suspend fun deleteResource(id: Int): HttpResponse {
        return httpClient.delete("$baseUrl/$id")
    }

    @OptIn(InternalAPI::class)
    suspend fun updateResource(learnerId: Int, learningResourcesId: Int, resource: Resource): ResourceResponse {
        return httpClient.patch {
            url("$baseUrl/api/learners/$learnerId/LearningResources/$learningResourcesId")
            contentType(ContentType.Application.Json)
            setBody(resource)
        }.body()
    }




    suspend fun getResourceById(learnerId: Int, learningResourceId: Int): ResourceDetails {
        return httpClient.get {
            url("$baseUrl/api/learners/$learnerId/LearningResources/$learningResourceId")
            contentType(ContentType.Application.Json)
            //  setBody(category)
        }.body()
    }


    suspend fun softDeleteResource(id: Int): HttpResponse {
        return httpClient.delete("$baseUrl/$id")
    }

    @OptIn(InternalAPI::class)
    suspend fun restoreResource(learnerId: Int, learningResourceId: Int): ResourceResponse {
        return httpClient.patch {
            url("$baseUrl/api/learners/$learnerId/LearningResources/$learningResourceId/restore")
            contentType(ContentType.Application.Json)
            //  setBody(category)
        }.body()
    }




    suspend fun getResourceType(): List<ResourceTypeResponse> {
        return httpClient.get {
            url(baseUrl){
                timeout { requestTimeoutMillis=60000 }
            }
        }.body()
    }

    suspend fun getResourceTypeById(learnerId: Int, learningResourceTypeId : Int): ResourceTypeDetails {
        return httpClient.get {
            url("$baseUrl/api/learners/$learnerId/learningResourceTypes/$learningResourceTypeId")
            contentType(ContentType.Application.Json)
            //  setBody(category)
        }.body()
    }


    suspend fun addResourceType(resourceType:ResourceType): ResourceTypeResponse {
        return httpClient.post {
            contentType(ContentType.Application.Json)
            url(baseUrl)
            setBody(resourceType)

        }.body()
    }


    suspend fun deleteResourceType(id: Int): HttpResponse {
        return httpClient.delete("$baseUrl/$id")
    }

    @OptIn(InternalAPI::class)
    suspend fun updateResourceType(learnerId: Int, learningResourceTypeId: Int, resourceType: ResourceType): ResourceTypeResponse {
        return httpClient.patch {
            url("$baseUrl/api/learners/$learnerId/learningResourceTypes/$learningResourceTypeId")
            contentType(ContentType.Application.Json)
            setBody(resourceType)
        }.body()
    }







    suspend fun getNote(): List<NoteResponse> {
        return httpClient.get {
            url(baseUrl){
                timeout { requestTimeoutMillis=60000 }
            }
        }.body()
    }



    @OptIn(InternalAPI::class)
    suspend fun addNote(note: NoteRequest): NoteRequest {
        return httpClient.post {
            contentType(ContentType.Application.Json)
            url(baseUrl)
            setBody(note)

        }.body()
    }

    suspend fun deleteNote(id: Int): HttpResponse {
        return httpClient.delete("$baseUrl/$id")
    }

    @OptIn(InternalAPI::class)
    suspend fun updateNote(learnerId: Int, noteId: Int, note: NoteRequest): NoteRequest {
        return httpClient.patch {
            url("$baseUrl/api/learners/$learnerId/Notes/$noteId")
            contentType(ContentType.Application.Json)
            setBody(note)
        }.body()
    }


    suspend fun getKanbanStatus(): List<KanbanStatusResponse> {
        return httpClient.get {
            url(baseUrl){
                timeout { requestTimeoutMillis=60000 }
            }
        }.body()
    }



    @OptIn(InternalAPI::class)
    suspend fun addKanbanStatus(kanbanStatus: KanbanStatusRequest): KanbanStatusRequest {
        return httpClient.post {
            contentType(ContentType.Application.Json)
            url(baseUrl)
            setBody(kanbanStatus)

        }.body()
    }

    suspend fun deleteKanbanStatus(id: Int): HttpResponse {
        return httpClient.delete("$baseUrl/$id")
    }

    @OptIn(InternalAPI::class)
    suspend fun updateKanbanStatus(goalId: Int, statusId : Int, kanbanStatus: KanbanStatusRequest): KanbanStatusRequest {
        return httpClient.patch {
            url("$baseUrl/api/goals/$goalId/kanbanstatuses/$statusId")
            contentType(ContentType.Application.Json)
            setBody(kanbanStatus)
        }.body()
    }





}