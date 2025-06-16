CREATE TABLE [dbo].[StudySession] (
    [id] BIGINT IDENTITY(1,1) NOT NULL,
    [learner_id] BIGINT NOT NULL,
    [task_id] BIGINT NULL,
    [start_time] DATETIME2 NOT NULL,
    [end_time] DATETIME2 NULL,
    [cycle_count] INT NOT NULL DEFAULT(0),
    [is_completed] BIT NOT NULL DEFAULT(0),
    [created_at] DATETIME2 DEFAULT(sysdatetime()) NULL,
    [updated_at] DATETIME2 DEFAULT(sysdatetime()) NULL,
    [deleted_at] DATETIME2 NULL,
    [is_deleted] BIT DEFAULT(0) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_StudySession_Learner] FOREIGN KEY ([learner_id]) REFERENCES [dbo].[Learner] ([id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_StudySession_Task] FOREIGN KEY ([task_id]) REFERENCES [dbo].[Task] ([id]) ON DELETE NO ACTION
);

GO

CREATE NONCLUSTERED INDEX [idx_study_session_learner_id]
    ON [dbo].[StudySession]([learner_id] ASC);

GO

CREATE NONCLUSTERED INDEX [idx_study_session_task_id]
    ON [dbo].[StudySession]([task_id] ASC);

GO

CREATE TRIGGER trg_soft_delete_study_session
ON StudySession
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF UPDATE(is_deleted)
    BEGIN
        UPDATE StudySession
        SET deleted_at = SYSDATETIME()
        WHERE id IN (SELECT id FROM inserted WHERE is_deleted = 1);
    END
END;

GO

CREATE TRIGGER trg_update_study_session_updated_at
ON StudySession
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE StudySession
    SET updated_at = SYSDATETIME()
    WHERE id IN (SELECT id FROM inserted);
END; 