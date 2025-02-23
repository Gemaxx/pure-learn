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
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddGoalModalBottomSheet(
    isOpen: Boolean,
    title: String,
    description: String,
    onTitleChange: (String) -> Unit,
    onDescriptionChange: (String) -> Unit,
    motivation: String,
    onMotivationChange: (String) -> Unit,
    term: String,
    onTermChange: (String) -> Unit,
    status: String,
    onStatusChange: (String) -> Unit,
    onDismiss: () -> Unit,
    onSave: () -> Unit
) {
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
    val scrollState = rememberScrollState() // <-- Scroll state

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
                    .verticalScroll(scrollState) // <-- Make the content scrollable
            ) {
                Column(
                  //  horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Top
                ) {
                    // Top Row: Cancel & Save
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

                    // Goal Title
                    Text(text = "Title", color = MaterialTheme.colorScheme.onSurface)
                    AppTextField(
                        text = title,
                        placeholder = "Enter goal title",
                        singleLine = true,
                        onValueChange = { onTitleChange(it) }
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    // Goal Description
                    Text(text = "Description", color = MaterialTheme.colorScheme.onSurface)
                    AppTextField(
                        text = description,
                        placeholder = "Enter goal description",
                        modifier = Modifier.height(100.dp),
                        onValueChange = { onDescriptionChange(it) }
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    // Motivation
                    Text(text = "Why do you want to achieve this goal?", color = MaterialTheme.colorScheme.onSurface)
                    AppTextField(
                        text = motivation,
                        placeholder = "Enter your motivation",
                        modifier = Modifier.height(100.dp),
                        onValueChange = { onMotivationChange(it) }
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    // Term Duration Dropdown
                    Text(
                        text = "Term Duration",
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    TermDropDownList(selectedTerm = term, onTermChange = onTermChange)

                    Spacer(modifier = Modifier.height(8.dp))

                    // Goal Status Dropdown
                    Text(
                        text = "Goal Status",
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    GoalStatusDropDownList(selectedStatus = status, onStatusChange = onStatusChange)

                    Spacer(modifier = Modifier.height(16.dp)) // Extra space for better scrolling
                }
            }
        }
    }
}
