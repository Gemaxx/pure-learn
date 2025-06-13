package com.example.purelearn.ui.theme.components
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.purelearn.ui.theme.AppColors
import com.google.accompanist.flowlayout.FlowRow


@Composable
fun FilterPopupGoalSection(
    query:String,
    onQueryChange: (String) -> Unit,

    ) {
    Surface(
        shape = RoundedCornerShape(8.dp),
        color = AppColors.background,
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
              .border(
                width = 1.dp,
        color = AppColors.input,
        shape = RoundedCornerShape(8.dp))

    ) {
        Column(modifier = Modifier.padding(16.dp)) {

            // Search bar
        CustomSearchBar(
         query = query,
        onQueryChange =  { onQueryChange(it) },
        placeholder ="Search the Goals...",
         //modifier = TODO()
    )
            Spacer(Modifier.height(8.dp))

            // Reset and Show Deleted
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
//                Button(onClick = { }) {
//                    Text("Reset")
//                    Spacer(Modifier.width(4.dp))
//                    Icon(Icons.Default.Close, contentDescription = null)
//                }

                Button(
                    onClick = { },
                    shape = RoundedCornerShape(8.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = AppColors.background,
                        contentColor = AppColors.foreground
                    ),
                    contentPadding = PaddingValues(horizontal =16.dp, vertical = 0.dp),
                    modifier = Modifier.border(
                            width = 1.dp,
                    color = AppColors.input,
                    shape = RoundedCornerShape(8.dp))
                        .height(36.dp)
                ) {
                    Text("Reset")
                    Spacer(Modifier.width(6.dp))
                    Icon(Icons.Default.Close, contentDescription = null)
                }


                Row(verticalAlignment = Alignment.CenterVertically) {
                    Checkbox(
                        checked = false,
                        onCheckedChange = {},
                        colors = CheckboxDefaults.colors(
                            checkedColor = AppColors.foreground,          // Color when checked
                            uncheckedColor = AppColors.foreground,         // Border color when unchecked
                            checkmarkColor = AppColors.foreground        // The checkmark itself
                        )
                    )
                    Text("Show Deleted Items", color = AppColors.foreground)
                }
            }

            Spacer(Modifier.height(12.dp))



            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = "Status",
                    color = AppColors.mutedForeground,
                    fontSize = 14.sp,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                Spacer(modifier = Modifier.width(16.dp))
                StatusChipGroup(
                    selectedStatus = "All",
                    onStatusSelected = {}
                )
            }
            Spacer(Modifier.height(8.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = "Term",
                    color = AppColors.mutedForeground,
                    fontSize = 14.sp,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
                Spacer(modifier = Modifier.width(24.dp))
                TermChipGroup(
                    selectedTerm = "All",
                    onTermSelected = {}
                )
            }
//            FilterSection(title = "Categories", options = listOf("All", "Software", "Engineering", "Self-Improvement"))
//            FilterSection(title = "Status", options = listOf("All", "Not-Started", "In-Progress", "Done"))
//            FilterSection(title = "Term", options = listOf("All", "Short-Term", "Medium-Term", "Long-Term"))
        }
    }
}

//@Composable
//fun FilterSection(title: String, options: List<String>) {
//    Column {
//        Text(title, color = Color.Gray, fontWeight = FontWeight.SemiBold)
//        Spacer(Modifier.height(4.dp))
//        FlowRow(mainAxisSpacing = 8.dp, crossAxisSpacing = 8.dp) {
//            options.forEach { option ->
//                FilterChip(option = option, selected = option == "All")
//            }
//        }
//        Spacer(Modifier.height(12.dp))
//    }
//}

//@Composable
//fun FilterChip(option: String, selected: Boolean) {
//    val backgroundColor = if (selected) Color.White else Color(0xFF2C2C2E)
//    val contentColor = if (selected) Color.Black else Color.White
//    Box(
//        contentAlignment = Alignment.Center,
//        modifier = Modifier
//            .background(backgroundColor, RoundedCornerShape(8.dp))
//            .padding(horizontal = 12.dp, vertical = 8.dp)
//    ) {
//        Text(option, color = contentColor)
//    }
//}

@Preview(showBackground = true, backgroundColor = 0xFF121212)
@Composable
fun FilterPopupPreview() {
    FilterPopupGoalSection(
        query = "",
        onQueryChange = {}
    )
}
