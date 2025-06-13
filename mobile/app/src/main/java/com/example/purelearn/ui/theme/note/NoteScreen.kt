package com.example.purelearn.ui.theme.note

import android.util.Log
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.staggeredgrid.LazyVerticalStaggeredGrid
import androidx.compose.foundation.lazy.staggeredgrid.StaggeredGridCells
import androidx.compose.foundation.lazy.staggeredgrid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FabPosition
import androidx.compose.material3.FloatingActionButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SmallFloatingActionButton
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.purelearn.R
import com.example.purelearn.domain.model.NoteResponse
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.AppTypography
import com.example.purelearn.ui.theme.components.BottomNavigationBar
import com.example.purelearn.ui.theme.components.Tabs
import com.example.purelearn.ui.theme.home.homeviewmodel.events.NoteEvents
import com.example.purelearn.ui.theme.home.noteviewmodel.NoteViewModel
import java.net.URLEncoder
import java.nio.charset.StandardCharsets
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.runtime.rememberCoroutineScope
import kotlinx.coroutines.launch


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NoteScreen(
    navController: NavController,
    goalId: Int,
    goalName:String,
    viewModel: NoteViewModel = hiltViewModel(),
) {


    var title by remember { mutableStateOf("") }
    var body by remember { mutableStateOf("") }


    val noteResponse by viewModel.noteResponseEvent
    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()


    val expandedStates = remember { mutableStateMapOf<String, Boolean>() }

    LaunchedEffect(Unit) {
        if (goalId != null) {
            viewModel.onEvent(NoteEvents.ShowNotes(goalId))
        } else {
            Log.e("NoteScreen", "goalId is null, cannot fetch notes")
        }
    }
    val fabShape = RoundedCornerShape(12.dp)

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "$goalName Notes",
                        color =AppColors.foreground,
                      style = AppTypography.h4
                    )
                },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = "Back")
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
                    containerColor = AppColors.background
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
                    onClick = {
                        navController.navigate( "AddNoteScreen/$goalId")
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
        containerColor =  AppColors.background,
        bottomBar = { BottomNavigationBar() },

        )

    { paddingValues ->
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

            Log.d("goalId","$goalId")
            if (noteResponse.data.isNotEmpty()) {

                LazyVerticalStaggeredGrid(
                    columns = StaggeredGridCells.Fixed(2),
                    verticalItemSpacing = 4.dp,
                    horizontalArrangement = Arrangement.spacedBy(4.dp),
                    modifier = Modifier.padding(start = 8.dp,end=8.dp)
                        ///.fillMaxSize()
                )
                {
                    val notes: List<NoteResponse> = noteResponse.data

                    items(notes, key = { it.id ?: 0 }) { note ->



                        Card(
                            shape = RoundedCornerShape(12.dp),
                            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                            modifier = Modifier
                                .fillMaxWidth().padding(start = 8.dp, bottom = 8.dp)
                                .border(border = BorderStroke(1.dp, AppColors.border),
                                    shape = RoundedCornerShape(12.dp))
                            ,
                            //  .aspectRatio(1f)

                            onClick = {
                                val encodedTitle = URLEncoder.encode(note.title ?: "", StandardCharsets.UTF_8.toString())
                                val encodedBody = URLEncoder.encode(note.body ?: "", StandardCharsets.UTF_8.toString())
                                navController.navigate("UpdateNoteScreen/${note.goalId}/${note.id}/$encodedTitle/$encodedBody")
                            }
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {


                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(
                                        text = note.title,
                                        fontSize = 16.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = Color.White
                                    )
//                                    Icon(
//                                        imageVector = Icons.Default.MoreVert,
//                                        contentDescription = null,
//                                        tint = Color.White
//                                    )

                Box {

                    IconButton(onClick = {
                        expandedStates[note.title] = true
                    }) {
                        Icon(
                            painter = painterResource(id = R.drawable.morevertical),
                            contentDescription = "note more",
                            tint = AppColors.foreground,
                            modifier = Modifier.size(16.dp)
                        )
                    }

                    DropdownMenu(
                        expanded = expandedStates.getOrDefault( note.title, false),
                        onDismissRequest = { expandedStates[note.title] = false }
                    )

                    {
                        DropdownMenuItem(
                            text = { Text("Edit") },
                            onClick = {
                                val encodedTitle = URLEncoder.encode(note.title ?: "", StandardCharsets.UTF_8.toString())
                                val encodedBody = URLEncoder.encode(note.body ?: "", StandardCharsets.UTF_8.toString())
                                navController.navigate("UpdateNoteScreen/${note.goalId}/${note.id}/$encodedTitle/$encodedBody")

//                                selectedResourceId = resource.id
//                                waitingForResourceData = true
//                                viewModel.onEvent(ResourceEvents.GetResourceByIdEvent(resource.id))
                                expandedStates[note.title] = false
                            }
                        )

                        DropdownMenuItem(
                            text = { Text("Delete") },
                            onClick = {
                                expandedStates[note.title] = false
                                Log.d("here1","${note.id}")
                                viewModel.onEvent(NoteEvents.DeleteNotesEvent(
                                    id = note.id
                                ))
                                viewModel.onEvent(NoteEvents.ShowNotes(goalId))
//                                scope.launch {
//                                    val result = snackbarHostState.showSnackbar(
//                                        message = "Goal moved to trash",
//                                        actionLabel = "Undo",
//                                        duration = SnackbarDuration.Short
//                                    )
//
//                                    if (result == SnackbarResult.ActionPerformed) {
//                                        Log.d("here2","${resource.id}")
//                                        viewModel.onEvent(ResourceEvents.RestoreResourceEvent(resource.id))
//                                    }
//                                }
                            }
                        )
                    }
                }


                                }


                                Text(
                                    text = note.body,
                                    fontSize = 12.sp,
                                    color = Color.Gray,
                                    modifier = Modifier.padding(top = 4.dp)
                                )
                            }
                        }

//                                    NoteCard(
//                                        note = note,
//                                        onClick = {
//                                            val encodedTitle = URLEncoder.encode(note.title ?: "", StandardCharsets.UTF_8.toString())
//                                            val encodedBody = URLEncoder.encode(note.body ?: "", StandardCharsets.UTF_8.toString())
//                                            navController.navigate("UpdateNoteScreen/${note.goalId}/${note.id}/$encodedTitle/$encodedBody")
//                                        }
//                                      //  onUpdateNote = TODO(),
//                                    )
                                }

                        }
                    }


                }
            }
}


