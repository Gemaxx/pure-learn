package com.example.purelearn.ui.theme.home.homeviewmodel.events

import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse

sealed class CategoryEvents {
    data class AddCategoryEvent(val data: Category) : CategoryEvents()
     data class DeleteCategoryEvent(val id: Int) : CategoryEvents()
    data class UpdateCategoryEvent(val id: Int, val category: Category) : CategoryEvents()
    object ShowCategories : CategoryEvents()

}

sealed class CategoryUiEvents {
    data class Success(val data: CategoryResponse) :CategoryUiEvents()
    data class Failure(val msg: String) : CategoryUiEvents()
    object Loading : CategoryUiEvents()

}