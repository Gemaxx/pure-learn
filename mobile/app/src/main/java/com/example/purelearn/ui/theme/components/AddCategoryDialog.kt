package com.example.purelearn.ui.theme.components

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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.anew.ui.theme.PureLearnTheme
import com.example.purelearn.R
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.AppTypography
import com.github.skydoves.colorpicker.compose.rememberColorPickerController


@Composable
fun AddCategoryDialog(
    isOpen:Boolean,
    title: String,
    description: String,
    onTitleChange: (String) -> Unit,
    onDescriptionChange: (String) -> Unit,
    onClick: () -> Unit = {},
    onDismissColor: () -> Unit,
    onSaveColor:()->Unit,
    onDismiss: () -> Unit,
    onSave:()->Unit
) {

    var isLoading by remember { mutableStateOf(false) }

    var categoryNameError by rememberSaveable { mutableStateOf<String?>(null) }
    var selectedColor by remember { mutableStateOf(Color(0xFF000000)) } // Initial color
    var showColorPicker by remember { mutableStateOf(false) }


    categoryNameError= when{
        title.isBlank()->"please enter category name."
        title.length<2->"category name is too short."
        title.length>20->"category name is too long."
        else ->null
    }
//
//    val focusRequester = FocusRequester()
//    val focusManager = LocalFocusManager.current
//    val controller = LocalSoftwareKeyboardController.current
//    LaunchedEffect(key1 = true) {
//        focusRequester.requestFocus()
//    }

    if(isOpen) {
        val controller = rememberColorPickerController()
        AlertDialog(
            modifier = Modifier.border(
                width = 1.dp,
                color = AppColors.input,
                shape = RoundedCornerShape(8.dp)
            ),
            onDismissRequest = {},
            containerColor = AppColors.background,
            tonalElevation = 0.dp, // Prevents auto lightening due to elevation,
            shape = RoundedCornerShape(8.dp),
            title = {
                Box(
                    modifier = Modifier.fillMaxWidth(),
                    contentAlignment = Alignment.TopStart
                ) {
                    Text(
                        text = "Create Category",
                        style = AppTypography.large,
                        color = AppColors.foreground,

                        )
                }
            },
            text = {
                Column(
                    modifier = Modifier.fillMaxWidth(),
                ) {

                    TitleTextField(
                        title = "Title",
                        value = title,
                        onValueChange = { onTitleChange(it) },
                        placeholder = "Title of your Category",
                        totalWords = 100
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    TitleTextField(
                        title = "Description",
                        value = description,
                        onValueChange = { onDescriptionChange(it) },
                        placeholder = "More about this Category ...",
                        totalWords = 500
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = "Color",
                        color = AppColors.foreground,
                        fontSize = 14.sp,
                        // modifier = Modifier.padding(bottom = 8.dp)
                    )

                    Row(
                        verticalAlignment = Alignment.CenterVertically, // Aligns the items vertically
                        modifier = Modifier
                            .padding(bottom = 8.dp)
                            .clickable {
                                showColorPicker = true
                            }// Optional: Add padding around the Row
                    ) {
                        Text(
                            text = "Pick a Color",
                            color = AppColors.foreground,
                            fontSize = 12.sp
                        )
                        Spacer(modifier = Modifier.width(8.dp)) // Space between the Text and Icon
                        Icon(
                            painter = painterResource(id = R.drawable.colorwheel),
                            contentDescription = "folder",
                            tint = selectedColor,
                            modifier = Modifier.size(12.dp)
                        )
                    }


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
                }
            },
//            dismissButton = {
//                TextButton(onClick = { onDismiss() }) {
//                    Text(text="Cancel")
//                }
//            },
//            confirmButton = {
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
//            },
            confirmButton = {}, // Disable default buttons
            dismissButton = {},
        )


        if (showColorPicker) {
            ColorPicker(
                isOpen = true,
                initialColor = selectedColor,
                onDismiss = { showColorPicker = false },
                onSave = { color ->
                    selectedColor = color
                    showColorPicker = false

                }
            )
        }

//        if (showColorPicker) {
//            ColorPicker(
//                isOpen = true,
//              //  color = ,
//                onDismiss = onDismissColor,
//                onSave = onSaveColor
//            )
////            AlertDialog(
////                onDismissRequest = { showColorPicker = false },
////                confirmButton = {
////                    Text(
////                        text = "Select",
////                        modifier = Modifier.clickable { showColorPicker = false }
////                    )
////                },
////                text = {
////                    Column {
////                        ColorPicker()
////                    }
////                }
////            )
//        }

    }

}

@Preview(showBackground = true)
@Composable
fun AddCategoryDialogPreview() {
    PureLearnTheme {
//        AddCategoryDialog(
//            isOpen = true,
//            title = "",
//            description = "This is a sample description.",
//            onTitleChange = {},
//            onDescriptionChange = {},
//            onClick = {},
//            onDismiss = {},
//            onSave = {}
//        )
    }
}
