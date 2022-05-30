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
            builder.Property(u => u.TransactionAccount)
                .HasMaxLength(50);
            builder.Property(u => u.Category)
                .HasMaxLength(50);
            builder.Property(u => u.Item)
                .HasMaxLength(100);
            builder.Property(u => u.Sum)
                .HasColumnType("float");
            builder.Property(u => u.TransactionType)
                .HasMaxLength(100);
            builder.Property(u => u.Currency)
                .HasMaxLength(10);
        }
    }
}
