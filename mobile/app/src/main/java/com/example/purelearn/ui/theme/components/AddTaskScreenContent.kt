package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
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
import androidx.compose.ui.graphics.Color.Companion.Black
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.example.purelearn.R
import com.example.purelearn.ui.theme.AppColors
import java.text.SimpleDateFormat
import java.time.Instant
import java.util.Calendar
import java.util.Locale


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddTaskScreenContent(
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
            hint = "Enter task title"
        )

        CustomTextField(
            modifier = Modifier.height(150.dp),
            label = "Description",
            value = "",
            onValueChanged = { },
            hint = "Enter task description",
            maxLines = 5
        )


        Row(modifier = Modifier.padding(start = 17.dp)) {

            Text(text = "Due Date", modifier = Modifier.weight(1f))

            Text(text = "Estimated Time", modifier = Modifier.weight(1f))

        }
        Row(modifier = Modifier.padding(start = 17.dp, end = 17.dp)) {

            BasicTextField(modifier = Modifier
                .background(Color.Gray, RoundedCornerShape(12.dp))
                .padding(3.dp)
                .weight(1f)
                //.then(modifer)
                ,
                value = dueDateValue,
                onValueChange = { },
                cursorBrush = SolidColor(Color.Gray),
                textStyle = LocalTextStyle.current.copy(

                    fontWeight = FontWeight.Normal,
                    fontSize = 15.sp,
                    textAlign = TextAlign.End
                ),
                decorationBox = { innerTextField ->
                    Row(
                        Modifier
                            .fillMaxSize()
                            .padding(vertical = 14.5.dp)
                            .weight(1f),
                        verticalAlignment = Alignment.Top,
                    ) {
                        Box(
                            Modifier
                                .weight(1f)
                                .padding(horizontal = 13.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.DateRange,
                                contentDescription = "",
                                modifier = Modifier.clickable {
                                    isDatePickerDialogOpen = true
                                }
                            )

                            if (dueDateValue.isEmpty()) Text(
                                modifier = Modifier.padding(start = 30.dp),
                                text = "Due Date",
                                color = Color(0xFF6c6f77),
                                fontWeight = FontWeight.Medium,
                                fontSize = 15.sp
                            )
                            innerTextField()
                        }
                    }
                }
            )

            Spacer(modifier = Modifier.width(10.dp))
            BasicTextField(modifier = Modifier
                .background(Color.Gray, RoundedCornerShape(12.dp))
                .padding(3.dp)
                .weight(1f)
                // .then()
                ,
                maxLines = 1,
                value = estimatedTimeValue,
                onValueChange = { },
                cursorBrush = SolidColor(Color.Gray),
                textStyle = LocalTextStyle.current.copy(

                    fontWeight = FontWeight.Normal,
                    fontSize = 15.sp,
                    textAlign = TextAlign.End
                ),
                decorationBox = { innerTextField ->
                    Row(
                        Modifier
                            .fillMaxSize()
                            .padding(vertical = 14.5.dp)
                            .weight(1f),
                        verticalAlignment = Alignment.Top,
                    ) {
                        Box(
                            Modifier
                                .weight(1f)
                                .padding(horizontal = 8.dp)
                        ) {
                            Icon(painter = painterResource(id = R.drawable.clock),
                                contentDescription = null,
                                modifier = Modifier.clickable {
                                    showTimePicker = true
                                })

                            if (estimatedTimeValue.isEmpty()) Text(
                                modifier = Modifier.padding(start = 30.dp),
                                text = "EstimatedTime",
                                color = Color(0xFF6c6f77),
                                fontWeight = FontWeight.Medium,
                                fontSize = 15.sp
                            )
                            else Text(
                                modifier = Modifier.padding(start = 30.dp),
                                text = "$finalTime",
                                color = Color(0xFF6c6f77),
                                fontWeight = FontWeight.Medium,
                                fontSize = 15.sp
                            )
                            innerTextField()
                        }
                    }
                }
            )

        }

        Text(
            text = "Priority",
            modifier = Modifier.padding(start = 17.dp)
        )


        PriorityDropDownList()

        Text(
            text = "Task Status",
            modifier = Modifier.padding(start = 17.dp)
        )


        //StatusDropDownList()
    }
}




@Composable
fun CustomTextField(
    modifier: Modifier = Modifier,
    label: String,
    value: String,
    onValueChanged: (String) -> Unit,
    hint: String,
    maxLines: Int = 1
) {
    val localFocusManager = LocalFocusManager.current

    Column(
        horizontalAlignment = Alignment.Start,
        verticalArrangement = Arrangement.spacedBy(9.dp),
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 17.dp)
    ) {
        Text(
            text = label,
            fontSize = 14.sp,
            color = MaterialTheme.colorScheme.primary,
            fontWeight = FontWeight.Normal,
            modifier = Modifier.alpha(0.7f)
        )

        BasicTextField(modifier = Modifier
            .background(Color.Gray, RoundedCornerShape(12.dp))
            .padding(3.dp)
            .fillMaxWidth()
            .then(modifier),
            value = value,
            onValueChange = onValueChanged,
            maxLines = maxLines,
            cursorBrush = SolidColor(Color.Gray),
            keyboardActions = KeyboardActions {
                localFocusManager.clearFocus()
            },
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
            textStyle = LocalTextStyle.current.copy(
                color = AppColors.foreground,
                fontWeight = FontWeight.Normal,
                fontSize = 15.sp,
                textAlign = TextAlign.Start
            ),
            decorationBox = { innerTextField ->
                Row(
                    Modifier
                        .fillMaxSize()
                        .padding(vertical = 14.5.dp),
                    verticalAlignment = Alignment.Top,
                ) {
                    Box(
                        Modifier
                            .weight(1f)
                            .padding(horizontal = 13.dp)
                    ) {
                        if (value.isEmpty()) Text(
                            text = hint,
                            color = Color(0xFF6c6f77),
                            fontWeight = FontWeight.Medium,
                            fontSize = 15.sp
                        )
                        innerTextField()
                    }
                }
            }
        )
    }
}


@Composable
fun TimePickerDialog(
    title: String = "Select Time",
    onCancel: () -> Unit,
    onConfirm: () -> Unit,
    toggle: @Composable () -> Unit = {},
    content: @Composable () -> Unit,
) {
    Dialog(
        onDismissRequest = onCancel,
        properties = DialogProperties(usePlatformDefaultWidth = false),
    ) {
        Surface(
            shape = MaterialTheme.shapes.extraLarge,
            tonalElevation = 6.dp,
            modifier = Modifier
                .width(IntrinsicSize.Min)
                .height(IntrinsicSize.Min)
                .background(
                    shape = MaterialTheme.shapes.extraLarge,
                    color = MaterialTheme.colorScheme.surface
                ),
        ) {
            Column(
                modifier = Modifier.padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 20.dp),
                    text = title,
                    style = MaterialTheme.typography.labelMedium
                )
                content()
                Row(
                    modifier = Modifier
                        .height(40.dp)
                        .fillMaxWidth()
                ) {
                    toggle()
                    Spacer(modifier = Modifier.weight(1f))
                    TextButton(onClick = onCancel) {
                        Text("Cancel")
                    }
                    TextButton(onClick = onConfirm) {
                        Text("OK")
                    }
                }
            }
        }
    }
}

@Preview
@Composable
fun AddTaskScreenContentPreview(modifier: Modifier = Modifier) {
    AddTaskScreenContent(
        dueDateValue = "",
        estimatedTimeValue = ""
    )
}