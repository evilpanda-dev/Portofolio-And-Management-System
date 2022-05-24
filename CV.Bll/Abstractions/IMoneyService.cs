using CV.Common.DTOs;
using CV.Dal.Query;

namespace CV.Bll.Abstractions
{
    public interface IMoneyService
    {
        public Task<List<MoneyDto>> SaveTransactions(List<MoneyDto> transactionsDto);
        public string GenerateAndDownloadExcel();
        public MoneyResponse GetTransactions(MoneyQueryParameters queryParameters);
    }
}
