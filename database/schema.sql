-- PureLearn Database Schema
USE master;
GO

-- Create the database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'PureLearn')
BEGIN
    CREATE DATABASE PureLearn;
END
GO

USE PureLearn;
GO

-- Enable full-text search
IF NOT EXISTS (SELECT * FROM sys.fulltext_catalogs WHERE name = 'PureLearnCatalog')
BEGIN
    CREATE FULLTEXT CATALOG PureLearnCatalog AS DEFAULT;
END
GO

-- Users and Authentication
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
    IsActive BIT DEFAULT 1,
    LastLoginDate DATETIME2,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT UQ_Users_Email UNIQUE (Email)
);

-- Categories for organizing learning resources
CREATE TABLE Categories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    ParentCategoryId INT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_Categories_ParentCategory FOREIGN KEY (ParentCategoryId) REFERENCES Categories(Id)
);

-- Learning Resource Types
CREATE TABLE LearningResourceTypes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Icon NVARCHAR(100),
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- Learning Resources
CREATE TABLE LearningResources (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    Url NVARCHAR(MAX),
    ResourceTypeId INT FOREIGN KEY REFERENCES LearningResourceTypes(Id),
    CategoryId INT FOREIGN KEY REFERENCES Categories(Id),
    CreatedBy INT FOREIGN KEY REFERENCES Users(Id),
    IsPublic BIT DEFAULT 0,
    ViewCount INT DEFAULT 0,
    Rating DECIMAL(3,2),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT CHK_LearningResources_Rating CHECK (Rating >= 0 AND Rating <= 5)
);

-- Learners (User profiles with learning preferences)
CREATE TABLE Learners (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT FOREIGN KEY REFERENCES Users(Id),
    LearningStyle NVARCHAR(50),
    PreferredLanguage NVARCHAR(50),
    TimeZone NVARCHAR(50),
    DailyLearningGoal INT, -- in minutes
    WeeklyLearningGoal INT, -- in minutes
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT UQ_Learners_UserId UNIQUE (UserId)
);

-- Learning Goals
CREATE TABLE Goals (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    LearnerId INT FOREIGN KEY REFERENCES Learners(Id),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    TargetDate DATETIME2,
    Status NVARCHAR(50),
    Priority INT,
    Progress DECIMAL(5,2) DEFAULT 0,
    IsCompleted BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT CHK_Goals_Progress CHECK (Progress >= 0 AND Progress <= 100),
    CONSTRAINT CHK_Goals_Priority CHECK (Priority BETWEEN 1 AND 5)
);

-- Notes
CREATE TABLE Notes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    LearnerId INT FOREIGN KEY REFERENCES Learners(Id),
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX),
    ResourceId INT FOREIGN KEY REFERENCES LearningResources(Id),
    IsPublic BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- Task Types
CREATE TABLE TaskTypes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Color NVARCHAR(7), -- Hex color code
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- Kanban Statuses
CREATE TABLE KanbanStatuses (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Color NVARCHAR(7), -- Hex color code
    OrderIndex INT NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT UQ_KanbanStatuses_OrderIndex UNIQUE (OrderIndex)
);

-- Tasks
CREATE TABLE Tasks (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    LearnerId INT FOREIGN KEY REFERENCES Learners(Id),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    TaskTypeId INT FOREIGN KEY REFERENCES TaskTypes(Id),
    KanbanStatusId INT FOREIGN KEY REFERENCES KanbanStatuses(Id),
    DueDate DATETIME2,
    Priority INT,
    EstimatedHours DECIMAL(5,2),
    ActualHours DECIMAL(5,2),
    IsCompleted BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT CHK_Tasks_Priority CHECK (Priority BETWEEN 1 AND 5)
);

