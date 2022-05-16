using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Repository.GenericRepository;
using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;

namespace CVapp.Infrastructure.Repository.MoneyRepository
{
    public class MoneyRepository : Repository<Money>, IMoneyRepository
    {
        public readonly DbContext _context;
        private DbSet<Money> _dbSet;
        public MoneyRepository(DbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<Money>();
        }

        public List<Money> GetTransactions()
        {
            return _dbSet.ToList();
        }

        public async Task<List<Money>> SaveTransactions(List<Money> transactions)
        {
            await _context.BulkInsertOrUpdateOrDeleteAsync(transactions);
            return transactions;
        }
    }
}
