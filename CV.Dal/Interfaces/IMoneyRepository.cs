using CV.Dal.Query;
using CV.Domain.Models.Content;

namespace CV.Dal.Interfaces
{
    public interface IMoneyRepository : IRepository<Money>
    {
        public List<Money> GetTransactions();
        public Task<List<Money>> SaveTransactions(List<Money> transactions);
        public List<Money> FilterTransactionsByPrice(MoneyQueryParameters queryParameters);
        public List<Money> FilterTransactionByItem(MoneyQueryParameters queryParameters);
        public List<Money> SearchInEveryColumn(MoneyQueryParameters queryParameters);
        public List<Money> SortTransactions(MoneyQueryParameters queryParameters, bool isDescending);
        public List<Money> PaginateTransactions(MoneyQueryParameters queryParameters);
        public int CountTransactions();
        public object GetTransactionsPerMonth(string transactionType);
        public object GetTransactionPerCategory(string transactionType, string month);
    }
}
