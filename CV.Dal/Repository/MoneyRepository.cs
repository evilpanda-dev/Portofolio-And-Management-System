using CV.Dal.Interfaces;
using CV.Dal.Query;
using CV.Domain.Models.Content;
using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using CV.Dal.ExtensionMethods;
using CV.Dal.Helpers;
using System.Globalization;

namespace CV.Dal.Repository
{
    public class MoneyRepository : Repository<Money>, IMoneyRepository
    {
        public MoneyRepository(DbContext context) : base(context)
        {
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

        public List<Money> FilterTransactionsByPrice(MoneyQueryParameters queryParameters)
        {
            return _dbSet.Where(
                x => x.Sum >= queryParameters.MinPrice && x.Sum <= queryParameters.MaxPrice).ToList();
        }

        public List<Money> FilterTransactionByItem(MoneyQueryParameters queryParameters)
        {
            return _dbSet.Where(p => p.Item == queryParameters.Item).ToList();
        }

        public List<Money> SearchInEveryColumn(MoneyQueryParameters queryParameters)
        {
            return _dbSet.Where(p =>
                    p.Item.ToLower().Contains(queryParameters.Search.ToLower()) ||
                    p.TransactionAccount.ToLower().Contains(queryParameters.Search.ToLower()) ||
                    p.Category.ToLower().Contains(queryParameters.Search.ToLower()) ||
                    p.TransactionType.ToLower().Contains(queryParameters.Search.ToLower())).ToList();
        }

        public List<Money> SortTransactions(MoneyQueryParameters queryParameters, bool isDescending)
        {
            return _dbSet.OrderBy(queryParameters.OrderByProperty, isDescending).ToList();
        }

        public List<Money> PaginateTransactions(MoneyQueryParameters queryParameters)
        {
            return CommonMethods.Paginate(_dbSet.ToList(), queryParameters);
        }

        public int CountTransactions()
        {
            return _dbSet.Count();
        }

        public object GetTransactionsPerMonth(string transactionType)
        {
            DateTimeFormatInfo dtfi = new DateTimeFormatInfo();

            var minDate = new DateTime(2022, 1, 1);

            var query = from transaction in _dbSet.ToList()
                        where transaction.TransactionDate >= minDate
                        group transaction by new { transaction.TransactionDate.Month, transaction.TransactionType } into g
                        where g.Key.TransactionType == transactionType
                        select new
                        {
                            Month = dtfi.GetMonthName(g.Key.Month).ToString(),
                            g.Key.TransactionType,
                            Sum = g.Sum(x => x.Sum)
                        };
            return query;
        }

        public object GetTransactionPerCategory(string transactionType, string month)
        {
            DateTimeFormatInfo dtfi = new DateTimeFormatInfo();
            var minDate = new DateTime(2022, 1, 1);

            var query = from transaction in _dbSet.ToList()
                        where transaction.TransactionDate >= minDate && dtfi.GetMonthName(transaction.TransactionDate.Month) == month
                        group transaction by new { transaction.Category, transaction.TransactionDate.Month, transaction.TransactionType } into g
                        where g.Key.TransactionType == transactionType
                        select new
                        {
                            Month = dtfi.GetMonthName(g.Key.Month).ToString(),
                            g.Key.Category,
                            Sum = g.Sum(x => x.Sum)
                        };
            return query;
        }

    }
}
