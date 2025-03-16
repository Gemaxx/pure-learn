package com.example.purelearn.domain.network

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.GoalResponse
import com.example.purelearn.domain.model.Resource
import com.example.purelearn.domain.model.ResourceResponse

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

    private val baseUrl = "http://192.168.1.8:5115/api/"

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

    @OptIn(InternalAPI::class)
    suspend fun updateCategory(learnerId: Int, categoryId: Int, category: Category): CategoryResponse {
        return httpClient.patch {
            url("$baseUrl/api/learners/$learnerId/categories/$categoryId")
            contentType(ContentType.Application.Json)
            setBody(category)
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




}