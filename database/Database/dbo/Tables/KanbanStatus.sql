CREATE TABLE [dbo].[KanbanStatus] (
    [id]         BIGINT         IDENTITY (1, 1) NOT NULL,
    [name]       NVARCHAR (255) NOT NULL,
    [max_tasks]  INT            NULL,
    [learner_id] BIGINT         NOT NULL,
    [deleted_at] DATETIME2 (7)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    CHECK ([max_tasks]>(0)),
    FOREIGN KEY ([learner_id]) REFERENCES [dbo].[Learner] ([id]),
    UNIQUE NONCLUSTERED ([name] ASC)
);


GO

CREATE NONCLUSTERED INDEX [idx_kanbanstatus_learner_id]
    ON [dbo].[KanbanStatus]([learner_id] ASC);


GO

