package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Edit
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.ui.theme.home.homeviewmodel.CategoryViewModel


//fun LazyListScope.categoryList(
//    viewModel: CategoryViewModel,
//   // navController: NavController,
//    categoryTitle:String,
//    emptyListText:String,
//    categories: List<CategoryResponse>,
//    onDeleteIconClick: (Category) -> Unit,
//    onUpdateCategory: () -> Unit
//)
//{
//
//    item{
//        Text(
//            text=categoryTitle,
//            style = MaterialTheme.typography.bodyMedium,
//            modifier = Modifier.padding(12.dp)
//        )
//    }
//
//    if(categories.isEmpty())
//    {
//        item{
//            Column (
//                modifier = Modifier.fillMaxWidth(),
//                horizontalAlignment = Alignment.CenterHorizontally
//            ){
//
//                Text(
//
//                    text = emptyListText,
//                    style = MaterialTheme.typography.bodySmall,
//                    color = Color.Gray,
//                    textAlign = TextAlign.Center
//                )
//
//            }
//        }
//
//    }
//
//    items(categories)
//    {category->
//        CategoryCard(
//            modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
//            category = category,
//            onClick = {
//                // navController.navigate(Routes.GoalScreen)
//            },
//
//            viewModel = viewModel,
//            onUpdateCategory = {
//                  onUpdateCategory()
//            }
//        )
//
//    }
//
//}

@Composable
 fun CategoryCard(
    category: CategoryResponse,
    onClick:()->Unit,
    onUpdateCategory:()->Unit

) {
    Card(
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        shape = RoundedCornerShape(16.dp),
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp)
    ) {

        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = category.title,
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.background
            )

            IconButton(onClick = onUpdateCategory) {
                Icon(
                    imageVector = Icons.Outlined.Edit,
                    contentDescription = "Edit Category",
                    tint = MaterialTheme.colorScheme.background
                )
            }
        }
    }
}






