-- Table: Learner (Stores user details)
CREATE TABLE Learner (
    id BIGSERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    ProfilePicture TEXT,
    Bio TEXT,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UpdatedAt TIMESTAMP DEFAULT NOW(),
    LastLogin TIMESTAMP
);

-- Table: Category (Hierarchical categories with a parent-child relationship)
CREATE TABLE Category (
    id BIGSERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Color VARCHAR(50) NOT NULL,
    Description TEXT,
    ParentCategoryID BIGINT REFERENCES Category(id) ON DELETE SET NULL,
    LearnerID BIGINT NOT NULL REFERENCES Learner(id) ON DELETE CASCADE,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UpdatedAt TIMESTAMP DEFAULT NOW()
);

-- Table: Goal (Defines learning goals)
CREATE TABLE Goal (
    id BIGSERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Motivation TEXT NOT NULL,
    Term VARCHAR(50) NOT NULL CHECK (Term IN ('Long-Term', 'Medium-Term', 'Short-Term')),
    Status VARCHAR(50) NOT NULL CHECK (Status IN ('Not-Started', 'In-Progress', 'On-Hold', 'Done', 'Canceled')),
    CompletionDate DATE,
    CategoryID BIGINT REFERENCES Category(id) ON DELETE CASCADE,
    LearnerID BIGINT NOT NULL REFERENCES Learner(id) ON DELETE NO ACTION,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UpdatedAt TIMESTAMP DEFAULT NOW()
);

-- Table: Subgoal (Subgoals associated with Goals)
CREATE TABLE Subgoal (
    id BIGSERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Status VARCHAR(50) NOT NULL,
    GoalID BIGINT NOT NULL REFERENCES Goal(id) ON DELETE CASCADE,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UpdatedAt TIMESTAMP DEFAULT NOW()
);

-- Table: LearningResourceType (Defines types of learning resources)
CREATE TABLE LearningResourceType (
    id BIGSERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL UNIQUE,
    UnitType VARCHAR(255) NOT NULL UNIQUE,
    LearnerID BIGINT NOT NULL REFERENCES Learner(id) ON DELETE NO ACTION
);

-- Table: LearningResource (Learning resources tracked by users)
CREATE TABLE LearningResource (
    id BIGSERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    TypeID BIGINT NOT NULL REFERENCES LearningResourceType(id) ON DELETE CASCADE,
    TotalUnits INT NOT NULL CHECK (TotalUnits > 0),
    Progress INT NOT NULL CHECK (Progress >= 0 AND Progress <= TotalUnits),
    Link TEXT,
    LearnerID BIGINT NOT NULL REFERENCES Learner(id) ON DELETE CASCADE,
    CategoryID BIGINT REFERENCES Category(id) ON DELETE SET NULL,
    GoalID BIGINT REFERENCES Goal(id) ON DELETE SET NULL,
    SubgoalID BIGINT REFERENCES Subgoal(id) ON DELETE SET NULL,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UpdatedAt TIMESTAMP DEFAULT NOW()
);

-- Table: KanbanStatus (Kanban board status for tasks)
CREATE TABLE KanbanStatus (
    id BIGSERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL UNIQUE,
    MaxTasks INT CHECK (MaxTasks > 0),
    LearnerID BIGINT NOT NULL REFERENCES Learner(id) ON DELETE NO ACTION
);

-- Table: TaskType (Categorization of tasks)
CREATE TABLE TaskType (
    id BIGSERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL UNIQUE,
    Description VARCHAR(500),
    Icon BYTEA,
    LearnerID BIGINT NOT NULL REFERENCES Learner(id) ON DELETE NO ACTION
);

-- Table: Task (Main table for tasks and their details)
CREATE TABLE Task (
    id BIGSERIAL PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    TypeID BIGINT NOT NULL REFERENCES TaskType(id) ON DELETE CASCADE,
    KanbanStatusID BIGINT NOT NULL REFERENCES KanbanStatus(id) ON DELETE CASCADE,
    EisenhowerStatus VARCHAR(50) NOT NULL CHECK (EisenhowerStatus IN ('Urgent & Important', 'Not Urgent but Important', 'Urgent but Not Important', 'Not Urgent & Not Important')),
    TimeTaskRelated VARCHAR(50) NOT NULL CHECK (TimeTaskRelated IN ('Today', 'Tomorrow', 'This Week', 'Someday')),
    DueDate DATE,
    EstimatedTime INTERVAL,
    TimeSpent INTERVAL,
    LearnerID BIGINT NOT NULL REFERENCES Learner(id) ON DELETE CASCADE,
    CategoryID BIGINT REFERENCES Category(id) ON DELETE SET NULL,
    GoalID BIGINT REFERENCES Goal(id) ON DELETE SET NULL,
    SubgoalID BIGINT REFERENCES Subgoal(id) ON DELETE SET NULL,
    LearningResourceID BIGINT REFERENCES LearningResource(id) ON DELETE SET NULL,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UpdatedAt TIMESTAMP DEFAULT NOW()
);

-- Table: Repeat (Separate table for repeat logic)
CREATE TABLE Repeat (
    id BIGSERIAL PRIMARY KEY,
    TaskID BIGINT NOT NULL REFERENCES Task(id) ON DELETE CASCADE,
    Frequency VARCHAR(50) NOT NULL CHECK (Frequency IN ('None', 'Daily', 'Weekly', 'Monthly', 'Annually', 'Custom')),
    Interval INT,
    OnSUNDAY BOOLEAN DEFAULT FALSE,
    OnMONDAY BOOLEAN DEFAULT FALSE,
    OnTUESDAY BOOLEAN DEFAULT FALSE,
    OnWEDNESDAY BOOLEAN DEFAULT FALSE,
    OnTHURSDAY BOOLEAN DEFAULT FALSE,
    OnFRIDAY BOOLEAN DEFAULT FALSE,
    OnSATURDAY BOOLEAN DEFAULT FALSE,
    Ends VARCHAR(50) CHECK (Ends IN ('Never', 'On Date', 'After Occurrences')),
    EndDate DATE,
    EndOccurrences INT,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UpdatedAt TIMESTAMP DEFAULT NOW()
);

-- Table: Subtask (Breaks down tasks into smaller units)
CREATE TABLE Subtask (
    id BIGSERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Status VARCHAR(50) NOT NULL CHECK (Status IN ('Not Started', 'In Progress', 'Completed')),
    TaskID BIGINT NOT NULL REFERENCES Task(id) ON DELETE CASCADE,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UpdatedAt TIMESTAMP DEFAULT NOW()
);

-- Table: Note (Allows users to take notes)
CREATE TABLE Note (
    id BIGSERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Body TEXT NOT NULL,
    LearnerID BIGINT NOT NULL REFERENCES Learner(id) ON DELETE CASCADE,
    CategoryID BIGINT REFERENCES Category(id) ON DELETE SET NULL,
    GoalID BIGINT REFERENCES Goal(id) ON DELETE SET NULL,
    SubgoalID BIGINT REFERENCES Subgoal(id) ON DELETE SET NULL,
    TaskID BIGINT REFERENCES Task(id) ON DELETE SET NULL,
    CreatedAt TIMESTAMP DEFAULT NOW(),
    UpdatedAt TIMESTAMP DEFAULT NOW()
);
