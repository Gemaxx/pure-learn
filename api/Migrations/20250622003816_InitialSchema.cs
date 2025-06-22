using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class InitialSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LearningResource_Category_CategoryId",
                table: "LearningResource");

            migrationBuilder.DropForeignKey(
                name: "FK_LearningResource_Learner_LearnerId",
                table: "LearningResource");

            migrationBuilder.DropForeignKey(
                name: "FK_LearningResource_Subgoals_SubgoalId",
                table: "LearningResource");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Subgoals_SubgoalId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Tasks_TaskId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_PomodoroCycle_StudySession_study_session_id",
                table: "PomodoroCycle");

            migrationBuilder.DropForeignKey(
                name: "FK_PomodoroInsight_Learner",
                table: "PomodoroInsight");

            migrationBuilder.DropForeignKey(
                name: "FK_StudySession_Learner",
                table: "StudySession");

            migrationBuilder.DropForeignKey(
                name: "FK_StudySession_Task",
                table: "StudySession");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Category_CategoryId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Goal_GoalId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_KanbanStatus_KanbanStatusId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Subgoals_SubgoalId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_TaskTypes_TypeId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_TimerSettings_Learner_LearnerId1",
                table: "TimerSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_TimerSettings_Learner_learner_id",
                table: "TimerSettings");

            migrationBuilder.DropIndex(
                name: "IX_TimerSettings_learner_id",
                table: "TimerSettings");

            migrationBuilder.DropIndex(
                name: "IX_TimerSettings_LearnerId1",
                table: "TimerSettings");

            migrationBuilder.DropColumn(
                name: "LearnerId1",
                table: "TimerSettings");

            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "Subtasks");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "TimerSettings",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "short_break_min",
                table: "TimerSettings",
                newName: "ShortBreakMin");

            migrationBuilder.RenameColumn(
                name: "long_break_min",
                table: "TimerSettings",
                newName: "LongBreakMin");

            migrationBuilder.RenameColumn(
                name: "learner_id",
                table: "TimerSettings",
                newName: "LearnerId");

            migrationBuilder.RenameColumn(
                name: "focus_minutes",
                table: "TimerSettings",
                newName: "FocusMinutes");

            migrationBuilder.RenameColumn(
                name: "cycles_before_long_break",
                table: "TimerSettings",
                newName: "CyclesBeforeLongBreak");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "TaskTypes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "TaskTypes",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Tasks",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<long>(
                name: "GoalId1",
                table: "Tasks",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LearningResourceId1",
                table: "Tasks",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "SubgoalId1",
                table: "Tasks",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Subtasks",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Subtasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "GoalId1",
                table: "Subgoals",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "updated_at",
                table: "StudySession",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true,
                oldDefaultValueSql: "sysdatetime()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                table: "StudySession",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true,
                oldDefaultValueSql: "sysdatetime()");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Notes",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<long>(
                name: "CategoryId1",
                table: "Notes",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "GoalId1",
                table: "Notes",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "SubgoalId1",
                table: "Notes",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "TaskId1",
                table: "Notes",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "LearningResourceTypes",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<long>(
                name: "CategoryId1",
                table: "LearningResource",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "SubgoalId1",
                table: "LearningResource",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TimerSettings_LearnerId",
                table: "TimerSettings",
                column: "LearnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_GoalId1",
                table: "Tasks",
                column: "GoalId1");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_LearningResourceId1",
                table: "Tasks",
                column: "LearningResourceId1");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_SubgoalId1",
                table: "Tasks",
                column: "SubgoalId1");

            migrationBuilder.CreateIndex(
                name: "IX_Subgoals_GoalId1",
                table: "Subgoals",
                column: "GoalId1");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_CategoryId1",
                table: "Notes",
                column: "CategoryId1");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_GoalId1",
                table: "Notes",
                column: "GoalId1");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_SubgoalId1",
                table: "Notes",
                column: "SubgoalId1");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_TaskId1",
                table: "Notes",
                column: "TaskId1");

            migrationBuilder.CreateIndex(
                name: "IX_LearningResource_CategoryId1",
                table: "LearningResource",
                column: "CategoryId1");

            migrationBuilder.CreateIndex(
                name: "IX_LearningResource_SubgoalId1",
                table: "LearningResource",
                column: "SubgoalId1");

            migrationBuilder.AddForeignKey(
                name: "FK_LearningResource_Category_CategoryId1",
                table: "LearningResource",
                column: "CategoryId1",
                principalTable: "Category",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_LearningResource_Subgoals_SubgoalId1",
                table: "LearningResource",
                column: "SubgoalId1",
                principalTable: "Subgoals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LearningResources_Category_CategoryId",
                table: "LearningResource",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_LearningResources_Learner_LearnerId",
                table: "LearningResource",
                column: "LearnerId",
                principalTable: "Learner",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LearningResources_Subgoal_SubgoalId",
                table: "LearningResource",
                column: "SubgoalId",
                principalTable: "Subgoals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Category_CategoryId1",
                table: "Notes",
                column: "CategoryId1",
                principalTable: "Category",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Goal_GoalId1",
                table: "Notes",
                column: "GoalId1",
                principalTable: "Goal",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Subgoal_SubgoalId",
                table: "Notes",
                column: "SubgoalId",
                principalTable: "Subgoals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Subgoals_SubgoalId1",
                table: "Notes",
                column: "SubgoalId1",
                principalTable: "Subgoals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Task_TaskId",
                table: "Notes",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Tasks_TaskId1",
                table: "Notes",
                column: "TaskId1",
                principalTable: "Tasks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PomodoroCycle_StudySession_StudySessionId",
                table: "PomodoroCycle",
                column: "study_session_id",
                principalTable: "StudySession",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PomodoroInsight_Learner_LearnerId",
                table: "PomodoroInsight",
                column: "learner_id",
                principalTable: "Learner",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudySession_Learner_LearnerId",
                table: "StudySession",
                column: "learner_id",
                principalTable: "Learner",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudySession_Tasks_TaskId",
                table: "StudySession",
                column: "task_id",
                principalTable: "Tasks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Subgoals_Goal_GoalId1",
                table: "Subgoals",
                column: "GoalId1",
                principalTable: "Goal",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Category_CategoryId",
                table: "Tasks",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Goal_GoalId",
                table: "Tasks",
                column: "GoalId",
                principalTable: "Goal",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Goal_GoalId1",
                table: "Tasks",
                column: "GoalId1",
                principalTable: "Goal",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_KanbanStatus_KanbanStatusId",
                table: "Tasks",
                column: "KanbanStatusId",
                principalTable: "KanbanStatus",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_LearningResource_LearningResourceId1",
                table: "Tasks",
                column: "LearningResourceId1",
                principalTable: "LearningResource",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Subgoal_SubgoalId",
                table: "Tasks",
                column: "SubgoalId",
                principalTable: "Subgoals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Subgoals_SubgoalId1",
                table: "Tasks",
                column: "SubgoalId1",
                principalTable: "Subgoals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_TaskTypes_TypeId",
                table: "Tasks",
                column: "TypeId",
                principalTable: "TaskTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TimerSettings_Learner_LearnerId",
                table: "TimerSettings",
                column: "LearnerId",
                principalTable: "Learner",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LearningResource_Category_CategoryId1",
                table: "LearningResource");

            migrationBuilder.DropForeignKey(
                name: "FK_LearningResource_Subgoals_SubgoalId1",
                table: "LearningResource");

            migrationBuilder.DropForeignKey(
                name: "FK_LearningResources_Category_CategoryId",
                table: "LearningResource");

            migrationBuilder.DropForeignKey(
                name: "FK_LearningResources_Learner_LearnerId",
                table: "LearningResource");

            migrationBuilder.DropForeignKey(
                name: "FK_LearningResources_Subgoal_SubgoalId",
                table: "LearningResource");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Category_CategoryId1",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Goal_GoalId1",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Subgoal_SubgoalId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Subgoals_SubgoalId1",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Task_TaskId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Tasks_TaskId1",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_PomodoroCycle_StudySession_StudySessionId",
                table: "PomodoroCycle");

            migrationBuilder.DropForeignKey(
                name: "FK_PomodoroInsight_Learner_LearnerId",
                table: "PomodoroInsight");

            migrationBuilder.DropForeignKey(
                name: "FK_StudySession_Learner_LearnerId",
                table: "StudySession");

            migrationBuilder.DropForeignKey(
                name: "FK_StudySession_Tasks_TaskId",
                table: "StudySession");

            migrationBuilder.DropForeignKey(
                name: "FK_Subgoals_Goal_GoalId1",
                table: "Subgoals");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Category_CategoryId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Goal_GoalId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Goal_GoalId1",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_KanbanStatus_KanbanStatusId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_LearningResource_LearningResourceId1",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Subgoal_SubgoalId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Subgoals_SubgoalId1",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_TaskTypes_TypeId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_TimerSettings_Learner_LearnerId",
                table: "TimerSettings");

            migrationBuilder.DropIndex(
                name: "IX_TimerSettings_LearnerId",
                table: "TimerSettings");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_GoalId1",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_LearningResourceId1",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_SubgoalId1",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Subgoals_GoalId1",
                table: "Subgoals");

            migrationBuilder.DropIndex(
                name: "IX_Notes_CategoryId1",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_GoalId1",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_SubgoalId1",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_TaskId1",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_LearningResource_CategoryId1",
                table: "LearningResource");

            migrationBuilder.DropIndex(
                name: "IX_LearningResource_SubgoalId1",
                table: "LearningResource");

            migrationBuilder.DropColumn(
                name: "GoalId1",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "LearningResourceId1",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "SubgoalId1",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Subtasks");

            migrationBuilder.DropColumn(
                name: "GoalId1",
                table: "Subgoals");

            migrationBuilder.DropColumn(
                name: "CategoryId1",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "GoalId1",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "SubgoalId1",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "TaskId1",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "CategoryId1",
                table: "LearningResource");

            migrationBuilder.DropColumn(
                name: "SubgoalId1",
                table: "LearningResource");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "TimerSettings",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ShortBreakMin",
                table: "TimerSettings",
                newName: "short_break_min");

            migrationBuilder.RenameColumn(
                name: "LongBreakMin",
                table: "TimerSettings",
                newName: "long_break_min");

            migrationBuilder.RenameColumn(
                name: "LearnerId",
                table: "TimerSettings",
                newName: "learner_id");

            migrationBuilder.RenameColumn(
                name: "FocusMinutes",
                table: "TimerSettings",
                newName: "focus_minutes");

            migrationBuilder.RenameColumn(
                name: "CyclesBeforeLongBreak",
                table: "TimerSettings",
                newName: "cycles_before_long_break");

            migrationBuilder.AddColumn<long>(
                name: "LearnerId1",
                table: "TimerSettings",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "TaskTypes",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "TaskTypes",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Tasks",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Subtasks",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "Subtasks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "updated_at",
                table: "StudySession",
                type: "datetime2",
                nullable: true,
                defaultValueSql: "sysdatetime()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                table: "StudySession",
                type: "datetime2",
                nullable: true,
                defaultValueSql: "sysdatetime()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Notes",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "LearningResourceTypes",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_TimerSettings_learner_id",
                table: "TimerSettings",
                column: "learner_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TimerSettings_LearnerId1",
                table: "TimerSettings",
                column: "LearnerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_LearningResource_Category_CategoryId",
                table: "LearningResource",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_LearningResource_Learner_LearnerId",
                table: "LearningResource",
                column: "LearnerId",
                principalTable: "Learner",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LearningResource_Subgoals_SubgoalId",
                table: "LearningResource",
                column: "SubgoalId",
                principalTable: "Subgoals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Subgoals_SubgoalId",
                table: "Notes",
                column: "SubgoalId",
                principalTable: "Subgoals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Tasks_TaskId",
                table: "Notes",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PomodoroCycle_StudySession_study_session_id",
                table: "PomodoroCycle",
                column: "study_session_id",
                principalTable: "StudySession",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PomodoroInsight_Learner",
                table: "PomodoroInsight",
                column: "learner_id",
                principalTable: "Learner",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudySession_Learner",
                table: "StudySession",
                column: "learner_id",
                principalTable: "Learner",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudySession_Task",
                table: "StudySession",
                column: "task_id",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Category_CategoryId",
                table: "Tasks",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Goal_GoalId",
                table: "Tasks",
                column: "GoalId",
                principalTable: "Goal",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_KanbanStatus_KanbanStatusId",
                table: "Tasks",
                column: "KanbanStatusId",
                principalTable: "KanbanStatus",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Subgoals_SubgoalId",
                table: "Tasks",
                column: "SubgoalId",
                principalTable: "Subgoals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_TaskTypes_TypeId",
                table: "Tasks",
                column: "TypeId",
                principalTable: "TaskTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TimerSettings_Learner_LearnerId1",
                table: "TimerSettings",
                column: "LearnerId1",
                principalTable: "Learner",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimerSettings_Learner_learner_id",
                table: "TimerSettings",
                column: "learner_id",
                principalTable: "Learner",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
