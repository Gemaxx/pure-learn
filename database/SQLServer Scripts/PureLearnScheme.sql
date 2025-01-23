--Convert Tables into Models using "Database-First Aproach" 
    --=> command “dotnet ef dbcontext scaffold "Name=DefaultConnection" Microsoft.EntityFrameworkCore.SqlServer -o Models”

-- dotnet ef dbcontext scaffold "Name=DefaultConnection" Microsoft.EntityFrameworkCore.SqlServer --output-dir Models --context-dir Data --context ApplicationDbContext --force

-- Creating Tables
    -- Table: Learner
    CREATE TABLE Learner (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL UNIQUE,
        password_hash NVARCHAR(255) NOT NULL,
        profile_picture NVARCHAR(MAX),
        bio NVARCHAR(MAX),
        
    CREATEd_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        last_login DATETIME2,
        deleted_at DATETIME2 NULL 
    );

    -- Table: Category -> Parent Child Relationship

    CREATE TABLE Category (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255) NOT NULL,
        color NVARCHAR(50) NOT NULL,
        description NVARCHAR(MAX),
        CREATEd_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        parent_category_id BIGINT NULL,
        learner_id BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE CASCADE,
        deleted_at DATETIME2 NULL, 
        FOREIGN KEY (parent_category_id) REFERENCES Category(id) ON DELETE NO ACTION
    );

    -- Goal & Subgoal tables
    CREATE TABLE Goal (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255) NOT NULL,
        description NVARCHAR(MAX) NOT NULL,
        motivation NVARCHAR(MAX) NOT NULL,
        term NVARCHAR(50) NOT NULL CHECK (term IN ('Long-Term', 'Medium-Term', 'Short-Term')), 
        status NVARCHAR(50) NOT NULL CHECK (status IN ('Not-Started', 'In-Progress', 'On-Hold', 'Done', 'Canceled')),
        completion_date DATE NULL,
    CREATEd_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        category_id BIGINT NULL FOREIGN KEY REFERENCES Category(id) ON DELETE CASCADE,
        learner_id BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE NO ACTION,
        deleted_at DATETIME2 NULL 
    );


    CREATE TABLE Subgoal (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255) NOT NULL,
        description NVARCHAR(MAX) NOT NULL,
        status NVARCHAR(50) NOT NULL,
        CREATEd_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        goal_id BIGINT NOT NULL FOREIGN KEY REFERENCES Goal(id) ON DELETE CASCADE,
        deleted_at DATETIME2 NULL 
    );

    -- Learning Resources Tables

    -- Table: LearningResourceType

    CREATE TABLE LearningResourceType (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL UNIQUE,
        unit_type NVARCHAR(255) NOT NULL UNIQUE,
        learner_id BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE NO ACTION,
        deleted_at DATETIME2 NULL 
    );

    -- Table: LearningResource

    CREATE TABLE LearningResource (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255) NOT NULL,
        type_id BIGINT NOT NULL FOREIGN KEY REFERENCES LearningResourceType(id) ON DELETE CASCADE,
        total_units INT NOT NULL CHECK (total_units > 0),
        progress INT NOT NULL,
        link NVARCHAR(MAX) NULL,
        CREATEd_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        learner_id BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE CASCADE,
        category_id BIGINT NULL FOREIGN KEY REFERENCES Category(id) ON DELETE NO ACTION,
        goal_id BIGINT NULL FOREIGN KEY REFERENCES Goal(id) ON DELETE NO ACTION,
        subgoal_id BIGINT NULL FOREIGN KEY REFERENCES Subgoal(id) ON DELETE NO ACTION,
        deleted_at DATETIME2 NULL, 
        CONSTRAINT CHK_Progress CHECK (progress >= 0 AND progress <= total_units)
    );

    -- Tasks & Subtasks Tables
    -- Table: KanbanStatus
    CREATE TABLE KanbanStatus (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL UNIQUE,
        max_tasks INT NULL CHECK (max_tasks > 0),
        learner_id BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE NO ACTION,
        deleted_at DATETIME2 NULL 
    );

    -- Table: TaskType
    CREATE TABLE TaskType (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL UNIQUE,
        description NVARCHAR(500),
        icon VARBINARY(MAX) NULL,
        learner_id BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE NO ACTION,
        deleted_at DATETIME2 NULL 
    );

    -- Table: Task
    CREATE TABLE Task (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(100) NOT NULL,
        type_id BIGINT NOT NULL REFERENCES TaskType(id) ON DELETE CASCADE,            
        kanban_status_id BIGINT NOT NULL FOREIGN KEY REFERENCES KanbanStatus(id) ON DELETE CASCADE,
        eisenhower_status NVARCHAR(50) NOT NULL CHECK (eisenhower_status IN ('Urgent & Important', 'Not Urgent but Important', 'Urgent but Not Important', 'Not Urgent & Not Important')),
        time_task_related NVARCHAR(50) NOT NULL CHECK (time_task_related IN ('Today', 'Tomorrow', 'This Week', 'Someday')),
        due_date DATE NULL,
        estimated_time TIME NULL,
        time_spent TIME NULL,
        repeat_frequency NVARCHAR(50) NOT NULL DEFAULT 'None' CHECK (repeat_frequency IN ('None', 'Daily', 'Weekly', 'Monthly', 'Annually', 'Custom')),   
        repeat_interval INT NULL,
        repeat_on_sunday BIT DEFAULT 0,
        repeat_on_monday BIT DEFAULT 0,
        repeat_on_tuesday BIT DEFAULT 0,
        repeat_on_wednesday BIT DEFAULT 0,
        repeat_on_thursday BIT DEFAULT 0,
        repeat_on_friday BIT DEFAULT 0,
        repeat_on_saturday BIT DEFAULT 0,
        repeat_ends NVARCHAR(50) NULL CHECK (repeat_ends IN ('Never', 'On Date', 'After Occurrences')),
        repeat_end_date DATE NULL,
        repeat_end_occurrences INT NULL,
        CREATEd_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        learner_id BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE CASCADE,
        category_id BIGINT NULL FOREIGN KEY REFERENCES Category(id) ON DELETE NO ACTION,
        goal_id BIGINT NULL FOREIGN KEY REFERENCES Goal(id) ON DELETE NO ACTION,
        subgoal_id BIGINT NULL FOREIGN KEY REFERENCES Subgoal(id) ON DELETE NO ACTION, 
        learning_resource_id BIGINT NULL FOREIGN KEY REFERENCES LearningResource(id) ON DELETE NO ACTION,
        deleted_at DATETIME2 NULL 
    );

    -- Table: Subtask

    CREATE TABLE Subtask (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255) NOT NULL,
        status NVARCHAR(50) NOT NULL CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
        CREATEd_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        task_id BIGINT NOT NULL FOREIGN KEY REFERENCES Task(id) ON DELETE CASCADE,
        deleted_at DATETIME2 NULL 
    );

    -- Table: Note

    CREATE TABLE Note (
        id BIGINT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255) NOT NULL,
        body NVARCHAR(MAX) NOT NULL, 
        CREATEd_at DATETIME2 DEFAULT SYSDATETIME(),
        updated_at DATETIME2 DEFAULT SYSDATETIME(),
        category_id BIGINT NULL FOREIGN KEY REFERENCES Category(id) ON DELETE NO ACTION,
        goal_id BIGINT NULL FOREIGN KEY REFERENCES Goal(id) ON DELETE NO ACTION,
        subgoal_id BIGINT NULL FOREIGN KEY REFERENCES Subgoal(id) ON DELETE NO ACTION,
        task_id BIGINT NULL FOREIGN KEY REFERENCES Task(id) ON DELETE NO ACTION,
        learner_id BIGINT NOT NULL FOREIGN KEY REFERENCES Learner(id) ON DELETE CASCADE,
        deleted_at DATETIME2 NULL 
    );


