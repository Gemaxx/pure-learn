package com.example.purelearn.domain.model

data class ResourceTypeResponse(
       val id: Int,
       val name: String,
       val unitType: String
)
data class ResourceType(
       val id: Int? = null,
       val name: String,
       val unitType: String
)
