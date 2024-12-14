-- Table: Learner
CREATE TABLE Learner (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    ProfilePicture NVARCHAR(MAX),
    Bio NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    LastLogin DATETIME
);

-- Table: Category
CREATE TABLE Category (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Color NVARCHAR(50) NOT NULL,
    Description NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    ParentCategoryID BIGINT NULL,
    LearnerID BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE CASCADE
);

-- Table: Goal
CREATE TABLE Goal (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Motivation NVARCHAR(MAX) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    CompletionDate DATE NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    CategoryID BIGINT NULL FOREIGN KEY REFERENCES Category(id) ON DELETE CASCADE,
    LearnerID BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE NO ACTION -- Changed to NO ACTION
);

-- Table: Subgoal
CREATE TABLE Subgoal (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    GoalID BIGINT NOT NULL FOREIGN KEY REFERENCES Goal(id) ON DELETE CASCADE
);

--Resources

-- Table: LearningResourceType
CREATE TABLE LearningResourceType (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL UNIQUE,
    UnitType NVARCHAR(255) NOT NULL UNIQUE
);

-- Table: LearningResource
CREATE TABLE LearningResource (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    TypeID BIGINT NOT NULL FOREIGN KEY REFERENCES LearningResourceType(id) ON DELETE CASCADE,
    UnitTypeID BIGINT NOT NULL FOREIGN KEY REFERENCES UnitType(id) ON DELETE CASCADE,
    TotalUnits INT NOT NULL CHECK (TotalUnits > 0),
    Progress INT NOT NULL,
    Link NVARCHAR(MAX) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    LearnerID BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE CASCADE,
    CategoryID BIGINT NULL FOREIGN KEY REFERENCES Category(id) ON DELETE NO ACTION,
    GoalID BIGINT NULL FOREIGN KEY REFERENCES Goal(id) ON DELETE NO ACTION,
    SubgoalID BIGINT NULL FOREIGN KEY REFERENCES Subgoal(id) ON DELETE NO ACTION,
    CONSTRAINT CHK_Progress CHECK (Progress >= 0 AND Progress <= TotalUnits)
);

-- Table: KanbanStatus
CREATE TABLE KanbanStatus (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL UNIQUE,
    MaxTasks INT NULL CHECK (MaxTasks > 0)
);
-- Table: TaskType
 CREATE TABLE TaskType (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL UNIQUE,
    Description NVARCHAR(500),
    Icon VARBINARY(MAX) NULL,
 )


-- Table: Task
CREATE TABLE Task (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(100) NOT NULL,
    Type NVARCHAR(100) NOT NULL,
    KanbanStatusID BIGINT NOT NULL FOREIGN KEY REFERENCES KanbanStatus(id) ON DELETE CASCADE,
    EisenhowerStatus NVARCHAR(50) NOT NULL CHECK (EisenhowerStatus IN ('Urgent & Important', 'Not Urgent but Important', 'Urgent but Not Important', 'Not Urgent & Not Important')),
    TimeTaskRelated NVARCHAR(50) NOT NULL CHECK (TimeTaskRelated IN ('Today', 'Tomorrow', 'This Week', 'Someday')),
    DueDate DATE NULL,
    EstimatedTime TIME NULL,
    TimeSpent TIME NULL,

    -- Repeat frequency: Daily, Weekly, Monthly, Annually, Custom
    RepeatFrequency NVARCHAR(50) NOT NULL CHECK (RepeatFrequency IN ('None', 'Daily', 'Weekly', 'Monthly', 'Annually', 'Custom')),

    -- For custom frequency (every # of days, weeks, months, or years)
    RepeatInterval INT NULL,  -- Number of units for custom frequency (e.g., 2 for every 2 weeks)

    -- Repeat on specific days of the week (for Weekly or Custom frequency)
    RepeatOnSUNDAY BIT DEFAULT 0,   -- Sunday
    RepeatOnMONDAY BIT DEFAULT 0,   -- Monday
    RepeatOnTUESDAY BIT DEFAULT 0,  -- Tuesday
    RepeatOnWEDNESDAY BIT DEFAULT 0, -- Wednesday
    RepeatOnTHURSDAY BIT DEFAULT 0,  -- Thursday
    RepeatOnFRIDAY BIT DEFAULT 0,   -- Friday
    RepeatOnSATURDAY BIT DEFAULT 0, -- Saturday

    -- End condition for recurrence
    RepeatEnds NVARCHAR(50) NOT NULL CHECK (RepeatEnds IN ('Never', 'On Date', 'After Occurrences')),
    RepeatEndDate DATE NULL,  -- If RepeatEnds = 'On Date', store the end date
    RepeatEndOccurrences INT NULL,  -- If RepeatEnds = 'After Occurrences', store the number of repetitions

    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),

    LearnerID BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE CASCADE,
    CategoryID BIGINT NULL FOREIGN KEY REFERENCES Category(id) ON DELETE NO ACTION,
    GoalID BIGINT NULL FOREIGN KEY REFERENCES Goal(id) ON DELETE NO ACTION,
    SubgoalID BIGINT NULL FOREIGN KEY REFERENCES Subgoal(id) ON DELETE NO ACTION, 
    LearningResourceID BIGINT NULL FOREIGN KEY REFERENCES LearningResource(id) ON DELETE NO ACTION
);