-- Triggers

    -- Trigger to Update `updated_at` for Learner
    GO
    CREATE TRIGGER trg_update_learner_updated_at
    ON Learner
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE Learner
        SET updated_at = SYSDATETIME()
        WHERE id IN (SELECT id FROM inserted);
    END;
    GO

    -- Trigger to Update `updated_at` for Category

    GO
    CREATE TRIGGER trg_update_category_updated_at
    ON Category
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE Category
        SET updated_at = SYSDATETIME()
        WHERE id IN (SELECT id FROM inserted);
    END;

    -- Trigger to Update `updated_at` for Goal
    GO
    CREATE TRIGGER trg_update_goal_updated_at
    ON Goal
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE Goal
        SET updated_at = SYSDATETIME()
        WHERE id IN (SELECT id FROM inserted);
    END;

    -- Trigger to Update `updated_at` for Subgoal
    GO
    CREATE TRIGGER trg_update_subgoal_updated_at
    ON Subgoal
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE Subgoal
        SET updated_at = SYSDATETIME()
        WHERE id IN (SELECT id FROM inserted);
    END;

    -- Trigger to Update `updated_at` for LearningResource
    GO
    CREATE TRIGGER trg_update_learningresource_updated_at
    ON LearningResource
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE LearningResource
        SET updated_at = SYSDATETIME()
        WHERE id IN (SELECT id FROM inserted);
    END;

    -- Trigger to Update `updated_at` for Task
    GO
    CREATE TRIGGER trg_update_task_updated_at
    ON Task
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE Task
        SET updated_at = SYSDATETIME()
        WHERE id IN (SELECT id FROM inserted);
    END;

    -- Trigger to Update `updated_at` for Subtask
    GO
    CREATE TRIGGER trg_update_subtask_updated_at
    ON Subtask
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE Subtask
        SET updated_at = SYSDATETIME()
        WHERE id IN (SELECT id FROM inserted);
    END;

    -- Trigger to Update `updated_at` for Note
    GO
    CREATE TRIGGER trg_update_note_updated_at
    ON Note
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE Note
        SET updated_at = SYSDATETIME()
        WHERE id IN (SELECT id FROM inserted);
    END;

    -- Trigger for Soft Deletion Cascade on Category
    GO
    CREATE TRIGGER trg_soft_delete_category 
    ON Category
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE Goal
        SET deleted_at = SYSDATETIME()
        WHERE category_id IN (SELECT id FROM inserted WHERE deleted_at IS NOT NULL);
    END;

    -- Trigger for Soft Deletion Cascade on Goal
    GO
    CREATE TRIGGER trg_soft_delete_goal
    ON Goal
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE Subgoal
        SET deleted_at = SYSDATETIME()
        WHERE goal_id IN (SELECT id FROM inserted WHERE deleted_at IS NOT NULL);
    END;

    -- Trigger for Soft Deletion Cascade on Task
    GO
    CREATE TRIGGER trg_soft_delete_task
    ON Task
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE Subtask
        SET deleted_at = SYSDATETIME()
        WHERE task_id IN (SELECT id FROM inserted WHERE deleted_at IS NOT NULL);
    END;

    -- Trigger to Validate `time_spent` in Task
    GO
    CREATE TRIGGER trg_validate_task_time_spent
    ON Task
    AFTER INSERT, UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        IF EXISTS (
            SELECT 1
            FROM inserted
            WHERE time_spent > estimated_time
        )
        BEGIN
            RAISERROR ('Time spent cannot be greater than estimated time.', 16, 1);
            ROLLBACK TRANSACTION;
        END
    END;

    -- Trigger to Validate `repeat_end_date` in Task
    GO
    CREATE TRIGGER trg_validate_task_repeat_end_date
    ON Task
    AFTER INSERT, UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        IF EXISTS (
            SELECT 1
            FROM inserted
            WHERE repeat_end_date IS NOT NULL AND repeat_end_date <= created_at
        )
        BEGIN
            RAISERROR ('Repeat end date must be after the creation date.', 16, 1);
            ROLLBACK TRANSACTION;
        END;
    END;


