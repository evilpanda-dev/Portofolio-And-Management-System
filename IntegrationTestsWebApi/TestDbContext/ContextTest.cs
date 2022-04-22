using CVapp.Domain.Models.Authentificated;
using CVapp.Domain.Models.Authentification;
using CVapp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace IntegrationTestsWebApi.TestDbContext
{
    public class ContextTest : DbContext
    {
        private readonly string _connectionString = "Data Source=.;Initial Catalog=CVappDbTest;Integrated Security=True";
        public DbSet<User> Users { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }

        public ContextTest()
        {
        }

        public ContextTest(string connectionString)
        {
            _connectionString = connectionString;
        }

        public ContextTest(DbContextOptions<ContextTest> options) : base(options)
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
