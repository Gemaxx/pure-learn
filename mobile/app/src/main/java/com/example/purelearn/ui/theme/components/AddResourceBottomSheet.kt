package com.example.purelearn.ui.theme.components

import android.util.Log
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
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.ResourceType
import com.example.purelearn.domain.model.ResourceTypeResponse
import com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.ResourceTypeViewModel
import com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.events.ResourceTypeEvents
import com.example.purelearn.ui.theme.ResourceType.ResourceTypeViewModel.events.ResourceTypeUiEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryUiEvents
import kotlinx.coroutines.flow.collectLatest

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
    onSave: () -> Unit,
    viewModel: ResourceTypeViewModel = hiltViewModel()
) {
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
    var isAddResourceTypeDialogOpen by rememberSaveable { mutableStateOf(false) }
    var isUpdateResourceTypeDialogOpen by rememberSaveable { mutableStateOf(false) }

    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }
    var resourceTypetitle by remember { mutableStateOf("") }
    var unitType by remember { mutableStateOf("") }
    val scrollState = rememberScrollState()
    var selectedResourceType by remember { mutableStateOf<ResourceTypeResponse?>(null) }
    var resourceTypeId by remember { mutableStateOf(0) }

    val response = viewModel.resourceTypeResponseEvent.value
    val resourceTypes = response.data ?: emptyList()
    var expanded by remember { mutableStateOf(false) }
   // var selectedType by remember { mutableStateOf<ResourceTypeResponse?>(null) }
    var selectedTypeId by remember { mutableStateOf(0) }

    LaunchedEffect(key1 = true) {
        viewModel.onEvent(ResourceTypeEvents.ShowResourceType)
    }

    LaunchedEffect(key1 = true) {
        viewModel.addResourceTypeEvent.collectLatest {
            isLoading = when (it) {
                is ResourceTypeUiEvents.Success -> {
                    resourceTypetitle = ""
                    unitType = ""
                    context.showToast("ResourceType Added")
                    isAddResourceTypeDialogOpen = false
                    viewModel.onEvent(ResourceTypeEvents.ShowResourceType)
                    false
                }

                is ResourceTypeUiEvents.Failure -> {
                    Log.d("main", "ResourceTypeScreen:${it.msg} ")
                    context.showToast(it.msg)
                    false
                }

                ResourceTypeUiEvents.Loading -> true
            }
        }
    }

    LaunchedEffect(key1 = true) {
        viewModel.updateResourceTypeEvent.collectLatest {
            isLoading = when (it) {
                is ResourceTypeUiEvents.Success -> {
                    context.showToast("Learning ResourceType Updated!")
                    viewModel.onEvent(ResourceTypeEvents.ShowResourceType)
                    isAddResourceTypeDialogOpen = false
                    false
                }

                is ResourceTypeUiEvents.Failure -> {
                    context.showToast(it.msg)
                    false
                }

                ResourceTypeUiEvents.Loading -> true

            }
        }
    }

    LaunchedEffect(key1 = true) {
        viewModel.deleteResourceTypeEvent.collectLatest {
            isLoading = when (it) {
                is ResourceTypeUiEvents.Success -> {
                    context.showToast("ResourceType Deleted")
                    viewModel.onEvent(ResourceTypeEvents.ShowResourceType)
                    false
                }

                is ResourceTypeUiEvents.Failure -> {
                    context.showToast("ResourceType Deleted")
                    viewModel.onEvent(ResourceTypeEvents.ShowResourceType)
                    false
                }

                ResourceTypeUiEvents.Loading -> true

            }
        }
    }

    if (isOpen) {
        ModalBottomSheet(
            sheetState = sheetState,
            onDismissRequest = { onDismiss() },
            containerColor = MaterialTheme.colorScheme.background,
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

                    Text(text = "Title", color = MaterialTheme.colorScheme.primary)
                    AppTextField(
                        text = title,
                        placeholder = "Enter learning resource title",
                        singleLine = true,
                        onValueChange = { onTitleChange(it) }
                    )

                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = "Type", color = MaterialTheme.colorScheme.primary)
                    
                    ResourceTypeDropDownList(
                        viewModel,
                        onTypeSelected = { selectedType ->
                            onTypeIdChange(selectedType.id)
                        },
                        onEditClicked ={
                            type ->
                            isUpdateResourceTypeDialogOpen=true
                            resourceTypetitle=type.name
                            unitType=type.unitType
                            resourceTypeId=type.id
                            }
                ,
                        onDeleteClicked={ type ->
                            viewModel.onEvent(
                                ResourceTypeEvents.DeleteResourceTypeEvent(
                                    type.id
                                )
                            )
                        }
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    Row(modifier = Modifier.clickable {
                        isAddResourceTypeDialogOpen=true
                    }) {
                       Icon(imageVector = Icons.Default.Add, contentDescription = "add resource type")
                        Text(text = "Add  another type")
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    selectedResourceType?.let {
                        AppTextField(
                            text = title,
                            placeholder = "",
                            singleLine = true,
                            onValueChange = { onTitleChange(it) }
                        )
                        onTypeIdChange(it.id)

                   }


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
                    Text(text = "Progress", color = MaterialTheme.colorScheme.onSurface)
                    AppTextField(
                        text = progress.toString(),
                        placeholder = "Enter your Progress",
                        singleLine = true,
                        onValueChange = { value ->
                            onProgressChange(value.toIntOrNull() ?: 0)
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


        if (isAddResourceTypeDialogOpen) {
            AddResourceTypeDialog(
                isOpen = isAddResourceTypeDialogOpen,
                title = resourceTypetitle,
                onTitleChange = { resourceTypetitle = it },
                onUnitTypeChange = { unitType = it },
                unitType = unitType,
                onClick = { },
                onDismiss = { isAddResourceTypeDialogOpen = false },
                onSave = {


                    if (resourceTypetitle.isNotEmpty() && unitType.isNotEmpty()) {
                        Log.d("here", "Title: $resourceTypetitle, UnitType: $unitType")
                        viewModel.onEvent(
                            ResourceTypeEvents.AddResourceTypeEvent(
                                ResourceType(
                                    id = 1,
                                    name = resourceTypetitle,
                                    unitType = unitType,
                                )
                            )
                        )
                    } else {
                        context.showToast("Please add title and unitType")
                    }
                }
            )

        }
        if (isUpdateResourceTypeDialogOpen) {
            AddResourceTypeDialog (
                isOpen = isUpdateResourceTypeDialogOpen,
                title = resourceTypetitle,
                onTitleChange = { resourceTypetitle = it },
                onUnitTypeChange = { unitType = it },
                unitType = unitType,
                onClick = { },
                onDismiss = { isUpdateResourceTypeDialogOpen = false },

                onSave = {
                    if (resourceTypetitle.isNotEmpty() && unitType.isNotEmpty()) {
                        viewModel.onEvent(
                            ResourceTypeEvents.UpdateResourceTypeEvent(
                                resourceType = ResourceType(
                                    id = 1,
                                    name = resourceTypetitle,
                                    unitType = unitType,
                                ),
                                id = resourceTypeId
                            )
                        )
                    } else {
                        context.showToast("Please add title and description")
                    }
                }
            )
        }

    }
}



