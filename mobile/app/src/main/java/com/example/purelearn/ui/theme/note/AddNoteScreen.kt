package com.example.purelearn.ui.theme.note

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
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
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.purelearn.domain.model.NoteRequest
import com.example.purelearn.ui.theme.components.LoadingBar
import com.example.purelearn.ui.theme.components.showToast
import com.example.purelearn.ui.theme.home.homeviewmodel.events.NoteEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.NoteUiEvents
import com.example.purelearn.ui.theme.home.noteviewmodel.NoteViewModel
import kotlinx.coroutines.flow.collectLatest


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddNoteScreen(navController: NavController,
                  goalId: Int?,
                  viewModel: NoteViewModel = hiltViewModel()
) {
    var title by remember { mutableStateOf("") }
    var body by remember { mutableStateOf("") }
    val response = viewModel.noteResponseEvent.value
    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }
    if (isLoading) LoadingBar()

    LaunchedEffect(key1 = true) {
        viewModel.addNoteEvent.collectLatest {
            isLoading = when (it) {
                is NoteUiEvents.Success -> {
                    title = ""
                     body = ""
                    context.showToast("Note Added")
                    if(goalId!=null)
                        viewModel.onEvent(NoteEvents.ShowNotes(goalId))
                    false
                }

                is NoteUiEvents.Failure -> {
                    context.showToast(it.msg)
                    false
                }

                NoteUiEvents.Loading -> true

                else -> false
            }
        }
    }
    Scaffold(
        modifier = Modifier.fillMaxSize(),

        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Note",
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
                actions = {
                    TextButton(onClick = {
                       if (goalId != null) {
                            if (title.isNotEmpty() && body.isNotEmpty())
                            {
                                viewModel.onEvent(
                                    NoteEvents.AddNotesEvent(
                                        NoteRequest(
                                            goalId =goalId,
                                            title =title,
                                            body = body
                                        ),
                                        goalId = goalId ?: 0
                                    )
                                )
                                title = ""
                                body=""

                            }
                        else {
                                context.showToast("Please enter all the required fields.")
                            }

                            navController.popBackStack() // Go back to NoteScreen after saving
                        }
                    }) {
                        Text(text = "Save", color = Color.White)
                    }
                },
                colors = TopAppBarDefaults.mediumTopAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background
                )
            )
        }
    ){ paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .padding(16.dp)
                .fillMaxSize()
        ) {
            TextField(
                value = title,
                onValueChange = { title = it },
                textStyle = TextStyle(
                    fontSize = 22.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                ),
                placeholder = { Text("Input Title", color = Color.Gray) },
                colors = TextFieldDefaults.textFieldColors(
                 //   backgroundColor = Color.Transparent,
                    cursorColor = Color.White
                ),
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(8.dp))

            TextField(
                value = body,
                onValueChange = { body = it },
                textStyle = TextStyle(
                    fontSize = 16.sp,
                    color = Color.White
                ),
                placeholder = { Text("Start typing...", color = Color.Gray) },
                colors = TextFieldDefaults.textFieldColors(
                 //   backgroundColor = Color.Transparent,
                    cursorColor = Color.White
                ),
                modifier = Modifier
                    .fillMaxSize()
                    .weight(1f)
            )
        }
    }
}