-- Subtasks
CREATE TABLE Subtasks (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    TaskId INT FOREIGN KEY REFERENCES Tasks(Id),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    IsCompleted BIT DEFAULT 0,
    DueDate DATETIME2,
    EstimatedHours DECIMAL(5,2),
    ActualHours DECIMAL(5,2),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- Learning Progress
CREATE TABLE LearningProgress (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    LearnerId INT FOREIGN KEY REFERENCES Learners(Id),
    ResourceId INT FOREIGN KEY REFERENCES LearningResources(Id),
    Progress DECIMAL(5,2) DEFAULT 0,
    LastAccessed DATETIME2,
    TimeSpent INT, -- in minutes
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT CHK_LearningProgress_Progress CHECK (Progress >= 0 AND Progress <= 100)
);

-- Indexes for better query performance
CREATE INDEX IX_Users_Email ON Users(Email);
CREATE INDEX IX_LearningResources_CategoryId ON LearningResources(CategoryId);
CREATE INDEX IX_LearningResources_ResourceTypeId ON LearningResources(ResourceTypeId);
CREATE INDEX IX_Tasks_LearnerId ON Tasks(LearnerId);
CREATE INDEX IX_Tasks_KanbanStatusId ON Tasks(KanbanStatusId);
CREATE INDEX IX_Subtasks_TaskId ON Subtasks(TaskId);
CREATE INDEX IX_Notes_LearnerId ON Notes(LearnerId);
CREATE INDEX IX_Goals_LearnerId ON Goals(LearnerId);
CREATE INDEX IX_LearningProgress_LearnerId ON LearningProgress(LearnerId);
CREATE INDEX IX_LearningProgress_ResourceId ON LearningProgress(ResourceId);

-- Full-text search indexes
CREATE FULLTEXT INDEX ON LearningResources(Title, Description) KEY INDEX PK_LearningResources ON PureLearnCatalog;
CREATE FULLTEXT INDEX ON Notes(Title, Content) KEY INDEX PK_Notes ON PureLearnCatalog;

GO

-- Triggers for UpdatedAt timestamps
CREATE TRIGGER TR_Users_UpdateTimestamp ON Users AFTER UPDATE AS
BEGIN
    UPDATE Users SET UpdatedAt = GETDATE()
    FROM Users u
    INNER JOIN inserted i ON u.Id = i.Id;
END;

GO

CREATE TRIGGER TR_Categories_UpdateTimestamp ON Categories AFTER UPDATE AS
BEGIN
    UPDATE Categories SET UpdatedAt = GETDATE()
    FROM Categories c
    INNER JOIN inserted i ON c.Id = i.Id;
END;

GO

CREATE TRIGGER TR_LearningResources_UpdateTimestamp ON LearningResources AFTER UPDATE AS
BEGIN
    UPDATE LearningResources SET UpdatedAt = GETDATE()
    FROM LearningResources lr
    INNER JOIN inserted i ON lr.Id = i.Id;
END;

GO

CREATE TRIGGER TR_Learners_UpdateTimestamp ON Learners AFTER UPDATE AS
BEGIN
    UPDATE Learners SET UpdatedAt = GETDATE()
    FROM Learners l
    INNER JOIN inserted i ON l.Id = i.Id;
END;

GO

CREATE TRIGGER TR_Goals_UpdateTimestamp ON Goals AFTER UPDATE AS
BEGIN
    UPDATE Goals SET UpdatedAt = GETDATE()
    FROM Goals g
    INNER JOIN inserted i ON g.Id = i.Id;
END;

GO

CREATE TRIGGER TR_Notes_UpdateTimestamp ON Notes AFTER UPDATE AS
BEGIN
    UPDATE Notes SET UpdatedAt = GETDATE()
    FROM Notes n
    INNER JOIN inserted i ON n.Id = i.Id;
END;

GO

CREATE TRIGGER TR_Tasks_UpdateTimestamp ON Tasks AFTER UPDATE AS
BEGIN
    UPDATE Tasks SET UpdatedAt = GETDATE()
    FROM Tasks t
    INNER JOIN inserted i ON t.Id = i.Id;
END;

GO

CREATE TRIGGER TR_Subtasks_UpdateTimestamp ON Subtasks AFTER UPDATE AS
BEGIN
    UPDATE Subtasks SET UpdatedAt = GETDATE()
    FROM Subtasks s
    INNER JOIN inserted i ON s.Id = i.Id;
END;

GO

-- Stored Procedures
CREATE PROCEDURE sp_GetLearnerProgress
    @LearnerId INT
AS
BEGIN
    SELECT 
        l.Id AS LearnerId,
        u.Email,
        COUNT(DISTINCT g.Id) AS TotalGoals,
        COUNT(DISTINCT CASE WHEN g.IsCompleted = 1 THEN g.Id END) AS CompletedGoals,
        COUNT(DISTINCT t.Id) AS TotalTasks,
        COUNT(DISTINCT CASE WHEN t.IsCompleted = 1 THEN t.Id END) AS CompletedTasks,
        SUM(lp.TimeSpent) AS TotalLearningTime
    FROM Learners l
    JOIN Users u ON l.UserId = u.Id
    LEFT JOIN Goals g ON l.Id = g.LearnerId
    LEFT JOIN Tasks t ON l.Id = t.LearnerId
    LEFT JOIN LearningProgress lp ON l.Id = lp.LearnerId
    WHERE l.Id = @LearnerId
    GROUP BY l.Id, u.Email;
END;

GO

-- Insert default data
INSERT INTO KanbanStatuses (Name, Description, Color, OrderIndex)
VALUES 
    ('To Do', 'Tasks that need to be started', '#FF0000', 1),
    ('In Progress', 'Tasks currently being worked on', '#FFA500', 2),
    ('Review', 'Tasks ready for review', '#0000FF', 3),
    ('Done', 'Completed tasks', '#008000', 4);

GO

INSERT INTO TaskTypes (Name, Description, Color)
VALUES 
    ('Learning', 'Learning-related tasks', '#4CAF50'),
    ('Practice', 'Practice and exercise tasks', '#2196F3'),
    ('Review', 'Review and revision tasks', '#FFC107'),
    ('Project', 'Project-based tasks', '#9C27B0');

GO 