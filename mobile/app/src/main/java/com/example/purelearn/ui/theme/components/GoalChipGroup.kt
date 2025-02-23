package com.example.purelearn.ui.theme.components

import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.Chip
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp


@Composable
fun GoalChipGroup(
    selectedFilter: String,
    onFilterSelected: (String) -> Unit
) {
    val context = LocalContext.current
    LazyRow {
        items(status) { item ->
            ActionChip(item, context, selectedFilter, onFilterSelected)
        }
    }
}


@OptIn(ExperimentalMaterialApi::class)
@Composable
fun ActionChip(
    item: String,
    context: Context,
    selectedFilter: String,
    onFilterSelected: (String) -> Unit
) {
    Chip(
        modifier = Modifier.padding(8.dp),
        onClick = {
            onFilterSelected(item)
            showToast(context, " $item goals")
        },
     //   backgroundColor = if (item == selectedFilter) Color.Gray else Color.LightGray
    ) {
        Text(text = item, color = Color.Black)
    }
}

private fun showToast(context: Context, item: String) {
    Toast.makeText(context, item, Toast.LENGTH_SHORT).show()
}

val status = listOf(
    "All",
    "Long-Term",
    "Medium-Term",
    "Short-Term",
    "Not-Started",
    "In-Progress",
    "Done",
    "On-Hold",
    "Canceled"
)
