using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CVapp.Migrations
{
    public partial class ChangeColumnNameInMoneyTableFromAmountToSum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Money",
                newName: "Sum");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Sum",
                table: "Money",
                newName: "Amount");
        }
    }
}
