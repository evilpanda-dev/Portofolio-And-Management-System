using CV.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CV.Dal.Data.Configurations
{
    public class EducationConfig : IEntityTypeConfiguration<Education>
    {
        public void Configure(EntityTypeBuilder<Education> builder)
        {
            builder.ToTable("Educations");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("EducationId");
            builder.Property(u => u.Date)
                .IsRequired();
            builder.Property(u => u.Title)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(u => u.Text)
                .IsRequired()
                .HasColumnName("Description")
                .HasMaxLength(1000);
        }
    }
}
