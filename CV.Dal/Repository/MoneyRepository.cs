using CV.Dal.Interfaces;
using CV.Domain.Models.Content;
using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
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
