using CV.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CV.Dal.Data.Configurations
{
    public class CommentConfig : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.ToTable("Comments");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id)
                .ValueGeneratedOnAdd()
                .HasColumnType("int")
                .HasColumnName("CommentId");
            builder.Property(u => u.Text)
                .HasColumnName("Text")
                .HasMaxLength(1000)
                .HasColumnType("nvarchar");
            builder.Property(u => u.UserName)
                .HasColumnName("UserName")
                .HasColumnType("nvarchar")
                .HasMaxLength(30);
            builder.Property(u => u.ParentId)
               .HasColumnName("ParentId")
               .HasColumnType("int");
            builder.Property(u => u.CreatedAt)
                .HasColumnName("CreatedAt")
                .HasColumnType("datetime");
        }
    }
}
