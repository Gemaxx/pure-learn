package com.example.purelearn.ui.theme.note

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
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
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.purelearn.R
import com.example.purelearn.domain.model.NoteRequest
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.AppTypography
import com.example.purelearn.ui.theme.components.AppTextField
import com.example.purelearn.ui.theme.components.BottomNavigationBar
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
        },
        bottomBar = { BottomNavigationBar() },

        ){ paddingValues ->
        Column(modifier = Modifier.fillMaxWidth().padding(paddingValues)) {


            TextField(
                value = title,
                onValueChange = {title=it},
                textStyle = TextStyle(
                    fontSize   = 30.sp,
                    fontWeight = FontWeight.Normal,
                    color      = AppColors.foreground
                ),
                placeholder = {
                    Text(
                        text = "Title", style = TextStyle(
                            color = AppColors.mutedForeground, fontSize = 30.sp, fontWeight = FontWeight.Normal
                        )
                    )
                },
                modifier = Modifier.fillMaxWidth()
                    .padding(vertical = 4.dp),
                colors = TextFieldDefaults.colors(
                    unfocusedContainerColor = MaterialTheme.colorScheme.surface,
                    focusedContainerColor = MaterialTheme.colorScheme.surface,
                    unfocusedIndicatorColor = Color.Transparent,  // Hides the underline when not focused
                    focusedIndicatorColor = Color.Transparent  // Hides the underline when focused
                )
                ,
                shape = RoundedCornerShape(12.dp),


                singleLine = true,

                )


            Spacer(modifier = Modifier.height(8.dp))


            TextField(
                value = body,
                onValueChange = {body=it},
                placeholder = {
                    Text(
                        text = "note", style = TextStyle(
                            color = AppColors.mutedForeground, fontSize = 18.sp, fontWeight = FontWeight.Normal
                        )
                    )
                },
                modifier = Modifier.fillMaxWidth()
                    .padding(vertical = 4.dp),
                colors = TextFieldDefaults.colors(
                    unfocusedContainerColor = MaterialTheme.colorScheme.surface,
                    focusedContainerColor = MaterialTheme.colorScheme.surface,
                    unfocusedIndicatorColor = Color.Transparent,  // Hides the underline when not focused
                    focusedIndicatorColor = Color.Transparent  // Hides the underline when focused
                )
                ,
                shape = RoundedCornerShape(12.dp),


                singleLine = false,

            )
        }

    }
}









