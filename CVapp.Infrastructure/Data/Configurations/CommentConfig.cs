using CVapp.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Data.Configurations
{
    public class CommentConfig : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.ToTable("Comments");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).ValueGeneratedOnAdd()
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
             builder.Property(u=> u.ParentId)
                .HasColumnName("ParentId")
                .HasColumnType("int");
            builder.Property(u => u.CreatedAt)
                .HasColumnName("CreatedAt")
                .HasColumnType("datetime");
            
            /*builder.Property(u => u.FirstName)
                .HasColumnName("FirstName")
                .HasMaxLength(50)
                .HasColumnType("nvarchar");
            builder.Property(u => u.Text)
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
            .HasColumnType("nvarchar");*/

        }
        }
    }
