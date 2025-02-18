package com.example.purelearn.domain.model

import android.media.audiofx.AudioEffect.Descriptor

data class Resource(
    val resourceId:Int,
    val title:String,
    val progress:Long,
    val url: String
)
