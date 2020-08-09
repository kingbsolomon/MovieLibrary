using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPISample.Migrations
{
    public partial class InitialMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    MovieId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Genre = table.Column<string>(nullable: true),
                    Director = table.Column<string>(nullable: true),
                    ImagePath = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.MovieId);
                });

            migrationBuilder.InsertData(
                table: "Movies",
                columns: new[] { "MovieId", "Director", "Genre", "ImagePath", "Title" },
                values: new object[,]
                {
                    { 1, "Martin Scorsese", "Drama", "theDeparted.jpg", "The Departed" },
                    { 2, "Christopher Nolan", "Drama", "dk.jpg", "The Dark Knight" },
                    { 3, "Christopher Nolan", "Drama", "inception.jpg", "Inception" },
                    { 4, "David Gordon Green", "Comedy", "pe.jpg", "Pineapple Express" },
                    { 5, "John McTiernan", "Action", "dieHard.jpg", "Die Hard" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Movies");
        }
    }
}
