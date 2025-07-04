/****** Object:  Database [PureLearnDB]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE DATABASE [PureLearnDB]  (EDITION = 'GeneralPurpose', SERVICE_OBJECTIVE = 'GP_S_Gen5_2', MAXSIZE = 32 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS, LEDGER = OFF;
GO
ALTER DATABASE [PureLearnDB] SET COMPATIBILITY_LEVEL = 160
GO
ALTER DATABASE [PureLearnDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PureLearnDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PureLearnDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PureLearnDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PureLearnDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [PureLearnDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PureLearnDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PureLearnDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PureLearnDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PureLearnDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PureLearnDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PureLearnDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PureLearnDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PureLearnDB] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [PureLearnDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PureLearnDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [PureLearnDB] SET  MULTI_USER 
GO
ALTER DATABASE [PureLearnDB] SET ENCRYPTION ON
GO
ALTER DATABASE [PureLearnDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [PureLearnDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
/*** The scripts of database scoped configurations in Azure should be executed inside the target database connection. ***/
GO
-- ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 8;
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[color] [nvarchar](50) NOT NULL,
	[description] [nvarchar](max) NULL,
	[CREATEd_at] [datetime2](7) NULL,
	[updated_at] [datetime2](7) NULL,
	[parent_category_id] [bigint] NULL,
	[learner_id] [bigint] NOT NULL,
	[deleted_at] [datetime2](7) NULL,
	[is_deleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Goal]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Goal](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[description] [nvarchar](max) NOT NULL,
	[motivation] [nvarchar](max) NOT NULL,
	[term] [nvarchar](50) NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[completion_date] [date] NULL,
	[CREATEd_at] [datetime2](7) NULL,
	[updated_at] [datetime2](7) NULL,
	[category_id] [bigint] NULL,
	[learner_id] [bigint] NOT NULL,
	[deleted_at] [datetime2](7) NULL,
	[is_deleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KanbanStatus]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KanbanStatus](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[max_tasks] [int] NULL,
	[learner_id] [bigint] NOT NULL,
	[deleted_at] [datetime2](7) NULL,
	[is_deleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Learner]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Learner](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[email] [nvarchar](255) NOT NULL,
	[password_hash] [nvarchar](255) NOT NULL,
	[profile_picture] [nvarchar](max) NULL,
	[bio] [nvarchar](max) NULL,
	[CREATEd_at] [datetime2](7) NULL,
	[updated_at] [datetime2](7) NULL,
	[last_login] [datetime2](7) NULL,
	[deleted_at] [datetime2](7) NULL,
	[is_deleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LearningResource]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LearningResource](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[type_id] [bigint] NOT NULL,
	[total_units] [int] NOT NULL,
	[progress] [int] NOT NULL,
	[link] [nvarchar](max) NULL,
	[CREATEd_at] [datetime2](7) NULL,
	[updated_at] [datetime2](7) NULL,
	[learner_id] [bigint] NOT NULL,
	[category_id] [bigint] NULL,
	[goal_id] [bigint] NULL,
	[subgoal_id] [bigint] NULL,
	[deleted_at] [datetime2](7) NULL,
	[is_deleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LearningResourceType]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LearningResourceType](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[unit_type] [nvarchar](255) NOT NULL,
	[learner_id] [bigint] NOT NULL,
	[deleted_at] [datetime2](7) NULL,
	[is_deleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Note]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Note](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[body] [nvarchar](max) NOT NULL,
	[CREATEd_at] [datetime2](7) NULL,
	[updated_at] [datetime2](7) NULL,
	[category_id] [bigint] NULL,
	[goal_id] [bigint] NULL,
	[subgoal_id] [bigint] NULL,
	[task_id] [bigint] NULL,
	[learner_id] [bigint] NOT NULL,
	[deleted_at] [datetime2](7) NULL,
	[is_deleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subgoal]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subgoal](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[description] [nvarchar](max) NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[CREATEd_at] [datetime2](7) NULL,
	[updated_at] [datetime2](7) NULL,
	[goal_id] [bigint] NOT NULL,
	[deleted_at] [datetime2](7) NULL,
	[is_deleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subtask]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subtask](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[CREATEd_at] [datetime2](7) NULL,
	[updated_at] [datetime2](7) NULL,
	[task_id] [bigint] NOT NULL,
	[deleted_at] [datetime2](7) NULL,
	[is_deleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Task]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Task](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](100) NOT NULL,
	[type_id] [bigint] NOT NULL,
	[kanban_status_id] [bigint] NOT NULL,
	[eisenhower_status] [nvarchar](50) NOT NULL,
	[time_task_related] [nvarchar](50) NOT NULL,
	[due_date] [date] NULL,
	[estimated_time] [time](7) NULL,
	[time_spent] [time](7) NULL,
	[repeat_frequency] [nvarchar](50) NOT NULL,
	[repeat_interval] [int] NULL,
	[repeat_on_sunday] [bit] NULL,
	[repeat_on_monday] [bit] NULL,
	[repeat_on_tuesday] [bit] NULL,
	[repeat_on_wednesday] [bit] NULL,
	[repeat_on_thursday] [bit] NULL,
	[repeat_on_friday] [bit] NULL,
	[repeat_on_saturday] [bit] NULL,
	[repeat_ends] [nvarchar](50) NULL,
	[repeat_end_date] [date] NULL,
	[repeat_end_occurrences] [int] NULL,
	[CREATEd_at] [datetime2](7) NULL,
	[updated_at] [datetime2](7) NULL,
	[learner_id] [bigint] NOT NULL,
	[category_id] [bigint] NULL,
	[goal_id] [bigint] NULL,
	[subgoal_id] [bigint] NULL,
	[learning_resource_id] [bigint] NULL,
	[deleted_at] [datetime2](7) NULL,
	[is_deleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaskType]    Script Date: 2/20/2025 12:51:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskType](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[description] [nvarchar](500) NULL,
	[icon] [varbinary](max) NULL,
	[learner_id] [bigint] NOT NULL,
	[deleted_at] [datetime2](7) NULL,
	[is_deleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [idx_category_learner_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_category_learner_id] ON [dbo].[Category]
(
	[learner_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_category_parent_category_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_category_parent_category_id] ON [dbo].[Category]
(
	[parent_category_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_goal_category_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_goal_category_id] ON [dbo].[Goal]
(
	[category_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_goal_learner_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_goal_learner_id] ON [dbo].[Goal]
(
	[learner_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_kanbanstatus_learner_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_kanbanstatus_learner_id] ON [dbo].[KanbanStatus]
(
	[learner_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_learningresource_category_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_learningresource_category_id] ON [dbo].[LearningResource]
(
	[category_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_learningresource_goal_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_learningresource_goal_id] ON [dbo].[LearningResource]
(
	[goal_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_learningresource_learner_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_learningresource_learner_id] ON [dbo].[LearningResource]
(
	[learner_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_learningresource_subgoal_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_learningresource_subgoal_id] ON [dbo].[LearningResource]
(
	[subgoal_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_learningresource_type_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_learningresource_type_id] ON [dbo].[LearningResource]
(
	[type_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_learningresourcetype_learner_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_learningresourcetype_learner_id] ON [dbo].[LearningResourceType]
(
	[learner_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_note_category_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_note_category_id] ON [dbo].[Note]
(
	[category_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_note_goal_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_note_goal_id] ON [dbo].[Note]
(
	[goal_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_note_learner_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_note_learner_id] ON [dbo].[Note]
(
	[learner_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_note_subgoal_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_note_subgoal_id] ON [dbo].[Note]
(
	[subgoal_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_note_task_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_note_task_id] ON [dbo].[Note]
(
	[task_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_subgoal_goal_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_subgoal_goal_id] ON [dbo].[Subgoal]
(
	[goal_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_subtask_task_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_subtask_task_id] ON [dbo].[Subtask]
(
	[task_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_task_category_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_task_category_id] ON [dbo].[Task]
(
	[category_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_task_goal_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_task_goal_id] ON [dbo].[Task]
(
	[goal_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_task_kanban_status_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_task_kanban_status_id] ON [dbo].[Task]
(
	[kanban_status_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_task_learner_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_task_learner_id] ON [dbo].[Task]
(
	[learner_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_task_learning_resource_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_task_learning_resource_id] ON [dbo].[Task]
(
	[learning_resource_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_task_subgoal_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_task_subgoal_id] ON [dbo].[Task]
(
	[subgoal_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_task_type_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_task_type_id] ON [dbo].[Task]
(
	[type_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [idx_tasktype_learner_id]    Script Date: 2/20/2025 12:51:11 AM ******/
CREATE NONCLUSTERED INDEX [idx_tasktype_learner_id] ON [dbo].[TaskType]
(
	[learner_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Category] ADD  DEFAULT (sysdatetime()) FOR [CREATEd_at]
GO
ALTER TABLE [dbo].[Category] ADD  DEFAULT (sysdatetime()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Category] ADD  DEFAULT ((0)) FOR [is_deleted]
GO
ALTER TABLE [dbo].[Goal] ADD  DEFAULT (sysdatetime()) FOR [CREATEd_at]
GO
ALTER TABLE [dbo].[Goal] ADD  DEFAULT (sysdatetime()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Goal] ADD  DEFAULT ((0)) FOR [is_deleted]
GO
ALTER TABLE [dbo].[KanbanStatus] ADD  DEFAULT ((0)) FOR [is_deleted]
GO
ALTER TABLE [dbo].[Learner] ADD  DEFAULT (sysdatetime()) FOR [CREATEd_at]
GO
ALTER TABLE [dbo].[Learner] ADD  DEFAULT (sysdatetime()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Learner] ADD  DEFAULT ((0)) FOR [is_deleted]
GO
ALTER TABLE [dbo].[LearningResource] ADD  DEFAULT (sysdatetime()) FOR [CREATEd_at]
GO
ALTER TABLE [dbo].[LearningResource] ADD  DEFAULT (sysdatetime()) FOR [updated_at]
GO
ALTER TABLE [dbo].[LearningResource] ADD  DEFAULT ((0)) FOR [is_deleted]
GO
ALTER TABLE [dbo].[LearningResourceType] ADD  DEFAULT ((0)) FOR [is_deleted]
GO
ALTER TABLE [dbo].[Note] ADD  DEFAULT (sysdatetime()) FOR [CREATEd_at]
GO
ALTER TABLE [dbo].[Note] ADD  DEFAULT (sysdatetime()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Note] ADD  DEFAULT ((0)) FOR [is_deleted]
GO
ALTER TABLE [dbo].[Subgoal] ADD  DEFAULT (sysdatetime()) FOR [CREATEd_at]
GO
ALTER TABLE [dbo].[Subgoal] ADD  DEFAULT (sysdatetime()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Subgoal] ADD  DEFAULT ((0)) FOR [is_deleted]
GO
ALTER TABLE [dbo].[Subtask] ADD  DEFAULT (sysdatetime()) FOR [CREATEd_at]
GO
ALTER TABLE [dbo].[Subtask] ADD  DEFAULT (sysdatetime()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Subtask] ADD  DEFAULT ((0)) FOR [is_deleted]
GO
ALTER TABLE [dbo].[Task] ADD  DEFAULT ('None') FOR [repeat_frequency]
GO
ALTER TABLE [dbo].[Task] ADD  DEFAULT ((0)) FOR [repeat_on_sunday]
GO
ALTER TABLE [dbo].[Task] ADD  DEFAULT ((0)) FOR [repeat_on_monday]
GO
ALTER TABLE [dbo].[Task] ADD  DEFAULT ((0)) FOR [repeat_on_tuesday]
GO
ALTER TABLE [dbo].[Task] ADD  DEFAULT ((0)) FOR [repeat_on_wednesday]
GO
ALTER TABLE [dbo].[Task] ADD  DEFAULT ((0)) FOR [repeat_on_thursday]
GO
ALTER TABLE [dbo].[Task] ADD  DEFAULT ((0)) FOR [repeat_on_friday]
GO
ALTER TABLE [dbo].[Task] ADD  DEFAULT ((0)) FOR [repeat_on_saturday]
GO
ALTER TABLE [dbo].[Task] ADD  DEFAULT (sysdatetime()) FOR [CREATEd_at]
GO
ALTER TABLE [dbo].[Task] ADD  DEFAULT (sysdatetime()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Task] ADD  DEFAULT ((0)) FOR [is_deleted]
GO
ALTER TABLE [dbo].[TaskType] ADD  DEFAULT ((0)) FOR [is_deleted]
GO
ALTER TABLE [dbo].[Category]  WITH CHECK ADD FOREIGN KEY([learner_id])
REFERENCES [dbo].[Learner] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Category]  WITH CHECK ADD FOREIGN KEY([parent_category_id])
REFERENCES [dbo].[Category] ([id])
GO
ALTER TABLE [dbo].[Goal]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Goal]  WITH CHECK ADD FOREIGN KEY([learner_id])
REFERENCES [dbo].[Learner] ([id])
GO
ALTER TABLE [dbo].[KanbanStatus]  WITH CHECK ADD FOREIGN KEY([learner_id])
REFERENCES [dbo].[Learner] ([id])
GO
ALTER TABLE [dbo].[LearningResource]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([id])
GO
ALTER TABLE [dbo].[LearningResource]  WITH CHECK ADD FOREIGN KEY([goal_id])
REFERENCES [dbo].[Goal] ([id])
GO
ALTER TABLE [dbo].[LearningResource]  WITH CHECK ADD FOREIGN KEY([learner_id])
REFERENCES [dbo].[Learner] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LearningResource]  WITH CHECK ADD FOREIGN KEY([subgoal_id])
REFERENCES [dbo].[Subgoal] ([id])
GO
ALTER TABLE [dbo].[LearningResource]  WITH CHECK ADD FOREIGN KEY([type_id])
REFERENCES [dbo].[LearningResourceType] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LearningResourceType]  WITH CHECK ADD FOREIGN KEY([learner_id])
REFERENCES [dbo].[Learner] ([id])
GO
ALTER TABLE [dbo].[Note]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([id])
GO
ALTER TABLE [dbo].[Note]  WITH CHECK ADD FOREIGN KEY([goal_id])
REFERENCES [dbo].[Goal] ([id])
GO
ALTER TABLE [dbo].[Note]  WITH CHECK ADD FOREIGN KEY([learner_id])
REFERENCES [dbo].[Learner] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Note]  WITH CHECK ADD FOREIGN KEY([subgoal_id])
REFERENCES [dbo].[Subgoal] ([id])
GO
ALTER TABLE [dbo].[Note]  WITH CHECK ADD FOREIGN KEY([task_id])
REFERENCES [dbo].[Task] ([id])
GO
ALTER TABLE [dbo].[Subgoal]  WITH CHECK ADD FOREIGN KEY([goal_id])
REFERENCES [dbo].[Goal] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Subtask]  WITH CHECK ADD FOREIGN KEY([task_id])
REFERENCES [dbo].[Task] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([id])
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD FOREIGN KEY([goal_id])
REFERENCES [dbo].[Goal] ([id])
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD FOREIGN KEY([kanban_status_id])
REFERENCES [dbo].[KanbanStatus] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD FOREIGN KEY([learner_id])
REFERENCES [dbo].[Learner] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD FOREIGN KEY([learning_resource_id])
REFERENCES [dbo].[LearningResource] ([id])
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD FOREIGN KEY([subgoal_id])
REFERENCES [dbo].[Subgoal] ([id])
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD FOREIGN KEY([type_id])
REFERENCES [dbo].[TaskType] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TaskType]  WITH CHECK ADD FOREIGN KEY([learner_id])
REFERENCES [dbo].[Learner] ([id])
GO
ALTER TABLE [dbo].[Goal]  WITH CHECK ADD CHECK  (([status]='Canceled' OR [status]='Done' OR [status]='On-Hold' OR [status]='In-Progress' OR [status]='Not-Started'))
GO
ALTER TABLE [dbo].[Goal]  WITH CHECK ADD CHECK  (([term]='Short-Term' OR [term]='Medium-Term' OR [term]='Long-Term'))
GO
ALTER TABLE [dbo].[KanbanStatus]  WITH CHECK ADD CHECK  (([max_tasks]>(0)))
GO
ALTER TABLE [dbo].[LearningResource]  WITH CHECK ADD  CONSTRAINT [CHK_Progress] CHECK  (([progress]>=(0) AND [progress]<=[total_units]))
GO
ALTER TABLE [dbo].[LearningResource] CHECK CONSTRAINT [CHK_Progress]
GO
ALTER TABLE [dbo].[LearningResource]  WITH CHECK ADD CHECK  (([total_units]>(0)))
GO
ALTER TABLE [dbo].[Subtask]  WITH CHECK ADD CHECK  (([status]='Completed' OR [status]='In Progress' OR [status]='Not Started'))
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD CHECK  (([eisenhower_status]='Not Urgent & Not Important' OR [eisenhower_status]='Urgent but Not Important' OR [eisenhower_status]='Not Urgent but Important' OR [eisenhower_status]='Urgent & Important'))
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD CHECK  (([repeat_ends]='After Occurrences' OR [repeat_ends]='On Date' OR [repeat_ends]='Never'))
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD CHECK  (([repeat_frequency]='Custom' OR [repeat_frequency]='Annually' OR [repeat_frequency]='Monthly' OR [repeat_frequency]='Weekly' OR [repeat_frequency]='Daily' OR [repeat_frequency]='None'))
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD CHECK  (([time_task_related]='Someday' OR [time_task_related]='This Week' OR [time_task_related]='Tomorrow' OR [time_task_related]='Today'))
GO
ALTER DATABASE [PureLearnDB] SET  READ_WRITE 
GO
