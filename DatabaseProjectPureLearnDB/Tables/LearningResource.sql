CREATE TABLE [dbo].[LearningResource] (
    [id]          BIGINT         IDENTITY (1, 1) NOT NULL,
    [title]       NVARCHAR (255) NOT NULL,
    [type_id]     BIGINT         NOT NULL,
    [total_units] INT            NOT NULL,
    [progress]    INT            NOT NULL,
    [link]        NVARCHAR (MAX) NULL,
    [CREATEd_at]  DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [updated_at]  DATETIME2 (7)  DEFAULT (sysdatetime()) NULL,
    [learner_id]  BIGINT         NOT NULL,
    [category_id] BIGINT         NULL,
    [goal_id]     BIGINT         NULL,
    [subgoal_id]  BIGINT         NULL,
    [deleted_at]  DATETIME2 (7)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    CHECK ([total_units]>(0)),
    CONSTRAINT [CHK_Progress] CHECK ([progress]>=(0) AND [progress]<=[total_units]),
    FOREIGN KEY ([category_id]) REFERENCES [dbo].[Category] ([id]),
    FOREIGN KEY ([goal_id]) REFERENCES [dbo].[Goal] ([id]),
    FOREIGN KEY ([learner_id]) REFERENCES [dbo].[Learner] ([id]) ON DELETE CASCADE,
    FOREIGN KEY ([subgoal_id]) REFERENCES [dbo].[Subgoal] ([id]),
    FOREIGN KEY ([type_id]) REFERENCES [dbo].[LearningResourceType] ([id]) ON DELETE CASCADE
);


GO

CREATE NONCLUSTERED INDEX [idx_learningresource_subgoal_id]
    ON [dbo].[LearningResource]([subgoal_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_learningresource_goal_id]
    ON [dbo].[LearningResource]([goal_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_learningresource_type_id]
    ON [dbo].[LearningResource]([type_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_learningresource_category_id]
    ON [dbo].[LearningResource]([category_id] ASC);


GO

CREATE NONCLUSTERED INDEX [idx_learningresource_learner_id]
    ON [dbo].[LearningResource]([learner_id] ASC);


GO

    CREATE TRIGGER trg_update_learningresource_updated_at
    ON LearningResource
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE LearningResource
        SET updated_at = SYSDATETIME()
        WHERE id IN (SELECT id FROM inserted);
    END;

    -- Trigger to Update `updated_at` for Task

GO

