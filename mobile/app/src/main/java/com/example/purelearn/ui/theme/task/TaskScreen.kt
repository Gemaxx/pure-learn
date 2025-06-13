package com.example.purelearn.ui.theme.task

import android.util.Log
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectDragGesturesAfterLongPress
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredHeight
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.foundation.layout.requiredWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
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
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Rect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.boundsInRoot
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.anew.ui.theme.PureLearnTheme
import com.example.purelearn.R
import com.example.purelearn.domain.model.KanbanStatusRequest
import com.example.purelearn.domain.model.KanbanStatusResponse
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.AppTypography
import com.example.purelearn.ui.theme.components.AddKanbanStatusListDialog
import com.example.purelearn.ui.theme.components.BottomNavigationBar
import com.example.purelearn.ui.theme.components.LoadingBar
import com.example.purelearn.ui.theme.components.Tabs
import com.example.purelearn.ui.theme.components.showToast
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryEvents
import com.example.purelearn.ui.theme.kanbanstatus.kanbanstatusviewmodel.KanbanStatusViewModel
import com.example.purelearn.ui.theme.kanbanstatus.kanbanstatusviewmodel.events.KanbanStatusEvents
import com.example.purelearn.ui.theme.kanbanstatus.kanbanstatusviewmodel.events.KanbanStatusUiEvents
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch
import java.util.UUID


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TaskScreen(
    navController: NavController,
    goalId: Int,
    goalName:String,
    viewModel: KanbanStatusViewModel = hiltViewModel(),

    ) {


    val response = viewModel.kanbanStatusResponseEvent.value

    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }
    if (isLoading) LoadingBar()

    val kanbanLists = remember(response) {
        mutableStateListOf<BoardList>().apply {
            response.data?.forEach { status ->
                add(
                    BoardList(
                        title = status.name,
                        cards = mutableStateListOf<BoardCard>()
                    )
                )
            }
        }
    }
    val snackbarHostState = remember { SnackbarHostState() }




    LaunchedEffect(Unit) {
        if (goalId != null) {
            viewModel.onEvent(KanbanStatusEvents.ShowKanbanStatus(goalId))
        } else {
            Log.e("TaskScreen", "goalId is null, cannot fetch resources")
        }
    }


    val deleteEvent = viewModel.deleteKanbanStatusEvent.collectAsState().value

    LaunchedEffect(deleteEvent) {
        deleteEvent?.let { event ->
            when (event) {
                is KanbanStatusUiEvents.Success<*> -> {
                    isLoading = false
                    val deletedStatus = event.data as? KanbanStatusResponse

                    val result = snackbarHostState.showSnackbar(
                        message = "List deleted",
                        actionLabel = "Undo",
                        duration = SnackbarDuration.Short
                    )

                    if (result == SnackbarResult.ActionPerformed && deletedStatus != null) {
                        viewModel.onEvent(
                            KanbanStatusEvents.AddKanbanStatusEvent(
                                goalId = goalId,
                                kanbanStatus = KanbanStatusRequest(
                                    name = deletedStatus.name,
                                    maxTasks = deletedStatus.maxTasks
                                )
                            )
                        )
                    } else {
                        viewModel.onEvent(KanbanStatusEvents.ShowKanbanStatus(goalId))
                    }
                }

                is KanbanStatusUiEvents.Failure -> {
                    isLoading = false
                    context.showToast(event.msg)
                    viewModel.onEvent(KanbanStatusEvents.ShowKanbanStatus(goalId))
                }

                KanbanStatusUiEvents.Loading -> {
                    isLoading = true
                }
            }
            viewModel.clearDeleteKanbanStatusEvent()
        }
    }





    val fabShape = RoundedCornerShape(12.dp)

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "$goalName Tasks",
                        color = MaterialTheme.colorScheme.primary,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold
                    )
                },
                navigationIcon = {
                    IconButton(onClick = {
                        navController.popBackStack()
                        }) {
                        Icon(
                            Icons.Filled.ArrowBack, contentDescription = "Back",
                            tint = MaterialTheme.colorScheme.primary
                        )
                    }
                },
                colors = TopAppBarDefaults.mediumTopAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background
                )
            )
        },
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

                // Right‐hand FAB (add)
                SmallFloatingActionButton(
                    onClick = { /* add */ },
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
        bottomBar = { BottomNavigationBar() },

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
        ) }
    ){ paddingValues ->


        Box(modifier = Modifier.fillMaxSize()) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
            ) {
                if (goalId != null) {
                    Tabs(
                        navController = navController,
                        goalId = goalId,
                        goalName = goalName
                    )
                }
                BoardScreen(
                    boardLists = kanbanLists,
                    goalId = goalId,
                    viewModel = viewModel,
                    snackbarHostState = snackbarHostState
                )
            }

            if (isLoading) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(Color.Black.copy(alpha = 0.3f)), 
                    contentAlignment = Alignment.Center
                ) {
                    LoadingBar()
                }
            }
        }

    }
}


