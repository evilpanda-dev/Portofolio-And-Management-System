using CV.Bll.Abstractions;
using CV.Common.DTOs;
using CV.Dal.Query;
using Microsoft.AspNetCore.Mvc;

namespace CV.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IDataService _dataService;
        public DataController(IDataService dataService)
        {
            _dataService = dataService;
        }

        [HttpGet("allUserData")]
        public UserDataResponse GetAllUserData([FromQuery] QueryParameters queryParameters)
        {
            var result = _dataService.GetAllUsersAndTheirProfiles(queryParameters);
            return result;
        }

        [HttpGet("allUserComments")]
        public CommentResponse GetAllUserComments([FromQuery] QueryParameters queryParameters)
        {
            var result = _dataService.GetAllComments(queryParameters);
            return result;
        }

        [HttpGet("transactionsPerMonth/{transactionType}")]
        public object GetIncomeTransactionsPerYear(string transactionType)
        {
            var result = _dataService.GetTransactionsPerMonth(transactionType);
            return result;
        }

        [HttpGet("transactionsPerCategory/{transactionType}/{month}")]
        public object GetTransactionsPerCategory(string transactionType, string month)
        {
            var result = _dataService.GetTransactionsPerCategory(transactionType, month);
            return result;
        }
    }
}
