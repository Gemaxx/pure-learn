package com.example.purelearn.ui.theme.Resource

import android.util.Log
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
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
import androidx.compose.material3.Surface
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.purelearn.R
import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.Resource
import com.example.purelearn.domain.model.ResourceResponse
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalEvents
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalUiEvents
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.ResourceViewModel
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceEvents
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceUiEvents
import com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.ResourceTypeViewModel
import com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.events.ResourceTypeEvents
import com.example.purelearn.ui.theme.components.AddGoalModalBottomSheet
import com.example.purelearn.ui.theme.components.AddResourceBottomSheet
import com.example.purelearn.ui.theme.components.BottomNavigationBar
import com.example.purelearn.ui.theme.components.GlowingFAB
import com.example.purelearn.ui.theme.components.ResourceCard
import com.example.purelearn.ui.theme.components.SegmentedControlScreen
import com.example.purelearn.ui.theme.components.SwipeToDeleteContainer
import com.example.purelearn.ui.theme.components.Tabs
import com.example.purelearn.ui.theme.components.showToast
import io.ktor.client.utils.EmptyContent.status
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ResourceScreen(
    navController: NavController,
    goalId: Int,
    goalName: String,
    viewModel: ResourceViewModel = hiltViewModel(),
    //resTypeViewModel: ResourceTypeViewModel = hiltViewModel()
    ) {

//    val sheetState = rememberModalBottomSheetState(
//        skipPartiallyExpanded = true
//    )
    val isVisible = rememberSaveable { mutableStateOf(true) }


    var isSheetOpen by remember {
        mutableStateOf(false)
    }
    var isUpdateSheetOpen by remember {
        mutableStateOf(false)
    }

    var title by remember { mutableStateOf("") }
    var selectedTypeId by remember { mutableStateOf(0) }
    var totalUnits by remember { mutableStateOf(0) }
    var progress by remember { mutableStateOf(0) }
    var link by remember { mutableStateOf("") }
    val resourceResponse by viewModel.resourceResponseEvent
    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }
    val expandedStates = remember { mutableStateMapOf<String, Boolean>() }

    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(Unit) {
        Log.d("ResourceScreen", "Fetching Resource for goalId: $goalId")
        if (goalId != null) {
            viewModel.onEvent(ResourceEvents.ShowResources(goalId))
        } else {
            Log.e("ResourceScreen", "goalId is null, cannot fetch resources")
        }
    }

    LaunchedEffect(key1 = true) {
        viewModel.addResourceEvent.collectLatest {
            isLoading = when (it) {
                is ResourceUiEvents.Success -> {
                    title = ""
                    selectedTypeId = 0
                    totalUnits = 0
                    progress = 0
                    link = ""
                    context.showToast("Learning resource Added")
                    isSheetOpen = false
                    if (goalId != null)
                        viewModel.onEvent(ResourceEvents.ShowResources(goalId))
                    false
                }

                is ResourceUiEvents.Failure -> {
                    Log.d("main", "ResourceScreen:${it.msg} ")
                    context.showToast(it.msg)
                    false
                }

                ResourceUiEvents.Loading -> true
            }
        }
    }


    LaunchedEffect(key1 = true) {
        viewModel.deleteResourceEvent.collectLatest {
            isLoading = when (it) {
                is ResourceUiEvents.Success -> {
                    context.showToast("Resource Deleted")
                    if (goalId != null)
                        viewModel.onEvent(ResourceEvents.ShowResources(goalId))
                    false
                }

                is ResourceUiEvents.Failure -> {
                    context.showToast(it.msg)
                    if (goalId != null)
                        viewModel.onEvent(ResourceEvents.ShowResources(goalId))
                    false
                }

                ResourceUiEvents.Loading -> true

            }
        }
    }

    LaunchedEffect(key1 = true) {
        viewModel.updateResourceEvent.collectLatest {
            isLoading = when (it) {
                is ResourceUiEvents.Success -> {
                    context.showToast("Resource Updated!")
                    if (goalId != null)
                        viewModel.onEvent(ResourceEvents.ShowResources(goalId))
                    isSheetOpen = false
                    false
                }

                is ResourceUiEvents.Failure -> {
                    context.showToast(it.msg)
                    false
                }

                ResourceUiEvents.Loading -> true

            }
        }
    }


    LaunchedEffect(key1 = true) {
        viewModel.restoreResourceEvent.collectLatest {
            isLoading = when (it) {
                is ResourceUiEvents.Success -> {
                    context.showToast("Resourc Restored")
                    viewModel.onEvent(ResourceEvents.ShowResources(
                        goalId = goalId
                    ))
                    false
                }

                is ResourceUiEvents.Failure -> {
                    context.showToast("Failed to restore Resource")
                    // viewModel2.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                ResourceUiEvents.Loading -> true

            }
        }

    }


    LaunchedEffect(key1 = true) {
        viewModel.softDeleteResourceEvent.collectLatest {
            isLoading = when (it) {
                is ResourceUiEvents.Success -> {
                    context.showToast("Resource go to Trash")
                    viewModel.onEvent(ResourceEvents.ShowResources(
                        goalId = goalId
                    ))
                    false
                }

                is ResourceUiEvents.Failure -> {
                    context.showToast("Resource failed to go to Trash")
                    viewModel.onEvent(ResourceEvents.ShowResources(
                        goalId = goalId
                    ))

                    false
                }

                ResourceUiEvents.Loading -> true

            }
        }
    }





    var selectedResourceId by remember { mutableStateOf<Int?>(null) }
    val getResourceState = viewModel.getResourceByIdResponseEvent.value
    var waitingForResourceData by remember { mutableStateOf(false) }


    LaunchedEffect(getResourceState.data) {
        val data = getResourceState.data
        if (waitingForResourceData && data != null && data.id.toInt() == selectedResourceId) {
//            catId= data.categoryId
//            goalId=data.id
            title = data.title ?: ""
            selectedTypeId = data.typeId
            totalUnits = data.totalUnits
            progress = data.progress
            link = data.link
            isUpdateSheetOpen = true
            waitingForResourceData = false
        }
        // Log.d("getgoalbyid","${categoryTitle}  ${categoryDescription}")
    }





//    var selectedResourceTypeId by remember { mutableStateOf<Int?>(null) }
//    val getResourceTypeState = resTypeViewModel.getResourceTypeByIdResponseEvent.value
//    var waitingForResourceTypeData by remember { mutableStateOf(false) }
//    var resTypeName by remember { mutableStateOf("") }
//    var unitType by remember { mutableStateOf("") }
//
//
//    LaunchedEffect(getResourceTypeState.data) {
//        val data = getResourceTypeState.data
//        if (waitingForResourceTypeData && data != null && data.id.toInt() == selectedResourceTypeId) {
////            catId= data.categoryId
////            goalId=data.id
//            resTypeName=data.name
//            unitType=data.unitType
//            waitingForResourceTypeData = false
//        }
//        // Log.d("getgoalbyid","${categoryTitle}  ${categoryDescription}")
//    }

    val fabShape = RoundedCornerShape(12.dp)

    Scaffold(
        modifier = Modifier.fillMaxSize(),
//        floatingActionButton = {
//            GlowingFAB {
//                isSheetOpen = true
//            }
//        },
        floatingActionButtonPosition = FabPosition.Center,

        floatingActionButton = {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Left‐hand FAB (filter)
                SmallFloatingActionButton(
                    onClick = { /* filter */ },
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
                        isSheetOpen = true
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
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "$goalName",
                        color = Color.White,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold
                    )
                },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.mediumTopAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background
                )
            )
        },
        snackbarHost = {
            SnackbarHost(
                hostState = snackbarHostState,
                snackbar = { data ->
                    Snackbar(
                        snackbarData = data,
                        containerColor = AppColors.secondary, // Background color
                        contentColor = AppColors.foreground, // Text color
                        actionColor = AppColors.foreground    // Optional: action button color
                    )
                }
            )
        },
      //  snackbarHost = { SnackbarHost(hostState = snackbarHostState) }

        bottomBar = { BottomNavigationBar() },
        containerColor =  AppColors.background

        ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            verticalArrangement = Arrangement.Top
        ) {
            if (goalId != null) {
                Tabs(
                    navController = navController,
                    goalId = goalId,
                    goalName = goalName
                )
            }

//            if (resourceResponse.data.isNotEmpty()) {
//                val resources: List<ResourceResponse> = resourceResponse.data
            resourceResponse.data?.let { resources ->


                if (resources.isNotEmpty()) {
                    LazyColumn(
                        modifier = Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.spacedBy(10.dp),
                    ) {

                        items(resources, key = { it.id }) { resource ->

//                            selectedResourceTypeId = resource.typeId
//                            waitingForResourceTypeData = true
//                            resTypeViewModel.onEvent(ResourceTypeEvents.GetResourceTypeByIdEvent(resource.typeId))

                            val progress = resource.progress.toFloat() / resource.totalUnits
                            val percentage = (progress * 100).toInt()

                            Card(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(8.dp),
                                shape = RoundedCornerShape(16.dp),
                                colors = CardDefaults.cardColors(containerColor = AppColors.background),
                                border = BorderStroke(1.dp, Color.DarkGray),

                                ) {
                                Column(modifier = Modifier.padding(16.dp)) {
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.SpaceBetween
                                    ) {
                                        Text(
                                            text = resource.title,
                                            style = MaterialTheme.typography.titleMedium,
                                            color = Color.White
                                        )
//                                        Icon(
//                                            imageVector = Icons.Default.MoreVert,
//                                            contentDescription = null,
//                                            tint = Color.White
//                                        )

                                        Box {

                                            IconButton(onClick = {
                                                expandedStates[resource.title] = true
                                            }) {
                                                Icon(
                                                    painter = painterResource(id = R.drawable.morevertical),
                                                    contentDescription = "res more",
                                                    tint = AppColors.foreground,
                                                    modifier = Modifier.size(16.dp)
                                                )
                                            }

                                            DropdownMenu(
                                                expanded = expandedStates.getOrDefault(resource.title, false),
                                                onDismissRequest = { expandedStates[resource.title] = false }
                                            )

                                            {
                                                DropdownMenuItem(
                                                    text = { Text("Edit") },
                                                    onClick = {
                                                        selectedResourceId = resource.id
                                                        waitingForResourceData = true
                                                        viewModel.onEvent(ResourceEvents.GetResourceByIdEvent(resource.id))
                                                        expandedStates[resource.title] = false
                                                    }
                                                )

                                                DropdownMenuItem(
                                                    text = { Text("Delete") },
                                                    onClick = {
                                                        expandedStates[resource.title] = false
                                                        Log.d("here1","${resource.id}")
                                                        viewModel.onEvent(ResourceEvents.SoftDeleteResourceEvent(resource.id))
                                                        viewModel.onEvent(ResourceEvents.ShowResources(goalId))
                                                        scope.launch {
                                                            val result = snackbarHostState.showSnackbar(
                                                                message = "Goal moved to trash",
                                                                actionLabel = "Undo",
                                                                duration = SnackbarDuration.Short
                                                            )

                                                            if (result == SnackbarResult.ActionPerformed) {
                                                                Log.d("here2","${resource.id}")
                                                                viewModel.onEvent(ResourceEvents.RestoreResourceEvent(resource.id))
                                                            }
                                                        }
                                                    }
                                                )
                                            }
                                        }


                                    }

                                    Spacer(modifier = Modifier.height(12.dp)) // Added before the progress bar for breathing space

                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .padding(top = 8.dp)
                                    ) {
                                        Box(
                                            modifier = Modifier
                                                .weight(1f)
                                                .height(24.dp) // Increased height for better visibility
                                                .clip(RoundedCornerShape(10.dp))
                                                .background(Color(0xFF2C2C2E))
                                        ) {
                                            Box(
                                                modifier = Modifier
                                                    .fillMaxHeight()
                                                    .fillMaxWidth(progress)
                                                    .clip(RoundedCornerShape(10.dp))
                                                    .background(Color(0xFFAFAEB4))
                                            )
                                            Text(
                                                text = "$percentage%",
                                                style = MaterialTheme.typography.labelSmall,
                                                color = Color.White,
                                                modifier = Modifier
                                                    .align(Alignment.Center)
                                                    .padding(horizontal = 4.dp) // Added horizontal padding to avoid text cutoff
                                            )
                                        }

                                        Spacer(modifier = Modifier.width(12.dp))

                                        Text(
                                            text = "${resource.progress}/${resource.totalUnits}",
                                            style = MaterialTheme.typography.labelSmall,
                                            color = Color.White,
                                            modifier = Modifier.padding(end = 4.dp)
                                        )
                                    }

                                   // Row(verticalAlignment = Alignment.CenterVertically) {

//                                        Row(
//                                            verticalAlignment = Alignment.CenterVertically,
//                                            modifier = Modifier
//                                                //  .background(Color.Black)
//                                                .padding(16.dp)
//                                        ) {
//                                            // Tag Icon
//                                            Icon(
//                                                painter = painterResource(id = R.drawable.tag),
//                                                contentDescription = "folder",
//                                                tint = AppColors.foreground,
//                                                modifier = Modifier.size(22.dp)
//                                            )
//
//                                            Spacer(modifier = Modifier.width(8.dp))
//
//                                            // "Video" Button Style
//                                            Surface(
//                                                shape = RoundedCornerShape(50),
//                                                border = BorderStroke(1.dp, Color.DarkGray),
//                                                color = Color.Transparent
//                                            ) {
//                                                Text(
//                                                    text = resTypeName,
//                                                    color = Color.White,
//                                                    modifier = Modifier
//                                                        .padding(horizontal = 8.dp, vertical = 4.dp)
//                                                )
//                                            }
//                                        }
//                                        Spacer(modifier = Modifier.weight(1f))
//                                        Icon(
//                                            painter = painterResource(id = R.drawable.openinnewwindow),
//                                            contentDescription = "folder",
//                                            tint = AppColors.foreground,
//                                            modifier = Modifier.size(22.dp).
//                                            clickable {
//
//                                            }
//                                        )
                                    }

                                    //Spacer(modifier = Modifier.height(12.dp))

//                                    Row(
//                                        verticalAlignment = Alignment.CenterVertically,
//                                        modifier = Modifier.fillMaxWidth()
//                                    ) {
//                                        Box(
//                                            modifier = Modifier
//                                                .weight(1f)
//                                                .height(20.dp)
//                                                .clip(RoundedCornerShape(10.dp))
//                                                .background(Color(0xFF2C2C2E))
//                                        ) {
//                                            Box(
//                                                modifier = Modifier
//                                                    .fillMaxHeight()
//                                                    .fillMaxWidth(progress)
//                                                    .clip(RoundedCornerShape(10.dp))
//                                                    .background(Color(0xFFAFAEB4))
//                                            )
//                                            Text(
//                                                text = "$percentage%",
//                                                style = MaterialTheme.typography.labelSmall,
//                                                color = Color.White,
//                                                modifier = Modifier.align(Alignment.Center)
//                                            )
//                                        }
//
//                                        Spacer(modifier = Modifier.width(12.dp))
//
//                                        Text(
//
//                                            text = "${resource.progress}/${resource.totalUnits}",
//                                            style = MaterialTheme.typography.labelSmall,
//                                            color = Color.White
//                                        )
//
//                                        Spacer(modifier = Modifier.height(16.dp))
//
////                                        Surface(
////                                            shape = RoundedCornerShape(50),
////                                            border = BorderStroke(1.dp, Color.DarkGray),
////                                            color = Color.Transparent
////                                        ) {
////                                            Text(
////                                                text = unitType,
////                                                color = Color.White,
////                                                modifier = Modifier
////                                                    .padding(horizontal = 8.dp, vertical = 4.dp)
////                                            )
////                                        }
//                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        if (isSheetOpen) {
            AddResourceBottomSheet(
                isOpen = isSheetOpen,
                title = title,
                onTitleChange = { title = it },
                typeId = selectedTypeId,
                onTypeIdChange = { selectedTypeId = it },
                totalUnits = totalUnits,
                onTotalUnitsChange = { totalUnits = it },
                progress = progress,
                onProgressChange = { progress = it },
                link = link,
                onLinkChange = { link = it },
                onDismiss = { isSheetOpen = false },
                // onSave = {}

                onSave = {
                    if (title.isNotEmpty()) {
                        viewModel.onEvent(
                            ResourceEvents.AddResourceEvent(
                                Resource(
                                    goalId = goalId ?: 1,
                                    title = title,
                                    typeId = selectedTypeId,
                                    totalUnits = totalUnits,
                                    progress = progress,
                                    link = link,
                                ),
                                //  goalId = goalId ?: 0
                            )
                        )
//                    isSheetOpen = false
//                    title = ""
//                    typeId =0
//                    totalUnits = 0
//                    progress = 0
//                    link =  ""
                        Log.d("dddd", "$goalId $title $selectedTypeId $totalUnits $progress $link")
                    } else {
                        context.showToast("Please enter all required fields.")
                    }
                }
            )
        }

         if (isUpdateSheetOpen) {

             AddResourceBottomSheet(
                 isOpen = isUpdateSheetOpen,
                 title = title,
                 onTitleChange = { title = it },
                 typeId = selectedTypeId,
                 onTypeIdChange = { selectedTypeId = it },
                 totalUnits = totalUnits,
                 onTotalUnitsChange = { totalUnits = it },
                 progress = progress,
                 onProgressChange = { progress = it },
                 link = link,
                 onLinkChange = { link = it },
            onDismiss = { isUpdateSheetOpen = false },
            onSave = {
                if (title.isNotEmpty()) {
                    viewModel.onEvent(
                        ResourceEvents.UpdateResourceEvent(
                            resource = Resource(
                                goalId = goalId ?: 1,
                                title = title,
                                typeId = selectedTypeId,
                                totalUnits = totalUnits,
                                progress = progress,
                                link = link,
                            ),
                            id = goalId,
                        )
                    )
                    isSheetOpen = false
                    title = ""
                    //typeId = selectedTypeId,
                    totalUnits = 0
                    progress = 0
                    link = ""

                } else {
                    context.showToast("Please enter all the required fields.")
                }
            }
        )
    }
//
    }





@Preview(showSystemUi = true)
@Composable
fun AddTaskScreenPreview(modifier: Modifier = Modifier) {

   // AddTaskScreen()
}


