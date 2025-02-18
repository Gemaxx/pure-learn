package com.example.purelearn.domain.model


import com.example.purelearn.ui.theme.gradient1
import com.example.purelearn.ui.theme.gradient2
import com.example.purelearn.ui.theme.gradient3
import com.example.purelearn.ui.theme.gradient4
import com.example.purelearn.ui.theme.gradient5
import com.google.gson.annotations.SerializedName
import kotlinx.serialization.SerialName

data class CategoryResponse(
    val id: Int,
    val title: String,
    val description: String,
    val created_at: String,
    val updated_at: String
)

//data class Category(
//    val color: String,
//    //val createdAt: String,
//   // val deletedAt: String,
//    val description: String,
//    //val goals: List<GoalX>,
//   // val id: Int,
//    //val inverseParentCategory: List<String>,
//    val learner: () -> Unit,
////    val learnerId: Int,
////    val learningResources: List<LearningResourceXXX>,
////    val notes: List<NoteXXXX>,
////    val parentCategory: String,
////    val parentCategoryId: Int,
////    val tasks: List<TaskXXXXXXXXXXXX>,
//    val title: String,
//    //val updatedAt: String
//    val category:String,
//
//    )
//{
//
//    companion object{
//        val CategoryCardColors= listOf(gradient1, gradient2, gradient3, gradient4, gradient5)
//    }
//}

data class Learner(
    @SerializedName("id") val id: Int,
    @SerializedName("name") val name: String,
    @SerializedName("email") val email: String,
    @SerializedName("passwordHash") val passwordHash: String
)

data class Category(
    @SerializedName("category") val category: String,
    @SerializedName("description") val description: String,
    @SerializedName("learner") val learner: Learner,
    @SerializedName("title") val title: String,
    @SerializedName("color") val color: String,
    @SerialName("createdAt") val createdAt: String?,  // Ensure correct casing
    @SerialName("updatedAt") val updatedAt: String?,
)
{
    companion object{
          val CategoryCardColors= listOf(gradient1, gradient2, gradient3, gradient4, gradient5)
      }

}