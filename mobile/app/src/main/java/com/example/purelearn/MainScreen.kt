//package com.example.purelearn
//
//
//import androidx.compose.foundation.layout.Box
//import androidx.compose.foundation.layout.fillMaxSize
//import androidx.compose.foundation.layout.fillMaxWidth
//import androidx.compose.foundation.layout.height
//import androidx.compose.foundation.layout.offset
//import androidx.compose.foundation.layout.padding
//import androidx.compose.foundation.lazy.LazyColumn
//import androidx.compose.material3.Icon
//import androidx.compose.material3.NavigationBar
//import androidx.compose.material3.NavigationBarItem
//import androidx.compose.material3.Scaffold
//import androidx.compose.material3.Text
//import androidx.compose.runtime.Composable
//import androidx.compose.runtime.getValue
//import androidx.compose.runtime.mutableStateOf
//import androidx.compose.runtime.remember
//import androidx.compose.runtime.setValue
//import androidx.compose.ui.Modifier
//import androidx.compose.ui.geometry.Offset
//import androidx.compose.ui.input.key.Key.Companion.Calendar
//import androidx.compose.ui.input.key.Key.Companion.Home
//import androidx.compose.ui.input.key.Key.Companion.Search
//import androidx.compose.ui.input.nestedscroll.NestedScrollConnection
//import androidx.compose.ui.input.nestedscroll.NestedScrollSource
//import androidx.compose.ui.input.nestedscroll.nestedScroll
//import androidx.compose.ui.platform.LocalDensity
//import androidx.compose.ui.res.painterResource
//import androidx.compose.ui.unit.IntOffset
//import androidx.compose.ui.unit.dp
//import androidx.navigation.NavController
//import androidx.navigation.compose.currentBackStackEntryAsState
//import androidx.navigation.compose.rememberNavController
//import com.example.purelearn.domain.model.NavItem
//import com.example.purelearn.ui.theme.calendar.CalendarScreen
//import com.example.purelearn.ui.theme.chatpot.ChatBotScreen
//import com.example.purelearn.ui.theme.components.HomeTopAppBar
//import com.example.purelearn.ui.theme.home.HomeScreen
//import com.example.purelearn.ui.theme.navigation.Routes
//import com.example.purelearn.ui.theme.timer.TimerScreen
//
//import kotlin.math.roundToInt
//
//
//@Composable
//fun MainScreen(navController: NavController , modifier: Modifier = Modifier) {
//
//    val navItemList = listOf(
//        NavItem("", R.drawable.home),
//        NavItem("", R.drawable.calendar),
//        NavItem("", R.drawable.clock),
//        NavItem("", R.drawable.search)
//
//    )
//
//
//    var selectedIndex by remember {
//        mutableStateOf(0)
//    }
//    // val navController = rememberNavController()
//
//    val bottomBarHeight = 48.dp
//    val bottomBarHeightPx = with(LocalDensity.current) { bottomBarHeight.roundToPx().toFloat() }
//    val bottomBarOffsetHeightPx = remember { mutableStateOf(0f) }
//    val nestedScrollConnection = remember {
//        object : NestedScrollConnection {
//            override fun onPreScroll(available: Offset, source: NestedScrollSource): Offset {
//
//                val delta = available.y
//                val newOffset = bottomBarOffsetHeightPx.value + delta
//                bottomBarOffsetHeightPx.value = newOffset.coerceIn(-bottomBarHeightPx, 0f)
//
//                return Offset.Zero
//            }
//        }
//    }
//    Scaffold(
//        modifier = Modifier.fillMaxSize().nestedScroll(nestedScrollConnection),
//        bottomBar = {
//            NavigationBar(
//                modifier = Modifier
//                    .height(bottomBarHeight)
//                    .offset { IntOffset(x = 0, y = -bottomBarOffsetHeightPx.value.roundToInt()) }) {
//                navItemList.forEachIndexed { index, navItem ->
//                    NavigationBarItem(
//                        selected = selectedIndex == index,
//                        onClick = {
//                            selectedIndex = index
//                        },
//                        icon = {
//                            Icon(
//                                painter = painterResource(id = navItem.icon),
//                                contentDescription = null // decorative element
//                            )
//                        },
//                        label = {
//                            Text(text = navItem.label)
//                        }
//                    )
//                }
//            }
//        },
//        topBar = { HomeTopAppBar("Fatema Emara") }
//    ) { innerPadding ->
//
//        LazyColumn(contentPadding = innerPadding) {
//            items(count = 100) {
//                Box(
//                    Modifier
//                        .fillMaxWidth()
//                        .height(50.dp)
//                    // .background(colors[it % colors.size])
//                )
//            }
//        }
//        when(selectedIndex) {
//            0 -> Routes.HomeScreen
//            1 -> Routes.CalendarScreen
//            2 -> Routes.CalendarScreen
//            3 -> Routes.ChatBotScreen
//        }
//        ///ContentScreen(modifier = Modifier.padding(innerPadding), selectedIndex)
//    }
//}
//
////@Composable
////fun ContentScreen(modifier: Modifier = Modifier, selectedIndex: Int) {
////   when(selectedIndex) {
////       0 -> HomeScreen()
////       1 -> CalendarScreen()
////       2 -> TimerScreen()
////       3 -> ChatBotScreen()
////   }
////}
//
