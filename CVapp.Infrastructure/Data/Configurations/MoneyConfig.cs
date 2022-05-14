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
    public class MoneyConfig : IEntityTypeConfiguration<Money>
    {
        public void Configure(EntityTypeBuilder<Money> builder)
        {
            builder.ToTable("Money");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).ValueGeneratedOnAdd()
                .HasColumnType("int")
                .HasColumnName("Id");
            builder.Property(u=> u.TransactionDate)
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
            builder.Property(u => u.Amount)
                .HasColumnType("float")
                .HasColumnName("Amount");
            builder.Property(u => u.TransactionType)
                .HasColumnType("nvarchar")
                .HasMaxLength(100)
                .HasColumnName("TransactionType");
            builder.Property(u => u.Currency)
                .HasColumnType("nvarchar(10)")
                .HasColumnName("Currency");
            /*builder.ToTable("Comments");
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
            builder.Property(u => u.ParentId)
               .HasColumnName("ParentId")
               .HasColumnType("int");
            builder.Property(u => u.CreatedAt)
                .HasColumnName("CreatedAt")
                .HasColumnType("datetime");*/

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
