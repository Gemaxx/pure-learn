CREATE TABLE [dbo].[Subtask] (
    [id]         BIGINT         IDENTITY (1, 1) NOT NULL,
    [title]      NVARCHAR (255) NOT NULL,
    [status]     NVARCHAR (50)  NOT NULL,
    [CREATEd_at] DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [updated_at] DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [task_id]    BIGINT         NOT NULL,
    [deleted_at] DATETIME2 (7)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    CHECK ([status]='Completed' OR [status]='In Progress' OR [status]='Not Started'),
    FOREIGN KEY ([task_id]) REFERENCES [dbo].[Task] ([id]) ON DELETE CASCADE
);


GO

CREATE NONCLUSTERED INDEX [idx_subtask_task_id]
    ON [dbo].[Subtask]([task_id] ASC);


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

