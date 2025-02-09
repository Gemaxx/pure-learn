//package com.example.purelearn.ui.theme.home
//
//import androidx.compose.animation.AnimatedVisibility
//import androidx.compose.animation.core.animateFloat
//import androidx.compose.animation.core.updateTransition
//import androidx.compose.animation.expandVertically
//import androidx.compose.animation.fadeIn
//import androidx.compose.animation.fadeOut
//import androidx.compose.animation.shrinkVertically
//import androidx.compose.animation.slideInVertically
//import androidx.compose.animation.slideOutVertically
//import androidx.compose.foundation.border
//import androidx.compose.foundation.clickable
//import androidx.compose.foundation.layout.Arrangement
//import androidx.compose.foundation.layout.Box
//import androidx.compose.foundation.layout.Column
//import androidx.compose.foundation.layout.Row
//import androidx.compose.foundation.layout.Spacer
//import androidx.compose.foundation.layout.fillMaxSize
//import androidx.compose.foundation.layout.height
//import androidx.compose.foundation.layout.padding
//import androidx.compose.foundation.lazy.LazyColumn
//import androidx.compose.foundation.shape.RoundedCornerShape
//import androidx.compose.material.icons.Icons
//import androidx.compose.material.icons.filled.Add
//import androidx.compose.material3.FloatingActionButton
//import androidx.compose.material3.Icon
//import androidx.compose.material3.Scaffold
//import androidx.compose.material3.Text
//import androidx.compose.runtime.Composable
//import androidx.compose.runtime.LaunchedEffect
//import androidx.compose.runtime.collectAsState
//import androidx.compose.runtime.getValue
//import androidx.compose.runtime.mutableStateOf
//import androidx.compose.runtime.remember
//import androidx.compose.runtime.saveable.rememberSaveable
//import androidx.compose.runtime.setValue
//import androidx.compose.ui.Alignment
//import androidx.compose.ui.Modifier
//import androidx.compose.ui.draw.rotate
//import androidx.compose.ui.geometry.Offset
//import androidx.compose.ui.graphics.Color
//import androidx.compose.ui.input.nestedscroll.NestedScrollConnection
//import androidx.compose.ui.input.nestedscroll.NestedScrollSource
//import androidx.compose.ui.input.nestedscroll.nestedScroll
//import androidx.compose.ui.unit.dp
//import androidx.lifecycle.viewmodel.compose.viewModel
//import androidx.navigation.NavController
//import com.example.purelearn.domain.model.Category
//import com.example.purelearn.ui.theme.components.AddCategoryDialog
//import com.example.purelearn.ui.theme.components.HomeTopAppBar
//import com.example.purelearn.ui.theme.components.categoryList
//
//
//@Composable
//fun HomeScreen(viewModel: CategoryViewModel = viewModel(),
//               navController: NavController) {
//
//
//    var isAddCategoryDialogOpen by rememberSaveable { mutableStateOf(false) }
//
//
//    val isVisible = rememberSaveable { mutableStateOf(true) }
//
//    val categories by viewModel.categories.collectAsState()
//    var title by remember { mutableStateOf("") }
//    var description by remember { mutableStateOf("") }
//    var showCategories by remember { mutableStateOf(false) }
//
//    LaunchedEffect(Unit) {
//        viewModel.fetchCategories()
//    }
//
//    // Nested scroll for control FAB
//    val nestedScrollConnection = remember {
//        object : NestedScrollConnection {
//            override fun onPreScroll(available: Offset, source: NestedScrollSource): Offset {
//                // Hide FAB
//                if (available.y < -1) {
//                    isVisible.value = false
//                }
//
//                // Show FAB
//                if (available.y > 1) {
//                    isVisible.value = true
//                }
//
//                return Offset.Zero
//            }
//        }
//    }
////    var categoryName by remember { mutableStateOf("") }
////    var description by remember { mutableStateOf("") }
//    var selectedColor by remember {
//        mutableStateOf(Category.CategoryCardColors .random()) }
//    AddCategoryDialog(
//        viewModel = viewModel,
//        isOpen = isAddCategoryDialogOpen,
//      //  title = "AddCategory",
//        selectedColors = selectedColor,
//        categoryName = title,
//        onColorChange = {},
//        onCategoryNameChange = {},
//        onDismissRequest = { isAddCategoryDialogOpen = false },
//       // description = description,
//        onDescriptionChange = {},
//        onConfirmButtonClick = {}
//    )
//    MainUI()
//
//    Scaffold(modifier=Modifier.fillMaxSize(),
//        floatingActionButton = {
//            AnimatedVisibility(
//                visible = isVisible.value,
//                enter = slideInVertically(initialOffsetY = { it * 2 }),
//                exit = slideOutVertically(targetOffsetY = { it * 2 }),
//            ) {
//                FloatingActionButton(
//                    modifier = Modifier.padding(bottom = 50.dp),
//                    onClick = { isAddCategoryDialogOpen = true }) {
//                    Icon(Icons.Filled.Add, contentDescription = "Add")
//                }
//
//
//        }
//         }
//,
//        topBar = { HomeTopAppBar("Fatema Emara") }
//    )
//    { paddingValues ->
//        Column(modifier = Modifier.fillMaxSize().padding(paddingValues)) {
//        LazyColumn(
//            modifier = Modifier
//                .fillMaxSize()
//   //               .padding(paddingValues)
//                     .nestedScroll(nestedScrollConnection)
//
//        ) {
//
//                 categoryList(
//                viewModel = viewModel,
//                categoryTitle = "My Categories",
//                emptyListText = "You do not have any category click the + button to add one.",
//                categories = categories,
//                navController = navController,
//                onDeleteIconClick = {},
//               // categories = TODO()
//            )
//    }
//        }
//
//
//
//
//    }
//}
//
//
//@Composable
//fun MainUI(modifier: Modifier = Modifier ) {
//    var isExpanded by remember {
//        mutableStateOf(false)
//    }
//    val items = listOf(
//
//        MinFabItems("Add Category")
//
//    )
//
//    Column (horizontalAlignment = Alignment.End)
//    {
//        AnimatedVisibility(visible = isExpanded,
//            enter= fadeIn() + slideInVertically (initialOffsetY={it}) + expandVertically(),
//            exit = fadeOut() + slideOutVertically (targetOffsetY = { it }) + shrinkVertically()
//        ){
//            LazyColumn (Modifier.padding(bottom = 8.dp)){
//                items(items.size){
//                    ItemUI( title = items[it].title)
//                    Spacer(modifier=Modifier.height(8.dp))
//                }
//            }
//        }
//
//
//        val transition = updateTransition(targetState = isExpanded, label = "transition")
//        val rotation by transition.animateFloat  (label = "rotation")
//        {
//            if(it)315f else 0f
//        }
//
//        FloatingActionButton(
//            onClick = { isExpanded = ! isExpanded },
//            containerColor = Color(0xFF03A9F4),
//            modifier = Modifier.padding(bottom = 40.dp)
//        ) {
//            Icon(
//                imageVector = Icons.Filled.Add, contentDescription = "",
//                modifier = Modifier.rotate(rotation)
//            )
//        }
//    }
//}
//
//
//
//@Composable
//fun ItemUI(
//    title: String,
//           ) {
//    var isAddCategoryDialogOpen by rememberSaveable { mutableStateOf(false) }
//
//    // val context= LocalContext.current
//    Row (verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.End){
//        Spacer(modifier = Modifier.weight(1f))
//        Box(modifier = Modifier
//            .border(2.dp, Color(0xFF13A0E0), RoundedCornerShape(10.dp))
//            .padding(6.dp)
//            .clickable {
//                  isAddCategoryDialogOpen=true
//            }
//        )
//        {
//            Text(text = title)
//        }
//
//    }
//}
//data class MinFabItems(
//
//    val title: String
//)





