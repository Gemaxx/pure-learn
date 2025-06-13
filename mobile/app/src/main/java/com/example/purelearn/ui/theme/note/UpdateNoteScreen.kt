package com.example.purelearn.ui.theme.note


import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LocalTextStyle
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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusDirection
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.purelearn.R
import com.example.purelearn.domain.model.NoteRequest
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalEvents
import com.example.purelearn.ui.theme.Goal.Goalviewmodel.events.GoalUiEvents
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceEvents
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceUiEvents
import com.example.purelearn.ui.theme.components.AppTextField
import com.example.purelearn.ui.theme.components.BottomNavigationBar
import com.example.purelearn.ui.theme.components.CustomTextField
import com.example.purelearn.ui.theme.components.LoadingBar
import com.example.purelearn.ui.theme.components.showToast
import com.example.purelearn.ui.theme.home.homeviewmodel.events.NoteEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.NoteUiEvents
import com.example.purelearn.ui.theme.home.noteviewmodel.NoteViewModel
import kotlinx.coroutines.flow.collectLatest
import java.net.URLDecoder
import java.nio.charset.StandardCharsets

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UpdateNoteScreen(navController: NavController,
                     goalId: Int?,
                     noteId:Int?,
                     initialTitle: String,
                     initialBody: String,
                     viewModel: NoteViewModel = hiltViewModel())
{

    val response = viewModel.noteResponseEvent.value
    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }
    if (isLoading) LoadingBar()
    val decodedTitle = URLDecoder.decode(initialTitle, StandardCharsets.UTF_8.toString())
    val decodedBody = URLDecoder.decode(initialBody, StandardCharsets.UTF_8.toString())

    var title by remember { mutableStateOf(decodedTitle) }
    var body by remember { mutableStateOf(decodedBody) }

    LaunchedEffect(key1 = true) {
        viewModel.updateNoteEvent.collectLatest {
            isLoading = when (it) {
                is NoteUiEvents.Success -> {
                    context.showToast("Note Updated!")
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
                                Log.d("fff","$noteId $goalId $title $body ")
                                viewModel.onEvent(
                                    NoteEvents.UpdateNotesEvent(
                                        id = noteId ?: 0,
                                        NoteRequest(
                                            goalId =goalId,
                                            title =title,
                                            body = body
                                        )
                                    )
                                )
//                                title = ""
//                                body=""

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
//                keyboardActions = KeyboardActions(
//                    onDone = { onDone() },
//                    onNext = { onNext() }
//                ),
//                keyboardOptions = KeyboardOptions(
//                    imeAction = imeAction
//                )
            )
        }
//        Column(
//            modifier = Modifier
//                .padding(paddingValues)
//                //.padding(16.dp)
//                .fillMaxSize(),
//            verticalArrangement = Arrangement.spacedBy(16.dp)
//        ) {
//
//
//            BasicTextField(modifier = Modifier
//                .background(AppColors.background, RoundedCornerShape(12.dp))
//                .padding(3.dp)
//                .fillMaxWidth()
//                .then(Modifier),
//                value = title,
//                onValueChange = {title=it},
//                maxLines = 1,
//                cursorBrush = SolidColor(AppColors.foreground),
////                keyboardActions = KeyboardActions {
////                    localFocusManager.clearFocus()
////                },
////                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
//                textStyle = LocalTextStyle.current.copy(
//                    color = AppColors.foreground,
//                    fontWeight = FontWeight.Normal,
//                    fontSize = 15.sp,
//                    textAlign = TextAlign.Start
//                ),
//                decorationBox = { innerTextField ->
//                    Row(
//                        Modifier
//                            .fillMaxSize()
//                            .padding(vertical = 14.5.dp),
//                        verticalAlignment = Alignment.Top,
//                    ) {
//                        Box(
//                            Modifier
//                                .weight(1f)
//                                .padding(horizontal = 13.dp)
//                        ) {
//                            if (title.isEmpty()) Text(
//                                text = "Title",
//                                color =AppColors.muted,
//                                fontWeight = FontWeight.Medium,
//                                fontSize = 15.sp
//                            )
//                            innerTextField()
//                        }
//                    }
//                }
//            )
//
//            Spacer(modifier = Modifier.height(10.dp))
//
//            Box(
//                modifier = Modifier
//                    .fillMaxWidth()
//                    .weight(1f)               // ← take remaining space
//                    .background(AppColors.secondary, RoundedCornerShape(12.dp))
//                    .padding(8.dp)
//            ) {
//                BasicTextField(
//                    modifier = Modifier.fillMaxWidth(),
////                    .background(AppColors.background, RoundedCornerShape(12.dp))
////                    .padding(3.dp)
////                    .fillMaxWidth()
////                    //.height(150.dp)
////                    .then(Modifier),
//                    value = body,
//                    onValueChange = { body = it },
//                    maxLines = 5,
//                    cursorBrush = SolidColor(AppColors.muted),
////                keyboardActions = KeyboardActions {
////                    localFocusManager.clearFocus()
////                },
//                    // keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
//                    textStyle = LocalTextStyle.current.copy(
//                        color = AppColors.foreground,
//                        fontWeight = FontWeight.Normal,
//                        fontSize = 15.sp,
//                        textAlign = TextAlign.Start
//                    ),
//                    decorationBox = { innerTextField ->
//                        Row(
//                            Modifier
//                                .fillMaxSize()
//                                .padding(vertical = 14.5.dp),
//                            verticalAlignment = Alignment.Top,
//                        ) {
//                            Box(
//                                Modifier
//                                    .fillMaxWidth()
//                                    .padding(horizontal = 12.dp, vertical = 8.dp),
//                                contentAlignment = Alignment.TopStart
//                            ) {
//                                if (body.isEmpty()) Text(
//                                    text = "note",
//                                    color = AppColors.muted,
//                                    fontWeight = FontWeight.Medium,
//                                    fontSize = 15.sp
//                                )
//                                innerTextField()
//                            }
//                        }
//                    }
//                )
//            }
//
//        }
    }
}