@Composable
fun BoardScreen(boardLists: SnapshotStateList<BoardList> ,
                goalId: Int,
                viewModel: KanbanStatusViewModel = hiltViewModel(),
                snackbarHostState: SnackbarHostState


) {
    val dragDropState = remember { DragDropState() }
    val response = viewModel.kanbanStatusResponseEvent.value
   val kanbanLists = response.data ?: emptyList()  // Fallback to empty list if null
    var isUpdateKanbanStatusDialogOpen by rememberSaveable { mutableStateOf(false) }

    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }
    var title by remember { mutableStateOf("") }
    var maxTasks by remember { mutableStateOf(0) }
    var kanbanStatusId by remember { mutableStateOf(0) }

   // if (isLoading) LoadingBar()
    var isAddKanbanStatusDialogOpen by rememberSaveable { mutableStateOf(false) }
    val expandedStates = remember { mutableStateMapOf<String, Boolean>() }

    LaunchedEffect(Unit) {
        if (goalId != null) {
            viewModel.onEvent(KanbanStatusEvents.ShowKanbanStatus(goalId))
        } else {
            Log.e("TaskScreen", "goalId is null, cannot fetch resources")
        }
    }


    LaunchedEffect(key1 = true) {
        viewModel.updateKanbanStatusEvent.collectLatest { event ->
            when (event) {
                is KanbanStatusUiEvents.Success<*> -> {
                    context.showToast("List Updated!")
                    if (goalId != null)
                        viewModel.onEvent(KanbanStatusEvents.ShowKanbanStatus(goalId))
                    isUpdateKanbanStatusDialogOpen = false
                    isLoading = false
                }

                is KanbanStatusUiEvents.Failure -> {
                    context.showToast(event.msg)
                    isLoading = false
                }

                KanbanStatusUiEvents.Loading -> {
                    isLoading = true
                }
            }
        }
    }

    LaunchedEffect(key1 = true) {
        viewModel.addKanbanStatusEvent.collectLatest { event ->
            when (event) {
                is KanbanStatusUiEvents.Success<*> -> {
                    title =""
                    maxTasks = 0
                    context.showToast("List Added")
                    isAddKanbanStatusDialogOpen = false
                    if (goalId != null)
                        viewModel.onEvent(KanbanStatusEvents.ShowKanbanStatus(goalId))
                    isLoading = false
                }

                is KanbanStatusUiEvents.Failure -> {
                    Log.d("main", "TaskScreen:${event.msg}")
                    context.showToast(event.msg)
                    isLoading = false
                }

                KanbanStatusUiEvents.Loading -> {
                    isLoading = true
                }
            }
        }
    }

    Row(
        modifier = Modifier
            .fillMaxSize()
            .horizontalScroll(rememberScrollState())
            .background(MaterialTheme.colorScheme.background)
            .padding(0.dp),
        horizontalArrangement = Arrangement.spacedBy(16.dp)   // 16.dp between each list :contentReference[oaicite:0]{index=0}

    ) {
        var listBounds by remember { mutableStateOf<Rect?>(null) }
        var expanded by remember { mutableStateOf(false) }
        kanbanLists.forEach { list ->

            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp, Alignment.Top),
                modifier = Modifier
                    .requiredWidth(width = 300.dp)
                    .clip(shape = RoundedCornerShape(12.dp))
                    .background(color = AppColors.card)
                    .border(border = BorderStroke(1.dp, AppColors.border),
                        shape = RoundedCornerShape(12.dp))
                    .padding(start = 8.dp,
                        end = 8.dp,
                        top = 12.dp,
                        bottom = 16.dp)
            ) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(4.dp, Alignment.Start),
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxWidth()
                       // .border(border = BorderStroke(1.dp, AppColors.muted))
                        .padding(horizontal = 8.dp,
                            vertical = 4.dp)
                        .shadow(elevation = 6.5.dp)
                ) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(4.dp, Alignment.Start),
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier
                            .weight(weight = 1f)
                    ) {
                        Text(
                            text = list.name,
                            color = AppColors.foreground,
                            lineHeight = 1.56.em,
                            style = AppTypography.h4,
                            modifier = Modifier
                                .fillMaxWidth()
                                .wrapContentHeight(align = Alignment.CenterVertically))
                    }
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(4.dp, Alignment.CenterHorizontally),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Max: ${list.maxTasks}",
                            color = AppColors.foreground,
                            lineHeight = 1.33.em,
                            style = AppTypography.body,
                            modifier = Modifier
                                .wrapContentHeight(align = Alignment.CenterVertically)
                        )

                        Box {

                            IconButton(onClick = {
                                expandedStates[list.name] = true
                            }) {
                                Icon(
                                    imageVector = Icons.Default.MoreVert,
                                    contentDescription = "Options"
                                )
                            }

                            DropdownMenu(
                                expanded = expandedStates.getOrDefault(list.name, false),
                                onDismissRequest = { expandedStates[list.name] = false }
                            )

                            {
                                DropdownMenuItem(
                                    text = { Text("Edit") },
                                    onClick = {
                                        expandedStates[list.name] = false
                                        title = list.name
                                        maxTasks = list.maxTasks ?: 0
                                        kanbanStatusId = list.id
                                        isUpdateKanbanStatusDialogOpen = true

                                    }
                                )

                                DropdownMenuItem(
                                    text = { Text("Delete") },
                                    onClick = {
                                        expandedStates[list.name] = false

                                        val deletedStatus = list.copy()

                                        CoroutineScope(Dispatchers.Main).launch {
                                            viewModel.onEvent(
                                                KanbanStatusEvents.DeleteKanbanStatusEvent(
                                                    goalId = goalId,
                                                    id = list.id
                                                )
                                            )

                                            val result = snackbarHostState.showSnackbar(
                                                message = "List deleted",
                                                actionLabel = "Undo",
                                                duration = SnackbarDuration.Short
                                            )

                                            if (result == SnackbarResult.ActionPerformed) {
                                                viewModel.onEvent(
                                                    KanbanStatusEvents.AddKanbanStatusEvent(
                                                        goalId = goalId,
                                                        kanbanStatus = KanbanStatusRequest(
                                                            name = deletedStatus.name,
                                                            maxTasks = deletedStatus.maxTasks ?: 0
                                                        )
                                                    )
                                                )
                                            } else {
                                                viewModel.onEvent(KanbanStatusEvents.ShowKanbanStatus(goalId))
                                            }
                                        }
                                    }
                                )



                            }
                        }

                    }
                }
                LazyColumn(
                 //   verticalArrangement = Arrangement.spacedBy(8.dp, Alignment.Top),
                    modifier = Modifier
                       // .fillMaxWidth()
                        .padding(horizontal = 4.dp,
                            vertical = 8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)    // 8.dp between each task :contentReference[oaicite:0]{index=0}

                ) {
//                    items(5) {
//                        KanbanTaskItem()
//                    }
                }
