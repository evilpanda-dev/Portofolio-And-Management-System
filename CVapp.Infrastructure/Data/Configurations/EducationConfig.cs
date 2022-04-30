﻿using CVapp.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Data.Configurations
{
    public class EducationConfig: IEntityTypeConfiguration <Education>
    {
        public void Configure(EntityTypeBuilder<Education> builder)
        {
            builder.ToTable("Educations");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).ValueGeneratedOnAdd()
                .HasColumnName("EducationId")
                .HasColumnType("int");
            builder.Property(u=>u.Date)
                .IsRequired()
                .HasColumnName("Date")
                .HasColumnType("int");
            builder.Property(u=> u.Title)
                .IsRequired()
                .HasColumnName("Title")
                .HasColumnType("nvarchar")
                .HasMaxLength(100);
            builder.Property(u=> u.Text)
                .IsRequired()
                .HasColumnName("Description")
                .HasColumnType("nvarchar")
                .HasMaxLength(1000);

        }
    }
}
