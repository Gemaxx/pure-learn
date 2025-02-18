package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TimeInput
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.material3.rememberTimePickerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import java.text.SimpleDateFormat
import java.time.Instant
import java.util.Calendar
import java.util.Locale


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddGoalScreenContent(
    dueDateValue:String,
    estimatedTimeValue:String
) {


    val context = LocalContext.current


    var isDatePickerDialogOpen by remember { mutableStateOf(false) }
    val datePickerState = rememberDatePickerState(
        initialSelectedDateMillis = Instant.now()
            .toEpochMilli()  // set our initial date to current date
    )


    var showTimePicker by remember { mutableStateOf(false) }
    var finalTime by remember { mutableStateOf("") }
    val state = rememberTimePickerState(is24Hour = true)
    val formatter = remember { SimpleDateFormat("hh:mm", Locale.getDefault()) }


    Column(
        //    horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier
            //.fillMaxSize()
            .padding(top = 38.dp)
            .verticalScroll(rememberScrollState())
    ) {

        TaskDatePicker(
            state = datePickerState,
            isOpen = isDatePickerDialogOpen,
            onDismissRequest = {
                isDatePickerDialogOpen = false
            },
            onConfirmButtonClicked = {
                isDatePickerDialogOpen = false
            }
        )

        if (showTimePicker) {
            TimePickerDialog(
                onCancel = { showTimePicker = false },
                onConfirm = {
                    val cal = Calendar.getInstance()
                    cal.set(Calendar.HOUR_OF_DAY, state.hour)
                    cal.set(Calendar.MINUTE, state.minute)
                    cal.isLenient = false

                    finalTime = formatter.format(cal.time)

                    showTimePicker = false
                },
            ) {
                TimeInput(state = state)

            }
        }





        CustomTextField(
            modifier = Modifier.height(48.dp),
            label = "Title",
            value = "",
            onValueChanged = { },
            hint = "Enter goal title"
        )

        CustomTextField(
            modifier = Modifier.height(150.dp),
            label = "Description",
            value = "",
            onValueChanged = { },
            hint = "Enter goal description",
            maxLines = 5
        )

        CustomTextField(
            modifier = Modifier.height(150.dp),
            label = "Why you want to achieve this goal?",
            value = "",
            onValueChanged = { },
            hint = "Enter Why you want to achieve this goal",
            maxLines = 5
        )


        Text(
            text = "Term Duration",
            modifier = Modifier.padding(start = 17.dp).alpha(0.7f),
            color = MaterialTheme.colorScheme.primary,
            fontSize = 14.sp,
            fontWeight = FontWeight.Normal,
        )

        TermDropDownList()

        Text(
            text = "Goal Status",
            modifier = Modifier.padding(start = 17.dp).alpha(0.7f),
            color = MaterialTheme.colorScheme.primary,
            fontSize = 14.sp,
            fontWeight = FontWeight.Normal
        )

        GoalStatusDropDownList()
    }
}

@Preview
@Composable
fun AddGoalScreenContentPreview(modifier: Modifier = Modifier) {
    AddGoalScreenContent(
        dueDateValue = "",
        estimatedTimeValue = ""
    )
}