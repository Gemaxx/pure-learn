package com.example.purelearn.ui.theme.home.homeviewmodel

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.purelearn.repository.CategoryRepository
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryUiEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.status.CategoryState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.onStart
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class CategoryViewModel @Inject constructor(
    private val repository: CategoryRepository
):ViewModel (){
    private val _categoryResponseEvent= mutableStateOf(CategoryState())
    var categoryResponseEvent:State<CategoryState> = _categoryResponseEvent
        private set

    private val _addCategoryEvent: MutableSharedFlow<CategoryUiEvents> = MutableSharedFlow()
    var addCategoryEvent = _addCategoryEvent.asSharedFlow()
        private set

    private val _deleteCategoryEvent: MutableSharedFlow<CategoryUiEvents> = MutableSharedFlow()
    var deleteCategoryEvent = _deleteCategoryEvent.asSharedFlow()
        private set


    private val _updateCategoryEvent: MutableSharedFlow<CategoryUiEvents> = MutableSharedFlow()
    var updateCategoryEvent = _updateCategoryEvent.asSharedFlow()
        private set


    fun onEvent(events:CategoryEvents){
        when (events){

            is CategoryEvents.AddCategoryEvent->{
                viewModelScope.launch {
                    repository.addCategory(events.data)
                        .onStart {
                            _addCategoryEvent.emit(
                                CategoryUiEvents.Loading
                            )
                        }.catch {
                            _addCategoryEvent.emit(
                                CategoryUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _addCategoryEvent.emit(
                                CategoryUiEvents.Success(it)
                            )
                        }
                }
            }

            is CategoryEvents.DeleteCategoryEvent->{
                viewModelScope.launch {
                    repository.deleteCategory(events.id)
                        .onStart {
                            _deleteCategoryEvent.emit(
                                CategoryUiEvents.Loading
                            )
                        }.catch {
                            _deleteCategoryEvent.emit(
                                CategoryUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _deleteCategoryEvent.emit(
                                CategoryUiEvents.Success(it)
                            )
                        }
                }
            }

            is CategoryEvents.UpdateCategoryEvent->{
                viewModelScope.launch {
                    repository.updateCategory(events.id,events.category)
                        .onStart {
                            _updateCategoryEvent.emit(
                                CategoryUiEvents.Loading
                            )
                        }.catch {
                            _updateCategoryEvent.emit(
                                CategoryUiEvents.Failure(it.message?:"Something went wrong")
                            )
                        }.collect{
                            _updateCategoryEvent.emit(
                                CategoryUiEvents.Success(it)
                            )
                        }
                }
            }

            CategoryEvents.ShowCategories -> {
                viewModelScope.launch {
                    repository.getCategory()
                        .onStart {
                            _categoryResponseEvent.value = CategoryState(
                                isLoading = true
                            )
                        }.catch {
                            _categoryResponseEvent.value = CategoryState(
                                error = it.message ?: "Something went wrong"
                            )
                        }.collect {
                            _categoryResponseEvent.value = CategoryState(
                                data = it
                            )
                        }
                }
            }

        }
    }
}