package com.example.purelearn.ui.theme.Goal

import android.util.Log
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.Divider
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FabPosition
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.FloatingActionButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SmallFloatingActionButton
import androidx.compose.material3.Snackbar
import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.SnackbarResult
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.State
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.purelearn.R
import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryDetails
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.domain.model.GoalResponse
import com.example.purelearn.domain.model.KanbanStatusRequest
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.AppTypography
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.GoalViewModel
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalEvents
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceEvents
import com.example.purelearn.ui.theme.components.AddCategoryDialog
import com.example.purelearn.ui.theme.components.BottomNavigationBar
import com.example.purelearn.ui.theme.components.GoalScreenTopAppBar
import com.example.purelearn.ui.theme.components.LoadingBar
import com.example.purelearn.ui.theme.components.showToast
import com.example.purelearn.ui.theme.home.homeviewmodel.CategoryViewModel
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryUiEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.status.CategoryState
import com.example.purelearn.ui.theme.kanbanstatus.kanbanstatusviewmodel.events.KanbanStatusEvents
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GoalScreen(
    navController: NavController,
    //categoryId: Int?,
    viewModel: GoalViewModel = hiltViewModel(),
    viewModel2: CategoryViewModel = hiltViewModel(),

    ) {



    val categoryResponse = viewModel2.categoryResponseEvent.value

    val goalResponse = viewModel.goalResponseEvent.value

    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }
    if (isLoading) LoadingBar()

    var isAddCategoryDialogOpen by rememberSaveable { mutableStateOf(false) }
    var isUpdateCategoryDialogOpen by rememberSaveable { mutableStateOf(false) }

    val expandedStates = remember { mutableStateMapOf<String, Boolean>() }


    var categoryId by remember { mutableStateOf(0) }

    var categoryTitle by remember { mutableStateOf("") }
    var categoryDescription by remember { mutableStateOf("") }
    var color by remember { mutableStateOf("#9Eb") }

    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }






    LaunchedEffect(Unit) {
            viewModel2.onEvent(CategoryEvents.ShowCategories)

            viewModel.onEvent(GoalEvents.ShowGoal)

    }


    LaunchedEffect(key1 = true) {
        viewModel2.updateCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    context.showToast("Category Updated!")
                    viewModel2.onEvent(CategoryEvents.ShowCategories)
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
        viewModel2.deleteCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    context.showToast("Category Deleted")
                    viewModel2.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                is CategoryUiEvents.Failure -> {
                    context.showToast("Category Deleted")
                    viewModel2.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                CategoryUiEvents.Loading -> true

            }
        }

    }

    LaunchedEffect(key1 = true) {
        viewModel2.restoreCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    context.showToast("Category Restored")
                    viewModel2.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                is CategoryUiEvents.Failure -> {
                    context.showToast("Failed to restore category")
                   // viewModel2.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                CategoryUiEvents.Loading -> true

            }
        }

    }


    LaunchedEffect(key1 = true) {
        viewModel2.softDeleteCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    context.showToast("Category go to Trash")
                    viewModel2.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                is CategoryUiEvents.Failure -> {
                    context.showToast("Category failed to go to Trash")
                    viewModel2.onEvent(CategoryEvents.ShowCategories)





                    false
                }

                CategoryUiEvents.Loading -> true

            }
        }
    }
    LaunchedEffect(key1 = true) {
        viewModel2.addCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    categoryTitle = ""
                    categoryDescription = ""
                    context.showToast("Category Added")
                    isAddCategoryDialogOpen = false
                    viewModel2.onEvent(CategoryEvents.ShowCategories)
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




    var selectedCategoryId by remember { mutableStateOf<Int?>(null) }
    val getCategoryState = viewModel2.getCategoryByIdResponseEvent.value
    var waitingForCategoryData by remember { mutableStateOf(false) }

    LaunchedEffect(getCategoryState.data) {
        val data = getCategoryState.data
        if (waitingForCategoryData && data != null && data.id == selectedCategoryId) {
            categoryTitle = data.title ?: ""
            categoryDescription = data.description ?: ""
            isUpdateCategoryDialogOpen = true
            waitingForCategoryData = false
        }
        Log.d("getbyid","${categoryTitle}  ${categoryDescription}")
    }

    val fabShape = RoundedCornerShape(12.dp)

    Scaffold(
        modifier = Modifier.fillMaxSize(),

        topBar = { GoalScreenTopAppBar() },
        bottomBar = { BottomNavigationBar() },
        floatingActionButtonPosition = FabPosition.Center,

        floatingActionButton = {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                SmallFloatingActionButton(
                    onClick = {
                    },
                    shape = fabShape,
                    containerColor = AppColors.background,
                    contentColor = AppColors.foreground,
                    elevation = FloatingActionButtonDefaults.elevation(0.dp),
                    modifier = Modifier
                        .size(40.dp)               // 1. Fix size first :contentReference[oaicite:10]{index=10}
                        .clip(fabShape)            // 2. Clip to RoundedCornerShape(12.dp)
                        .border(1.dp, AppColors.border, fabShape)

                ) {
                    Icon(
                        modifier = Modifier.size(16.dp),
                        painter = painterResource(id = R.drawable.filter),
                        contentDescription = "Filter"
                    )
                }

                SmallFloatingActionButton(
                    onClick = {
                        isAddCategoryDialogOpen = true

                    },
                    shape = fabShape,
                    containerColor = AppColors.background,
                    contentColor = AppColors.foreground,
                    elevation = FloatingActionButtonDefaults.elevation(0.dp),
                    modifier = Modifier
                        .size(40.dp)               // 1. Fix size first :contentReference[oaicite:10]{index=10}
                        .clip(fabShape)            // 2. Clip to RoundedCornerShape(12.dp)
                        .border(1.dp, AppColors.border, fabShape)
                ) {
                    Icon(Icons.Default.Add, contentDescription = "Add")
                }
            }
        },
        snackbarHost = { SnackbarHost(
            hostState = snackbarHostState,
            snackbar = { data ->
                Snackbar(
                    snackbarData = data,
                    containerColor = AppColors.secondary, // Background color
                    contentColor = AppColors.foreground, // Text color
                    actionColor = AppColors.foreground    // Optional: action button color
                )
            }
        ) },
        containerColor =  AppColors.background,
       // containerColor = MaterialTheme.colorScheme.background
    ) { paddingValues ->

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {

            Spacer(Modifier.height(16.dp))

            //val goals = goalResponse.data.filter { it.categoryId != null }

            val goals = goalResponse.data?.filter { it.categoryId != null } ?: emptyList()

            if (!categoryResponse.data.isNullOrEmpty()) LazyColumn(
                verticalArrangement = Arrangement.spacedBy(16.dp),
            ) {
                val categories: List<CategoryResponse> = categoryResponse.data ?: emptyList()


                items(categories, key = { it.id })
                { category ->

                   val categoryGoal= goals.filter { it.categoryId==category.id }
                    Log.d("categoryId","$category.id")

                    Column(
                        verticalArrangement = Arrangement.spacedBy(4.dp, Alignment.Top),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 12.dp)
                            .clip(shape = MaterialTheme.shapes.medium)
                            .border(
                                border = BorderStroke(1.dp, AppColors.border),
                                shape = MaterialTheme.shapes.medium
                            )
                            .padding(all = 8.dp)
                    ) {

                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 12.dp, vertical = 8.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            // Left side: Folder icon + title + chevron
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                Icon(
                                    painter = painterResource(id = R.drawable.folder),
                                    contentDescription = "folder",
                                    tint = AppColors.foreground,
                                    modifier = Modifier.size(14.dp)
                                )
                                Text(
                                    text = formatCategoryTitle(category.title),
                                    color = AppColors.mutedForeground,
                                    style = AppTypography.muted,
                                    maxLines = 1
//
                                )
                                Icon(
                                    painter = painterResource(id = R.drawable.chevrondown),
                                    contentDescription = "dropdown",
                                    tint = AppColors.foreground,
                                    modifier = Modifier.size(12.dp)
                                )
                            }

                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                Text(goals.count { it.categoryId == category.id }.toString(),
                                    style = TextStyle(fontSize = 10.sp),
                                    color = AppColors.foreground
                                )
                                Icon(
                                    painter = painterResource(id = R.drawable.folderopen),
                                    contentDescription = "open folder",
                                    tint = AppColors.foreground,
                                    modifier = Modifier.size(13.dp)
                                )
                                Icon(
                                    painter = painterResource(id = R.drawable.plus),
                                    contentDescription = "add",
                                    tint = AppColors.foreground,
                                    modifier = Modifier.size(15.dp)
                                )

                                       Box {

                                            IconButton(onClick = {
                                                expandedStates[category.title] = true
                                            }) {
                                                Icon(
                                                    painter = painterResource(id = R.drawable.threehorizontaldots),
                                                    contentDescription = "category more",
                                                    tint = AppColors.foreground,
                                                    modifier = Modifier.size(16.dp)
                                                )
                                            }

                                            DropdownMenu(
                                                expanded = expandedStates.getOrDefault(category.title, false),
                                                onDismissRequest = { expandedStates[category.title] = false }
                                            )

                                            {
                                                DropdownMenuItem(
                                                    text = { Text("Edit") },
                                                    onClick = {
                                                        selectedCategoryId = category.id
                                                        waitingForCategoryData = true
                                                        viewModel2.onEvent(CategoryEvents.GetCategoryByIdEvent(category.id))
                                                        expandedStates[category.title] = false
                                                    }
                                                )

                                                DropdownMenuItem(
                                                    text = { Text("Delete") },
                                                    onClick = {
                                                        expandedStates[category.title] = false
                                                        Log.d("here1","${category.id}")
                                                        viewModel2.onEvent(CategoryEvents.SoftDeleteCategoryEvent(category.id))
                                                        viewModel2.onEvent(CategoryEvents.ShowCategories)
                                                        scope.launch {
                                                            val result = snackbarHostState.showSnackbar(
                                                                message = "Category moved to trash",
                                                                actionLabel = "Undo",
                                                                duration = SnackbarDuration.Short
                                                            )

                                                            if (result == SnackbarResult.ActionPerformed) {
                                                                Log.d("here2","${category.id}")
                                                                viewModel2.onEvent(CategoryEvents.RestoreCategoryEvent(category.id))
                                                            }
                                                        }
                                                    }
                                                )
                                            }
                                       }
                            }
                        }
                        Column(
                            verticalArrangement = Arrangement.spacedBy(4.dp, Alignment.Top),
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(start = 6.dp)
                        ) {
                            Column(
                                verticalArrangement = Arrangement.spacedBy(4.dp, Alignment.CenterVertically),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .border(border = BorderStroke(1.dp, AppColors.border))
                                    .padding(
                                        start = 8.dp,
                                        top = 4.dp,
                                        bottom = 4.dp
                                    )
                            ) {
//                                val goals = goalResponse.data.filter { it.categoryId != null }

//                                goals.filter {it.categoryId ==category.id  }
                                if (categoryGoal.isNotEmpty()) {
                                    categoryGoal.forEach { goal ->
                                        GoalItem(
                                            modifier = Modifier,
                                            showMoreHorizontal22620 = true,
                                            title = goal.title,
                                            term = goal.term,
                                            status = goal.status
                                        )
                                    }
                                }
                            }
                        }

                        if (true) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 8.dp)
                            ) {
                                Divider(
                                    color = AppColors.muted,
                                    modifier = Modifier
                                        .weight(1f)
                                        .height(1.dp)
                                )
                                Text(
                                    text = "More...",
                                    color = AppColors.mutedForeground,
                                    style = AppTypography.muted,
                                    modifier = Modifier.padding(horizontal = 8.dp)
                                        .clickable {
                                            navController.navigate("DetailedCategoryScreen/${category.id}/${category.title}")
                                        }
                                )
                                Divider(
                                    color = AppColors.muted,
                                    modifier = Modifier
                                        .weight(1f)
                                        .height(1.dp)
                                )
                            }
                        }
                    }

                }
            }

        }






        if (isUpdateCategoryDialogOpen) {


            AddCategoryDialog(
                isOpen = isUpdateCategoryDialogOpen,
                title = categoryTitle,
                onTitleChange = { categoryTitle = it },
                onDescriptionChange = { categoryDescription = it },
                description = categoryDescription,
                onClick = { },
                onDismiss = { isUpdateCategoryDialogOpen = false },

                onSave = {
                    if (categoryTitle.isNotEmpty() && categoryDescription.isNotEmpty()) {
                        viewModel2.onEvent(
                            CategoryEvents.UpdateCategoryEvent(
                                category = Category(
                                    id = categoryId!!,/////////////////////// safely unwrap
                                    title = categoryTitle,
                                    color = "#FF33A1",
                                    description = categoryDescription,
                                ),
                                id = categoryId
                            )
                        )
                    } else {
                        context.showToast("Please add title and description")
                    }
                },
                onDismissColor = {},
                onSaveColor = {}
            )
        }


        if (isAddCategoryDialogOpen) {

            AddCategoryDialog(
                isOpen = isAddCategoryDialogOpen,
                title = categoryTitle,
                onTitleChange = { categoryTitle = it },
                onDescriptionChange = { categoryDescription = it },
                description = categoryDescription,
                onClick = { },
                onDismiss = { isAddCategoryDialogOpen = false },
                onSave = {
                    if (categoryTitle.isNotEmpty() && categoryDescription.isNotEmpty()) {
                        viewModel2.onEvent(
                            CategoryEvents.AddCategoryEvent(
                                Category(
                                    id = 2,
                                    title = categoryTitle,
                                    description = categoryDescription,
                                    color = color

                                )
                            )
                        )
                    } else {
                        context.showToast("Please add title and description")
                    }
                },
                onDismissColor = {},
                onSaveColor = {}
            )

        }

    }
}


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StatusChipGroup(selectedStatus: String, onStatusSelected: (String) -> Unit) {
    val statuses = listOf("All", "Long-Term", "Medium-Term", "Short-Term", "Not-Started", "In-Progress", "Done", "On-Hold", "Cancelled")

    LazyRow(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        items(statuses) { status ->
            FilterChip(
                selected = selectedStatus == status,
                onClick = { onStatusSelected(status) },
                label = {
                    Text(
                        text = status,
                        color = if (selectedStatus == status) Color.White else Color.Black,
                        fontWeight = FontWeight.Medium
                    )
                },
                shape = RoundedCornerShape(8.dp),
//                border = FilterChipDefaults.filterChipBorder(
//                    borderWidth = if (selectedStatus == status) 2.dp else 1.dp,
//                    borderColor = if (selectedStatus == status) Color.White else Color.Gray
//                ),
                border = FilterChipDefaults.filterChipBorder(
                    borderColor = Color.White,
                    borderWidth = 2.dp,
                    enabled = true,
                    selected = selectedStatus == status,

                ),

                colors = FilterChipDefaults.filterChipColors(
                    containerColor = if (selectedStatus == status) Color.Black else Color.White,
                    selectedContainerColor = Color.Black
                ),
                modifier = Modifier.height(36.dp)
                 //   .background(Color.Black) // Add background to ensure the white stroke is visible

            )
        }
    }
}









