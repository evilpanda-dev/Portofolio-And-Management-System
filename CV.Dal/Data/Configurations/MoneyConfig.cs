using CV.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CV.Dal.Data.Configurations
{
    public class MoneyConfig : IEntityTypeConfiguration<Money>
    {
        public void Configure(EntityTypeBuilder<Money> builder)
        {
            builder.ToTable("Money");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id)
                .ValueGeneratedOnAdd()
                .HasColumnType("int")
                .HasColumnName("Id");
            builder.Property(u => u.TransactionDate)
                .HasColumnType("datetime")
                .HasColumnName("TransactionDate");
            builder.Property(u => u.TransactionAccount)
                .HasColumnType("nvarchar(50)")
                .HasColumnName("TransactionAccount");
            builder.Property(u => u.Category)
                .HasColumnType("nvarchar")
                .HasMaxLength(50)
                .HasColumnName("Category");
            builder.Property(u => u.Item)
                .HasColumnType("nvarchar")
                .HasMaxLength(100)
                .HasColumnName("Item");
            builder.Property(u => u.Sum)
                .HasColumnType("float")
                .HasColumnName("Sum");
            builder.Property(u => u.TransactionType)
                .HasColumnType("nvarchar")
                .HasMaxLength(100)
                .HasColumnName("TransactionType");
            builder.Property(u => u.Currency)
                .HasColumnType("nvarchar(10)")
                .HasColumnName("Currency");
        }
    }
}
