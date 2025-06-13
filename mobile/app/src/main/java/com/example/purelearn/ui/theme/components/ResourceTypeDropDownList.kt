package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.purelearn.R
import com.example.purelearn.domain.model.ResourceTypeResponse
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.ResourceTypeViewModel
import com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.events.ResourceTypeEvents

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ResourceTypeDropDownList(
    viewModel: ResourceTypeViewModel = hiltViewModel(),
    onTypeSelected: (ResourceTypeResponse) -> Unit,
    onEditClicked: (ResourceTypeResponse) -> Unit,  // Callback for edit
    onDeleteClicked: (ResourceTypeResponse) -> Unit // Callback for delete
//        onEditClicked: () -> Unit,  // Callback for edit
//    onDeleteClicked: () -> Unit // Callback for delete

) {
    val response = viewModel.resourceTypeResponseEvent.value
    val resourceTypes = response.data ?: emptyList()
    var expanded by remember { mutableStateOf(false) }
    var selectedType by remember { mutableStateOf<ResourceTypeResponse?>(null) }

    LaunchedEffect(key1 = true) {
        viewModel.onEvent(ResourceTypeEvents.ShowResourceType)
    }

    Box(
       // modifier = Modifier.padding(16.dp)
    ) {
        ExposedDropdownMenuBox(
            expanded = expanded,
            onExpandedChange = { expanded = !expanded }
        ) {
//            TextField(
//                value = selectedType?.name ?: "Select a Resource Type",
//                onValueChange = {},
//                readOnly = true,
//                modifier = Modifier.menuAnchor(),
//                trailingIcon = {
//                    Icon(Icons.Default.ArrowDropDown, contentDescription = null)
//                }
//            )




            TextField(
                value = selectedType?.name ?: "Select a Resource Type",
                onValueChange = {},
                readOnly = true,
                placeholder = {
                    Text(
                        text = "Select a Resource Type", style = TextStyle(
                            color = MaterialTheme.colorScheme.secondary, fontSize = 14.sp, fontWeight = FontWeight.Normal
                        )
                    )
                },
                modifier = Modifier.menuAnchor()
                  //  .padding(vertical = 4.dp)
                    .fillMaxWidth()
                    .background(AppColors.background, shape = RoundedCornerShape(8.dp))
                    .border(
                        width = 1.dp,
                        color = AppColors.input,
                        shape = RoundedCornerShape(8.dp)
                    ),
                colors = TextFieldDefaults.colors(
                    unfocusedContainerColor = MaterialTheme.colorScheme.surface,
                    focusedContainerColor = MaterialTheme.colorScheme.surface,
                    unfocusedIndicatorColor = Color.Transparent,  // Hides the underline when not focused
                    focusedIndicatorColor = Color.Transparent  // Hides the underline when focused
                ),
                shape = RoundedCornerShape(8.dp),
                textStyle = androidx.compose.ui.text.TextStyle(
                    color = AppColors.foreground,
                    fontSize = 16.sp
                ),
                trailingIcon = {
                    Icon(
                        painter = painterResource(id = R.drawable.chevrondown),
                        contentDescription = "dropdown menu",
                        tint = AppColors.foreground,
                        modifier = Modifier.size(14.dp)
                    )
                }
            )


            ExposedDropdownMenu(
                expanded = expanded,
                onDismissRequest = { expanded = false }
            ) {
                resourceTypes.forEach { type ->
                    var menuExpanded by remember { mutableStateOf(false) }

                    DropdownMenuItem(
                        text = {
                            Row(modifier = Modifier.fillMaxWidth()) {
                                Text(type.name, modifier = Modifier.weight(1f))
                                IconButton(onClick = { menuExpanded = true }) {
                                    Icon(
                                        painter = painterResource(id = R.drawable.threehorizontaldots),
                                        contentDescription = "more horizontal",
                                        tint = AppColors.foreground,
                                        modifier = Modifier.size(14.dp)
                                    )                                }
                                DropdownMenu(
                                    expanded = menuExpanded,
                                    onDismissRequest = { menuExpanded = false }
                                ) {
                                    DropdownMenuItem(
                                        text = { Text("Edit") },
                                        onClick = {
                                            menuExpanded = false
                                            onEditClicked(type)
                                        }
                                    )
                                    DropdownMenuItem(
                                        text = { Text("Delete") },
                                        onClick = {
                                            menuExpanded = false
                                           onDeleteClicked(type)
                                        }
                                    )
                                }
                            }
                        },
                        onClick = {
                            selectedType = type
                            expanded = false
                            onTypeSelected(type)
                        }
                    )
                }
            }
        }
    }
}
