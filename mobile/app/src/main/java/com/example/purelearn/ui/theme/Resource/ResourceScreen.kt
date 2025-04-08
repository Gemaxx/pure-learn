package com.example.purelearn.ui.theme.Resource

import android.util.Log
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.purelearn.domain.model.Resource
import com.example.purelearn.domain.model.ResourceResponse
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.ResourceViewModel
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceEvents
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceUiEvents
import com.example.purelearn.ui.theme.components.AddResourceBottomSheet
import com.example.purelearn.ui.theme.components.GlowingFAB
import com.example.purelearn.ui.theme.components.ResourceCard
import com.example.purelearn.ui.theme.components.SegmentedControlScreen
import com.example.purelearn.ui.theme.components.SwipeToDeleteContainer
import com.example.purelearn.ui.theme.components.showToast
import kotlinx.coroutines.flow.collectLatest

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ResourceScreen(
    navController: NavController,
    goalId: Int?,
    viewModel: ResourceViewModel = hiltViewModel(),
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
    var  totalUnits by remember { mutableStateOf(0) }
    var  progress by remember { mutableStateOf(0) }
    var link by remember { mutableStateOf("") }
    val resourceResponse by viewModel.resourceResponseEvent
    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }



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
                    totalUnits=0
                    progress=0
                    link=""
                    context.showToast("Learning resource Added")
                    isSheetOpen = false
                    if(goalId!=null)
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
                        if(goalId!=null)
                        viewModel.onEvent(ResourceEvents.ShowResources(goalId))
                    false
                }

                is ResourceUiEvents.Failure -> {
                    context.showToast(it.msg)
                    if(goalId!=null)
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
                        if(goalId!=null)
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



    Scaffold(
        modifier = Modifier.fillMaxSize(),
        floatingActionButton = {
            GlowingFAB {
                isSheetOpen = true
            }
        },
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Goal Name",
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
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            verticalArrangement = Arrangement.Top // Ensures items are stacked properly
        ) {
            // First, Segmented Control appears
            if (goalId != null) {
                SegmentedControlScreen(
                    navController = navController,
                    goalId =goalId
                )
            }

            // Then, Resource list appears below it
            if (resourceResponse.data.isNotEmpty()) {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.spacedBy(10.dp),
                ) {
                    val resources: List<ResourceResponse> = resourceResponse.data

                    items(resources, key = { it.id }) { resource ->
                        SwipeToDeleteContainer(
                            item = resource,
                            onDelete = {
                                viewModel.onEvent(ResourceEvents.DeleteResourceEvent(resource.id))
                            },
                            animationDuration = 300,
                            content = { item ->
                                ResourceCard(
                                    resource = item,
                                    onClick = {
                                        title = item.title
                                        isSheetOpen = true
                                    },
                                    onUpdateResource = {
                                        isUpdateSheetOpen = true
                                        title = item.title
                                    }
                                )
                            }
                        )
                    }
                }
            }
        }
    }


    if (isSheetOpen) {
        AddResourceBottomSheet(
            isOpen = isSheetOpen,
            title = title,
            onTitleChange = {title=it},
            typeId =selectedTypeId ,
            onTypeIdChange = {selectedTypeId=it},
            totalUnits = totalUnits,
            onTotalUnitsChange = {totalUnits=it},
            progress = progress,
            onProgressChange = {progress=it},
            link = link,
            onLinkChange = {link=it},
            onDismiss = {isSheetOpen=false},
           // onSave = {}

            onSave = {
                if (title.isNotEmpty() )
                {
                    viewModel.onEvent(
                        ResourceEvents.AddResourceEvent(
                            Resource(
                                goalId = goalId ?: 1,
                                title = title,
                                typeId =selectedTypeId,
                                totalUnits =  totalUnits,
                                progress = progress,
                                link =  link,
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
                    Log.d("dddd","$goalId $title $selectedTypeId $totalUnits $progress $link")
                } else {
                    context.showToast("Please enter all required fields.")
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


