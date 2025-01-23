-- Creating Tables
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

    -- Table: Category -> Parent Child Relationship
        CREATE TABLE Category (
            id BIGINT PRIMARY KEY IDENTITY(1,1),
            Title NVARCHAR(255) NOT NULL,
            Color NVARCHAR(50) NOT NULL,
            Description NVARCHAR(MAX),
            CreatedAt DATETIME DEFAULT GETDATE(),
            UpdatedAt DATETIME DEFAULT GETDATE(),
            ParentCategoryID BIGINT NULL,
            LearnerID BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE CASCADE,
            FOREIGN KEY (ParentCategoryID) REFERENCES Category(id) ON DELETE NO ACTION -- for childs
        );

    -- Goal & Subgoal tables
        CREATE TABLE Goal (
            id BIGINT PRIMARY KEY IDENTITY(1,1),
            Title NVARCHAR(255) NOT NULL,
            Description NVARCHAR(MAX) NOT NULL,
            Motivation NVARCHAR(MAX) NOT NULL,
            Term NVARCHAR(50) NOT NULL CHECK (Term IN ('Long-Term', 'Medium-Term', 'Short-Term')), 
            Status NVARCHAR(50) NOT NULL CHECK (Status IN ('Not-Started', 'In-Progress', 'On-Hold', 'Done', 'Canceled')), -- Restricted values for Status
            CompletionDate DATE NULL,
            CreatedAt DATETIME DEFAULT GETDATE(),
            UpdatedAt DATETIME DEFAULT GETDATE(),
            CategoryID BIGINT NULL FOREIGN KEY REFERENCES Category(id) ON DELETE CASCADE,
            LearnerID BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE NO ACTION -- Learner reference
        );


        CREATE TABLE Subgoal (
                    id BIGINT PRIMARY KEY IDENTITY(1,1),
                    Title NVARCHAR(255) NOT NULL,
                    Description NVARCHAR(MAX) NOT NULL,
                    Status NVARCHAR(50) NOT NULL,
                    CreatedAt DATETIME DEFAULT GETDATE(),
                    UpdatedAt DATETIME DEFAULT GETDATE(),
                    GoalID BIGINT NOT NULL FOREIGN KEY REFERENCES Goal(id) ON DELETE CASCADE
                );

    -- Learning Resources Tables

        -- Table: LearningResourceType
        CREATE TABLE LearningResourceType (
            id BIGINT PRIMARY KEY IDENTITY(1,1),
            Name NVARCHAR(255) NOT NULL UNIQUE,
            UnitType NVARCHAR(255) NOT NULL UNIQUE,
            LearnerID BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE NO ACTION
        );

        -- Table: LearningResource
        CREATE TABLE LearningResource (
            id BIGINT PRIMARY KEY IDENTITY(1,1),
            Title NVARCHAR(255) NOT NULL,
            TypeID BIGINT NOT NULL FOREIGN KEY REFERENCES LearningResourceType(id) ON DELETE CASCADE,
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

    -- Tasks & Subtasks Tables
        -- Table: KanbanStatus
        CREATE TABLE KanbanStatus (
            id BIGINT PRIMARY KEY IDENTITY(1,1),
            Name NVARCHAR(255) NOT NULL UNIQUE,
            MaxTasks INT NULL CHECK (MaxTasks > 0),
            LearnerID BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE NO ACTION,
        );
        -- Table: TaskType
        CREATE TABLE TaskType (
            id BIGINT PRIMARY KEY IDENTITY(1,1),
            Name NVARCHAR(255) NOT NULL UNIQUE,
            Description NVARCHAR(500),
            Icon VARBINARY(MAX) NULL,
            LearnerID BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE NO ACTION
        )

        -- Table: Task
        CREATE TABLE Task (
            id BIGINT PRIMARY KEY IDENTITY(1,1),
            Title NVARCHAR(100) NOT NULL,
            TypeID BIGINT NOT NULL REFERENCES TaskType(id) ON DELETE CASCADE,            
            KanbanStatusID BIGINT NOT NULL FOREIGN KEY REFERENCES KanbanStatus(id) ON DELETE CASCADE,
            EisenhowerStatus NVARCHAR(50) NOT NULL CHECK (EisenhowerStatus IN ('Urgent & Important', 'Not Urgent but Important', 'Urgent but Not Important', 'Not Urgent & Not Important')),
            TimeTaskRelated NVARCHAR(50) NOT NULL CHECK (TimeTaskRelated IN ('Today', 'Tomorrow', 'This Week', 'Someday')),
            DueDate DATE NULL,
            EstimatedTime TIME NULL,
            TimeSpent TIME NULL,

            -- Repeat frequency: Daily, Weekly, Monthly, Annually, Custom
            RepeatFrequency NVARCHAR(50) NOT NULL DEFAULT 'None' CHECK (RepeatFrequency IN ('None', 'Daily', 'Weekly', 'Monthly', 'Annually', 'Custom')),   
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
            RepeatEnds NVARCHAR(50) NULL CHECK (RepeatEnds IN ('Never', 'On Date', 'After Occurrences')),
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

-- Indexes for performance optimization

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

--Triggers for auto-updating UpdatedAt timestamps

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

    -- Insert learners into the Learner table
            insert into
            learner (name, email, passwordhash, bio)
            values
            (
                'Ahmed Ibrahim',
                'Gemax.hope@gmail.com',
                'Ww123@123',
                'Team Lead\nProduct Owner\nScrum Master\nSoftware Engineer\nDB Engineer\nFront-End developer (React)'
            ),
            (
                'Fatema Emara',
                'fatemaemara133@gmail.com',
                'Ww123@123',
                'Team Lead\nAndroid developer'
            ),
            (
                'Alaa Khalid',
                'alaakhalid227@gmail.com',
                'Ww123@123',
                'Team Lead\nFront-End developer (React)'
            ),
            (
                'Ibrahem Syam',
                'ibrahemsyam19@gmail.com',
                'Ww123@123',
                'Front-End developer (React)'
            ),
            (
                'Noran Ahmed',
                'nora200336@gmail.com',
                'Ww123@123',
                'Back-End Developer (ASP.Net)'
            ),
            (
                'Youssef Rajander',
                'youssefdid8@gmail.com',
                'Ww123@123',
                'Back-End Developer (ASP.Net)'
            ),
            (
                'Salma El-Sayed',
                'salma.elsayed.karam.2003@gmail.com',
                'Ww123@123',
                'AI'
            ),
            (
                'Amal Tarek',
                'amaltarek631@gmail.com',
                'Ww123@123',
                'Front-End developer (React)'
            );
        
    -- Insert into Category
        INSERT INTO Category (Title, Color, Description, LearnerID) VALUES
        ('Software Development', '#FF5733', 'All about software development', 1),
        ('Project Management', '#33FF57', 'Managing projects effectively', 2),
        ('AI Research', '#3357FF', 'Research in AI technologies', 7);

    -- Insert into Goal
        INSERT INTO Goal (Title, Description, Motivation, Status, LearnerID, CategoryID) VALUES
        ('Complete React Course', 'Finish the advanced React course', 'To improve front-end skills', 'In Progress', 1, 1),
        ('Launch Mobile App', 'Develop and launch the new mobile app', 'To expand market reach', 'Not Started', 2, 2);

    -- Insert into Subgoal
        INSERT INTO Subgoal (Title, Description, Status, GoalID) VALUES
        ('Learn React Hooks', 'Understand and implement React Hooks', 'In Progress', 1),
        ('Design App UI', 'Create the UI design for the mobile app', 'Not Started', 2);

    -- Insert into LearningResourceType
        INSERT INTO LearningResourceType (Name, UnitType) VALUES
        ('Online Course', 'Hours'),
        ('Book', 'Pages');

    -- Insert into LearningResource
        INSERT INTO LearningResource (Title, TypeID, TotalUnits, Progress, LearnerID, CategoryID) VALUES
        ('React for Beginners', 1, 20, 5, 1, 1),
        ('AI: A Modern Approach', 2, 1000, 200, 7, 3);

    -- Insert into KanbanStatus
        INSERT INTO KanbanStatus (Name, MaxTasks) VALUES
        ('To Do', 10),
        ('In Progress', 5),
        ('Completed', NULL);

    -- Insert into TaskType
        INSERT INTO TaskType (Name, Description) VALUES
        ('Development', 'Tasks related to software development'),
        ('Research', 'Tasks related to research activities');

    -- Insert into Task
        INSERT INTO Task (Title, TypeID, KanbanStatusID, EisenhowerStatus, TimeTaskRelated, RepeatFrequency, RepeatEnds, LearnerID) VALUES
        ('Finish React Project', 1, 2, 'Urgent & Important', 'Today', 'None', NULL, 1),
        ('Prepare AI Presentation', 2, 1, 'Not Urgent but Important', 'This Week', 'None', NULL, 7);

    -- Insert into Subtask
        INSERT INTO Subtask (Title, Status, TaskID) VALUES
        ('Implement Redux', 'In Progress', 1),
        ('Create Slides', 'Not Started', 2);

    -- Insert into Note
        INSERT INTO Note (Title, Body, LearnerID, CategoryID) VALUES
        ('React Tips', 'Remember to use functional components.', 1, 1),
        ('AI Trends', 'Explore the latest trends in AI.', 7, 3);

-- !!!! Clear DB !!!!!
        -- Clear data from Subtask table
    DELETE FROM Subtask;

    -- Clear data from Task table
    DELETE FROM Task;

    -- Clear data from Note table
    DELETE FROM Note;

    -- Clear data from LearningResource table
    DELETE FROM LearningResource;

    -- Clear data from LearningResourceType table
    DELETE FROM LearningResourceType;

    -- Clear data from Subgoal table
    DELETE FROM Subgoal;

    -- Clear data from Goal table
    DELETE FROM Goal;

    -- Clear data from Category table
    DELETE FROM Category;

    -- Clear data from Learner table
    DELETE FROM Learner;

