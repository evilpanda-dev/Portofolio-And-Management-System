using CV.Domain.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CV.Dal.Data.Configurations
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).ValueGeneratedOnAdd()
                .HasColumnName("UserId")
                .HasColumnType("int");
            builder.Property(u => u.UserName)
                .IsRequired()
                .HasMaxLength(40)
                .HasColumnType("nvarchar");
            builder.HasIndex(u => u.UserName)
                .IsUnique();
            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(40)
                .HasColumnType("nvarchar");
            builder.HasIndex(u => u.Email)
                .IsUnique();
            builder.Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnType("nvarchar");
            builder.Property(u => u.Role)
                .HasMaxLength(20)
                .HasColumnType("nvarchar")
                .HasDefaultValue("User");
        }
    }
}
