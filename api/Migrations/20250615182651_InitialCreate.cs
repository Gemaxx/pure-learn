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
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Learner",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
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
                    table.PrimaryKey("PK_Learner", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    table.PrimaryKey("PK_Category", x => x.id);
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
                name: "LearningResourceTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UnitType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LearnerId = table.Column<long>(type: "bigint", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LearningResourceTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LearningResourceTypes_Learner_LearnerId",
                        column: x => x.LearnerId,
                        principalTable: "Learner",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    LearnerId = table.Column<long>(type: "bigint", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskTypes_Learner_LearnerId",
                        column: x => x.LearnerId,
                        principalTable: "Learner",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
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
                    table.PrimaryKey("PK_Goal", x => x.id);
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
                name: "KanbanStatus",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    max_tasks = table.Column<int>(type: "int", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    goal_id = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KanbanStatus", x => x.id);
                    table.ForeignKey(
                        name: "FK_KanbanStatus_Goal",
                        column: x => x.goal_id,
                        principalTable: "Goal",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Subgoals",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    GoalId = table.Column<long>(type: "bigint", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subgoals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subgoals_Goal_GoalId",
                        column: x => x.GoalId,
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
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    type_id = table.Column<long>(type: "bigint", nullable: false),
                    TotalUnits = table.Column<int>(type: "int", nullable: false),
                    Progress = table.Column<int>(type: "int", nullable: false),
                    Link = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(sysdatetime())"),
                    LearnerId = table.Column<long>(type: "bigint", nullable: false),
                    CategoryId = table.Column<long>(type: "bigint", nullable: true),
                    goal_id = table.Column<long>(type: "bigint", nullable: true),
                    SubgoalId = table.Column<long>(type: "bigint", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LearningResource", x => x.id);
                    table.ForeignKey(
                        name: "FK_LearningResource_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_LearningResource_Learner_LearnerId",
                        column: x => x.LearnerId,
                        principalTable: "Learner",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LearningResource_Subgoals_SubgoalId",
                        column: x => x.SubgoalId,
                        principalTable: "Subgoals",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LearningResources_Goals_GoalId",
                        column: x => x.goal_id,
                        principalTable: "Goal",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LearningResources_LearningResourceTypes_TypeId",
                        column: x => x.type_id,
                        principalTable: "LearningResourceTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: true),
                    TypeId = table.Column<long>(type: "bigint", nullable: true),
                    KanbanStatusId = table.Column<long>(type: "bigint", nullable: true),
                    EisenhowerStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LearnerId = table.Column<long>(type: "bigint", nullable: false),
                    CategoryId = table.Column<long>(type: "bigint", nullable: true),
                    GoalId = table.Column<long>(type: "bigint", nullable: true),
                    SubgoalId = table.Column<long>(type: "bigint", nullable: true),
                    LearningResourceId = table.Column<long>(type: "bigint", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Tasks_Goal_GoalId",
                        column: x => x.GoalId,
                        principalTable: "Goal",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Tasks_KanbanStatus_KanbanStatusId",
                        column: x => x.KanbanStatusId,
                        principalTable: "KanbanStatus",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Tasks_Learner_LearnerId",
                        column: x => x.LearnerId,
                        principalTable: "Learner",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_LearningResource_LearningResourceId",
                        column: x => x.LearningResourceId,
                        principalTable: "LearningResource",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Tasks_Subgoals_SubgoalId",
                        column: x => x.SubgoalId,
                        principalTable: "Subgoals",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tasks_TaskTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "TaskTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CategoryId = table.Column<long>(type: "bigint", nullable: true),
                    GoalId = table.Column<long>(type: "bigint", nullable: true),
                    SubgoalId = table.Column<long>(type: "bigint", nullable: true),
                    TaskId = table.Column<long>(type: "bigint", nullable: true),
                    LearnerId = table.Column<long>(type: "bigint", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notes_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Notes_Goal_GoalId",
                        column: x => x.GoalId,
                        principalTable: "Goal",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Notes_Learner_LearnerId",
                        column: x => x.LearnerId,
                        principalTable: "Learner",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Notes_Subgoals_SubgoalId",
                        column: x => x.SubgoalId,
                        principalTable: "Subgoals",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notes_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Subtasks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TaskId = table.Column<long>(type: "bigint", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subtasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subtasks_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Category_learner_id",
                table: "Category",
                column: "learner_id");

            migrationBuilder.CreateIndex(
                name: "IX_Category_parent_category_id",
                table: "Category",
                column: "parent_category_id");

            migrationBuilder.CreateIndex(
                name: "IX_Goal_category_id",
                table: "Goal",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "IX_Goal_learner_id",
                table: "Goal",
                column: "learner_id");

            migrationBuilder.CreateIndex(
                name: "IX_KanbanStatus_goal_id",
                table: "KanbanStatus",
                column: "goal_id");

            migrationBuilder.CreateIndex(
                name: "IX_KanbanStatus_name",
                table: "KanbanStatus",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LearningResource_CategoryId",
                table: "LearningResource",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_LearningResource_goal_id",
                table: "LearningResource",
                column: "goal_id");

            migrationBuilder.CreateIndex(
                name: "IX_LearningResource_LearnerId",
                table: "LearningResource",
                column: "LearnerId");

            migrationBuilder.CreateIndex(
                name: "IX_LearningResource_SubgoalId",
                table: "LearningResource",
                column: "SubgoalId");

            migrationBuilder.CreateIndex(
                name: "IX_LearningResource_type_id",
                table: "LearningResource",
                column: "type_id");

            migrationBuilder.CreateIndex(
                name: "IX_LearningResourceTypes_LearnerId",
                table: "LearningResourceTypes",
                column: "LearnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_CategoryId",
                table: "Notes",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_GoalId",
                table: "Notes",
                column: "GoalId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_LearnerId",
                table: "Notes",
                column: "LearnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_SubgoalId",
                table: "Notes",
                column: "SubgoalId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_TaskId",
                table: "Notes",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Subgoals_GoalId",
                table: "Subgoals",
                column: "GoalId");

            migrationBuilder.CreateIndex(
                name: "IX_Subtasks_TaskId",
                table: "Subtasks",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_CategoryId",
                table: "Tasks",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_GoalId",
                table: "Tasks",
                column: "GoalId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_KanbanStatusId",
                table: "Tasks",
                column: "KanbanStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_LearnerId",
                table: "Tasks",
                column: "LearnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_LearningResourceId",
                table: "Tasks",
                column: "LearningResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_SubgoalId",
                table: "Tasks",
                column: "SubgoalId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_TypeId",
                table: "Tasks",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskTypes_LearnerId",
                table: "TaskTypes",
                column: "LearnerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Notes");

            migrationBuilder.DropTable(
                name: "Subtasks");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "KanbanStatus");

            migrationBuilder.DropTable(
                name: "LearningResource");

            migrationBuilder.DropTable(
                name: "TaskTypes");

            migrationBuilder.DropTable(
                name: "Subgoals");

            migrationBuilder.DropTable(
                name: "LearningResourceTypes");

            migrationBuilder.DropTable(
                name: "Goal");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Learner");
        }
    }
}
