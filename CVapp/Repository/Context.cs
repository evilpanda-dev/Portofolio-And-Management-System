﻿using CVapp.Models.Authentification;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace CVapp.Repository
{
    public class Context : DbContext
    {
        private readonly string _connectionString = "Data Source=.;Initial Catalog=CVappDb;Integrated Security=True";
        public DbSet<User> Users { get; set; }
        
        public Context()
        { 
        }

        public Context(string connectionString)
        {
            _connectionString = connectionString;
        }

        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(Context)));
        }
    }
}