@Composable
fun GoalItem(
    modifier: Modifier = Modifier,
    showMoreHorizontal22620: Boolean,
    title: String = "Dotnet weeeee",
    term: String = "Medium-Term",
    status: String = "On-Hold"
) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp, vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            modifier = Modifier.weight(1f),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            Icon(
                painter = painterResource(id = R.drawable.goals),
                contentDescription = "timer",
                tint = AppColors.foreground,
                modifier = Modifier.size(26.dp)
            )

            Text(
                text = formatGoalTitle(title),
                color = AppColors.foreground,
                style = TextStyle(
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Medium
                ),
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        }

        Spacer(modifier = Modifier.width(16.dp))

        Text(
            modifier = Modifier.width(100.dp),
            text = term,
            color = AppColors.foreground,
            style = TextStyle(fontSize = 12.sp)
        )

        Row(
            horizontalArrangement = Arrangement.Start,
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.width(100.dp)
        ) {
            Text(
                text = status,
                color = AppColors.foreground,
                style = TextStyle(fontSize = 12.sp)
            )

            Spacer(modifier = Modifier.width(8.dp))

            Icon(

                painter = painterResource(id = R.drawable.threehorizontaldots),
                contentDescription = "more",
                tint = AppColors.foreground,
                modifier = Modifier.size(14.dp)
            )
        }
    }
}


fun formatCategoryTitle(title: String, maxChars: Int = 16): String {
        return if (title.length > maxChars) {
            title.take(maxChars) + "..."
        } else {
            title
        }
    }

fun formatGoalTitle(title: String, maxChars: Int = 9): String {
        return if (title.length > maxChars) {
            title.take(maxChars) + "..."
        } else {
            title
        }
    }





