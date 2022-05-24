using CV.Bll.Abstractions;
using CV.Common.DTOs;
using CV.Dal.Query;
using CV.Dal.Repository;
using System.Globalization;

namespace CV.Bll.Services
{
    public class DataService : IDataService
    {
        private readonly UserRepository _userRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly CommentRepository _commentRepository;
        private readonly MoneyRepository _moneyRepository;
        public DataService(UserRepository userRepository,
            UserProfileRepository userProfileRepository,
            CommentRepository commentRepository,
            MoneyRepository moneyRepository)
        {
            _userRepository = userRepository;
            _userProfileRepository = userProfileRepository;
            _commentRepository = commentRepository;
            _moneyRepository = moneyRepository;
        }

        public UserDataResponse GetAllUsersAndTheirProfiles(QueryParameters queryParameters)
        {
            var result = (from a in _userRepository.Filter().ToList()
                          join b in _userProfileRepository.Filter().ToList() on a.Id equals b.UserId
                          select new UserDataDto
                          {
                              Id = a.Id,
                              UserName = a.UserName,
                              Email = a.Email,
                              Role = a.Role,
                              FirstName = b.FirstName,
                              LastName = b.LastName,
                              BirthDate = b.BirthDate,
                              Address = b.Address,
                              City = b.City,
                              Country = b.Country,
                              PhoneNumber = b.PhoneNumber,
                              AboutMe = b.AboutMe
                          }).ToList();

            var queryableResult = result.AsQueryable();
            queryableResult = queryableResult
                .Skip(queryParameters.PageSize * (queryParameters.PageNumber - 1))
                .Take(queryParameters.PageSize);

            var userDataResponse = new UserDataResponse
            {
                UserData = queryableResult.ToList(),
                CurrentPage = queryParameters.PageNumber,
                TotalItems = result.Count(),
                Success = true
            };
            return userDataResponse;
        }

        public CommentResponse GetAllComments(QueryParameters queryParameters)
        {
            var result = (from a in _commentRepository.Filter().ToList()
                          join b in _userRepository.Filter().ToList() on a.UserId equals b.Id
                          select new CommentDto
                          {
                              Id = a.Id,
                              Text = a.Text,
                              UserName = b.UserName,
                              ParentId = a.ParentId,
                              CreatedAt = a.CreatedAt
                          }).ToList();
            var queryableResult = result.AsQueryable();
            queryableResult = queryableResult
                .Skip(queryParameters.PageSize * (queryParameters.PageNumber - 1))
                .Take(queryParameters.PageSize);
            var commentResponse = new CommentResponse
            {
                Comments = queryableResult.ToList(),
                CurrentPage = queryParameters.PageNumber,
                TotalItems = result.Count(),
                Success = true
            };
            return commentResponse;
        }

    public object GetTransactionsPerMonth(string transactionType)
    {
        DateTimeFormatInfo dtfi = new DateTimeFormatInfo();

        var minDate = new DateTime(2022, 1, 1);

        var query = from transaction in _moneyRepository.GetTransactions()
                    where transaction.TransactionDate >= minDate
                    group transaction by new { transaction.TransactionDate.Month, transaction.TransactionType } into g
                    where g.Key.TransactionType == transactionType
                    select new
                    {
                        Month = dtfi.GetMonthName(g.Key.Month).ToString(),
                        g.Key.TransactionType,
                        Sum = g.Sum(x => x.Sum)
                    };
        var response = new
        {
            Transactions = query.ToList(),
            Success = true
        };
        return response;
    }

    public object GetTransactionsPerCategory(string transactionType, string month)
    {
        DateTimeFormatInfo dtfi = new DateTimeFormatInfo();
        var minDate = new DateTime(2022, 1, 1);

        var query = from transaction in _moneyRepository.GetTransactions()
                    where transaction.TransactionDate >= minDate && dtfi.GetMonthName(transaction.TransactionDate.Month) == month
                    group transaction by new { transaction.Category, transaction.TransactionDate.Month, transaction.TransactionType } into g
                    where g.Key.TransactionType == transactionType
                    select new
                    {
                        Month = dtfi.GetMonthName(g.Key.Month).ToString(),
                        g.Key.Category,
                        Sum = g.Sum(x => x.Sum)
                    };
        var response = new
        {
            Transactions = query.ToList(),
            Success = true
        };
        return response;
    }
}
}
