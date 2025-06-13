package com.example.purelearn.repository


import com.example.purelearn.domain.model.NoteRequest
import com.example.purelearn.domain.model.NoteResponse
import kotlinx.coroutines.flow.Flow

interface NoteRepository{

    suspend fun getNote(goalId: Int): Flow<List<NoteResponse>>

    suspend fun addNote(note: NoteRequest): Flow<NoteRequest>


    suspend fun deleteNote(id: Int): Flow<NoteResponse>

    suspend fun updateNote(id: Int, note: NoteRequest): Flow<NoteRequest>
}