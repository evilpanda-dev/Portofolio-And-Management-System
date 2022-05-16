using CVapp.Domain.Models.Authentificated;
using CVapp.Domain.Models.Authentification;
using CVapp.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace CVapp.Infrastructure.Data
{
    public class Context : DbContext
    {
        private readonly string _connectionString = "Data Source=.;Initial Catalog=CVappDb;Integrated Security=True";
        public DbSet<User> Users { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Newsletter> Newsletter { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Money> Money { get; set; }

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
