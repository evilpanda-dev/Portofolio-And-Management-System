using CV.Bll.Abstractions;
using CV.Common.DTOs;
using CV.Dal.Query;
using Microsoft.AspNetCore.Mvc;

namespace CV.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class MoneyController : ControllerBase
    {
        private readonly IMoneyService _moneyService;
        public MoneyController(IMoneyService moneyService)
        {
            _moneyService = moneyService;
        }

        [HttpPost("saveExcel")]
        public async Task<List<MoneyDto>> SaveTransactionsToExcel(List<MoneyDto> transactionsDto)
        {
            var result = await _moneyService.SaveTransactions(transactionsDto);
            return result;
        }

        [HttpGet("generateExcel")]
        public string GenerateWorksheet()
        {
            var result = _moneyService.GenerateAndDownloadExcel();
            return result;
        }

        [HttpGet("getTransactions")]
        public MoneyResponse GetTransactions([FromQuery] MoneyQueryParameters queryParameters)
        {
            var result = _moneyService.GetTransactions(queryParameters);
            return result;
        }
    }
}
