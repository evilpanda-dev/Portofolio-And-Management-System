using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.Query;
using Microsoft.AspNetCore.Mvc;

namespace CVapp.API.Controllers
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
        public IActionResult GetAllUserData([FromQuery] QueryParameters queryParameters)
        {
            var result = _dataService.GetAllUsersAndTheirProfiles(queryParameters);
            return Ok(result);
        }

        [HttpGet("allUserComments")]
        public IActionResult GetAllUserComments([FromQuery] QueryParameters queryParameters)
        {
            var result = _dataService.GetAllComments(queryParameters);
            return Ok(result);
        }
        
    }
}
