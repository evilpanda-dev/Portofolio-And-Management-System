using CVapp.Domain.Models.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Repository.MoneyRepository
{
    public interface IMoneyRepository
    {
        public List<Money> GetTransactions();
        public Task<List<Money>> SaveTransactions(List<Money> transactions);
    }
}
