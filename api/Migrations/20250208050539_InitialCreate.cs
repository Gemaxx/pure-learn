using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Learner",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    password_hash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    profile_picture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    bio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CREATEd_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    last_login = table.Column<DateTime>(type: "datetime2", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Learner__3213E83F78F21700", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    color = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CREATEd_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    parent_category_id = table.Column<long>(type: "bigint", nullable: true),
                    learner_id = table.Column<long>(type: "bigint", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Category__3213E83F6B2F1F4A", x => x.id);
                    table.ForeignKey(
                        name: "FK__Category__learne__6383C8BA",
                        column: x => x.learner_id,
                        principalTable: "Learner",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Category__parent__6477ECF3",
                        column: x => x.parent_category_id,
                        principalTable: "Category",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "KanbanStatus",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    max_tasks = table.Column<int>(type: "int", nullable: true),
                    learner_id = table.Column<long>(type: "bigint", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__KanbanSt__3213E83F57FA3597", x => x.id);
                    table.ForeignKey(
                        name: "FK__KanbanSta__learn__04E4BC85",
                        column: x => x.learner_id,
                        principalTable: "Learner",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "LearningResourceType",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    unit_type = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    learner_id = table.Column<long>(type: "bigint", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Learning__3213E83FD14E54DB", x => x.id);
                    table.ForeignKey(
                        name: "FK__LearningR__learn__75A278F5",
                        column: x => x.learner_id,
                        principalTable: "Learner",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "TaskType",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    icon = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    learner_id = table.Column<long>(type: "bigint", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TaskType__3213E83FBD5F41F1", x => x.id);
                    table.ForeignKey(
                        name: "FK__TaskType__learne__08B54D69",
                        column: x => x.learner_id,
                        principalTable: "Learner",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Goal",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    motivation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    term = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    completion_date = table.Column<DateOnly>(type: "date", nullable: true),
                    CREATEd_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    category_id = table.Column<long>(type: "bigint", nullable: true),
                    learner_id = table.Column<long>(type: "bigint", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Goal__3213E83F4B8AC773", x => x.id);
                    table.ForeignKey(
                        name: "FK__Goal__category_i__6B24EA82",
                        column: x => x.category_id,
                        principalTable: "Category",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Goal__learner_id__6C190EBB",
                        column: x => x.learner_id,
                        principalTable: "Learner",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Subgoal",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CREATEd_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    goal_id = table.Column<long>(type: "bigint", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Subgoal__3213E83F5F751E7D", x => x.id);
                    table.ForeignKey(
                        name: "FK__Subgoal__goal_id__70DDC3D8",
                        column: x => x.goal_id,
                        principalTable: "Goal",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LearningResource",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    type_id = table.Column<long>(type: "bigint", nullable: false),
                    total_units = table.Column<int>(type: "int", nullable: false),
                    progress = table.Column<int>(type: "int", nullable: false),
                    link = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CREATEd_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    learner_id = table.Column<long>(type: "bigint", nullable: false),
                    category_id = table.Column<long>(type: "bigint", nullable: true),
                    goal_id = table.Column<long>(type: "bigint", nullable: true),
                    subgoal_id = table.Column<long>(type: "bigint", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Learning__3213E83F012A92B3", x => x.id);
                    table.ForeignKey(
                        name: "FK__LearningR__categ__7D439ABD",
                        column: x => x.category_id,
                        principalTable: "Category",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__LearningR__goal___7E37BEF6",
                        column: x => x.goal_id,
                        principalTable: "Goal",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__LearningR__learn__7C4F7684",
                        column: x => x.learner_id,
                        principalTable: "Learner",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__LearningR__subgo__7F2BE32F",
                        column: x => x.subgoal_id,
                        principalTable: "Subgoal",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__LearningR__type___787EE5A0",
                        column: x => x.type_id,
                        principalTable: "LearningResourceType",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Task",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    type_id = table.Column<long>(type: "bigint", nullable: false),
                    kanban_status_id = table.Column<long>(type: "bigint", nullable: false),
                    eisenhower_status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    time_task_related = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    due_date = table.Column<DateOnly>(type: "date", nullable: true),
                    estimated_time = table.Column<TimeOnly>(type: "time", nullable: true),
                    time_spent = table.Column<TimeOnly>(type: "time", nullable: true),
                    repeat_frequency = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false, defaultValue: "None"),
                    repeat_interval = table.Column<int>(type: "int", nullable: true),
                    repeat_on_sunday = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    repeat_on_monday = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    repeat_on_tuesday = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    repeat_on_wednesday = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    repeat_on_thursday = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    repeat_on_friday = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    repeat_on_saturday = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    repeat_ends = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    repeat_end_date = table.Column<DateOnly>(type: "date", nullable: true),
                    repeat_end_occurrences = table.Column<int>(type: "int", nullable: true),
                    CREATEd_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    learner_id = table.Column<long>(type: "bigint", nullable: false),
                    category_id = table.Column<long>(type: "bigint", nullable: true),
                    goal_id = table.Column<long>(type: "bigint", nullable: true),
                    subgoal_id = table.Column<long>(type: "bigint", nullable: true),
                    learning_resource_id = table.Column<long>(type: "bigint", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Task__3213E83F69BC2DC8", x => x.id);
                    table.ForeignKey(
                        name: "FK__Task__category_i__1BC821DD",
                        column: x => x.category_id,
                        principalTable: "Category",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__Task__goal_id__1CBC4616",
                        column: x => x.goal_id,
                        principalTable: "Goal",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__Task__kanban_sta__0C85DE4D",
                        column: x => x.kanban_status_id,
                        principalTable: "KanbanStatus",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Task__learner_id__1AD3FDA4",
                        column: x => x.learner_id,
                        principalTable: "Learner",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Task__learning_r__1EA48E88",
                        column: x => x.learning_resource_id,
                        principalTable: "LearningResource",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__Task__subgoal_id__1DB06A4F",
                        column: x => x.subgoal_id,
                        principalTable: "Subgoal",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__Task__type_id__0B91BA14",
                        column: x => x.type_id,
                        principalTable: "TaskType",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Note",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CREATEd_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    category_id = table.Column<long>(type: "bigint", nullable: true),
                    goal_id = table.Column<long>(type: "bigint", nullable: true),
                    subgoal_id = table.Column<long>(type: "bigint", nullable: true),
                    task_id = table.Column<long>(type: "bigint", nullable: true),
                    learner_id = table.Column<long>(type: "bigint", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Note__3213E83F92F5C8DD", x => x.id);
                    table.ForeignKey(
                        name: "FK__Note__category_i__29221CFB",
                        column: x => x.category_id,
                        principalTable: "Category",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__Note__goal_id__2A164134",
                        column: x => x.goal_id,
                        principalTable: "Goal",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__Note__learner_id__2CF2ADDF",
                        column: x => x.learner_id,
                        principalTable: "Learner",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Note__subgoal_id__2B0A656D",
                        column: x => x.subgoal_id,
                        principalTable: "Subgoal",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__Note__task_id__2BFE89A6",
                        column: x => x.task_id,
                        principalTable: "Task",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Subtask",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CREATEd_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    task_id = table.Column<long>(type: "bigint", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Subtask__3213E83F63A2F46B", x => x.id);
                    table.ForeignKey(
                        name: "FK__Subtask__task_id__245D67DE",
                        column: x => x.task_id,
                        principalTable: "Task",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "idx_category_learner_id",
                table: "Category",
                column: "learner_id");

            migrationBuilder.CreateIndex(
                name: "idx_category_parent_category_id",
                table: "Category",
                column: "parent_category_id");

            migrationBuilder.CreateIndex(
                name: "idx_goal_category_id",
                table: "Goal",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "idx_goal_learner_id",
                table: "Goal",
                column: "learner_id");

            migrationBuilder.CreateIndex(
                name: "idx_kanbanstatus_learner_id",
                table: "KanbanStatus",
                column: "learner_id");

            migrationBuilder.CreateIndex(
                name: "UQ__KanbanSt__72E12F1B5B560D7E",
                table: "KanbanStatus",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Learner__AB6E6164FBEEBA46",
                table: "Learner",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_learningresource_category_id",
                table: "LearningResource",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "idx_learningresource_goal_id",
                table: "LearningResource",
                column: "goal_id");

            migrationBuilder.CreateIndex(
                name: "idx_learningresource_learner_id",
                table: "LearningResource",
                column: "learner_id");

            migrationBuilder.CreateIndex(
                name: "idx_learningresource_subgoal_id",
                table: "LearningResource",
                column: "subgoal_id");

            migrationBuilder.CreateIndex(
                name: "idx_learningresource_type_id",
                table: "LearningResource",
                column: "type_id");

            migrationBuilder.CreateIndex(
                name: "idx_learningresourcetype_learner_id",
                table: "LearningResourceType",
                column: "learner_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Learning__72E12F1BA472CB30",
                table: "LearningResourceType",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Learning__978BEDD53942A437",
                table: "LearningResourceType",
                column: "unit_type",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_note_category_id",
                table: "Note",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "idx_note_goal_id",
                table: "Note",
                column: "goal_id");

            migrationBuilder.CreateIndex(
                name: "idx_note_learner_id",
                table: "Note",
                column: "learner_id");

            migrationBuilder.CreateIndex(
                name: "idx_note_subgoal_id",
                table: "Note",
                column: "subgoal_id");

            migrationBuilder.CreateIndex(
                name: "idx_note_task_id",
                table: "Note",
                column: "task_id");

            migrationBuilder.CreateIndex(
                name: "idx_subgoal_goal_id",
                table: "Subgoal",
                column: "goal_id");

            migrationBuilder.CreateIndex(
                name: "idx_subtask_task_id",
                table: "Subtask",
                column: "task_id");

            migrationBuilder.CreateIndex(
                name: "idx_task_category_id",
                table: "Task",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "idx_task_goal_id",
                table: "Task",
                column: "goal_id");

            migrationBuilder.CreateIndex(
                name: "idx_task_kanban_status_id",
                table: "Task",
                column: "kanban_status_id");

            migrationBuilder.CreateIndex(
                name: "idx_task_learner_id",
                table: "Task",
                column: "learner_id");

            migrationBuilder.CreateIndex(
                name: "idx_task_learning_resource_id",
                table: "Task",
                column: "learning_resource_id");

            migrationBuilder.CreateIndex(
                name: "idx_task_subgoal_id",
                table: "Task",
                column: "subgoal_id");

            migrationBuilder.CreateIndex(
                name: "idx_task_type_id",
                table: "Task",
                column: "type_id");

            migrationBuilder.CreateIndex(
                name: "idx_tasktype_learner_id",
                table: "TaskType",
                column: "learner_id");

            migrationBuilder.CreateIndex(
                name: "UQ__TaskType__72E12F1BF080C4B8",
                table: "TaskType",
                column: "name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Note");

            migrationBuilder.DropTable(
                name: "Subtask");

            migrationBuilder.DropTable(
                name: "Task");

            migrationBuilder.DropTable(
                name: "KanbanStatus");

            migrationBuilder.DropTable(
                name: "LearningResource");

            migrationBuilder.DropTable(
                name: "TaskType");

            migrationBuilder.DropTable(
                name: "Subgoal");

            migrationBuilder.DropTable(
                name: "LearningResourceType");

            migrationBuilder.DropTable(
                name: "Goal");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Learner");
        }
    }
}
