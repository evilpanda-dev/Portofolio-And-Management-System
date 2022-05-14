using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.DTOs;
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
    }
}
