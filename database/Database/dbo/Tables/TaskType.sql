CREATE TABLE [dbo].[TaskType] (
    [id]          BIGINT          IDENTITY (1, 1) NOT NULL,
    [name]        NVARCHAR (255)  NOT NULL,
    [description] NVARCHAR (500)  NULL,
    [icon]        VARBINARY (MAX) NULL,
    [learner_id]  BIGINT          NOT NULL,
    [deleted_at]  DATETIME2 (7)   NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    FOREIGN KEY ([learner_id]) REFERENCES [dbo].[Learner] ([id]),
    UNIQUE NONCLUSTERED ([name] ASC)
);


GO

CREATE NONCLUSTERED INDEX [idx_tasktype_learner_id]
    ON [dbo].[TaskType]([learner_id] ASC);


GO

