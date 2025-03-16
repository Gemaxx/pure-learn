package com.example.purelearn.di

import com.example.purelearn.domain.repository.CategoryRepositoryImpl
import com.example.purelearn.domain.repository.GoalRepositoryImpl
import com.example.purelearn.repository.CategoryRepository
import com.example.purelearn.repository.GoalRepository
import com.example.purelearn.domain.repository.ResourceRepositoryImpl
import com.example.purelearn.repository.ResourceRepository
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



}

