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
fun AddResourceTypeDialog(
    isOpen:Boolean,
    title: String,
    unitType: String,
    onTitleChange: (String) -> Unit,
    onUnitTypeChange: (String) -> Unit,
    onClick: () -> Unit = {},
    onDismiss: () -> Unit,
    onSave:()->Unit
) {

    var isLoading by remember { mutableStateOf(false) }


    val focusRequester = FocusRequester()
    val focusManager = LocalFocusManager.current
    val controller = LocalSoftwareKeyboardController.current
    LaunchedEffect(key1 = true) {
        focusRequester.requestFocus()
    }

    if(isOpen){
        AlertDialog(
            onDismissRequest = {},
            containerColor = MaterialTheme.colorScheme.background,
            shape = RoundedCornerShape(16.dp),
            title = {
                Box(
                    modifier = Modifier.fillMaxWidth(),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Learning Resource Type",
                        style = MaterialTheme.typography.titleLarge,
                        color = MaterialTheme.colorScheme.primary,

                        )
                }
            },
            text = {
                Column(modifier = Modifier.fillMaxWidth()) {
                    Text(text = "Title", color = MaterialTheme.colorScheme.primary)
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
                    Text(text = "Unit Type", color = MaterialTheme.colorScheme.primary)

                    AppTextField(
                        text = unitType,
                        placeholder = "Enter Unit Type",
                        singleLine = true,
                      //  modifier = Modifier.height(300.dp),
                        imeAction = ImeAction.Done,
                        keyboardActions = KeyboardActions(onDone = {
                            controller?.hide()
                        }),
                        onDone = {
                            controller?.hide()
                        },
                        onValueChange = { onUnitTypeChange(it)}
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
                        CircularProgressIndicator(modifier = Modifier.size(20.dp), color = MaterialTheme.colorScheme.background)
                    } else {
                        Text("Save")
                    }
                }
            }

        )
    }


}
