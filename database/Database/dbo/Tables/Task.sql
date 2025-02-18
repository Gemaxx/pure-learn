CREATE TABLE [dbo].[Task] (
    [id]                     BIGINT         IDENTITY (1, 1) NOT NULL,
    [title]                  NVARCHAR (100) NOT NULL,
    [type_id]                BIGINT         NOT NULL,
    [kanban_status_id]       BIGINT         NOT NULL,
    [eisenhower_status]      NVARCHAR (50)  NOT NULL,
    [time_task_related]      NVARCHAR (50)  NOT NULL,
    [due_date]               DATE           NULL,
    [estimated_time]         TIME (7)       NULL,
    [time_spent]             TIME (7)       NULL,
    [repeat_frequency]       NVARCHAR (50)  DEFAULT ('None') NOT NULL,
    [repeat_interval]        INT            NULL,
    [repeat_on_sunday]       BIT            DEFAULT ((0)) NULL,
    [repeat_on_monday]       BIT            DEFAULT ((0)) NULL,
    [repeat_on_tuesday]      BIT            DEFAULT ((0)) NULL,
    [repeat_on_wednesday]    BIT            DEFAULT ((0)) NULL,
    [repeat_on_thursday]     BIT            DEFAULT ((0)) NULL,
    [repeat_on_friday]       BIT            DEFAULT ((0)) NULL,
    [repeat_on_saturday]     BIT            DEFAULT ((0)) NULL,
    [repeat_ends]            NVARCHAR (50)  NULL,
    [repeat_end_date]        DATE           NULL,
    [repeat_end_occurrences] INT            NULL,
    [CREATEd_at]             DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [updated_at]             DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [learner_id]             BIGINT         NOT NULL,
    [category_id]            BIGINT         NULL,
    [goal_id]                BIGINT         NULL,
    [subgoal_id]             BIGINT         NULL,
    [learning_resource_id]   BIGINT         NULL,
    [deleted_at]             DATETIME2 (7)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    CHECK ([eisenhower_status]='Not Urgent & Not Important' OR [eisenhower_status]='Urgent but Not Important' OR [eisenhower_status]='Not Urgent but Important' OR [eisenhower_status]='Urgent & Important'),
    CHECK ([repeat_ends]='After Occurrences' OR [repeat_ends]='On Date' OR [repeat_ends]='Never'),
    CHECK ([repeat_frequency]='Custom' OR [repeat_frequency]='Annually' OR [repeat_frequency]='Monthly' OR [repeat_frequency]='Weekly' OR [repeat_frequency]='Daily' OR [repeat_frequency]='None'),
    CHECK ([time_task_related]='Someday' OR [time_task_related]='This Week' OR [time_task_related]='Tomorrow' OR [time_task_related]='Today'),
    FOREIGN KEY ([category_id]) REFERENCES [dbo].[Category] ([id]),
    FOREIGN KEY ([goal_id]) REFERENCES [dbo].[Goal] ([id]),
    FOREIGN KEY ([kanban_status_id]) REFERENCES [dbo].[KanbanStatus] ([id]) ON DELETE CASCADE,
    FOREIGN KEY ([learner_id]) REFERENCES [dbo].[Learner] ([id]) ON DELETE CASCADE,
    FOREIGN KEY ([learning_resource_id]) REFERENCES [dbo].[LearningResource] ([id]),
    FOREIGN KEY ([subgoal_id]) REFERENCES [dbo].[Subgoal] ([id]),
    FOREIGN KEY ([type_id]) REFERENCES [dbo].[TaskType] ([id]) ON DELETE CASCADE
);


GO

CREATE NONCLUSTERED INDEX [idx_task_learning_resource_id]
    ON [dbo].[Task]([learning_resource_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_task_kanban_status_id]
    ON [dbo].[Task]([kanban_status_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_task_type_id]
    ON [dbo].[Task]([type_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_task_category_id]
    ON [dbo].[Task]([category_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_task_learner_id]
    ON [dbo].[Task]([learner_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_task_goal_id]
    ON [dbo].[Task]([goal_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_task_subgoal_id]
    ON [dbo].[Task]([subgoal_id] ASC);


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

