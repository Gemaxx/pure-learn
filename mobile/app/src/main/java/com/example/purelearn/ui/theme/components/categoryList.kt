package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Card
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.purelearn.domain.model.Category
import com.example.purelearn.ui.theme.navigation.Routes
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.ui.theme.home.homeviewmodel.CategoryViewModel


fun LazyListScope.categoryList(
    viewModel: CategoryViewModel,
   // navController: NavController,
    categoryTitle:String,
    emptyListText:String,
    categories: List<CategoryResponse>,
    onDeleteIconClick: (Category) -> Unit
)
{

   // val categories by viewModel.categories.collectAsState()
    item{
        Text(
            text=categoryTitle,
            style = MaterialTheme.typography.bodySmall,
            modifier = Modifier.padding(12.dp)
        )
    }

    if(categories.isEmpty())
    {
        item{
            Column (
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ){

//                Image(
//                    modifier = Modifier.size(120.dp),
//                    painter = painterResource(R.drawable.img_lamp),
//                    contentDescription = emptyListText
//                )
//                Spacer(modifier = Modifier.height(12.dp))
                Text(

                    text = emptyListText,
                    style = MaterialTheme.typography.bodySmall,
                    color = Color.Gray,
                    textAlign = TextAlign.Center
                )

            }
        }

    }

    items(categories)
    {category->
        CategoryCard(
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
            category =category,
            onClick = {
               // navController.navigate(Routes.GoalScreen)
            },
            onDeleteIconClick = {}
        )
    }

}

@Composable
private fun CategoryCard(
    modifier: Modifier = Modifier,
    category: CategoryResponse,
    onClick:()->Unit,
    onDeleteIconClick:()->Unit
) {
    Card(
        modifier=modifier
            .clickable { onClick() }
    ) {
        Row(
            modifier= Modifier
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        )
        {

            Column (modifier = Modifier.padding(start=12.dp)){
                Text(
                    text = category.title,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    style = MaterialTheme.typography.titleMedium,
                )


            }
            Spacer(modifier= Modifier.weight(1f))

            IconButton(onClick = {}) {
                Icon(
                    imageVector = Icons.Default.Delete,
                    contentDescription = "Delete Session"
                )

            }
        }
    }




}