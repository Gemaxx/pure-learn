CREATE TABLE [dbo].[Learner] (
    [id]              BIGINT         IDENTITY (1, 1) NOT NULL,
    [name]            NVARCHAR (255) NOT NULL,
    [email]           NVARCHAR (255) NOT NULL,
    [password_hash]   NVARCHAR (255) NOT NULL,
    [profile_picture] NVARCHAR (MAX) NULL,
    [bio]             NVARCHAR (MAX) NULL,
    [CREATEd_at]      DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [updated_at]      DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [last_login]      DATETIME2 (7)  NULL,
    [deleted_at]      DATETIME2 (7)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    UNIQUE NONCLUSTERED ([email] ASC)
);


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

