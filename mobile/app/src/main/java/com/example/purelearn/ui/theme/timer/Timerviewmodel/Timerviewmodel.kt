package com.example.purelearn.ui.theme.timer.Timerviewmodel

import android.Manifest
import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.pm.PackageManager
import android.os.Build
import android.os.CountDownTimer
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

@HiltViewModel
class TimerViewModel @Inject constructor(
    private val application: Application
) : ViewModel() {

    private var timer: CountDownTimer? = null
    private val _timeLeft = MutableStateFlow(1500)
    val timeLeft: StateFlow<Int> = _timeLeft
    private val _isRunning = MutableStateFlow(false)
    val isRunning: StateFlow<Boolean> = _isRunning

    var sessionDuration by mutableStateOf(1500)
    var breakDuration by mutableStateOf(300)
    private var remainingTime = sessionDuration
    private val _isBreakTime = MutableStateFlow(false)
    val isBreakTime: StateFlow<Boolean> = _isBreakTime
    var longBreakDuration by mutableStateOf(900)
    var totalPomodorosBeforeLongBreak by mutableStateOf(4)
    private var _completedPomodoros = 0
    var totalDuration: Int = sessionDuration


    init {
        createNotificationChannel()
    }

    fun startPomodoro() {
        if (_isRunning.value) return
        _isRunning.value = true
        _isBreakTime.value = false
        totalDuration = sessionDuration
        startTimer(remainingTime, isSession = true)
    }

    fun pausePomodoro() {
        _isRunning.value = false
        timer?.cancel()
    }

    fun resetPomodoro() {
        _isRunning.value = false
        timer?.cancel()
        _isBreakTime.value = false
        remainingTime = sessionDuration
        _timeLeft.value = sessionDuration
    }

    fun updateSessionDuration(duration: Int) {
        sessionDuration = duration
        totalDuration = duration
        remainingTime = duration
        _timeLeft.value = sessionDuration
    }

    fun updateBreakDuration(duration: Int) {
        breakDuration = duration
    }

    fun updateLongBreakDuration(duration: Int) {
        longBreakDuration = duration
    }

    fun updatePomodoroCount(count: Int) {
        totalPomodorosBeforeLongBreak = count
    }

    fun startBreakManually() {
        if (_isRunning.value) return
        _isRunning.value = true
        _isBreakTime.value = true
        totalDuration = breakDuration
        startTimer(remainingTime, isSession = false)
    }

    private fun startTimer(seconds: Int, isSession: Boolean) {
        timer?.cancel()
        timer = object : CountDownTimer((seconds * 1000).toLong(), 1000) {
            override fun onTick(millisUntilFinished: Long) {
                val timeRemaining = (millisUntilFinished / 1000).toInt()
                _timeLeft.value = timeRemaining
                remainingTime = timeRemaining
            }

            override fun onFinish() {
                _isRunning.value = false
                if (isSession) {
                    _completedPomodoros++
                    if (_completedPomodoros >= totalPomodorosBeforeLongBreak) {
                        showNotification("Pomodoro Cycle Complete", "Time for a long break!")
                        _isBreakTime.value = true
                        _timeLeft.value = longBreakDuration
                        remainingTime = longBreakDuration
                        _completedPomodoros = 0 // Reset counter
                    } else {
                        showNotification("Focus Session Ended", "Time for a short break!")
                        _isBreakTime.value = true
                        _timeLeft.value = breakDuration
                        remainingTime = breakDuration
                    }
                } else {
                    showNotification("Break Finished", "Back to work!")
                    _isBreakTime.value = false
                    _timeLeft.value = sessionDuration
                    remainingTime = sessionDuration
                }
            }
        }.start()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "POMODORO_CHANNEL", "Pomodoro Timer", NotificationManager.IMPORTANCE_DEFAULT
            )
            val manager = application.getSystemService(NotificationManager::class.java)
            manager?.createNotificationChannel(channel)
        }
    }

    private fun showNotification(title: String, message: String) {
        val notification = NotificationCompat.Builder(application, "POMODORO_CHANNEL")
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(message)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .build()

        if (ActivityCompat.checkSelfPermission(
                application, Manifest.permission.POST_NOTIFICATIONS
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            return
        }
        NotificationManagerCompat.from(application).notify((0..1000).random(), notification)
    }
}
