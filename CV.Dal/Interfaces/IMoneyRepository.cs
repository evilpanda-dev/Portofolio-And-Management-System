using CV.Domain.Models.Content;

namespace CV.Dal.Interfaces
{
    public interface IMoneyRepository
    {
        public List<Money> GetTransactions();
        public Task<List<Money>> SaveTransactions(List<Money> transactions);
    }
}