package com.example.purelearn.ui.theme.home

import android.util.Log
import androidx.compose.animation.*
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.Learner
import com.example.purelearn.ui.theme.components.AddCategoryDialog
import com.example.purelearn.ui.theme.components.HomeTopAppBar
import com.example.purelearn.ui.theme.components.LoadingBar
import com.example.purelearn.ui.theme.components.categoryList
import com.example.purelearn.ui.theme.components.showToast
import com.example.purelearn.ui.theme.home.homeviewmodel.CategoryViewModel
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryUiEvents
import kotlinx.coroutines.flow.collectLatest

@Composable
fun HomeScreen(
    viewModel: CategoryViewModel = hiltViewModel(),
   // navController: NavController
) {

    var isAddCategoryDialogOpen by rememberSaveable { mutableStateOf(false) }
    val isVisible = rememberSaveable { mutableStateOf(true) }
    val selectedColor by remember { mutableStateOf(Category.CategoryCardColors.random()) }



    val response = viewModel.categoryResponseEvent.value
    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }
    var title by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    var categoryId by remember { mutableStateOf(0) }
    if (isLoading) LoadingBar()
    val learner = Learner(
        id = 999999, name = "fff",
        email = "fff@example.com",  // Provide a valid email
        passwordHash = "fff_123" // Provide a valid password hash
    )

    LaunchedEffect(key1 = true) {
        viewModel.onEvent(CategoryEvents.ShowCategories)
    }

    LaunchedEffect(key1 = true) {
        viewModel.updateCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    context.showToast("Note Updated!")
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
                    context.showToast("Note Deleted")
                    viewModel.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                is CategoryUiEvents.Failure -> {
                    context.showToast("Note Deleted")
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
                    context.showToast("Note Added")
                    isAddCategoryDialogOpen = false
                    viewModel.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                is CategoryUiEvents.Failure -> {
                    Log.d("main", "NoteScreen:${it.msg} ")
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
                    modifier = Modifier.padding(bottom = 50.dp),
                    onClick = { isAddCategoryDialogOpen = true }
                ) {
                    Icon(Icons.Filled.Add, contentDescription = "Add")
                }
            }
        },
        topBar = { HomeTopAppBar("Fatema Emara") }
    ) { paddingValues ->
        Column(modifier = Modifier.fillMaxSize().padding(paddingValues)) {
            LazyColumn(modifier = Modifier.fillMaxSize()) {

                    categoryList(
                        viewModel = viewModel,
                        categoryTitle = "My Categories",
                        emptyListText = "You do not have any category. Click the + button to add one.",
                        categories = response.data,
                        //navController = navController,
                        onDeleteIconClick = {}
                    )


            }
        }
    }

    if (isAddCategoryDialogOpen) {
        AddCategoryDialog(
            isOpen = isAddCategoryDialogOpen,
            selectedColors = selectedColor,
            title = title,
            onColorChange = {},
            onTitleChange = { title = it },
            onDescriptionChange = { description = it },
            description = description,
            onShowValue = {},
        )
        {
            if (title.isNotEmpty() && description.isNotEmpty()) {
                viewModel.onEvent(
                    CategoryEvents.AddCategoryEvent(
                        Category(
                            description = description,
                            title = title,
                            color = "",
                            learner = learner,
                            category ="string",
                            createdAt ="2025-02-09T02:50:42.762Z",
                            updatedAt = "2025-02-09T02:50:42.762Z",
                        )
                    )
                )
            } else {
                context.showToast("Please add title and description")
            }
        }
    }
}

@Composable
fun ItemUI(title: String, onItemClick: () -> Unit) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.End
    ) {
        Spacer(modifier = Modifier.weight(1f))
        Box(
            modifier = Modifier
                .border(2.dp, Color(0xFF13A0E0), RoundedCornerShape(10.dp))
                .padding(6.dp)
                .clickable { onItemClick() }
        ) {
            Text(text = title)
        }
    }
}


