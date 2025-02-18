package com.example.purelearn.ui.theme.components

import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.Chip
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp


@Composable
fun GoalChipGroup(modifier: Modifier = Modifier) {
    val context = LocalContext.current // Get context for Toast
    LazyRow {
        items(status) { item ->
            ActionChip(item, context)
        }
    }
}


@OptIn(ExperimentalMaterialApi::class)
@Composable
fun ActionChip(item: String, context: Context) {
    Chip(
        modifier = Modifier.padding(8.dp),
        onClick = {
            showToast(context, item)
        }
    ) {
        Text(text = item)
    }
}

private fun showToast(context: Context, item: String) {
    Toast.makeText(context, item, Toast.LENGTH_SHORT).show()
}

val status = listOf(
    "Long-Term",
    "Medium-Term",
    "Short-Term",
    "Not-Started",
    "In-Progress",
    "Done",
    "On-Hold",
    "Cancelled"
)
