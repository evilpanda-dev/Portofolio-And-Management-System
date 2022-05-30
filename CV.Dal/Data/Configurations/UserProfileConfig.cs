using CV.Domain.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CV.Dal.Data.Configurations
{
    public class UserProfileConfig : IEntityTypeConfiguration<UserProfile>
    {
        public void Configure(EntityTypeBuilder<UserProfile> builder)
        {
            builder.Property(u => u.FirstName)
                .HasMaxLength(50);
            builder.Property(u => u.LastName)
            .HasMaxLength(50);
            builder.Property(u => u.Address)
            .HasMaxLength(50);
            builder.Property(u => u.City)
            .HasMaxLength(50);
            builder.Property(u => u.Country)
            .HasMaxLength(50);
            builder.Property(u => u.PhoneNumber)
            .HasMaxLength(20);
            builder.Property(u => u.AboutMe)
            .HasMaxLength(100);
        }
    }
}
