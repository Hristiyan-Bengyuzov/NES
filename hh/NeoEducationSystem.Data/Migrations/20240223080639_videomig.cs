using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NeoEducationSystem.Data.Migrations
{
    /// <inheritdoc />
    public partial class videomig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VideoUrl",
                table: "Lessons",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VideoUrl",
                table: "Lessons");
        }
    }
}
