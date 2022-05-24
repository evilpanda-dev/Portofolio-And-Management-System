using CV.Domain.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CV.Dal.Data.Configurations
{
    public class UserProfileConfig : IEntityTypeConfiguration<UserProfile>
    {
        public void Configure(EntityTypeBuilder<UserProfile> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id)
                .ValueGeneratedOnAdd()
                .HasColumnType("int");
            builder.Property(u => u.FirstName)
                .HasColumnName("FirstName")
                .HasMaxLength(50)
                .HasColumnType("nvarchar");
            builder.Property(u => u.LastName)
            .HasColumnName("LastName")
            .HasMaxLength(50)
            .HasColumnType("nvarchar");
            builder.Property(u => u.BirthDate)
            .HasColumnName("BirthDate")
            .HasColumnType("DateTime");
            builder.Property(u => u.Address)
            .HasColumnName("Address")
            .HasMaxLength(50)
            .HasColumnType("nvarchar");
            builder.Property(u => u.City)
            .HasColumnName("City")
            .HasMaxLength(50)
            .HasColumnType("nvarchar");
            builder.Property(u => u.Country)
            .HasColumnName("Country")
            .HasMaxLength(50)
            .HasColumnType("nvarchar");
            builder.Property(u => u.PhoneNumber)
            .HasColumnName("PhoneNumber")
            .HasMaxLength(20)
            .HasColumnType("int");
            builder.Property(u => u.AboutMe)
            .HasColumnName("AboutMe")
            .HasMaxLength(100)
            .HasColumnType("nvarchar");

        }
    }
}
