using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddDefaultValueToIsDeletedColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "FK_LearningResources_Goals_GoalId",
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
                name: "FK_Subgoals_Goal_GoalId1",
                table: "Subgoals");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Goal_GoalId1",
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

            migrationBuilder.AddForeignKey(
                name: "FK_LearningResource_Category_CategoryId",
                table: "LearningResource",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_LearningResource_Goal_goal_id",
                table: "LearningResource",
                column: "goal_id",
                principalTable: "Goal",
                principalColumn: "id");

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
                name: "FK_Tasks_Subgoals_SubgoalId",
                table: "Tasks",
                column: "SubgoalId",
                principalTable: "Subgoals",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LearningResource_Category_CategoryId",
                table: "LearningResource");

            migrationBuilder.DropForeignKey(
                name: "FK_LearningResource_Goal_goal_id",
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
                name: "FK_Tasks_Subgoals_SubgoalId",
                table: "Tasks");

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

            migrationBuilder.AddColumn<long>(
                name: "GoalId1",
                table: "Subgoals",
                type: "bigint",
                nullable: true);

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
                name: "FK_LearningResources_Goals_GoalId",
                table: "LearningResource",
                column: "goal_id",
                principalTable: "Goal",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

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
                name: "FK_Subgoals_Goal_GoalId1",
                table: "Subgoals",
                column: "GoalId1",
                principalTable: "Goal",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Goal_GoalId1",
                table: "Tasks",
                column: "GoalId1",
                principalTable: "Goal",
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
        }
    }
}
