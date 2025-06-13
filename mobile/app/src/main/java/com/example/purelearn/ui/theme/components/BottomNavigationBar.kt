package com.example.purelearn.ui.theme.components

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.example.purelearn.R
import com.example.purelearn.ui.theme.AppColors

@Composable
fun BottomNavigationBar() {
    NavigationBar(
        modifier = Modifier.height(56.dp)
            .border(
                width = 1.dp,
                color = AppColors.border,
                shape = RectangleShape
            ),
        containerColor = Color.Transparent,
        contentColor = AppColors.foreground
    ) {
        NavigationBarItem(
            icon = { Icon(
                modifier = Modifier.size(24.dp),
                painter = painterResource(id = R.drawable.threehorizontaldots),
                contentDescription = "more",
                tint = AppColors.foreground
            )}
            ,
            selected = false,
            onClick = { /*TODO*/ }
        )
        NavigationBarItem(
            icon = { Icon(
                modifier = Modifier.size(36.dp),

                painter = painterResource(id = R.drawable.search),
                contentDescription = "Search",
                tint = AppColors.foreground
            ) },
            selected = false,
            onClick = { /*TODO*/ }
        )
        NavigationBarItem(
            icon = { Icon(
                modifier = Modifier.size(36.dp),

                painter = painterResource(id = R.drawable.home),
                contentDescription = "Home",
                tint = AppColors.foreground
            ) },
            selected = false,
            onClick = { /*TODO*/ }
        )
        NavigationBarItem(
            icon = { Icon(
                modifier = Modifier.size(36.dp),

                painter = painterResource(id = R.drawable.clock),
                contentDescription = "timer",
                tint = AppColors.foreground
            ) },
            selected = false,
            onClick = { /*TODO*/ }
        )
        NavigationBarItem(
            icon = { Icon(
                modifier = Modifier.size(36.dp),

                painter = painterResource(id = R.drawable.goals),
                contentDescription = "time",
                tint = AppColors.foreground
            ) },
            selected = false,
            onClick = { /*TODO*/ }
        )
    }
}
