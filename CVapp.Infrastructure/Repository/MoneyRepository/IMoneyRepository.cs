using CVapp.Domain.Models.Content;

namespace CVapp.Infrastructure.Repository.MoneyRepository
{
    public interface IMoneyRepository
    {
        public List<Money> GetTransactions();
        public Task<List<Money>> SaveTransactions(List<Money> transactions);
    }
}
