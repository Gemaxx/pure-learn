//package com.example.purelearn.ui.theme.Goal
//
//
//import android.net.Uri
//import android.util.Log
//import androidx.compose.foundation.layout.Arrangement
//import androidx.compose.foundation.layout.Column
//import androidx.compose.foundation.layout.fillMaxSize
//import androidx.compose.foundation.layout.fillMaxWidth
//import androidx.compose.foundation.layout.height
//import androidx.compose.foundation.layout.padding
//import androidx.compose.foundation.lazy.LazyColumn
//import androidx.compose.foundation.lazy.LazyRow
//import androidx.compose.foundation.lazy.items
//import androidx.compose.foundation.shape.RoundedCornerShape
//import androidx.compose.material.icons.Icons
//import androidx.compose.material.icons.filled.Menu
//import androidx.compose.material3.DrawerValue
//import androidx.compose.material3.ExperimentalMaterial3Api
//import androidx.compose.material3.FilterChip
//import androidx.compose.material3.FilterChipDefaults
//import androidx.compose.material3.Icon
//import androidx.compose.material3.IconButton
//import androidx.compose.material3.MaterialTheme
//import androidx.compose.material3.Scaffold
//import androidx.compose.material3.Text
//import androidx.compose.material3.TopAppBar
//import androidx.compose.material3.TopAppBarDefaults
//import androidx.compose.material3.rememberDrawerState
//import androidx.compose.runtime.Composable
//import androidx.compose.runtime.LaunchedEffect
//import androidx.compose.runtime.getValue
//import androidx.compose.runtime.mutableStateOf
//import androidx.compose.runtime.remember
//import androidx.compose.runtime.rememberCoroutineScope
//import androidx.compose.runtime.saveable.rememberSaveable
//import androidx.compose.runtime.setValue
//import androidx.compose.ui.Modifier
//import androidx.compose.ui.graphics.Color
//import androidx.compose.ui.platform.LocalContext
//import androidx.compose.ui.text.font.FontWeight
//import androidx.compose.ui.unit.dp
//import androidx.compose.ui.unit.sp
//import androidx.hilt.navigation.compose.hiltViewModel
//import androidx.navigation.NavController
//import com.example.purelearn.domain.model.Goal
//import com.example.purelearn.domain.model.GoalResponse
//import com.example.purelearn.ui.theme.Goal.Goalviewmodel.GoalViewModel
//import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalEvents
//import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalUiEvents
//import com.example.purelearn.ui.theme.components.AddGoalModalBottomSheet
//import com.example.purelearn.ui.theme.components.GlowingFAB
//import com.example.purelearn.ui.theme.components.GoalCard
//import com.example.purelearn.ui.theme.components.LoadingBar
//import com.example.purelearn.ui.theme.components.SwipeToDeleteContainer
//import com.example.purelearn.ui.theme.components.showToast
//import kotlinx.coroutines.flow.collectLatest
//import kotlinx.coroutines.launch
//
//@OptIn(ExperimentalMaterial3Api::class)
//@Composable
//fun GoalScreen(
//    navController: NavController,
//    categoryId: Int?,
//    viewModel: GoalViewModel = hiltViewModel(),
//) {
//    //  val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
//
//    var isSheetOpen by remember { mutableStateOf(false) }
//    var isUpdateSheetOpen by remember { mutableStateOf(false) }
//
//    val isVisible = rememberSaveable { mutableStateOf(true) }
//
//    val response = viewModel.goalResponseEvent.value
//    val context = LocalContext.current
//    var isLoading by remember { mutableStateOf(false) }
//    var title by remember { mutableStateOf("") }
//    var description by remember { mutableStateOf("") }
//    var motivation by remember { mutableStateOf("") }
//    var term by remember { mutableStateOf("") }
//    var status by remember { mutableStateOf("") }
//    var goalId by remember { mutableStateOf(0) }
//
//    var selectedFilter by remember { mutableStateOf("All") }
//
//    if (isLoading) LoadingBar()
//
//
////    LaunchedEffect(Unit) {
////        if(categoryId!=null)
////        viewModel.onEvent(GoalEvents.ShowGoal(categoryId))
////    }
//
//    LaunchedEffect(Unit) {
//        Log.d("GoalScreen", "Fetching goals for categoryId: $categoryId")
//        if (categoryId != null) {
//            viewModel.onEvent(GoalEvents.ShowGoal(categoryId))
//        } else {
//            Log.e("GoalScreen", "categoryId is null, cannot fetch goals")
//        }
//    }
//
//    LaunchedEffect(key1 = true) {
//        viewModel.addGoalEvent.collectLatest {
//            isLoading = when (it) {
//                is GoalUiEvents.Success -> {
//                    title = ""
//                    description = ""
//                    context.showToast("Goal Added")
//                    isSheetOpen = false
//                    if(categoryId!=null)
//                        viewModel.onEvent(GoalEvents.ShowGoal(categoryId))
//                    false
//                }
//
//                is GoalUiEvents.Failure -> {
//                    Log.d("main", "CategoryScreen:${it.msg} ")
//                    context.showToast(it.msg)
//                    false
//                }
//
//                GoalUiEvents.Loading -> true
//            }
//        }
//    }
//
//
//    LaunchedEffect(key1 = true) {
//        viewModel.deleteGoalEvent.collectLatest {
//            isLoading = when (it) {
//                is GoalUiEvents.Success -> {
//                    context.showToast("Goal Deleted")
//                    if(categoryId!=null)
//                        viewModel.onEvent(GoalEvents.ShowGoal(categoryId))
//                    false
//                }
//
//                is GoalUiEvents.Failure -> {
//                    context.showToast("Goal Deleted")
//                    if(categoryId!=null)
//                        viewModel.onEvent(GoalEvents.ShowGoal(categoryId))
//                    false
//                }
//
//                GoalUiEvents.Loading -> true
//
//            }
//        }
//    }
//
//    LaunchedEffect(key1 = true) {
//        viewModel.updateGoalEvent.collectLatest {
//            isLoading = when (it) {
//                is GoalUiEvents.Success -> {
//                    context.showToast("Goal Updated!")
//                    if(categoryId!=null)
//                        viewModel.onEvent(GoalEvents.ShowGoal(categoryId))
//                    isSheetOpen = false
//                    false
//                }
//
//                is GoalUiEvents.Failure -> {
//                    context.showToast(it.msg)
//                    false
//                }
//
//                GoalUiEvents.Loading -> true
//
//            }
//        }
//    }
//    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
//    val scope = rememberCoroutineScope()
//    Scaffold(
//        modifier = Modifier.fillMaxSize(),
//        floatingActionButton = {
//
//            GlowingFAB {
//                isSheetOpen = true
//            }
//        },
//        topBar = {
//            TopAppBar(
//                title = {
//                    Text(
//                        text = "Category Name",
//                        color = Color.White,
//                        fontSize = 20.sp,
//                        fontWeight = FontWeight.Bold
//                    )
//                },
//                navigationIcon = {
//                    IconButton(onClick = {
//                        scope.launch {
//                            drawerState.open()
//                        }
//                    }) {
//                        Icon(
//                            imageVector = Icons.Default.Menu,
//                            contentDescription = "Menu"
//                        )
//                    }
//                },
//                colors = TopAppBarDefaults.mediumTopAppBarColors(
//                    containerColor =MaterialTheme.colorScheme.background
//                )
//            ) },
//        containerColor = MaterialTheme.colorScheme.background
//    ) { paddingValues ->
//
//        Column(
//            modifier = Modifier
//                .fillMaxSize()
//                .padding(paddingValues)
//        ) {
//
////
//            StatusChipGroup(
//                selectedStatus = selectedFilter,
//                onStatusSelected ={ selectedFilter = it }
//            )
//
//
//            if (response.data.isNotEmpty())
//            {
//                LazyColumn(
//                    modifier = Modifier.fillMaxSize(),
//                    verticalArrangement = Arrangement.spacedBy(0.dp),
//                ) {
//                    //val goals: List<GoalResponse> = response.data
//                    val goals: List<GoalResponse> = if (selectedFilter == "All") {
//                        response.data
//                    } else {
//                        response.data.filter { it.term == selectedFilter || it.status == selectedFilter }
//                    }
//
//                    items(goals, key = { it.id }) { goal ->
//                        SwipeToDeleteContainer(
//                            item = goal,
//                            onDelete = {
//                                viewModel.onEvent(GoalEvents.DeleteGoalEvent(goal.id))
//                            },
//                            animationDuration = 300,
//                            content = { item:GoalResponse ->
//                                GoalCard(
//                                    goal = item,
//                                    onClick = {
//                                        title = item.title
//                                        isSheetOpen = true
//                                        goalId = item.id
//                                        // goalName=item.title
//                                        val encodedGoalName = Uri.encode(title)
//
//                                        navController.navigate("ResourceScreen/${item.id}/${encodedGoalName}")
//
//
//                                    },
//                                    onUpdateGoal = {
//                                        isUpdateSheetOpen = true
//                                        title = item.title
//                                        goalId = item.id
//                                    }
//                                )
//                            }
//                        )
//                    }
//                }
//            }
//        }
//    }
//
//
//
//
//
//    if (isUpdateSheetOpen) {
//
//        AddGoalModalBottomSheet(
//            isOpen = isUpdateSheetOpen,
//            title = title,
//            description = description,
//            onTitleChange = { title = it },
//            onDescriptionChange = { description = it },
//            motivation = motivation,
//            onMotivationChange = { motivation = it },
//            term = term,
//            onTermChange = { term = it },
//            status = status,
//            onStatusChange = { status = it },
//            onDismiss = { isUpdateSheetOpen = false },
//            onSave = {
//                if (title.isNotEmpty() && description.isNotEmpty()&&
//                    motivation.isNotEmpty()&& term.isNotEmpty()&& status.isNotEmpty())
//                {
//                    viewModel.onEvent(
//                        GoalEvents.UpdateGoalEvent(
//                            goal = Goal(
//                                categoryId = 1,
//                                title = title,
//                                description = description,
//                                motivation = motivation,
//                                term = term,
//                                status = status
//                            ),
//                            id = goalId,
//                        )
//                    )
//                    isSheetOpen = false
//                    title = ""
//                    description = ""
//                    motivation = ""
//                    term = ""
//                    status = ""
//
//                } else {
//                    context.showToast("Please enter all the required fields.")
//                }
//            }
//        )
//    }
//
//
//    if (isSheetOpen) {
//        AddGoalModalBottomSheet(
//            isOpen = isSheetOpen,
//            title = title,
//            description = description,
//            onTitleChange = { title = it },
//            onDescriptionChange = { description = it },
//            motivation = motivation,
//            onMotivationChange = { motivation = it },
//            term = term,
//            onTermChange = { term = it },
//            status = status,
//            onStatusChange = { status = it },
//            onDismiss = { isSheetOpen = false },
//            onSave = {
//                if (title.isNotEmpty() && description.isNotEmpty()&&
//                    motivation.isNotEmpty()&& term.isNotEmpty()&& status.isNotEmpty())
//                {
//                    viewModel.onEvent(
//                        GoalEvents.AddGoalEvent(
//                            Goal(
//                                categoryId = categoryId ?: 0,
//                                title = title,
//                                description = description,
//                                motivation = motivation,
//                                term = term,
//                                status = status
//                            ),
//                            categoryId = categoryId ?: 0
//                        )
//                    )
//                    isSheetOpen = false
//                    title = ""
//                    description = ""
//                    motivation = ""
//                    term = ""
//                    status = ""
//
//                } else {
//                    context.showToast("Please enter all the required fields.")
//                }
//            }
//        )
//    }
//}
//
//@OptIn(ExperimentalMaterial3Api::class)
//@Composable
//fun StatusChipGroup(selectedStatus: String, onStatusSelected: (String) -> Unit) {
//    val statuses = listOf("All", "Long-Term", "Medium-Term", "Short-Term", "Not-Started", "In-Progress", "Done", "On-Hold", "Cancelled")
//
//    LazyRow(
//        horizontalArrangement = Arrangement.spacedBy(8.dp),
//        modifier = Modifier
//            .fillMaxWidth()
//            .padding(16.dp)
//    ) {
//        items(statuses) { status ->
//            FilterChip(
//                selected = selectedStatus == status,
//                onClick = { onStatusSelected(status) },
//                label = {
//                    Text(
//                        text = status,
//                        color = if (selectedStatus == status) Color.White else Color.Black,
//                        fontWeight = FontWeight.Medium
//                    )
//                },
//                shape = RoundedCornerShape(8.dp),
////                border = FilterChipDefaults.filterChipBorder(
////                    borderWidth = if (selectedStatus == status) 2.dp else 1.dp,
////                    borderColor = if (selectedStatus == status) Color.White else Color.Gray
////                ),
//                border = FilterChipDefaults.filterChipBorder(
//                    borderColor = Color.White,
//                    borderWidth = 2.dp,
//                    enabled = true,
//                    selected = selectedStatus == status,
//
//                    ),
//
//                colors = FilterChipDefaults.filterChipColors(
//                    containerColor = if (selectedStatus == status) Color.Black else Color.White,
//                    selectedContainerColor = Color.Black
//                ),
//                modifier = Modifier.height(36.dp)
//                //   .background(Color.Black) // Add background to ensure the white stroke is visible
//
//            )
//        }
//    }
//}
