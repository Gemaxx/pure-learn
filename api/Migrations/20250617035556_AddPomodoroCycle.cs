using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddPomodoroCycle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "StudySession",
                type: "rowversion",
                rowVersion: true,
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<string>(
                name: "IdentityId",
                table: "Learner",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "PomodoroCycle",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    study_session_id = table.Column<long>(type: "bigint", nullable: false),
                    is_completed = table.Column<bool>(type: "bit", nullable: false),
                    start_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    end_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    break_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    break_start = table.Column<DateTime>(type: "datetime2", nullable: true),
                    break_end = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PomodoroCycle", x => x.id);
                    table.ForeignKey(
                        name: "FK_PomodoroCycle_StudySession_study_session_id",
                        column: x => x.study_session_id,
                        principalTable: "StudySession",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PomodoroCycle_study_session_id",
                table: "PomodoroCycle",
                column: "study_session_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PomodoroCycle");

            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "StudySession");

            migrationBuilder.DropColumn(
                name: "IdentityId",
                table: "Learner");
        }
    }
}
