package com.example.purelearn.domain.repository

import com.example.purelearn.domain.model.Goal
import com.example.purelearn.domain.model.GoalResponse
import com.example.purelearn.domain.model.NoteRequest
import com.example.purelearn.domain.model.NoteResponse
import com.example.purelearn.domain.network.KtorService
import com.example.purelearn.domain.network.RetrofitService
import com.example.purelearn.repository.NoteRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import javax.inject.Inject

class NoteRepositoryImpl @Inject constructor(
    private val apiService: KtorService,
    private val retrofitService: RetrofitService
) : NoteRepository {

    override suspend fun getNote(goalId: Int): Flow<List<NoteResponse>> = flow {
        emit(retrofitService.getNote(
            learnerId = 1,
            goalId = goalId,
            isDeleted = false
        ))
    }.flowOn(Dispatchers.IO)
//
//    override suspend fun addNote(note: NoteResponse): Flow<NoteResponse> {
//        TODO("Not yet implemented")
//    }
//
//    override suspend fun deleteNote(id: Int): Flow<NoteResponse> {
//        TODO("Not yet implemented")
//    }
//
//    override suspend fun updateNote(id: Int, note: NoteResponse): Flow<NoteResponse> {
//        TODO("Not yet implemented")
//    }




    override suspend fun addNote(note: NoteRequest): Flow<NoteRequest> = flow {
        emit(retrofitService.addNote(
            learnerId = 1,
            note = note,
        ))
    }.flowOn(Dispatchers.IO)





//    override suspend fun deleteNote(id: Int): Flow<NoteResponse> = flow {
//        emit(retrofitService.deleteNote(
//            learnerId = 1,
//            noteId = id,
//        ))
//    }.flowOn(Dispatchers.IO)
//
//
    override suspend fun updateNote(id: Int, note: NoteRequest): Flow<NoteRequest> = flow {
        emit(retrofitService.updateNote(
            learnerId = 1,
            noteId = id,
            note = note,
        ))
    }.flowOn(Dispatchers.IO)

}