-- Table: Subtask
CREATE TABLE Subtask (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Status NVARCHAR(50) NOT NULL CHECK (Status IN ('Not Started', 'In Progress', 'Completed')),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    TaskID BIGINT NOT NULL FOREIGN KEY REFERENCES Task(id) ON DELETE CASCADE
);

-- Table: Note
CREATE TABLE Note (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Body NVARCHAR(MAX) NOT NULL, 
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    CategoryID BIGINT NULL FOREIGN KEY REFERENCES Category(id) ON DELETE NO ACTION,
    GoalID BIGINT NULL FOREIGN KEY REFERENCES Goal(id) ON DELETE NO ACTION,
    SubgoalID BIGINT NULL FOREIGN KEY REFERENCES Subgoal(id) ON DELETE NO ACTION,
    TaskID BIGINT NULL FOREIGN KEY REFERENCES Task(id) ON DELETE NO ACTION,
    LearnerID BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE CASCADE
);

-- Step 4: Create indexes for performance optimization

-- Index on Learner's Email for faster lookups
CREATE INDEX idx_email ON Learner (Email);
GO

-- Index on Task KanbanStatusID for faster status-based queries
CREATE INDEX idx_task_kanbanstatus ON Task (KanbanStatusID);
GO

-- Index on Goal's LearnerID for faster queries by learner
CREATE INDEX idx_goal_learner_id ON Goal (LearnerID);
GO

-- Index on LearningResource CategoryID for faster filtering by category
CREATE INDEX idx_LearningResource_category_id ON LearningResource (CategoryID);
GO

-- Step 5: Create triggers for auto-updating UpdatedAt timestamps

-- Trigger for auto-updating `UpdatedAt` on Learner table
CREATE TRIGGER trg_UpdateLearnerUpdatedAt
ON Learner
FOR UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Learner
    SET UpdatedAt = GETDATE()
    WHERE id IN (SELECT id FROM inserted);
END;
GO

-- Trigger for auto-updating `UpdatedAt` on Category table
CREATE TRIGGER trg_UpdateCategoryUpdatedAt
ON Category
FOR UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Category
    SET UpdatedAt = GETDATE()
    WHERE id IN (SELECT id FROM inserted);
END;
GO

-- Trigger for auto-updating `UpdatedAt` on Goal table
CREATE TRIGGER trg_UpdateGoalUpdatedAt
ON Goal
FOR UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Goal
    SET UpdatedAt = GETDATE()
    WHERE id IN (SELECT id FROM inserted);
END;
GO

-- Trigger for auto-updating `UpdatedAt` on Subgoal table
CREATE TRIGGER trg_UpdateSubgoalUpdatedAt
ON Subgoal
FOR UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Subgoal
    SET UpdatedAt = GETDATE()
    WHERE id IN (SELECT id FROM inserted);
END;
GO

-- Trigger for auto-updating `UpdatedAt` on LearningResource table
CREATE TRIGGER trg_UpdateLearningResourceUpdatedAt
ON LearningResource
FOR UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE LearningResource
    SET UpdatedAt = GETDATE()
    WHERE id IN (SELECT id FROM inserted);
END;
GO

