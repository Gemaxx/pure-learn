package com.example.purelearn.ui.theme.home

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Divider
import androidx.compose.material3.DrawerState
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.NavigationDrawerItem
import androidx.compose.material3.NavigationDrawerItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SearchBar
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.Black
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.purelearn.R
import com.example.purelearn.domain.model.Category
import com.example.purelearn.domain.model.CategoryResponse
import com.example.purelearn.ui.theme.components.AddCategoryDialog
import com.example.purelearn.ui.theme.components.CategoryCard
import com.example.purelearn.ui.theme.components.GlowingFAB
import com.example.purelearn.ui.theme.components.LoadingBar
import com.example.purelearn.ui.theme.components.SwipeToDeleteContainer
import com.example.purelearn.ui.theme.components.showToast
import com.example.purelearn.ui.theme.home.homeviewmodel.CategoryViewModel
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryEvents
import com.example.purelearn.ui.theme.home.homeviewmodel.events.CategoryUiEvents
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch


data class NavigationItem(
    val title: String,
    val selectedIcon: Int,
    val unselectedIcon: Int,
    val badgeCount: Int? = null
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    navController: NavController,
    viewModel: CategoryViewModel = hiltViewModel()
) {


    var isAddCategoryDialogOpen by rememberSaveable { mutableStateOf(false) }
    var isUpdateCategoryDialogOpen by rememberSaveable { mutableStateOf(false) }

    val isVisible = rememberSaveable { mutableStateOf(true) }


    val response = viewModel.categoryResponseEvent.value
    val categories = response.data ?: emptyList()  // Fallback to empty list if null

    val context = LocalContext.current
    var isLoading by remember { mutableStateOf(false) }
    var title by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    var color by remember { mutableStateOf("#9Eb") }
    var categoryId by remember { mutableStateOf(0) }
    if (isLoading) LoadingBar()


    val items = listOf(
        NavigationItem(
            title = "Overview",
            selectedIcon = R.drawable.home,
            unselectedIcon = R.drawable.home,
        ),
        NavigationItem(
            title = "Calendar",
            selectedIcon = R.drawable.calendar,
            unselectedIcon = R.drawable.calendar,
            badgeCount = 45
        ),
        NavigationItem(
            title = "Focus Session",
            selectedIcon = R.drawable.clock,
            unselectedIcon = R.drawable.clock,
        ),
        NavigationItem(
            title = "Screen Time",
            selectedIcon = R.drawable.mobile,
            unselectedIcon = R.drawable.mobile,
        ),
    )



    LaunchedEffect(key1 = true) {
        viewModel.onEvent(CategoryEvents.ShowCategories)
    }

    LaunchedEffect(key1 = true) {
        viewModel.updateCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    context.showToast("Category Updated!")
                    viewModel.onEvent(CategoryEvents.ShowCategories)
                    isAddCategoryDialogOpen = false
                    false
                }

                is CategoryUiEvents.Failure -> {
                    context.showToast(it.msg)
                    false
                }

                CategoryUiEvents.Loading -> true

            }
        }
    }

    LaunchedEffect(key1 = true) {
        viewModel.deleteCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    context.showToast("Category Deleted")
                    viewModel.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                is CategoryUiEvents.Failure -> {
                    context.showToast("Category Deleted")
                    viewModel.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                CategoryUiEvents.Loading -> true

            }
        }
    }

    LaunchedEffect(key1 = true) {
        viewModel.addCategoryEvent.collectLatest {
            isLoading = when (it) {
                is CategoryUiEvents.Success -> {
                    title = ""
                    description = ""
                    context.showToast("Category Added")
                    isAddCategoryDialogOpen = false
                    viewModel.onEvent(CategoryEvents.ShowCategories)
                    false
                }

                is CategoryUiEvents.Failure -> {
                    Log.d("main", "CategoryScreen:${it.msg} ")
                    context.showToast(it.msg)
                    false
                }

                CategoryUiEvents.Loading -> true
            }
        }
    }


    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    var selectedItemIndex by rememberSaveable {
        mutableStateOf(0)
    }
    var text by remember { mutableStateOf("") }
    var active by remember { mutableStateOf(false) }
    var searchItems= remember { mutableListOf(
        "ffffffffff",
        "dddddddddddd"
    ) }
    ModalNavigationDrawer(
        drawerContent = {

            ModalDrawerSheet(
                drawerContainerColor = Black,
                modifier = Modifier
                    .fillMaxHeight()
                    .width(330.dp)
                    .border(0.5.dp, Color.White.copy(alpha = 0.3f), RoundedCornerShape(12.dp))

                //   .background(MaterialTheme.colorScheme.background)
                ,
                //drawerContainerColor = MaterialTheme.colorScheme.background
            ) {
                val expanded = remember { mutableStateOf(false) }
                LazyColumn( // <-- Wrap the content inside LazyColumn
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    item {
                        Spacer(modifier = Modifier.height(16.dp))
                        Text(
                            text = "Pure Learn",
                            style = MaterialTheme.typography.headlineSmall,
                            color = Color.White,
                            modifier = Modifier.padding(bottom = 16.dp, start = 12.dp)
                        )
                        items.forEachIndexed { index, item ->
                            NavigationDrawerItem(
                                colors = NavigationDrawerItemDefaults.colors(
                                    selectedContainerColor = Color.Transparent,
                                    unselectedContainerColor = Color.Transparent
                                ),
                                label = {
                                    Text(
                                        text = item.title,
                                        color = if (index == selectedItemIndex) Black else Color.Gray
                                    )
                                },
                                selected = index == selectedItemIndex,
                                onClick = {
                                    selectedItemIndex = index
//                                    if(selectedItemIndex==2)
//                                    {
//                                        navController.navigate("TimerScreen")
//                                    }
                                    when (selectedItemIndex) {
                                        1 -> navController.navigate("CalendarScreen")
//                                        2 -> navController.navigate("TimerScreen")
                                        2 -> navController.navigate("TimerScreen/1500/300/900/4")

                                        3 -> navController.navigate("ScreenTimeScreen")  // Example: TimerScreen navigation


                                    }
                                    scope.launch {
                                        drawerState.close()
                                    }
                                },
                                icon = {
                                    Icon(
                                        painter = painterResource(id = item.selectedIcon),
                                        contentDescription = item.title,
                                        tint = if (index == selectedItemIndex) Black else Color.Gray
                                    )
                                },


                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(horizontal = 8.dp, vertical = 4.dp)
                                    .clip(RoundedCornerShape(8.dp)) // Apply rounded corners first
                                    .background(if (index == selectedItemIndex) MaterialTheme.colorScheme.primaryContainer else Color.Transparent) // Apply background after clipping



                            )
                        }

                        Divider(modifier = Modifier.padding(20.dp), color = Color.Gray)

                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable { expanded.value = !expanded.value }
                                .padding(16.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "Categories",
                                color = Color.White,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.weight(1f)
                            )
                            Icon(
                                imageVector = if (expanded.value) Icons.Filled.KeyboardArrowUp else Icons.Filled.KeyboardArrowDown,
                                contentDescription = "Expand Categories",
                                tint = Color.White
                            )
                        }

                        if (expanded.value) {
                            categories.forEach { category ->
                                NavigationDrawerItem(
                                    colors = NavigationDrawerItemDefaults.colors(
                                        selectedContainerColor = Color.Transparent,
                                        unselectedContainerColor = Color.Transparent
                                    ),
                                    label = { Text(text = category.title) },
                                    selected = false,
                                    onClick = {
                                        navController.navigate("GoalScreen/${category.id}")
                                        scope.launch { drawerState.close() }
                                    },
                                    icon = {
                                        Icon(
                                            painter = painterResource(id = R.drawable.folder),
                                            contentDescription = category.title,
                                            tint = Color.Gray
                                        )
                                    },
                                    modifier = Modifier.padding(
                                        horizontal = 12.dp,
                                        vertical = 4.dp
                                    )

                                    // modifier = Modifier.padding(NavigationDrawerItemDefaults.ItemPadding)
                                )
                            }
                        }
                    }
                }

            }
        },
        drawerState = drawerState
    )



    {
        Box {
            BlurredBackground(drawerState)
            Scaffold(
                modifier = Modifier.fillMaxSize(),
                floatingActionButton = {

                        GlowingFAB {
                            isAddCategoryDialogOpen = true
                        }

                },
                topBar = {
                    SearchBar(
                        modifier = Modifier.fillMaxWidth().padding(start = 10.dp,end=10.dp),
                        query = text,
                        onQueryChange = {
                            text=it
                        },
                        onSearch = {
                            searchItems.add(text)
                            active=false
                            text=""
                        },
                        active = active,
                        onActiveChange = {
                            active=it
                        },
                        placeholder = {
                            Text(text="Search")
                        },
                        leadingIcon = {
                            IconButton(onClick = {
                                scope.launch {
                                    drawerState.open()
                                }
                            }) {
                                Icon(
                                    imageVector = Icons.Default.Menu,
                                    contentDescription = "Menu"
                                )
                            }
                        },
                        trailingIcon = {
                            if(active)
                            {
                                Icon(
                                    modifier = Modifier.clickable {
                                        if(text.isNotEmpty())
                                        {
                                            text=""
                                        }
                                        else{
                                            active=false
                                        }
                                    },
                                    imageVector = Icons.Default.Close,
                                    contentDescription = "Close Icon"
                                )
                            }
                            else
                                Icon(imageVector = Icons.Default.Search, contentDescription = "Search Icon")
                        }

                    ) {
                        searchItems.forEach{
                            Row (modifier = Modifier.padding(all=14.dp)){
                                Icon(modifier = Modifier.padding(end=10.dp)
                                    , imageVector = Icons.Default.Refresh,
                                    contentDescription = "History items")
                                Text(text=it)
                            }
                        }

                    }
                },
                containerColor = MaterialTheme.colorScheme.background
            ) { paddingValues ->


                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(paddingValues)
                ) {


                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(
                                color = MaterialTheme.colorScheme.background
                            )
                    ) {

                        Spacer(modifier = Modifier.height(10.dp))
                        Divider(modifier = Modifier.padding(20.dp), color = Color.Gray)

                        Text(
                            text = "Categories",
                            style = MaterialTheme.typography.titleMedium,
                            color = MaterialTheme.colorScheme.onBackground,
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 20.dp, vertical = 10.dp)
                        )

                        if (response.data.isNotEmpty()) LazyColumn(
                            modifier = Modifier.fillMaxSize(),
                            verticalArrangement = Arrangement.spacedBy(1.dp),
                            contentPadding = PaddingValues(1.dp),
                        ) {
                            val categories: List<CategoryResponse> = response.data


                            items(categories, key = { it.id })
                            { category ->
                                SwipeToDeleteContainer(
                                    item = category,
                                    onDelete = {
                                        viewModel.onEvent(
                                            CategoryEvents.DeleteCategoryEvent(
                                                category.id
                                            )
                                        )
                                    },
                                    animationDuration = 300,
                                    content = { item:CategoryResponse ->

                                    CategoryCard(
                                            category = item,
//                               {
//                                   title = item.title
//                                   //  description = it.description
//                                   isUpdateCategoryDialogOpen = true
//                                   categoryId = item.id
//                               },
                                            onClick = {
                                                // Navigate to GoalScreen with categoryId
                                                // navController.navigate("goal/${item.id}")
                                                navController.navigate("GoalScreen/${item.id}")


                                            },
                                            onUpdateCategory = {
                                                isUpdateCategoryDialogOpen = true
                                                title = item.title
                                                categoryId = item.id
                                                isUpdateCategoryDialogOpen = true
                                            }
                                        )
                                    }
                                )

                            }
                        }


                    }
                }
            }


        }

        // }

        Log.d("UpdateCategory", "Updating categoryId: $categoryId with title: $title")

        if (isUpdateCategoryDialogOpen) {
            AddCategoryDialog(
                isOpen = isUpdateCategoryDialogOpen,
                title = title,
                onTitleChange = { title = it },
                onDescriptionChange = { description = it },
                description = description,
                onClick = { },
                onDismiss = { isUpdateCategoryDialogOpen = false },

                onSave = {
                    if (title.isNotEmpty() && description.isNotEmpty()) {
                        viewModel.onEvent(
                            CategoryEvents.UpdateCategoryEvent(
                                category = Category(
                                    id = categoryId,
                                    title = title,
                                    color = "#FF33A1",
                                    //  description = description
                                ),
                                id = categoryId
                            )
                        )
                    } else {
                        context.showToast("Please add title and description")
                    }
                }
            )
        }


        if (isAddCategoryDialogOpen) {
            AddCategoryDialog(
                isOpen = isAddCategoryDialogOpen,
                title = title,
                onTitleChange = { title = it },
                onDescriptionChange = { description = it },
                description = description,
                onClick = { },
                onDismiss = { isAddCategoryDialogOpen = false },
                onSave = {
                    if (title.isNotEmpty() && description.isNotEmpty()) {
                        viewModel.onEvent(
                            CategoryEvents.AddCategoryEvent(
                                Category(
                                    id = 2,
                                    title = title,
                                    color = "#FF33A1",
                                    //description = description
                                )
                            )
                        )
                    } else {
                        context.showToast("Please add title and description")
                    }
                }
            )

        }
    }
}


@Composable
fun BlurredBackground(drawerState: DrawerState) {
    val blurEffect = if (drawerState.isOpen) 20.dp else 0.dp

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Black.copy(alpha = 0.5f))
            .blur(blurEffect)
    )
}


