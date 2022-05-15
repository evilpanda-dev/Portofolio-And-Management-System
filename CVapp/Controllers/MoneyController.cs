using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Query;
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

        [HttpGet("getTransactions")]
        public IActionResult GetTransactions([FromQuery]MoneyQueryParameters queryParameters)
        {
            var result = _moneyService.GetTransactions(queryParameters);
            return Ok(result);
        }
/*
        [HttpGet("transactionsDescending/{property}/{order}")]
        public IActionResult SortTransactions(string property,string order)
        {
            var result = _moneyService.SortTransactions(property,order);
            return Ok(result);
        }

        [HttpGet("searchTransactions/{search}")]
        public IActionResult SearchTransactions(string search)
        {
            var result = _moneyService.SearchTransaction(search);
            return Ok(result);
        }

        [HttpGet("getTransaction/{pageNumber}/{pageSize}")]
        public IActionResult GetTransaction(int pageNumber,int pageSize)
        {
            var result = _moneyService.GetPaginatedTransactions(pageNumber, pageSize);
            return Ok(result);
        }*/
    }
}
