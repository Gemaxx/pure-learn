package com.example.purelearn.ui.theme.note

import android.util.Log
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
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
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.purelearn.domain.model.NoteResponse
import com.example.purelearn.ui.theme.components.GlowingFAB
import com.example.purelearn.ui.theme.components.NoteCard
import com.example.purelearn.ui.theme.components.SegmentedControlScreen
import com.example.purelearn.ui.theme.components.SwipeToDeleteContainer
import com.example.purelearn.ui.theme.home.homeviewmodel.events.NoteEvents
import com.example.purelearn.ui.theme.home.noteviewmodel.NoteViewModel
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.lazy.staggeredgrid.LazyVerticalStaggeredGrid
import androidx.compose.foundation.lazy.staggeredgrid.StaggeredGridCells
import androidx.compose.foundation.lazy.staggeredgrid.items
import com.google.accompanist.flowlayout.FlowRow

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NoteScreen(
    navController: NavController,
    goalId: Int?,
    viewModel: NoteViewModel = hiltViewModel(),
) {


    var title by remember { mutableStateOf("") }
    var body by remember { mutableStateOf("") }


    val noteResponse by viewModel.noteResponseEvent
    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }



    LaunchedEffect(Unit) {
        if (goalId != null) {
            viewModel.onEvent(NoteEvents.ShowNotes(goalId))
        } else {
            Log.e("NoteScreen", "goalId is null, cannot fetch notes")
        }
    }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        floatingActionButton = {
            GlowingFAB {
                if (goalId != null) {
                    navController.navigate("AddNoteScreen/$goalId")
                }
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
            verticalArrangement = Arrangement.Top
        ) {
            if (goalId != null) {
                SegmentedControlScreen(
                    navController = navController,
                    goalId = goalId
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


                            SwipeToDeleteContainer(
                                item = note,
                                onDelete = {
                                   // viewModel.onEvent(NoteEvents.DeleteNoteEvent(note.id))
                                },
                                animationDuration = 300,
                                content = { item ->
                                    NoteCard(
                                        note = item,
                                        onClick = {
                                            val encodedTitle = URLEncoder.encode(item.title ?: "", StandardCharsets.UTF_8.toString())
                                            val encodedBody = URLEncoder.encode(item.body ?: "", StandardCharsets.UTF_8.toString())
                                            navController.navigate("UpdateNoteScreen/${item.goalId}/${item.id}/$encodedTitle/$encodedBody")
                                        }
                                      //  onUpdateNote = TODO(),
                                    )
                                }
                            )
                        }
                    }


                }
            }
        }
}

