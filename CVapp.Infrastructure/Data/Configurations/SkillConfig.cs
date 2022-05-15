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
    public class SkillConfig : IEntityTypeConfiguration<Skill>
    {
        public void Configure(EntityTypeBuilder<Skill> builder)
        {
            builder.ToTable("Skills");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).ValueGeneratedOnAdd()
                .HasColumnName("SkillId")
                .HasColumnType("int");
            builder.Property(u => u.Name)
                .IsRequired()
                .HasColumnName("SkillName")
                .HasColumnType("nvarchar")
                .HasMaxLength(50);
            builder.HasIndex(u => u.Name)
               .IsUnique();
            builder.Property(u => u.Range)
                .IsRequired()
                .HasColumnName("SkillRange")
                .HasColumnType("int");

        }
    }
}