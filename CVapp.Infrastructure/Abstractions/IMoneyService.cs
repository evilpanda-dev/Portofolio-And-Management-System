using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CVapp.Infrastructure.Abstractions
{
    public interface IMoneyService
    {
        public Task<List<MoneyDto>> SaveTransactions(List<MoneyDto> transactionsDto);
        public string GenerateAndDownloadExcel();
        public MoneyResponse GetTransactions(MoneyQueryParameters queryParameters);
        /*public List<MoneyDto> SortTransactions(string property,string order);
        public List<MoneyDto> SearchTransaction(string text);
        public MoneyResponse GetPaginatedTransactions(int pageNumber,int pageSize);*/
    }
}
