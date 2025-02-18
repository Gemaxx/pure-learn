CREATE TABLE [dbo].[Goal] (
    [id]              BIGINT         IDENTITY (1, 1) NOT NULL,
    [title]           NVARCHAR (255) NOT NULL,
    [description]     NVARCHAR (MAX) NOT NULL,
    [motivation]      NVARCHAR (MAX) NOT NULL,
    [term]            NVARCHAR (50)  NOT NULL,
    [status]          NVARCHAR (50)  NOT NULL,
    [completion_date] DATE           NULL,
    [CREATEd_at]      DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [updated_at]      DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [category_id]     BIGINT         NULL,
    [learner_id]      BIGINT         NOT NULL,
    [deleted_at]      DATETIME2 (7)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    CHECK ([status]='Canceled' OR [status]='Done' OR [status]='On-Hold' OR [status]='In-Progress' OR [status]='Not-Started'),
    CHECK ([term]='Short-Term' OR [term]='Medium-Term' OR [term]='Long-Term'),
    FOREIGN KEY ([category_id]) REFERENCES [dbo].[Category] ([id]) ON DELETE CASCADE,
    FOREIGN KEY ([learner_id]) REFERENCES [dbo].[Learner] ([id])
);


GO

CREATE NONCLUSTERED INDEX [idx_goal_learner_id]
    ON [dbo].[Goal]([learner_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_goal_category_id]
    ON [dbo].[Goal]([category_id] ASC);


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