-- Indexes

    -- Index for Category table on learner_id to speed up joins with Learner
    CREATE INDEX idx_category_learner_id ON Category(learner_id);

    -- Index for Category table on parent_category_id to speed up self-joins
    CREATE INDEX idx_category_parent_category_id ON Category(parent_category_id);

    -- Index for Goal table on category_id to speed up joins with Category
    CREATE INDEX idx_goal_category_id ON Goal(category_id);

    -- Index for Goal table on learner_id to speed up joins with Learner
    CREATE INDEX idx_goal_learner_id ON Goal(learner_id);

    -- Index for Subgoal table on goal_id to speed up joins with Goal
    CREATE INDEX idx_subgoal_goal_id ON Subgoal(goal_id);

    -- Index for LearningResourceType table on learner_id to speed up joins with Learner
    CREATE INDEX idx_learningresourcetype_learner_id ON LearningResourceType(learner_id);

    -- Index for LearningResource table on type_id to speed up joins with LearningResourceType
    CREATE INDEX idx_learningresource_type_id ON LearningResource(type_id);

    -- Index for LearningResource table on learner_id to speed up joins with Learner
    CREATE INDEX idx_learningresource_learner_id ON LearningResource(learner_id);

    -- Index for LearningResource table on category_id to speed up joins with Category
    CREATE INDEX idx_learningresource_category_id ON LearningResource(category_id);

    -- Index for LearningResource table on goal_id to speed up joins with Goal
    CREATE INDEX idx_learningresource_goal_id ON LearningResource(goal_id);

    -- Index for LearningResource table on subgoal_id to speed up joins with Subgoal
    CREATE INDEX idx_learningresource_subgoal_id ON LearningResource(subgoal_id);

    -- Index for KanbanStatus table on learner_id to speed up joins with Learner
    CREATE INDEX idx_kanbanstatus_learner_id ON KanbanStatus(learner_id);

    -- Index for TaskType table on learner_id to speed up joins with Learner
    CREATE INDEX idx_tasktype_learner_id ON TaskType(learner_id);

    -- Index for Task table on type_id to speed up joins with TaskType
    CREATE INDEX idx_task_type_id ON Task(type_id);

    -- Index for Task table on kanban_status_id to speed up joins with KanbanStatus
    CREATE INDEX idx_task_kanban_status_id ON Task(kanban_status_id);

    -- Index for Task table on learner_id to speed up joins with Learner
    CREATE INDEX idx_task_learner_id ON Task(learner_id);

    -- Index for Task table on category_id to speed up joins with Category
    CREATE INDEX idx_task_category_id ON Task(category_id);

    -- Index for Task table on goal_id to speed up joins with Goal
    CREATE INDEX idx_task_goal_id ON Task(goal_id);

    -- Index for Task table on subgoal_id to speed up joins with Subgoal
    CREATE INDEX idx_task_subgoal_id ON Task(subgoal_id);

    -- Index for Task table on learning_resource_id to speed up joins with LearningResource
    CREATE INDEX idx_task_learning_resource_id ON Task(learning_resource_id);

    -- Index for Subtask table on task_id to speed up joins with Task
    CREATE INDEX idx_subtask_task_id ON Subtask(task_id);

    -- Index for Note table on category_id to speed up joins with Category
    CREATE INDEX idx_note_category_id ON Note(category_id);

    -- Index for Note table on goal_id to speed up joins with Goal
    CREATE INDEX idx_note_goal_id ON Note(goal_id);

    -- Index for Note table on subgoal_id to speed up joins with Subgoal
    CREATE INDEX idx_note_subgoal_id ON Note(subgoal_id);

    -- Index for Note table on task_id to speed up joins with Task
    CREATE INDEX idx_note_task_id ON Note(task_id);

    -- Index for Note table on learner_id to speed up joins with Learner
    CREATE INDEX idx_note_learner_id ON Note(learner_id);


