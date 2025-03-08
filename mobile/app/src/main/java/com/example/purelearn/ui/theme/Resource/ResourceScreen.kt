package com.example.purelearn.ui.theme.Resource

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.purelearn.domain.model.Resource
import com.example.purelearn.domain.model.ResourceResponse
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.ResourceViewModel
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceEvents
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceUiEvents
import com.example.purelearn.ui.theme.components.AddResourceBottomSheet
import com.example.purelearn.ui.theme.components.HomeTopAppBar
import com.example.purelearn.ui.theme.components.ResourceCard
import com.example.purelearn.ui.theme.components.SwipeToDeleteContainer
import com.example.purelearn.ui.theme.components.showToast
import kotlinx.coroutines.flow.collectLatest

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ResourceScreen(
    //navController: NavController,
    goalId: Int,
    viewModel: ResourceViewModel = hiltViewModel(),
    ) {

    val sheetState = rememberModalBottomSheetState(
        skipPartiallyExpanded = true
    )
    val isVisible = rememberSaveable { mutableStateOf(true) }


    var isSheetOpen by remember {
        mutableStateOf(false)
    }
    var isUpdateSheetOpen by remember {
        mutableStateOf(false)
    }

    var title by remember { mutableStateOf("") }
    var  typeId by remember { mutableStateOf(0) }
    var  totalUnits by remember { mutableStateOf(0) }
    var  progress by remember { mutableStateOf(0) }
    var link by remember { mutableStateOf("") }
    val response by viewModel.resourceResponseEvent
    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }



    LaunchedEffect(Unit) {
            viewModel.onEvent(ResourceEvents.ShowResources(goalId=6))
    }

    LaunchedEffect(key1 = true) {
        viewModel.addResourceEvent.collect {
            isLoading = when (it) {
                is ResourceUiEvents.Success -> {
                    title = ""
                    typeId = 0
                    totalUnits = 0
                    progress = 0
                    link = ""
                    context.showToast("Learning resource Added")
                    isSheetOpen = false
                        viewModel.onEvent(ResourceEvents.ShowResources(goalId))
                    false
                }

                is ResourceUiEvents.Failure -> {
                   //Log.d("main", "CategoryScreen:${it.msg} ")
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
                        viewModel.onEvent(ResourceEvents.ShowResources(goalId))
                    false
                }

                is ResourceUiEvents.Failure -> {
                    context.showToast(it.msg)
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

    Scaffold(modifier = Modifier.fillMaxSize(),
        floatingActionButton = {
            AnimatedVisibility(
                visible = isVisible.value,
                enter = slideInVertically(initialOffsetY = { it * 2 }),
                exit = slideOutVertically(targetOffsetY = { it * 2 })
            ) {
                ExtendedFloatingActionButton(
                    onClick = { isSheetOpen=true },
                    icon = {
                        Icon(
                            imageVector = Icons.Default.Add,
                            contentDescription = "Add",
                            tint = White
                        )
                    },
                    text = { Text("Add Resource", color = White) },
                    containerColor = Color(0xFF2196F3), // Blue color
                    contentColor = White
                )
            }
        },
        topBar = {
            HomeTopAppBar(
                userName = "Fatema"
            )
        }
    )
    { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {


            Column(
                modifier = Modifier
                    //.fillMaxSize()
                    .background(
                        color = MaterialTheme.colorScheme.background
                    )
            ) {
                Text(
                    text = "Goal Name",
                    modifier = Modifier.padding(start = 16.dp),
                    fontSize = 20.sp
                )
            }

            Row(
                modifier = Modifier.fillMaxWidth()
                    .padding(horizontal = 16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Button(
                    onClick = { /* Handle click */ },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = White,
                        contentColor = Color.Black
                    ),
                    shape = RoundedCornerShape(50),
                    modifier = Modifier.height(40.dp)

                ) {
                    Text(text = "Tasks", fontSize = 14.sp, fontWeight = FontWeight.Medium)
                }
                Button(
                    onClick = { /* Handle click */ },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = White,
                        contentColor = Color.Black
                    ),
                    shape = RoundedCornerShape(50),
                    modifier = Modifier.height(40.dp)

                ) {
                    Text(
                        text = "Resources",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
                Button(
                    onClick = { /* Handle click */ },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = White,
                        contentColor = Color.Black
                    ),
                    shape = RoundedCornerShape(50),
                    modifier = Modifier.height(40.dp)

                ) {
                    Text(text = "Notes", fontSize = 14.sp, fontWeight = FontWeight.Medium)
                }

            }
            Text(
                text = "Resources",
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onBackground,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 10.dp)
            )
        }


        if (response.data.isNotEmpty())
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                val resourses: List<ResourceResponse> = response.data


                items(resourses, key = { it.id }) { resourse ->
                    SwipeToDeleteContainer(
                        item = resourse,
                        onDelete = {
                            viewModel.onEvent(ResourceEvents.DeleteResourceEvent(resourse.id))
                        },
                        animationDuration = 300,
                        content = { item ->
                            ResourceCard(
                                resource = item,
                                onClick = {
                                    title = item.title
                                    isSheetOpen = true
                                    //goalId = item.id
                                },
                                onUpdateResource = {
                                    isUpdateSheetOpen = true
                                    title = item.title
                                   // goalId = item.id
                                }
                            )
                        }
                    )

                }
            }
        }



    if (isSheetOpen) {
        AddResourceBottomSheet(
            isOpen = isSheetOpen,
            title = title,
            onTitleChange = {title=it},
            typeId =typeId ,
            onTypeIdChange = {typeId=it},
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
                                goalId = goalId ?: 0,
                                title = title,
                                typeId =typeId,
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

                } else {
                    context.showToast("Please enter all required fields.")
                }
            }
        )
    }
        }














@Preview(showSystemUi = true)
@Composable
fun AddTaskScreenPreview(modifier: Modifier = Modifier) {

   // AddTaskScreen()
}


