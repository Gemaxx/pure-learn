CREATE TABLE [dbo].[LearningResourceType] (
    [id]         BIGINT         IDENTITY (1, 1) NOT NULL,
    [name]       NVARCHAR (255) NOT NULL,
    [unit_type]  NVARCHAR (255) NOT NULL,
    [learner_id] BIGINT         NOT NULL,
    [deleted_at] DATETIME2 (7)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    FOREIGN KEY ([learner_id]) REFERENCES [dbo].[Learner] ([id]),
    UNIQUE NONCLUSTERED ([name] ASC),
    UNIQUE NONCLUSTERED ([unit_type] ASC)
);


GO

CREATE NONCLUSTERED INDEX [idx_learningresourcetype_learner_id]
    ON [dbo].[LearningResourceType]([learner_id] ASC);


GO