-- DB Populating

   -- Insert Learners
        INSERT INTO Learner (name, email, password_hash, bio)
        VALUES
            ('Ahmed Ibrahim', 'Gemax.hope@gmail.com', 'Ww123@123', 'Team Lead\nProduct Owner\nScrum Master\nSoftware Engineer\nDB Engineer\nFront-End developer (React)'),
            ('Fatema Emara', 'fatemaemara133@gmail.com', 'Ww123@123', 'Team Lead\nAndroid developer'),
            ('Alaa Khalid', 'alaakhalid227@gmail.com', 'Ww123@123', 'Team Lead\nFront-End developer (React)'),
            ('Ibrahem Syam', 'ibrahemsyam19@gmail.com', 'Ww123@123', 'Front-End developer (React)'),
            ('Noran Ahmed', 'nora200336@gmail.com', 'Ww123@123', 'Back-End Developer (ASP.Net)'),
            ('Youssef Rajander', 'youssefdid8@gmail.com', 'Ww123@123', 'Back-End Developer (ASP.Net)'),
            ('Salma El-Sayed', 'salma.elsayed.karam.2003@gmail.com', 'Ww123@123', 'AI Specialist'),
            ('Amal Tarek', 'amaltarek631@gmail.com', 'Ww123@123', 'Front-End developer (React)');

        -- Insert Categories
        INSERT INTO Category (title, color, description, learner_id)
        VALUES
            ('Web Development', '#FF5733', 'All about web technologies', 1),
            ('Mobile Development', '#33FF57', 'Creating mobile applications', 2),
            ('Data Science', '#3357FF', 'Data analysis and machine learning', 7),
            ('Project Management', '#FF33A1', 'Managing projects effectively', 1);

        -- Insert Goals
        INSERT INTO Goal (title, description, motivation, term, status, learner_id)
        VALUES
            ('Learn React', 'Become proficient in React.js', 'To build modern web applications', 'Short-Term', 'In-Progress', 1),
            ('Master Android Development', 'Develop advanced Android apps', 'Career advancement', 'Long-Term', 'Not-Started', 2),
            ('Data Science Certification', 'Get certified in data science', 'To enhance data skills', 'Medium-Term', 'On-Hold', 7);

        -- Insert Subgoals
        INSERT INTO Subgoal (title, description, status, goal_id)
        VALUES
            ('Complete React Basics', 'Finish the basics of React', 'In Progress', 1),
            ('Build a Portfolio App', 'Create a portfolio app using React', 'Not Started', 1),
            ('Learn Kotlin', 'Understand the basics of Kotlin for Android', 'Not Started', 2);

        -- Insert Learning Resource Types
        INSERT INTO LearningResourceType (name, unit_type, learner_id)
        VALUES
            ('Video Course', 'Hours', 1),
            ('Book', 'Pages', 2),
            ('Online Article', 'Words', 3);

        -- Insert Learning Resources
        INSERT INTO LearningResource (title, type_id, total_units, progress, learner_id)
        VALUES
            ('React for Beginners', 1, 10, 3, 1),
            ('Android Programming', 2, 300, 50, 2),
            ('Introduction to Data Science', 3, 5000, 1000, 7);

        -- Insert Kanban Statuses
        INSERT INTO KanbanStatus (name, max_tasks, learner_id)
        VALUES
            ('To Do', 10, 1),
            ('In Progress', 5, 1),
            ('Completed', NULL, 1);

        -- Insert Task Types
        INSERT INTO TaskType (name, description, learner_id)
        VALUES
            ('Coding', 'Tasks related to coding and development', 1),
            ('Reading', 'Tasks involving reading materials', 2);

        -- Insert Tasks
        INSERT INTO Task (title, type_id, kanban_status_id, eisenhower_status, time_task_related, learner_id)
        VALUES
            ('Build React App', 1, 2, 'Urgent & Important', 'Today', 1),
            ('Read Android Guide', 2, 1, 'Not Urgent but Important', 'This Week', 2);

        -- Insert Subtasks
        INSERT INTO Subtask (title, status, task_id)
        VALUES
            ('Set up React environment', 'In Progress', 1),
            ('Read Chapter 1', 'Not Started', 2);

        -- Insert Notes
        INSERT INTO Note (title, body, learner_id)
        VALUES
            ('React Tips', 'Remember to use hooks effectively.', 1),
            ('Android Setup', 'Ensure Android Studio is updated.', 2);