package com.example.purelearn.ui.theme.Goal.Goalviewmodel.events

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.GoalResponse
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryEvents

sealed class GoalEvents {
    data class AddGoalEvent(val data: Goal, val categoryId: Int) : GoalEvents()
    data class DeleteGoalEvent(val id: Int) : GoalEvents()
    data class GetGoalByIdEvent(val id: Int) : GoalEvents()
    data class SoftDeleteGoalEvent(val id: Int) : GoalEvents()
    data class RestoreGoalEvent(val id: Int) : GoalEvents()
    data class UpdateGoalEvent(val id: Int, val goal: Goal) : GoalEvents()
   // object ShowGoal : GoalEvents()
//   data class ShowGoal(
//       val categoryId: Int,
//       val status: String? = null,
//       val term: String? = null,
//       val sortBy: String? = null,
//       val isSortAscending: Boolean? = null
//   ) : GoalEvents()
   object ShowGoal : GoalEvents()


}

sealed class GoalUiEvents {
    data class Success(val data: GoalResponse) :GoalUiEvents()
    data class Failure(val msg: String) : GoalUiEvents()
    object Loading : GoalUiEvents()

}