-- Trigger for auto-updating `UpdatedAt` on Task table
CREATE TRIGGER trg_UpdateTaskUpdatedAt
ON Task
FOR UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Task
    SET UpdatedAt = GETDATE()
    WHERE id IN (SELECT id FROM inserted);
END;
GO

-- Trigger for auto-updating `UpdatedAt` on Subtask table
CREATE TRIGGER trg_UpdateSubtaskUpdatedAt
ON Subtask
FOR UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Subtask
    SET UpdatedAt = GETDATE()
    WHERE id IN (SELECT id FROM inserted);
END;
GO

-- Trigger for auto-updating `UpdatedAt` on Note table
CREATE TRIGGER trg_UpdateNoteUpdatedAt
ON Note
FOR UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Note
    SET UpdatedAt = GETDATE()
    WHERE id IN (SELECT id FROM inserted);
END;
GO




-- Populate DB 
-- Insert into Learner
INSERT INTO Learner (Name, Email, PasswordHash, ProfilePicture, Bio, LastLogin)
VALUES 
('John Doe', 'john.doe@example.com', 'hashedpassword1', NULL, 'A passionate learner.', GETDATE()),
('Jane Smith', 'jane.smith@example.com', 'hashedpassword2', NULL, 'Loves to explore new things.', GETDATE());

-- Insert into Category
INSERT INTO Category (Title, Color, Description, ParentCategoryID, LearnerID)
VALUES 
('Programming', '#FF5733', 'All about coding and software development.', NULL, 1),
('Design', '#33FF57', 'Graphic and UI/UX design.', NULL, 2);

-- Insert into Goal
INSERT INTO Goal (Title, Description, Motivation, Status, CompletionDate, CategoryID, LearnerID)
VALUES 
('Learn Python', 'Complete a Python course.', 'To automate tasks.', 'In Progress', NULL, 1, 1),
('Master Photoshop', 'Become proficient in Photoshop.', 'To enhance design skills.', 'Not Started', NULL, 2, 2);

-- Insert into Subgoal
INSERT INTO Subgoal (Title, Description, Status, GoalID)
VALUES 
('Complete Python Basics', 'Finish the basics module.', 'In Progress', 1),
('Learn Layers in Photoshop', 'Understand how to use layers effectively.', 'Not Started', 2);

-- Insert into LearningResourceType
INSERT INTO LearningResourceType (Name)
VALUES 
('Book'),
('Online Course');

-- Insert into UnitType
INSERT INTO UnitType (Name)
VALUES 
('Chapter'),
('Module');

-- Insert into LearningResource
INSERT INTO LearningResource (Title, TypeID, UnitTypeID, TotalUnits, Progress, Link, LearnerID, CategoryID, GoalID, SubgoalID)
VALUES 
('Automate the Boring Stuff with Python', 1, 1, 12, 3, 'http://example.com/python-book', 1, 1, 1, 1),
('Photoshop for Beginners', 2, 2, 10, 0, 'http://example.com/photoshop-course', 2, 2, 2, 2);

-- Insert into KanbanStatus
INSERT INTO KanbanStatus (Name)
VALUES 
('To Do'),
('In Progress'),
('Done');

-- Insert into Task
INSERT INTO Task (Title, KanbanStatusID, EisenhowerStatus, TimeTaskRelated, DueDate, EstimatedTime, TimeSpent, LearnerID, CategoryID, GoalID, SubgoalID, LearningResourceID)
VALUES 
('Read Chapter 1', 2, 'Urgent & Important', 'Today', GETDATE() + 1, '01:00:00', '00:30:00', 1, 1, 1, 1, 1),
('Watch Photoshop Intro', 1, 'Not Urgent but Important', 'This Week', GETDATE() + 7, '02:00:00', NULL, 2, 2, 2, 2, 2);

-- Insert into Subtask
INSERT INTO Subtask (Title, Status, TaskID)
VALUES 
('Read Introduction', 'In Progress', 1),
('Set up Photoshop', 'Not Started', 2);

-- Insert into Note
INSERT INTO Note (Title, Body, CategoryID, GoalID, SubgoalID, TaskID, LearnerID)
VALUES 
('Python Tips', 'Remember to use list comprehensions.', 1, 1, 1, 1, 1),
('Design Inspiration', 'Check out the latest design trends.', 2, 2, 2, 2, 2);