//                Column(
//                    verticalArrangement = Arrangement.spacedBy(4.dp, Alignment.CenterVertically),
//                    horizontalAlignment = Alignment.CenterHorizontally,
//                    modifier = Modifier
//                        .fillMaxWidth()
//                ) {
//                    TypeGhost(
//                       // modifier = modifier,
//                        showIcon22524 = true,
//                        showTrailingIcon22520 = true
//                    )
//                }
            }

            /////////////////////////////////////////////////////////////
        }


        Button(
            modifier = Modifier
                .requiredWidth(width = 300.dp)
                .clip(shape = RoundedCornerShape(12.dp))
                .background(color = AppColors.card)
                .border(border = BorderStroke(1.dp, AppColors.border),
                    shape = RoundedCornerShape(12.dp))
                .padding(start = 8.dp,
                    end = 8.dp,
                    top = 12.dp,
                    bottom = 16.dp),

            onClick = {
                isAddKanbanStatusDialogOpen=true
              //  boardLists.add(BoardList("New List"))
            },
            colors = ButtonDefaults.buttonColors(
                containerColor = AppColors.background,
                contentColor = AppColors.foreground
            ),
            shape = RoundedCornerShape(12.dp),
            //   elevation = ButtonDefaults.elevation(defaultElevation = 0.dp),
//            modifier = Modifier
//                .padding(8.dp)
//                .width(300.dp)
//                .height(48.dp)
        ) {
            Row {
                Icon(
                    modifier = Modifier.size(23.dp),
                    painter = painterResource(id = R.drawable.plus),
                    contentDescription = "Add"
                )
                Text(
                    text = "Add status",
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 16.sp
                )
            }

        }
        if (isUpdateKanbanStatusDialogOpen) {

            AddKanbanStatusListDialog (
                isOpen = isUpdateKanbanStatusDialogOpen,
                title = title,
                onTitleChange = { title = it },
                onMaxTasksChange = { maxTasks = it },
                maxTasks = maxTasks,
                onClick = { },
                onDismiss = { isUpdateKanbanStatusDialogOpen = false },
                onSave = {

                    if (title.isNotEmpty() ) {
                        viewModel.onEvent(
                            KanbanStatusEvents.UpdateKanbanStatusEvent(
                                goalId = goalId,
                                id = kanbanStatusId,
                                kanbanStatus = KanbanStatusRequest(
                                    name = title,
                                    maxTasks = maxTasks
                                )
                            )
                        )
                            } else {
                        context.showToast("Please add title ")
                    }

                    print("  id ==== $kanbanStatusId,\n" +
                            " kanbanStatus = KanbanStatusRequest(\n")


                }
            )

        }

    }


    if (isAddKanbanStatusDialogOpen) {
        AddKanbanStatusListDialog (
            isOpen = isAddKanbanStatusDialogOpen,
            title = title,
            onTitleChange = { title = it },
            onMaxTasksChange = { maxTasks = it },
            maxTasks = maxTasks,
            onClick = { },
            onDismiss = { isAddKanbanStatusDialogOpen = false },

            onSave = {
                if (title.isNotEmpty() ) {
                    viewModel.onEvent(
                        KanbanStatusEvents.AddKanbanStatusEvent(
                            kanbanStatus = KanbanStatusRequest(
                                name = title,
                                maxTasks = maxTasks
                            ),
                            goalId = goalId,
                        )
                    )
                } else {
                    context.showToast("Please add title")
                }
            }
        )
    }


}

