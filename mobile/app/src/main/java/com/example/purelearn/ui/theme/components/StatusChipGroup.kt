package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.purelearn.ui.theme.AppColors

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StatusChipGroup(selectedStatus: String, onStatusSelected: (String) -> Unit) {
    val statuses = listOf("All", "Not-Started", "In-Progress", "Done", "On-Hold", "Cancelled")

    LazyRow(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        items(statuses) { status ->
            FilterChip(
                selected = selectedStatus == status,
                onClick = { onStatusSelected(status) },
                label = {
                    Text(
                        text = status,
                        color = if (selectedStatus == status) AppColors.background else AppColors.foreground,
                        fontWeight = FontWeight.Medium
                    )
                },
                shape = RoundedCornerShape(8.dp),
//                border = FilterChipDefaults.filterChipBorder(
//                    borderWidth = if (selectedStatus == status) 2.dp else 1.dp,
//                    borderColor = if (selectedStatus == status) Color.White else Color.Gray
//                ),
                border = FilterChipDefaults.filterChipBorder(
                    borderColor = AppColors.input,
                    borderWidth = 1.dp,
                    enabled = true,
                    selected = selectedStatus == status
                    ),

                colors = FilterChipDefaults.filterChipColors(
                    containerColor = if (selectedStatus == status) AppColors.foreground else AppColors.background,
                    selectedContainerColor = AppColors.foreground
                ),
                modifier = Modifier.height(36.dp)
                //   .background(Color.Black) // Add background to ensure the white stroke is visible

            )
        }
    }
}



@Composable
fun TermChipGroup(selectedTerm: String, onTermSelected: (String) -> Unit) {
    val terms = listOf("All", "Long-Term", "Medium-Term", "Short-Term")

    LazyRow(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        items(terms) { term ->
            FilterChip(
                selected = selectedTerm == term,
                onClick = { onTermSelected(term) },
                label = {
                    Text(
                        text = term,
                        color = if (selectedTerm == term) AppColors.background else AppColors.foreground,
                        fontWeight = FontWeight.Medium
                    )
                },
                shape = RoundedCornerShape(8.dp),
//                border = FilterChipDefaults.filterChipBorder(
//                    borderWidth = if (selectedStatus == status) 2.dp else 1.dp,
//                    borderColor = if (selectedStatus == status) Color.White else Color.Gray
//                ),
                border = FilterChipDefaults.filterChipBorder(
                    borderColor = AppColors.input,
                    borderWidth = 1.dp,
                    enabled = true,
                    selected = selectedTerm == term
                ),

                colors = FilterChipDefaults.filterChipColors(
                    containerColor = if (selectedTerm == term)  AppColors.foreground else AppColors.background,
                    selectedContainerColor = AppColors.foreground
                ),
                modifier = Modifier.height(36.dp)
                //   .background(Color.Black) // Add background to ensure the white stroke is visible

            )
        }
    }
}