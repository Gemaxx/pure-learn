using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddPomodoroInsight : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PomodoroInsight",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    learner_id = table.Column<long>(type: "bigint", nullable: false),
                    total_pomodoros = table.Column<int>(type: "int", nullable: false),
                    total_focus_time = table.Column<TimeSpan>(type: "time", nullable: false),
                    weekly_pomodoros = table.Column<int>(type: "int", nullable: false),
                    weekly_focus_time = table.Column<TimeSpan>(type: "time", nullable: false),
                    week_of = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PomodoroInsight", x => x.id);
                    table.ForeignKey(
                        name: "FK_PomodoroInsight_Learner",
                        column: x => x.learner_id,
                        principalTable: "Learner",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PomodoroInsight_learner_id",
                table: "PomodoroInsight",
                column: "learner_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PomodoroInsight");
        }
    }
}
