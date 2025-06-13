package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusDirection
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.purelearn.R
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.AppTypography

@Composable
fun AddKanbanStatusListDialog(
    isOpen:Boolean,
    title: String,
    maxTasks: Int,
    onTitleChange: (String) -> Unit,
    onMaxTasksChange: (Int) -> Unit,
    onClick: () -> Unit = {},
    onDismiss: () -> Unit,
    onSave:()->Unit
) {

    var isLoading by remember { mutableStateOf(false) }



    val focusRequester = FocusRequester()
    val focusManager = LocalFocusManager.current
    val controller = LocalSoftwareKeyboardController.current
//    LaunchedEffect(key1 = true) {
//        focusRequester.requestFocus()
//    }

    if(isOpen){
        AlertDialog(
            modifier = Modifier.border(
                width = 1.dp,
                color = AppColors.input,
                shape = RoundedCornerShape(8.dp)
            ),
            onDismissRequest = {},
            containerColor = AppColors.background,
            tonalElevation = 0.dp, // Prevents auto lightening due to elevation,
            shape = RoundedCornerShape(16.dp),
            title = {
                Box(
                    modifier = Modifier.fillMaxWidth(),
                    contentAlignment = Alignment.TopStart
                ) {
                    Text(
                        text = "Add List",
                        style = AppTypography.large,
                        color = AppColors.foreground,

                        )
                }
            },
            text = {
                Column(modifier = Modifier.fillMaxWidth()) {

                    TitleTextField(
                        title = "Title",
                        value = title,
                        onValueChange = { onTitleChange(it) },
                        placeholder = "Title of your category",
                        totalWords = 100
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    TitleTextField(
                        title = "Max number of tasks",
                        value = maxTasks.toString(),
                        onValueChange = { value ->
                            onMaxTasksChange(value.toIntOrNull() ?: 0)
                        }      ,
                        placeholder = "More about this Category ...",
                        totalWords = 100
                    )

                    Spacer(modifier = Modifier.height(8.dp))


                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 8.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        CancelButton(onClick = onDismiss)
                        CreateButton(
                            onClick = onSave,

                            )
                    }


//                    Text(text = "List Name", color = MaterialTheme.colorScheme.primary)
//                    AppTextField(
//                        text = title,
//                        placeholder = "list name",
//                        //stringResource(R.string.enter_title),
//                        singleLine = true,
//                        modifier = Modifier.focusRequester(focusRequester),
//                        imeAction = ImeAction.Next,
//                        keyboardActions = KeyboardActions(onNext = {
//                            focusManager.moveFocus(FocusDirection.Down)
//                        }),
//                        onNext = {
//                            focusManager.moveFocus(FocusDirection.Down)
//                        },
//                        onValueChange = { onTitleChange(it) }
//                    )
//
//                    Spacer(modifier = Modifier.height(8.dp))
//                    Text(text = "Max Tasks", color = MaterialTheme.colorScheme.onSurface)
//                    AppTextField(
//                        text = maxTasks.toString(),
//                        placeholder = "Enter maximum number of tasks",
//                        singleLine = true,
//                       // modifier = Modifier.height(300.dp),
//                        imeAction = ImeAction.Done,
//                        keyboardActions = KeyboardActions(onDone = {
//                            controller?.hide()
//                        }),
//                        onDone = {
//                            controller?.hide()
//                        },
//                        onValueChange = { value ->
//                            onMaxTasksChange(value.toIntOrNull() ?: 0)
//                        }
//                    )
                }
            },
            dismissButton = {
//                TextButton(onClick = { onDismiss() }) {
//                    Text(text="Cancel")
//                }
            },
            confirmButton = {
//                TextButton(
//                    onClick = {
//                        onSave()
//                    },
//                    enabled = title.isNotEmpty()
//                ) {
//                    if (isLoading) {
//                        CircularProgressIndicator(modifier = Modifier.size(20.dp), color = Color.Black)
//                    } else {
//                        Text("Save")
//                    }
//                }
            }

        )
    }


}
