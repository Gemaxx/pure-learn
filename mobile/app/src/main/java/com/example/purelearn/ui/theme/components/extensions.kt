package com.example.purelearn.ui.theme.components

import android.content.Context
import android.widget.Toast

fun Context.showToast(
    msg: String,
    duration: Int = Toast.LENGTH_SHORT
) = Toast.makeText(this, msg, duration).show()