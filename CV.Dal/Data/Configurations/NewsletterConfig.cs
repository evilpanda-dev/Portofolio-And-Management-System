using CV.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CV.Dal.Data.Configurations
{
    public class NewsletterConfig : IEntityTypeConfiguration<Newsletter>
    {
        public void Configure(EntityTypeBuilder<Newsletter> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).ValueGeneratedOnAdd()
                .HasColumnType("int");
            builder.Property(u => u.Email)
                .HasColumnType("nvarchar")
                .HasMaxLength(20)
                .HasColumnName("Email");
        }
    }
}
