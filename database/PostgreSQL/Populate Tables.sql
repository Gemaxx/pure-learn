-- 1. Insert the Learner (Ahmed Ibrahim) into the Learner table
INSERT INTO Learner (Name, Email, PasswordHash, ProfilePicture, Bio) 
VALUES ('Ahmed Ibrahim', 'Gemax.hope@gmail.com', '123123', NULL, 'A passionate learner with a focus on software development and AI.');

-- 2. Insert Categories for Ahmed's learning
-- Main Category
INSERT INTO Category (Title, Color, Description, LearnerID)
VALUES ('Software Development', 'blue', 'Learning resources related to software development, programming, and web technologies.', (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com'));

-- Subcategory
INSERT INTO Category (Title, Color, Description, ParentCategoryID, LearnerID)
VALUES ('Web Development', 'green', 'Focuses on frontend and backend development, including technologies like HTML, CSS, JavaScript, and React.', (SELECT id FROM Category WHERE Title = 'Software Development'), (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com'));

-- 3. Insert Goals for Ahmed
INSERT INTO Goal (Title, Description, Motivation, Term, Status, LearnerID, CategoryID)
VALUES 
('Learn React.js', 'Master React.js for building modern web applications.', 'To build faster and more interactive UIs.', 'Medium-Term', 'In-Progress', (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com'), (SELECT id FROM Category WHERE Title = 'Web Development'));

-- 4. Insert Subgoals for Ahmed's goal
INSERT INTO Subgoal (Title, Description, Status, GoalID)
VALUES 
('Understand React Components', 'Study the structure and use of components in React.js.', 'In-Progress', (SELECT id FROM Goal WHERE Title = 'Learn React.js')),
('Learn React Hooks', 'Understand and implement React Hooks like useState and useEffect.', 'Not Started', (SELECT id FROM Goal WHERE Title = 'Learn React.js'));

-- 5. Insert Learning Resource Types
INSERT INTO LearningResourceType (Name, UnitType, LearnerID)
VALUES 
('Video Tutorials', 'Video', (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com')),
('Documentation', 'Text', (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com'));

-- 6. Insert Learning Resources
INSERT INTO LearningResource (Title, TypeID, TotalUnits, Progress, Link, LearnerID, GoalID)
VALUES 
('React.js Official Documentation', (SELECT id FROM LearningResourceType WHERE Name = 'Documentation'), 100, 50, 'https://reactjs.org/docs/getting-started.html', (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com'), (SELECT id FROM Goal WHERE Title = 'Learn React.js')),
('React.js Crash Course', (SELECT id FROM LearningResourceType WHERE Name = 'Video Tutorials'), 30, 10, 'https://www.youtube.com/watch?v=dGcsHMXbSOA', (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com'), (SELECT id FROM Goal WHERE Title = 'Learn React.js'));

-- 7. Insert Kanban Statuses for Ahmed's tasks
INSERT INTO KanbanStatus (Name, MaxTasks, LearnerID)
VALUES 
('To Do', 5, (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com')),
('In Progress', 5, (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com')),
('Done', 5, (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com'));

-- 8. Insert Task Types for Ahmed
INSERT INTO TaskType (Name, Description, LearnerID)
VALUES 
('Research', 'Research and learning tasks for acquiring new knowledge.', (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com')),
('Implementation', 'Practical tasks for implementing learned concepts.', (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com'));

-- 9. Insert Tasks
INSERT INTO Task (Title, TypeID, KanbanStatusID, EisenhowerStatus, TimeTaskRelated, DueDate, EstimatedTime, LearnerID, GoalID)
VALUES 
('Read React Documentation', (SELECT id FROM TaskType WHERE Name = 'Research'), (SELECT id FROM KanbanStatus WHERE Name = 'To Do'), 'Urgent & Important', 'Today', '2024-12-25', '1 hour', (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com'), (SELECT id FROM Goal WHERE Title = 'Learn React.js')),
('Build a React Project', (SELECT id FROM TaskType WHERE Name = 'Implementation'), (SELECT id FROM KanbanStatus WHERE Name = 'In Progress'), 'Not Urgent but Important', 'This Week', '2024-12-30', '3 hours', (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com'), (SELECT id FROM Goal WHERE Title = 'Learn React.js'));

-- 10. Insert Repeat Logic for Recurring Tasks
INSERT INTO Repeat (TaskID, Frequency, Ends, EndDate)
VALUES 
((SELECT id FROM Task WHERE Title = 'Read React Documentation'), 'Daily', 'On Date', '2024-12-25');

-- 11. Insert Subtasks for Ahmed's tasks
INSERT INTO Subtask (Title, Status, TaskID)
VALUES 
('Read the Introduction to React', 'Not Started', (SELECT id FROM Task WHERE Title = 'Read React Documentation')),
('Read the Components section', 'Not Started', (SELECT id FROM Task WHERE Title = 'Read React Documentation'));

-- 12. Insert Notes for Ahmed's learning
INSERT INTO Note (Title, Body, LearnerID, GoalID)
VALUES 
('React Overview', 'React is a library for building user interfaces...', (SELECT id FROM Learner WHERE Email = 'Gemax.hope@gmail.com'), (SELECT id FROM Goal WHERE Title = 'Learn React.js'));

-- Verify the data is inserted correctly by checking the tables
-- You can run SELECT statements like the following to see the inserted data:
-- SELECT * FROM Learner;
-- SELECT * FROM Category;
-- SELECT * FROM Goal;
-- SELECT * FROM Subgoal;
-- SELECT * FROM LearningResource;
-- SELECT * FROM Task;
