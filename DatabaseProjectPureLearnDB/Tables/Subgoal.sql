CREATE TABLE [dbo].[Subgoal] (
    [id]          BIGINT         IDENTITY (1, 1) NOT NULL,
    [title]       NVARCHAR (255) NOT NULL,
    [description] NVARCHAR (MAX) NOT NULL,
    [status]      NVARCHAR (50)  NOT NULL,
    [CREATEd_at]  DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [updated_at]  DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [goal_id]     BIGINT         NOT NULL,
    [deleted_at]  DATETIME2 (7)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    FOREIGN KEY ([goal_id]) REFERENCES [dbo].[Goal] ([id]) ON DELETE CASCADE
);


GO

CREATE NONCLUSTERED INDEX [idx_subgoal_goal_id]
    ON [dbo].[Subgoal]([goal_id] ASC);


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

