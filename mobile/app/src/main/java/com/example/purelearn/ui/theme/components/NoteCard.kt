package com.example.purelearn.ui.theme.components

import android.util.Log
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarResult
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.purelearn.R
import com.example.purelearn.domain.model.NoteResponse
import com.example.purelearn.ui.theme.AppColors
import com.example.purelearn.ui.theme.Resource.Resourceviewmodel.events.ResourceEvents
import kotlinx.coroutines.launch

@Composable
fun NoteCard(note: NoteResponse,
             onClick: () -> Unit,
          //   onUpdateNote: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        modifier = Modifier
            .fillMaxWidth().padding(start = 8.dp, bottom = 8.dp)
            .border(border = BorderStroke(1.dp, AppColors.border),
                shape = RoundedCornerShape(12.dp))
            ,
          //  .aspectRatio(1f)

        onClick = onClick
    ) {
        Column(modifier = Modifier.padding(16.dp)) {


            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = note.title,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                 Icon(
                   imageVector = Icons.Default.MoreVert,
                   contentDescription = null,
                   tint = Color.White
                                        )

//                Box {
//
//                    IconButton(onClick = {
//                        expandedStates[resource.title] = true
//                    }) {
//                        Icon(
//                            painter = painterResource(id = R.drawable.morevertical),
//                            contentDescription = "res more",
//                            tint = AppColors.foreground,
//                            modifier = Modifier.size(16.dp)
//                        )
//                    }
//
//                    DropdownMenu(
//                        expanded = expandedStates.getOrDefault(resource.title, false),
//                        onDismissRequest = { expandedStates[resource.title] = false }
//                    )
//
//                    {
//                        DropdownMenuItem(
//                            text = { Text("Edit") },
//                            onClick = {
//                                selectedResourceId = resource.id
//                                waitingForResourceData = true
//                                viewModel.onEvent(ResourceEvents.GetResourceByIdEvent(resource.id))
//                                expandedStates[resource.title] = false
//                            }
//                        )
//
//                        DropdownMenuItem(
//                            text = { Text("Delete") },
//                            onClick = {
//                                expandedStates[resource.title] = false
//                                Log.d("here1","${resource.id}")
//                                viewModel.onEvent(ResourceEvents.SoftDeleteResourceEvent(resource.id))
//                                viewModel.onEvent(ResourceEvents.ShowResources(goalId))
//                                scope.launch {
//                                    val result = snackbarHostState.showSnackbar(
//                                        message = "Goal moved to trash",
//                                        actionLabel = "Undo",
//                                        duration = SnackbarDuration.Short
//                                    )
//
//                                    if (result == SnackbarResult.ActionPerformed) {
//                                        Log.d("here2","${resource.id}")
//                                        viewModel.onEvent(ResourceEvents.RestoreResourceEvent(resource.id))
//                                    }
//                                }
//                            }
//                        )
//                    }
//                }


            }


            Text(
                text = note.body,
                fontSize = 12.sp,
                color = Color.Gray,
                modifier = Modifier.padding(top = 4.dp)
            )
        }
    }
}