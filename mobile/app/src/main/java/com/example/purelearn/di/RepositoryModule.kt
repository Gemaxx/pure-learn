package com.example.purelearn.di

import com.example.purelearn.domain.repository.CategoryRepositoryImpl
import com.example.purelearn.domain.repository.GoalRepositoryImpl
import com.example.purelearn.domain.repository.KanbanStatusRepositoryImpl
import com.example.purelearn.domain.repository.NoteRepositoryImpl
import com.example.purelearn.domain.repository.ResourceRepositoryImpl
import com.example.purelearn.domain.repository.ResourceTypeRepositoryImp
import com.example.purelearn.repository.CategoryRepository
import com.example.purelearn.repository.GoalRepository
import com.example.purelearn.repository.KanbanStatusRepository
import com.example.purelearn.repository.NoteRepository
import com.example.purelearn.repository.ResourceRepository
import com.example.purelearn.repository.ResourceTypeRepository
import com.example.purelearn.util.KanbanStatus
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.android.components.ViewModelComponent

@Module
@InstallIn(ViewModelComponent::class)
abstract class RepositoryModule {

    @Binds
    abstract fun providesCategoryRepository(
        categoryRepositoryImpl: CategoryRepositoryImpl
    ): CategoryRepository


    @Binds
    abstract fun providesGoalRepository(
        goalRepositoryImpl: GoalRepositoryImpl
    ): GoalRepository

    @Binds
    abstract fun providesResourceRepository(
        resourceRepositoryImpl: ResourceRepositoryImpl
    ): ResourceRepository

    @Binds
    abstract fun providesResourceTypeRepository(
        resourceTypeRepositoryImpl: ResourceTypeRepositoryImp
    ): ResourceTypeRepository

    @Binds
    abstract fun providesNoteRepository(
        noteRepositoryImpl: NoteRepositoryImpl
    ): NoteRepository


    @Binds
    abstract fun providesKanbanStatusRepository(
        kanbanStatusRepositoryImpl: KanbanStatusRepositoryImpl
    ): KanbanStatusRepository

}