data class BoardCard(val id: String = UUID.randomUUID().toString(), val title: String)
data class BoardList(val title: String, val cards: SnapshotStateList<BoardCard> = mutableStateListOf())


@Composable
fun DraggableCardView(
    card: BoardCard,
    currentList: BoardList,
    allLists: SnapshotStateList<BoardList>,
    dragDropState: DragDropState
) {
    val isBeingDragged = dragDropState.draggedCard == card

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(4.dp)
            .graphicsLayer {
                if (isBeingDragged) {
                    translationX = dragDropState.dragOffset.x
                    translationY = dragDropState.dragOffset.y
                    shadowElevation = 8f
                    scaleX = 1.05f
                    scaleY = 1.05f
                }
            }
            .pointerInput(card) {
                detectDragGesturesAfterLongPress(
                    onDragStart = {
                        dragDropState.draggedCard = card
                        dragDropState.sourceList = currentList
                        dragDropState.dragOffset = Offset.Zero
                    },
                    onDrag = { change, dragAmount ->
                        change.consume()
                        dragDropState.dragOffset += Offset(dragAmount.x, dragAmount.y)

                        dragDropState.listBoundsMap.forEach { (title, rect) ->
                            if (rect != null && rect.contains(dragDropState.dragOffset)) {
                                val target = allLists.find { it.title == title }
                                if (target != null && target != currentList) {
                                    dragDropState.targetList = target
                                }
                            }
                        }
                    },
                    onDragEnd = {
                        val targetList = dragDropState.targetList
                        val sourceList = dragDropState.sourceList

                        if (targetList != null && sourceList != null && targetList != sourceList) {
                            sourceList.cards.remove(card)
                            targetList.cards.add(card)
                            println("Moved '${card.title}' from '${sourceList.title}' to '${targetList.title}'")
                        }

                        dragDropState.draggedCard = null
                        dragDropState.sourceList = null
                        dragDropState.targetList = null
                        dragDropState.dragOffset = Offset.Zero
                    },
                    onDragCancel = {
                        dragDropState.draggedCard = null
                        dragDropState.sourceList = null
                        dragDropState.targetList = null
                        dragDropState.dragOffset = Offset.Zero
                    }
                )
            },
        shape = RoundedCornerShape(8.dp),
        colors = CardDefaults.cardColors(containerColor = Color.DarkGray)
    ) {
        Text(
            text = card.title,
            color = Color.White,
            modifier = Modifier.padding(8.dp)
        )
    }
}

