package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TimeInput
import androidx.compose.material3.rememberTimePickerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
@Preview
fun TimePickerSample() {
    var showTimePicker by remember { mutableStateOf(false) }
    var finalTime by remember { mutableStateOf("") }
    val state = rememberTimePickerState(is24Hour = true)
    val formatter = remember { SimpleDateFormat("hh:mm", Locale.getDefault()) }
//    val snackState = remember { SnackbarHostState() }
//    val snackScope = rememberCoroutineScope()
    Column(
        modifier = Modifier
            .padding(horizontal = 100.dp)
            .fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
//        Box(propagateMinConstraints = false) {
//            Button(
//                modifier = Modifier.align(Alignment.Center),
//                onClick = { showTimePicker = true }
//            ) {
//                Text("Set Time")
//            }
//            SnackbarHost(hostState = snackState)
//        }

        if (showTimePicker) {
            TimePickerDialog(
                onCancel = { showTimePicker = false },
                onConfirm = {
                    val cal = Calendar.getInstance()
                    cal.set(Calendar.HOUR_OF_DAY, state.hour)
                    cal.set(Calendar.MINUTE, state.minute)
                    cal.isLenient = false

                    finalTime = formatter.format(cal.time)
//                    snackScope.launch {
//                        snackState.showSnackbar("Entered time: ${finalTime}")
//                    }
                    showTimePicker = false
                },
            ) {
                TimeInput(state = state)
                //TimePicker(state = state)
            }
        }
        Text("Set Time:$finalTime")
    }

}

//
//@Composable
//fun TimePickerDialog(
//    title: String = "Select Time",
//    onCancel: () -> Unit,
//    onConfirm: () -> Unit,
//    toggle: @Composable () -> Unit = {},
//    content: @Composable () -> Unit,
//) {
//    Dialog(
//        onDismissRequest = onCancel,
//        properties = DialogProperties(usePlatformDefaultWidth = false),
//    ) {
//        Surface(
//            shape = MaterialTheme.shapes.extraLarge,
//            tonalElevation = 6.dp,
//            modifier = Modifier
//                .width(IntrinsicSize.Min)
//                .height(IntrinsicSize.Min)
//                .background(
//                    shape = MaterialTheme.shapes.extraLarge,
//                    color = MaterialTheme.colorScheme.surface
//                ),
//        ) {
//            Column(
//                modifier = Modifier.padding(24.dp),
//                horizontalAlignment = Alignment.CenterHorizontally
//            ) {
//                Text(
//                    modifier = Modifier
//                        .fillMaxWidth()
//                        .padding(bottom = 20.dp),
//                    text = title,
//                    style = MaterialTheme.typography.labelMedium
//                )
//                content()
//                Row(
//                    modifier = Modifier
//                        .height(40.dp)
//                        .fillMaxWidth()
//                ) {
//                    toggle()
//                    Spacer(modifier = Modifier.weight(1f))
//                    TextButton(onClick = onCancel) {
//                        Text("Cancel")
//                    }
//                    TextButton(onClick = onConfirm) {
//                        Text("OK")
//                    }
//                }
//            }
//        }
//    }
//}