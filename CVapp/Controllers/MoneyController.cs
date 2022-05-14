using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CVapp.API.Controllers
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
        public async Task<IActionResult> SaveTransactionsToExcel(List<MoneyDto> transactionsDto)
        {
            var result = await _moneyService.SaveTransactions(transactionsDto);
            return Ok(result);
        }

        [HttpGet("generateExcel")]
        public IActionResult GenerateWorksheet()
        {
            var result = _moneyService.GenerateAndDownloadExcel();
            return Ok(result);
        }
    }
}