class DragDropState {
    var draggedCard by mutableStateOf<BoardCard?>(null)
    var dragOffset by mutableStateOf(Offset.Zero)
    var sourceList by mutableStateOf<BoardList?>(null)
    var targetList by mutableStateOf<BoardList?>(null)
    var listBoundsMap = mutableStateMapOf<String, Rect?>()
}


@Preview(showSystemUi = true)
@Composable
fun TaskScreenPreview(modifier: Modifier = Modifier) {
    PureLearnTheme {
      //  TaskScreen()
    }
}





//
//@Composable
//fun Property1Default(modifier: Modifier = Modifier) {
//    Column(
//        verticalArrangement = Arrangement.spacedBy(8.dp, Alignment.Top),
//        modifier = modifier
//            .requiredWidth(width = 300.dp)
//            .clip(shape = RoundedCornerShape(12.dp))
//            .background(color = AppColors.card)
//            .border(border = BorderStroke(1.dp, AppColors.border),
//                shape = RoundedCornerShape(12.dp))
//            .padding(start = 8.dp,
//                end = 8.dp,
//                top = 12.dp,
//                bottom = 16.dp)
//    ) {
//        Row(
//            horizontalArrangement = Arrangement.spacedBy(4.dp, Alignment.Start),
//            verticalAlignment = Alignment.CenterVertically,
//            modifier = Modifier
//                .fillMaxWidth()
//                .border(border = BorderStroke(1.dp, AppColors.muted))
//                .padding(horizontal = 8.dp,
//                    vertical = 4.dp)
//                .shadow(elevation = 6.5.dp)
//        ) {
//            Row(
//                horizontalArrangement = Arrangement.spacedBy(4.dp, Alignment.Start),
//                verticalAlignment = Alignment.CenterVertically,
//                modifier = Modifier
//                    .weight(weight = 1f)
//            ) {
//                Text(
//                    text = "To-DO",
//                    color = AppColors.foreground,
//                    lineHeight = 1.56.em,
//                    style = AppTypography.h4,
//                    modifier = Modifier
//                        .fillMaxWidth()
//                        .wrapContentHeight(align = Alignment.CenterVertically))
//            }
//            Row(
//                horizontalArrangement = Arrangement.spacedBy(4.dp, Alignment.CenterHorizontally),
//                verticalAlignment = Alignment.CenterVertically
//            ) {
//                Text(
//                    text = "MAX: 5",
//                    color = AppColors.foreground,
//                    lineHeight = 1.33.em,
//                    style = AppTypography.body,
//                    modifier = Modifier
//                        .wrapContentHeight(align = Alignment.CenterVertically))
//                SizeMediumStyleGhostRoundedMedium()
//            }
//        }
//        LazyColumn(
//            verticalArrangement = Arrangement.spacedBy(8.dp, Alignment.Top),
//            modifier = Modifier
//                .fillMaxWidth()
//                .padding(horizontal = 4.dp,
//                    vertical = 8.dp)
//        ) {
//            items(5) {
//                KanbanTaskItem()
//            }
//        }
//        Column(
//            verticalArrangement = Arrangement.spacedBy(4.dp, Alignment.CenterVertically),
//            horizontalAlignment = Alignment.CenterHorizontally,
//            modifier = Modifier
//                .fillMaxWidth()
//        ) {
//            TypeGhost(
//                modifier = modifier,
//                showIcon22524 = true,
//                showTrailingIcon22520 = true
//            )
//        }
//    }
//}

@Composable
fun SizeMediumStyleGhostRoundedMedium(modifier: Modifier = Modifier) {
    Row(
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically,
        modifier = modifier
            .requiredSize(size = 32.dp)
            .clip(shape = RoundedCornerShape(6.dp))
            .padding(horizontal = 16.dp,
                vertical = 8.dp)
    ) {
        Image(
            painter = painterResource(id = R.drawable.morevertical),
            contentDescription = "more-vertical",
            modifier = Modifier
                .requiredSize(size = 16.dp))
    }
}

