package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.AssistChip
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.purelearn.R
import com.example.purelearn.ui.theme.AppColors

@Composable
fun ResourceCardUI(
    title: String = "How to Create a  Component",
    tag: String = "Video",
    current: Int = 30,
    total: Int = 50
) {
    val progress = current.toFloat() / total
    val percentage = (progress * 100).toInt()

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = AppColors.background),
        border = BorderStroke(1.dp, Color.DarkGray),

        ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    color = Color.White
                )
                Icon(
                    imageVector = Icons.Default.MoreVert,
                    contentDescription = null,
                    tint = Color.White
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
//                AssistChip(
//                    onClick = {},
//                    label = { Text(tag) },
//                    leadingIcon = {
//                        Icon(
//                            painter = painterResource(id = R.drawable.tag),
//                            contentDescription = "folder",
//                            tint = AppColors.foreground,
//                            modifier = Modifier.size(14.dp)
//                        )
//                    },
//                    colors = AssistChipDefaults.assistChipColors(
//                        labelColor = Color.White,
//                        leadingIconContentColor = Color.White,
//                        containerColor = Color(0xFF2C2C2E)
//                    )
//                )

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                      //  .background(Color.Black)
                        .padding(16.dp)
                ) {
                    // Tag Icon
                    Icon(
                        painter = painterResource(id = R.drawable.tag),
                        contentDescription = "folder",
                        tint = AppColors.foreground,
                        modifier = Modifier.size(22.dp)
                    )

                    Spacer(modifier = Modifier.width(8.dp))

                    // "Video" Button Style
                    Surface(
                        shape = RoundedCornerShape(50),
                        border = BorderStroke(1.dp, Color.DarkGray),
                        color = Color.Transparent
                    ) {
                        Text(
                            text = "Video",
                            color = Color.White,
                            modifier = Modifier
                                .padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }
                }
                Spacer(modifier = Modifier.weight(1f))
                Icon(
                    painter = painterResource(id = R.drawable.openinnewwindow),
                    contentDescription = "folder",
                    tint = AppColors.foreground,
                    modifier = Modifier.size(22.dp)
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(20.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .background(Color(0xFF2C2C2E))
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxHeight()
                            .fillMaxWidth(progress)
                            .clip(RoundedCornerShape(10.dp))
                            .background(Color(0xFFAFAEB4))
                    )
                    Text(
                        text = "$percentage%",
                        style = MaterialTheme.typography.labelSmall,
                        color = Color.White,
                        modifier = Modifier.align(Alignment.Center)
                    )
                }

                Spacer(modifier = Modifier.width(12.dp))

                Text(
                    text = "$current/$total",
                    style = MaterialTheme.typography.labelSmall,
                    color = Color.White
                )

                Spacer(modifier = Modifier.width(4.dp))

//                Box(
//                    modifier = Modifier
//                        .background(Color(0xFF2C2C2E), RoundedCornerShape(10.dp))
//                        .padding(horizontal = 8.dp, vertical = 2.dp).border(
//                            width = 1.dp,
//                            brush = SolidColor(AppColors.input),
//                            shape = RoundedCornerShape(10.dp)
//                        )
//                ) {
//                    Text(
//                        text = "Min",
//                        style = MaterialTheme.typography.labelSmall,
//                        color = Color.White
//                    )
//                }
                Surface(
                    shape = RoundedCornerShape(50),
                    border = BorderStroke(1.dp, Color.DarkGray),
                    color = Color.Transparent
                ) {
                    Text(
                        text = "min",
                        color = Color.White,
                        modifier = Modifier
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }
        }
    }
}



@Preview(showBackground = true, backgroundColor = 0xFF000000)
@Composable
fun ResourceCardPreview() {
    MaterialTheme {
        Surface(color = Color(0xFF000000)) {
            ResourceCardUI(

            )
        }
    }
}
