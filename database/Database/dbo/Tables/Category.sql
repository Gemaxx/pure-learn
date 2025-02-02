CREATE TABLE [dbo].[Category] (
    [id]                 BIGINT         IDENTITY (1, 1) NOT NULL,
    [title]              NVARCHAR (255) NOT NULL,
    [color]              NVARCHAR (50)  NOT NULL,
    [description]        NVARCHAR (MAX) NULL,
    [CREATEd_at]         DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [updated_at]         DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [parent_category_id] BIGINT         NULL,
    [learner_id]         BIGINT         NOT NULL,
    [deleted_at]         DATETIME2 (7)  NULL,
    [is_deleted]         BIT            DEFAULT ((0)) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    FOREIGN KEY ([learner_id]) REFERENCES [dbo].[Learner] ([id]) ON DELETE CASCADE,
    FOREIGN KEY ([parent_category_id]) REFERENCES [dbo].[Category] ([id])
);


GO

CREATE NONCLUSTERED INDEX [idx_category_parent_category_id]
    ON [dbo].[Category]([parent_category_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_category_learner_id]
    ON [dbo].[Category]([learner_id] ASC);


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

