using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Query;

namespace CVapp.Infrastructure.Abstractions
{
    public interface IMoneyService
    {
        public Task<List<MoneyDto>> SaveTransactions(List<MoneyDto> transactionsDto);
        public string GenerateAndDownloadExcel();
        public MoneyResponse GetTransactions(MoneyQueryParameters queryParameters);
    }
}
