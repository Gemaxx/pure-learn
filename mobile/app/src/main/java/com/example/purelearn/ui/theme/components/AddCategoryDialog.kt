package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusDirection
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import com.example.purelearn.R


@Composable
fun AddCategoryDialog(
    isOpen:Boolean,
    title: String,
    description: String,
    onTitleChange: (String) -> Unit,
    onDescriptionChange: (String) -> Unit,
    onClick: () -> Unit = {},
    onDismiss: () -> Unit,
    onSave:()->Unit
) {

    var isLoading by remember { mutableStateOf(false) }

    var categoryNameError by rememberSaveable { mutableStateOf<String?>(null) }

    categoryNameError= when{
        title.isBlank()->"please enter category name."
        title.length<2->"category name is too short."
        title.length>20->"category name is too long."
        else ->null
    }

    val focusRequester = FocusRequester()
    val focusManager = LocalFocusManager.current
    val controller = LocalSoftwareKeyboardController.current
    LaunchedEffect(key1 = true) {
        focusRequester.requestFocus()
    }

    if(isOpen){
        AlertDialog(
            onDismissRequest = {},
            containerColor = MaterialTheme.colorScheme.surface,
            shape = RoundedCornerShape(16.dp),
            title = {
                Box(
                    modifier = Modifier.fillMaxWidth(),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Add Category",
                        style = MaterialTheme.typography.titleLarge,
                        color = MaterialTheme.colorScheme.onSurface,

                        )
                }
            },
            text = {
                Column(modifier = Modifier.fillMaxWidth()) {
                    Text(text = "Title", color = MaterialTheme.colorScheme.onSurface)
                    AppTextField(
                        text = title,
                        placeholder = stringResource(R.string.enter_title),
                        singleLine = true,
                        modifier = Modifier.focusRequester(focusRequester),
                        imeAction = ImeAction.Next,
                        keyboardActions = KeyboardActions(onNext = {
                            focusManager.moveFocus(FocusDirection.Down)
                        }),
                        onNext = {
                            focusManager.moveFocus(FocusDirection.Down)
                        },
                        onValueChange = { onTitleChange(it) }
                    )

                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = "Description", color = MaterialTheme.colorScheme.onSurface)
                    AppTextField(
                        text = description,
                        placeholder = "Enter description",
                        modifier = Modifier.height(300.dp),
                        imeAction = ImeAction.Done,
                        keyboardActions = KeyboardActions(onDone = {
                            controller?.hide()
                        }),
                        onDone = {
                            controller?.hide()
                        },
                        onValueChange = { onDescriptionChange(it)}
                    )
                }
            },
            dismissButton = {
                TextButton(onClick = { onDismiss() }) {
                    Text(text="Cancel")
                }
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        onSave()
                    },
                    enabled = title.isNotEmpty()
                ) {
                    if (isLoading) {
                        CircularProgressIndicator(modifier = Modifier.size(20.dp), color = MaterialTheme.colorScheme.onPrimary)
                    } else {
                        Text("Save")
                    }
                }
            }

        )
    }


}
