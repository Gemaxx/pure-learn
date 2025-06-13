package com.example.purelearn.ui.theme.detailedcategory

import android.net.Uri
import android.util.Log
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
import androidx.compose.foundation.layout.requiredWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.Divider
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FabPosition
import androidx.compose.material3.FloatingActionButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
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
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.anew.ui.theme.PureLearnTheme
import com.example.purelearn.R
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.AppTypography
import com.example.purelearn.ui.theme.Goal.GoalItem
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.GoalViewModel
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalEvents
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalUiEvents
import com.example.purelearn.ui.theme.Goal.formatGoalTitle
import com.example.purelearn.ui.theme.components.AddGoalModalBottomSheet
import com.example.purelearn.ui.theme.components.BottomNavigationBar
import com.example.purelearn.ui.theme.components.showToast
import com.example.purelearn.ui.theme.home.homeviewmodel.CategoryViewModel
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryUiEvents
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DetailedCategoryScreen(
    navController: NavController,
    categoryId: Int?,
    categoryName:String,
    viewModel2: CategoryViewModel = hiltViewModel(),
    viewModel: GoalViewModel = hiltViewModel()

    ) {

    var isSheetOpen by remember { mutableStateOf(false) }
    var isUpdateSheetOpen by remember { mutableStateOf(false) }
    //  val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)

    val isVisible = rememberSaveable { mutableStateOf(true) }

    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }

    val goalResponse = viewModel.goalResponseEvent.value

    var goalTitle by remember { mutableStateOf("") }
    var goalDescription by remember { mutableStateOf("") }
    var motivation by remember { mutableStateOf("") }
    var term by remember { mutableStateOf("") }
    var status by remember { mutableStateOf("") }
    var goalId by remember { mutableStateOf(0) }
    var catId by remember { mutableStateOf(0) }

    var selectedFilter by remember { mutableStateOf("All") }
    Log.d("cat id","$categoryId")
    val expandedStates = remember { mutableStateMapOf<String, Boolean>() }
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(Unit) {

            viewModel.onEvent(GoalEvents.ShowGoal)

    }

    LaunchedEffect(key1 = true) {
        viewModel.addGoalEvent.collectLatest {
            isLoading = when (it) {
                is GoalUiEvents.Success -> {
                    goalTitle = ""
                    goalDescription = ""
                    context.showToast("Goal Added")
                    isSheetOpen = false
                    if(categoryId!=null)
                    viewModel.onEvent(GoalEvents.ShowGoal)
                    false
                }

                is GoalUiEvents.Failure -> {
                    Log.d("main", "CategoryScreen:${it.msg} ")
                    context.showToast(it.msg)
                    false
                }

                GoalUiEvents.Loading -> true
            }
        }
    }

    LaunchedEffect(key1 = true) {
        viewModel.deleteGoalEvent.collectLatest {
            isLoading = when (it) {
                is GoalUiEvents.Success -> {
                    context.showToast("Goal Deleted")
                    if(categoryId!=null)
                    viewModel.onEvent(GoalEvents.ShowGoal)
                    false
                }

                is GoalUiEvents.Failure -> {
                    context.showToast("Goal Deleted")
                    if(categoryId!=null)
                    viewModel.onEvent(GoalEvents.ShowGoal)
                    false
                }

                GoalUiEvents.Loading -> true

            }
        }
    }

    LaunchedEffect(key1 = true) {
        viewModel.updateGoalEvent.collectLatest {
            isLoading = when (it) {
                is GoalUiEvents.Success -> {
                    context.showToast("Goal Updated!")
                    if(categoryId!=null)
                    viewModel.onEvent(GoalEvents.ShowGoal)
                    isSheetOpen = false
                    false
                }

                is GoalUiEvents.Failure -> {
                    context.showToast(it.msg)
                    false
                }

                GoalUiEvents.Loading -> true

            }
        }
    }





    LaunchedEffect(key1 = true) {
        viewModel.restoreGoalEvent.collectLatest {
            isLoading = when (it) {
                is GoalUiEvents.Success -> {
                    context.showToast("Goal Restored")
                    viewModel.onEvent(GoalEvents.ShowGoal)
                    false
                }

                is GoalUiEvents.Failure -> {
                    context.showToast("Failed to restore goal")
                    // viewModel2.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                GoalUiEvents.Loading -> true

            }
        }

    }


    LaunchedEffect(key1 = true) {
        viewModel.softDeleteGoalEvent.collectLatest {
            isLoading = when (it) {
                is GoalUiEvents.Success -> {
                    context.showToast("Goal go to Trash")
                    viewModel.onEvent(GoalEvents.ShowGoal)
                    false
                }

                is GoalUiEvents.Failure -> {
                    context.showToast("Goal failed to go to Trash")
                    viewModel.onEvent(GoalEvents.ShowGoal)

                    false
                }

                GoalUiEvents.Loading -> true

            }
        }
    }


    var categoryTitle by remember { mutableStateOf("") }
    var categoryDescription by remember { mutableStateOf("") }
    var waitingForCategoryData by remember { mutableStateOf(true) }

    val getCategoryState = viewModel2.getCategoryByIdResponseEvent.value

// Trigger data fetching in a LaunchedEffect when categoryId is available or changes
    LaunchedEffect(categoryId) {
        // Trigger fetching data only if categoryId is valid
        if (categoryId != null && waitingForCategoryData) {
            viewModel2.onEvent(CategoryEvents.GetCategoryByIdEvent(categoryId))
        }
    }

// Update the UI when the data is fetched
    LaunchedEffect(getCategoryState.data) {
        val data = getCategoryState.data
        if (data != null && data.id == categoryId) {
            categoryTitle = data.title ?: ""
            categoryDescription = data.description ?: ""
            waitingForCategoryData = false
        }
        Log.d("getbyid", "${categoryTitle}  ${categoryDescription}")
    }

// You can display the category data in the UI here
//    Text(text = categoryTitle)
//    Text(text = categoryDescription)




//    var goalTitle by remember { mutableStateOf("") }
//    var goalDescription by remember { mutableStateOf("") }
//    var motivation by remember { mutableStateOf("") }
//    var term by remember { mutableStateOf("") }
//    var status by remember { mutableStateOf("") }
//    var goalId by remember { mutableStateOf(0) }
    var selectedGoalId by remember { mutableStateOf<Int?>(null) }
    val getGoalState = viewModel.getGoalByIdResponseEvent.value
    var waitingForGoalData by remember { mutableStateOf(false) }

    LaunchedEffect(getGoalState.data) {
        val data = getGoalState.data
        if (waitingForGoalData && data != null && data.id.toInt() == selectedGoalId) {
            catId= data.categoryId
            goalId=data.id
            goalTitle = data.title ?: ""
            goalDescription = data.description ?: ""
            motivation=data.motivation ?: ""
            term=data.term ?: ""
            status=data.status ?: ""
            isUpdateSheetOpen = true
            waitingForGoalData = false
        }
       // Log.d("getgoalbyid","${categoryTitle}  ${categoryDescription}")
    }

    val fabShape = RoundedCornerShape(12.dp)


    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(4.dp, Alignment.Start),
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier
                            .padding(horizontal = 16.dp)
                    ) {
                        Text(
                            text = categoryName,
                            color = AppColors.foreground,
                            lineHeight = 1.56.em,
                            style = AppTypography.h4,
                            modifier = Modifier
                                .wrapContentHeight(align = Alignment.CenterVertically))
                }},
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(
                            modifier = Modifier.size(24.dp),

                            painter = painterResource(id = R.drawable.backicon),
                            contentDescription = "time",
                            tint = AppColors.foreground
                        )
                    }
                },
                actions = {
                    IconButton(onClick = {}) {
                        Icon(
                            modifier = Modifier.size(24.dp),

                            painter = painterResource(id = R.drawable.morevertical),
                            contentDescription = "time",
                            tint = AppColors.foreground
                        )
                    }
                },
                colors = TopAppBarDefaults.mediumTopAppBarColors(
                    containerColor =MaterialTheme.colorScheme.background
                ),
                modifier = Modifier
                    .fillMaxWidth()
            )
        },
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
                    onClick = { },
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
                    onClick = { isSheetOpen=true },
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
    ) { paddingValues ->
        Column(modifier = Modifier.fillMaxSize().padding(paddingValues)) {



            Text(
                text = "Description",
                color = AppColors.mutedForeground,
                lineHeight = 1.5.em,
                style = AppTypography.large,
                modifier = Modifier
                    .wrapContentHeight(align = Alignment.CenterVertically)
                    .padding(horizontal = 16.dp, vertical = 8.dp))
            Text(
                text = categoryDescription,
                color = AppColors.mutedForeground,
                lineHeight = 1.33.em,
                style = AppTypography.body,
                modifier = Modifier
                    .requiredWidth(width = 360.dp)
                    .wrapContentHeight(align = Alignment.CenterVertically)
                    .padding(start = 16.dp, end = 16.dp, bottom = 8.dp))

            Divider(
                color = AppColors.muted,
                modifier = Modifier
                    .height(1.dp)
            )
            val scrollState = rememberScrollState()

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(scrollState)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
            val goalResponse = viewModel.goalResponseEvent.value
                val goals = goalResponse.data?.filter { it.categoryId != null } ?: emptyList()

                val categoryGoal= goals.filter { it.categoryId==categoryId}
                if (categoryGoal.isNotEmpty()) {
                    categoryGoal.forEach { goal ->
                        val encodedGoalName = Uri.encode(goal.title)

                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 8.dp, vertical = 4.dp)
                                .clickable {
                            navController.navigate("ResourceScreen/${goal.id}/$encodedGoalName")
                            },
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
                                    text = formatGoalTitle(goal.title),
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
                                text = goal.term,
                                color = AppColors.foreground,
                                style = TextStyle(fontSize = 12.sp)
                            )

                            Row(
                                horizontalArrangement = Arrangement.Start,
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.width(100.dp)
                            ) {
                                Text(
                                    text = goal.status,
                                    color = AppColors.foreground,
                                    style = TextStyle(fontSize = 12.sp)
                                )

                                Spacer(modifier = Modifier.width(8.dp))

//                                Icon(
//
//                                    painter = painterResource(id = R.drawable.threehorizontaldots),
//                                    contentDescription = "more",
//                                    tint = AppColors.foreground,
//                                    modifier = Modifier.size(14.dp)
//                                )
                                Box {

                                    IconButton(onClick = {
                                        expandedStates[goal.title] = true
                                    }) {
                                        Icon(
                                            painter = painterResource(id = R.drawable.threehorizontaldots),
                                            contentDescription = "category more",
                                            tint = AppColors.foreground,
                                            modifier = Modifier.size(16.dp)
                                        )
                                    }

                                    DropdownMenu(
                                        expanded = expandedStates.getOrDefault(goal.title, false),
                                        onDismissRequest = { expandedStates[goal.title] = false }
                                    )

                                    {
                                        DropdownMenuItem(
                                            text = { Text("Edit") },
                                            onClick = {
                                                 selectedGoalId = goal.id
                                                  waitingForGoalData = true
                                                  viewModel.onEvent(GoalEvents.GetGoalByIdEvent(goal.id))
                                                  expandedStates[goal.title] = false
                                            }
                                        )

                                        DropdownMenuItem(
                                            text = { Text("Delete") },
                                            onClick = {
                                                expandedStates[goal.title] = false
                                                Log.d("here1","${goal.id}")
                                                viewModel.onEvent(GoalEvents.SoftDeleteGoalEvent(goal.id))
                                                viewModel.onEvent(GoalEvents.ShowGoal)
                                                scope.launch {
                                                    val result = snackbarHostState.showSnackbar(
                                                        message = "Goal moved to trash",
                                                        actionLabel = "Undo",
                                                        duration = SnackbarDuration.Short
                                                    )

                                                    if (result == SnackbarResult.ActionPerformed) {
                                                        Log.d("here2","${goal.id}")
                                                        viewModel.onEvent(GoalEvents.RestoreGoalEvent(goal.id))
                                                    }
                                                }
                                            }
                                        )
                                    }
                                }
                            }
                        }

                    }
                }

        }
        }





}

        if (isUpdateSheetOpen) {

        AddGoalModalBottomSheet(
            isOpen = isUpdateSheetOpen,
            title = goalTitle,
            description = goalDescription,
            onTitleChange = { goalTitle = it },
            onDescriptionChange = { goalDescription = it },
            motivation = motivation,
            onMotivationChange = { motivation = it },
            term = term,
            onTermChange = { term = it },
            status = status,
            onStatusChange = { status = it },
            onDismiss = { isUpdateSheetOpen = false },
            onSave = {
                if (goalTitle.isNotEmpty() && goalDescription.isNotEmpty()&&
                    motivation.isNotEmpty()&& term.isNotEmpty()&& status.isNotEmpty())
                {
                    viewModel.onEvent(
                        GoalEvents.UpdateGoalEvent(
                            goal = Goal(
                                categoryId = catId,
                                title = goalTitle,
                                description = goalDescription,
                                motivation = motivation,
                                term = term,
                                status = status
                            ),
                            id = goalId,
                        )
                    )
                    isSheetOpen = false
                    goalTitle = ""
                    goalDescription = ""
                    motivation = ""
                    term = ""
                    status = ""

                } else {
                    context.showToast("Please enter all the required fields.")
                }
            }
        )
    }


    if (isSheetOpen) {
        AddGoalModalBottomSheet(
            isOpen = isSheetOpen,
            title = goalTitle,
            description = goalDescription,
            onTitleChange = { goalTitle = it },
            onDescriptionChange = { goalDescription = it },
            motivation = motivation,
            onMotivationChange = { motivation = it },
            term = term,
            onTermChange = { term = it },
            status = status,
            onStatusChange = { status = it },
            onDismiss = { isSheetOpen = false },
            onSave = {
                if (goalTitle.isNotEmpty() && goalDescription.isNotEmpty()&&
                    motivation.isNotEmpty()&& term.isNotEmpty()&& status.isNotEmpty())
                {
                    viewModel.onEvent(
                        GoalEvents.AddGoalEvent(
                            Goal(
                                categoryId = categoryId ?: 0,
                                title = goalTitle,
                                description = goalDescription,
                                motivation = motivation,
                                term = term,
                                status = status
                            ),
                            categoryId = categoryId ?: 0
                        )
                    )
                    isSheetOpen = false
                    goalTitle = ""
                    goalDescription = ""
                    motivation = ""
                    term = ""
                    status = ""

                } else {
                    context.showToast("Please enter all the required fields.")
                }
            }
        )
    }


}