@Composable
fun KanbanTaskItem(modifier: Modifier = Modifier) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(12.dp, Alignment.Start),
        verticalAlignment = Alignment.CenterVertically,
        modifier = modifier
            .fillMaxWidth()
            .clip(shape = RoundedCornerShape(12.dp))
            .border(border = BorderStroke(1.dp, AppColors.muted),
                shape = RoundedCornerShape(12.dp))
            .padding(horizontal = 8.dp,
                vertical = 16.dp)
    ) {
//        Column(
//            verticalArrangement = Arrangement.spacedBy(12.dp, Alignment.Top),
//            modifier = Modifier
//                .fillMaxSize()
//                .weight(weight = 1f)
//                .padding(horizontal = 8.dp)
//        ) {
//            Row(
//                horizontalArrangement = Arrangement.spacedBy(4.dp, Alignment.Start),
//                verticalAlignment = Alignment.CenterVertically,
//                modifier = Modifier
//                    .fillMaxWidth()
//            ) {
//                Row(
//                    horizontalArrangement = Arrangement.spacedBy(4.dp, Alignment.CenterHorizontally),
//                    verticalAlignment = Alignment.CenterVertically,
//                    modifier = Modifier
//                        .clip(shape = MaterialTheme.shapes.small)
//                        .background(color = Color(0xffaf57db).copy(alpha = 0.15f))
//                        .padding(horizontal = 8.dp,
//                            vertical = 4.dp)
//                ) {
//                    Text(
//                        text = "Assignment",
//                        color = AppColors.secondaryForeground,
//                        lineHeight = 1.33.em,
//                        style = AppTypography.body,
//                        modifier = Modifier
//                            .wrapContentHeight(align = Alignment.CenterVertically))
//                }
//                Text(
//                    text = "Do Research about AI",
//                    color = AppColors.secondaryForeground,
//                    lineHeight = 1.71.em,
//                    style = AppTypography.listItem,
//                    modifier = Modifier
//                        .requiredWidth(width = 198.dp)
//                        .wrapContentHeight(align = Alignment.CenterVertically))
//            }
//            Row(
//                horizontalArrangement = Arrangement.spacedBy(4.dp, Alignment.CenterHorizontally),
//                verticalAlignment = Alignment.CenterVertically,
//                modifier = Modifier
//                    .clip(shape = MaterialTheme.shapes.medium)
//                    .background(color = Color(0xff2662d9).copy(alpha = 0.15f))
//                    .padding(horizontal = 8.dp,
//                        vertical = 4.dp)
//            ) {
//                Text(
//                    text = "Not Urgent & Not Important",
//                    color = AppColors.foreground,
//                    lineHeight = 1.33.em,
//                    style = AppTypography.body,
//                    modifier = Modifier
//                        .wrapContentHeight(align = Alignment.CenterVertically))
//            }
//        }
//        Column(
//            verticalArrangement = Arrangement.spacedBy(12.dp, Alignment.Top),
//            horizontalAlignment = Alignment.End,
//            modifier = Modifier
//                .fillMaxHeight()
//        ) {
//            SizeMediumStyleGhostRoundedMedium()
//        }
    }
}

//@Composable
//fun TypeGhost(modifier: Modifier = Modifier, showIcon22524: Boolean, showTrailingIcon22520: Boolean) {
//    Row(
//        horizontalArrangement = Arrangement.Center,
//        verticalAlignment = Alignment.CenterVertically,
//        modifier = modifier
//            .fillMaxWidth()
//            .requiredHeight(height = 40.dp)
//            .clip(shape = RoundedCornerShape(6.dp))
//            .padding(horizontal = 16.dp,
//                vertical = 8.dp)
//    ) {
//        if (showIcon22524) {
//            Row(
//                verticalAlignment = Alignment.CenterVertically,
//                modifier = Modifier
//                    .padding(end = 8.dp)
//            ) {
//                Image(
//                    painter = painterResource(id = R.drawable.plus),
//                    contentDescription = "plus",
//                    modifier = Modifier
//                        .requiredSize(size = 16.dp))
//            }
//        }
//        Text(
//            text = "Add Task",
//            color = AppColors.foreground,
//            textAlign = TextAlign.Center,
//            lineHeight = 1.43.em,
//            style = AppTypography.buttonText,
//            modifier = Modifier
//                .wrapContentHeight(align = Alignment.CenterVertically))
//    }
//}
//
//@Preview(widthDp = 300, heightDp = 772)
//@Composable
//private fun Property1DefaultPreview() {
//    PureLearnTheme {
//        Property1Default(Modifier)
//    }
//}