package com.example.purelearn.ui.theme.home

import android.util.Log
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.ui.theme.components.AddCategoryDialog
import com.example.purelearn.ui.theme.components.CategoryCard
import com.example.purelearn.ui.theme.components.HomeTopAppBar
import com.example.purelearn.ui.theme.components.LoadingBar
import com.example.purelearn.ui.theme.components.SwipeToDeleteContainer
import com.example.purelearn.ui.theme.components.showToast
import com.example.purelearn.ui.theme.home.homeviewmodel.CategoryViewModel
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryUiEvents
import kotlinx.coroutines.flow.collectLatest


@Composable
fun HomeScreen(
    navController: NavController,
    viewModel: CategoryViewModel = hiltViewModel()
) {


    var isAddCategoryDialogOpen by rememberSaveable { mutableStateOf(false) }
    var isUpdateCategoryDialogOpen by rememberSaveable { mutableStateOf(false) }

    val isVisible = rememberSaveable { mutableStateOf(true) }



    val response = viewModel.categoryResponseEvent.value
    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }
    var title by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    var color by remember { mutableStateOf("#9Eb") }
    var categoryId by remember { mutableStateOf(0) }
    if (isLoading) LoadingBar()



    LaunchedEffect(key1 = true) {
        viewModel.onEvent(CategoryEvents.ShowCategories)
    }

    LaunchedEffect(key1 = true) {
        viewModel.updateCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    context.showToast("Category Updated!")
                    viewModel.onEvent(CategoryEvents.ShowCategories)
                    isAddCategoryDialogOpen = false
                    false
                }

                is CategoryUiEvents.Failure -> {
                    context.showToast(it.msg)
                    false
                }

                CategoryUiEvents.Loading -> true

            }
        }
    }

    LaunchedEffect(key1 = true) {
        viewModel.deleteCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    context.showToast("Category Deleted")
                    viewModel.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                is CategoryUiEvents.Failure -> {
                    context.showToast("Category Deleted")
                    viewModel.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                CategoryUiEvents.Loading -> true

            }
        }
    }

    LaunchedEffect(key1 = true) {
        viewModel.addCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    title = ""
                    description = ""
                    context.showToast("Category Added")
                    isAddCategoryDialogOpen = false
                    viewModel.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                is CategoryUiEvents.Failure -> {
                    Log.d("main", "CategoryScreen:${it.msg} ")
                    context.showToast(it.msg)
                    false
                }

                CategoryUiEvents.Loading -> true
            }
        }
    }


    Scaffold(
        modifier = Modifier.fillMaxSize(),
        floatingActionButton = {
            AnimatedVisibility(
                visible = isVisible.value,
                enter = slideInVertically(initialOffsetY = { it * 2 }),
                exit = slideOutVertically(targetOffsetY = { it * 2 })
            ) {
                FloatingActionButton(
                    modifier = Modifier.size(72.dp) ,
                    onClick = { isAddCategoryDialogOpen = true },
                    containerColor = MaterialTheme.colorScheme.primaryContainer
                ) {
                    Icon(Icons.Filled.Add,
                        contentDescription = "Add",
                        tint = Color.White,
                        modifier = Modifier.size(36.dp)
                    )
                }
            }
        },
        topBar = { HomeTopAppBar(
            userName = "Fatema"
        ) },
        containerColor = MaterialTheme.colorScheme.background
    ) { paddingValues ->


        Column(modifier = Modifier
            .fillMaxSize()
            .padding(paddingValues)) {


            Column(modifier = Modifier
                .fillMaxSize()
                .background(
                    color = MaterialTheme.colorScheme.background
                )){

                Text(
                    text = "Your Categories",
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.onBackground,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 20.dp, vertical = 10.dp)
                )

               if (response.data.isNotEmpty()) LazyColumn(
                   modifier = Modifier.fillMaxSize(),
                   verticalArrangement = Arrangement.spacedBy(10.dp),
                   contentPadding = PaddingValues(20.dp),
               ) {
                   val categories: List<CategoryResponse> = response.data


                   items(categories, key = { it.id })
                   { category ->
                   SwipeToDeleteContainer(
                           item = category,
                           onDelete = {
                                   viewModel.onEvent(CategoryEvents.DeleteCategoryEvent(category.id))
                               },
                           animationDuration = 300,
                           content = { item->
                               CategoryCard(
                               category = item,
//                               {
//                                   title = item.title
//                                   //  description = it.description
//                                   isUpdateCategoryDialogOpen = true
//                                   categoryId = item.id
//                               },
                                   onClick = {
                                       // Navigate to GoalScreen with categoryId
                                      // navController.navigate("goal/${item.id}")
                                       navController.navigate("GoalScreen/${item.id}")


                                   },
                               onUpdateCategory = {
                                   isUpdateCategoryDialogOpen = true
                                   title = item.title
                                   categoryId = item.id
                                   isUpdateCategoryDialogOpen = true
                               }
                           )
                           }
                       )

                   }
               }

                
            }
        }
    }

    Log.d("UpdateCategory", "Updating categoryId: $categoryId with title: $title")

    if(isUpdateCategoryDialogOpen)
    {
        AddCategoryDialog(
            isOpen = isUpdateCategoryDialogOpen,
            title = title,
            onTitleChange = { title = it },
            onDescriptionChange = { description = it },
            description = description,
            onClick = { },
            onDismiss =  { isUpdateCategoryDialogOpen = false },

            onSave={
                if (title.isNotEmpty() && description.isNotEmpty()) {
                    viewModel.onEvent(
                        CategoryEvents.UpdateCategoryEvent(
                            category = Category(
                                id = categoryId,
                                title = title,
                                color = "#FF33A1",
                              //  description = description
                            ),
                            id = categoryId
                        )
                    )
                } else {
                    context.showToast("Please add title and description")
                }
            }
        )
    }


    if (isAddCategoryDialogOpen) {
        AddCategoryDialog(
            isOpen = isAddCategoryDialogOpen,
            title = title,
            onTitleChange = { title = it },
            onDescriptionChange = { description = it },
            description = description,
            onClick = { },
            onDismiss =  { isAddCategoryDialogOpen = false },
            onSave={
                if (title.isNotEmpty() && description.isNotEmpty()) {
                    viewModel.onEvent(
                        CategoryEvents.AddCategoryEvent(
                            Category(
                                id = 2,
                                title = title,
                                color = "#FF33A1",
                                //description = description
                            )
                        )
                    )
                } else {
                    context.showToast("Please add title and description")
                }
            }
        )

    }
}

@Preview
@Composable
fun HomeScreenPreview(modifier: Modifier = Modifier) {
    //HomeScreen()
}


