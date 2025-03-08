package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
//
//@OptIn(ExperimentalMaterial3Api::class)
//@Composable
//fun AddResourceBottomSheet(
//    isOpen: Boolean,
//    title: String,
//    onTitleChange: (String) -> Unit,
//    typeId:Int,
//    onTypeIdChange:(Int)->Unit,
//    totalUnits: Int,
//    onTotalUnitsChange:(Int)->Unit,
//    progress: Int,
//    onProgressChange: (Int)->Unit,
//    link: String,
//    onLinkChange:(String)->Unit,
//    onDismiss: () -> Unit,
//    onSave: () -> Unit
//) {
//    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
//    val scrollState = rememberScrollState()
//
//    if (isOpen) {
//        ModalBottomSheet(
//            sheetState = sheetState,
//            onDismissRequest = { onDismiss() },
//            containerColor = MaterialTheme.colorScheme.surface,
//            shape = RoundedCornerShape(16.dp)
//        ) {
//            Box(
//                modifier = Modifier
//                    .fillMaxSize()
//                    .padding(horizontal = 16.dp)
//                    .verticalScroll(scrollState)
//            ) {
//                Column(
//                    verticalArrangement = Arrangement.Top
//                ) {
//
//                    Row(
//                        verticalAlignment = Alignment.CenterVertically,
//                        horizontalArrangement = Arrangement.SpaceBetween,
//                        modifier = Modifier.fillMaxWidth()
//                    ) {
//                        Text(
//                            text = "Cancel",
//                            fontSize = 16.sp,
//                            color = MaterialTheme.colorScheme.primary,
//                            fontWeight = FontWeight.Medium,
//                            modifier = Modifier.clickable { onDismiss() }
//                        )
//                        Text(
//                            text = "Save",
//                            fontSize = 16.sp,
//                            color = MaterialTheme.colorScheme.primary,
//                            fontWeight = FontWeight.Medium,
//                            modifier = Modifier.clickable { onSave() }
//                        )
//                    }
//
//                    Spacer(modifier = Modifier.height(16.dp))
//
//
//                    Text(text = "Title", color = MaterialTheme.colorScheme.onSurface)
//                    AppTextField(
//                        text = title,
//                        placeholder = "Enter learning resource title",
//                        singleLine = true,
//                        onValueChange = { onTitleChange(it) }
//                    )
//
//                    Spacer(modifier = Modifier.height(8.dp))
//                    Text(text = "Type", color = MaterialTheme.colorScheme.onSurface)
//                    ResourceTypeDropDownList()
//
//                    Spacer(modifier = Modifier.height(8.dp))
//                    Text(text = "Unit Type", color = MaterialTheme.colorScheme.onSurface)
//                    AppTextField(
//                        text = totalUnits.toString(),
//                        placeholder = "Enter Unit Type",
//                        singleLine = true,
//                        onValueChange = { onTotalUnitsChange(it.toInt()) }
//                    )
//                    Spacer(modifier = Modifier.height(8.dp))
//                    Text(text = "Link", color = MaterialTheme.colorScheme.onSurface)
//                    AppTextField(
//                        text = link,
//                        placeholder = "enter url link",
//                        singleLine = true,
//                        onValueChange = { onLinkChange(it) }
//                    )
//                    Spacer(modifier = Modifier.height(8.dp))
//
//
//
//                }
//            }
//        }
//    }
//}


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddResourceBottomSheet(
    isOpen: Boolean,
    title: String,
    onTitleChange: (String) -> Unit,
    typeId: Int,
    onTypeIdChange: (Int) -> Unit,
    totalUnits: Int,
    onTotalUnitsChange: (Int) -> Unit,
    progress: Int,
    onProgressChange: (Int) -> Unit,
    link: String,
    onLinkChange: (String) -> Unit,
    onDismiss: () -> Unit,
    onSave: () -> Unit
) {
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
    val scrollState = rememberScrollState()

    if (isOpen) {
        ModalBottomSheet(
            sheetState = sheetState,
            onDismissRequest = { onDismiss() },
            containerColor = MaterialTheme.colorScheme.surface,
            shape = RoundedCornerShape(16.dp)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 16.dp)
                    .verticalScroll(scrollState)
            ) {
                Column(
                    verticalArrangement = Arrangement.Top
                ) {

                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = "Cancel",
                            fontSize = 16.sp,
                            color = MaterialTheme.colorScheme.primary,
                            fontWeight = FontWeight.Medium,
                            modifier = Modifier.clickable { onDismiss() }
                        )
                        Text(
                            text = "Save",
                            fontSize = 16.sp,
                            color = MaterialTheme.colorScheme.primary,
                            fontWeight = FontWeight.Medium,
                            modifier = Modifier.clickable { onSave() }
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Text(text = "Title", color = MaterialTheme.colorScheme.onSurface)
                    AppTextField(
                        text = title,
                        placeholder = "Enter learning resource title",
                        singleLine = true,
                        onValueChange = { onTitleChange(it) }
                    )

                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = "Type", color = MaterialTheme.colorScheme.onSurface)

//                    ResourceTypeDropDownList(
//                        selectedType = typeId.toString(),
//                        onTypeSelected = onTypeIdChange
//                    )

                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = "Total Units", color = MaterialTheme.colorScheme.onSurface)


                    AppTextField(
                        text = totalUnits.toString(),
                        placeholder = "Enter total units",
                        singleLine = true,
                        onValueChange = { value ->
                            onTotalUnitsChange(value.toIntOrNull() ?: 0)
                        }
                    )

                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = "Link", color = MaterialTheme.colorScheme.onSurface)
                    AppTextField(
                        text = link,
                        placeholder = "Enter URL link",
                        singleLine = true,
                        onValueChange = { onLinkChange(it) }
                    )

                    Spacer(modifier = Modifier.height(8.dp))
                }
            }
        }
    }
}

