package com.example.purelearn.ui.theme.components

import android.util.Log
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.purelearn.ui.theme.AppColors
import com.github.skydoves.colorpicker.compose.*



@Composable
fun ColorPicker(
    isOpen:Boolean,
    initialColor: Color,
    onDismiss: () -> Unit,
    onSave: (Color) -> Unit
) {
    if(isOpen) {

        val controller = rememberColorPickerController()
        AlertDialog(
            modifier = Modifier.border(
                width = 1.dp,
                color = AppColors.input,
                shape = RoundedCornerShape(8.dp)
            ),
            onDismissRequest = {},
            containerColor = AppColors.background,
            tonalElevation = 0.dp, // Prevents auto lightening due to elevation,
            shape = RoundedCornerShape(8.dp),
            title = {
                    Column(
                        modifier = Modifier
                            //.fillMaxSize()
                        // .padding(all = 4.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.Center,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            AlphaTile(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(60.dp)
                                    .clip(RoundedCornerShape(6.dp)),
                                controller = controller
                            )
                        }
                        HsvColorPicker(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(450.dp),
                                //.padding(10.dp),
                            controller = controller,
                            onColorChanged = {
                                Log.d("Color", it.hexCode)
                            }
                        )

                    }

                }

    ,
            text = {
                Column(
                    modifier = Modifier.fillMaxWidth(),
                ) {

                }
            },
            dismissButton = {
                TextButton(onClick = { onDismiss() }) {
                    Text(text="Cancel", color = AppColors.foreground)
                }
            },
            confirmButton = {
                TextButton(
                    onClick = { onSave(controller.selectedColor.value) }
                ) {
                        Text("Save", color = AppColors.foreground)

                }
            }

        )

    }
}