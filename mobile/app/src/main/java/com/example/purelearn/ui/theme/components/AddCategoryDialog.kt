package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
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
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusDirection
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import com.example.purelearn.R
import com.example.purelearn.domain.model.Category
import com.example.purelearn.ui.theme.Red


@Composable
fun AddCategoryDialog(
    isOpen:Boolean,
//   // title:String="Add Category",
//    title:String,
      selectedColors:List<Color>,
//    categoryName:String,
//    description: String,
    onColorChange:(List<Color>)->Unit,
//    onTileChange:(String)->Unit,
//    onDescriptionChange:(String)->Unit,
//    onDismissRequest:()->Unit,
//    onConfirmButtonClick:()->Unit

    title: String,
    description: String,
    onTitleChange: (String) -> Unit,
    onDescriptionChange: (String) -> Unit,
    onShowValue: (Boolean) -> Unit,
    onClick: () -> Unit = {}
) {

//    var title by remember { mutableStateOf("") }
//    var description by remember { mutableStateOf("") }
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
            onDismissRequest = {  },
            title = {
                Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.TopEnd) {
                    IconButton(onClick = {
                        onShowValue(false)
                    }) {
                        Icon(
                            imageVector = Icons.Default.Close, contentDescription = "", tint = Red
                        )
                    }
                }
            },
            text = {
                Column {
                    Row (
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(bottom = 16.dp),
                        horizontalArrangement = Arrangement.SpaceAround
                    ){
                        Category.CategoryCardColors.forEach{colors->
                            Box(
                                modifier = Modifier
                                    .size(24.dp)
                                    .clip(CircleShape)
                                    .border(
                                        width = 1.dp,
                                        color = if (colors == selectedColors) Color.Black
                                        else Color.Transparent,
                                        shape = CircleShape
                                    )
                                    .background(brush = Brush.verticalGradient(colors))
                                    .clickable { onColorChange(colors) }
                            )
                        }
                    }
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
                        }
                    ) {
                        onTitleChange(it)
                    }

                    Spacer(modifier = Modifier.height(15.dp))

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
                        }
                    ) {
                        onDescriptionChange(it)
                    }
                }
            },
            dismissButton = {
                TextButton(onClick = {  }) {
                    Text(text="Cancel")
                }
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        onClick()
                    },
                    enabled = title.isNotEmpty()
                ) {
                    if (isLoading) {
                        CircularProgressIndicator(modifier = Modifier.size(20.dp), color = MaterialTheme.colorScheme.onPrimary)
                    } else {
                        Text("Add")
                    }


                }

            }

        )
    }


}
