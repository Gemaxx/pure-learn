CREATE TABLE [dbo].[Note] (
    [id]          BIGINT         IDENTITY (1, 1) NOT NULL,
    [title]       NVARCHAR (255) NOT NULL,
    [body]        NVARCHAR (MAX) NOT NULL,
    [CREATEd_at]  DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [updated_at]  DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [category_id] BIGINT         NULL,
    [goal_id]     BIGINT         NULL,
    [subgoal_id]  BIGINT         NULL,
    [task_id]     BIGINT         NULL,
    [learner_id]  BIGINT         NOT NULL,
    [deleted_at]  DATETIME2 (7)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    FOREIGN KEY ([category_id]) REFERENCES [dbo].[Category] ([id]),
    FOREIGN KEY ([goal_id]) REFERENCES [dbo].[Goal] ([id]),
    FOREIGN KEY ([learner_id]) REFERENCES [dbo].[Learner] ([id]) ON DELETE CASCADE,
    FOREIGN KEY ([subgoal_id]) REFERENCES [dbo].[Subgoal] ([id]),
    FOREIGN KEY ([task_id]) REFERENCES [dbo].[Task] ([id])
);


GO

CREATE NONCLUSTERED INDEX [idx_note_goal_id]
    ON [dbo].[Note]([goal_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_note_task_id]
    ON [dbo].[Note]([task_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_note_learner_id]
    ON [dbo].[Note]([learner_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_note_subgoal_id]
    ON [dbo].[Note]([subgoal_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_note_category_id]
    ON [dbo].[Note]([category_id] ASC);


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

