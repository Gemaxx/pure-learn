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
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.material3.SheetValue
import androidx.compose.material3.SheetState
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import com.example.anew.ui.theme.PureLearnTheme
import com.example.purelearn.R
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.AppTypography


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
    val scrollState = rememberScrollState()

    if (isOpen) {
        ModalBottomSheet(
            sheetState = sheetState,
            onDismissRequest = { onDismiss() },
            containerColor = AppColors.background,
            shape = RoundedCornerShape(8.dp),

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
                    Box(
                        modifier = Modifier.fillMaxWidth(),
                        contentAlignment = Alignment.TopStart
                    ) {
                        Text(
                            text = "Create Goal",
                            style = AppTypography.large,
                            color =AppColors.foreground,

                            )
                    }
                    Spacer(modifier = Modifier.height(16.dp))

                    Column(
                        modifier = Modifier.fillMaxWidth(),
                    ) {

                        TitleTextField(
                            title = "Title",
                            value = title,
                            onValueChange = { onTitleChange(it) },
                            placeholder = "Title of your Goal",
                            totalWords = 100
                        )
                        Spacer(modifier = Modifier.height(8.dp))

                        TitleTextField(
                            title = "Motivation",
                            value = motivation,
                            onValueChange = { onMotivationChange(it) },
                            placeholder = "Why this goal?",
                            totalWords = 100
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        TitleTextField(
                            title = "Description",
                            value = description,
                            onValueChange = { onDescriptionChange(it) },
                            placeholder = "More about this Goal...",
                            totalWords = 100
                        )
                        Spacer(modifier = Modifier.height(8.dp))

                        Text(
                            text = "Term",
                            color = AppColors.foreground,
                            fontSize = 14.sp,
                            modifier = Modifier.padding(bottom = 8.dp)
                        )

                    TermDropDownList(selectedTerm = term, onTermChange = onTermChange)

                    Spacer(modifier = Modifier.height(32.dp))

                        Text(
                            text = "Status",
                            color = AppColors.foreground,
                            fontSize = 14.sp,
                            modifier = Modifier.padding(bottom = 8.dp)
                        )
                    GoalStatusDropDownList(selectedStatus = status, onStatusChange = onStatusChange)

                    Spacer(modifier = Modifier.height(32.dp))

                        Row(
                            modifier = Modifier
                                .fillMaxWidth(),
                              //  .padding(top = 8.dp),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            CancelButton(onClick = onDismiss)
                            CreateButton(
                                onClick = onSave,
                            )
                        }
                        Spacer(modifier = Modifier.height(32.dp))

                    }

                }
            }
        }
    }
}

//@Preview
//@Composable
//fun AddGoalModalBottomSheetPreview(modifier: Modifier = Modifier) {
//    PureLearnTheme {
//        AddGoalModalBottomSheet(
//            isOpen = true,
//            title = "goal name",
//            description = "ay 7aga",
//            onTitleChange = {},
//            onDescriptionChange = {},
//            motivation = "mmm",
//            onMotivationChange = {},
//            term = "Long-Term",
//            onTermChange = {},
//            status = "Not-Started",
//            onStatusChange = {},
//            onDismiss = {},
//            onSave = {}
//        )
//    }
//}