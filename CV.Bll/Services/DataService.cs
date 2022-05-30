using CV.Bll.Abstractions;
using CV.Common.DTOs;
using CV.Dal.Interfaces;
using CV.Dal.Query;

namespace CV.Bll.Services
{
    public class DataService : IDataService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IMoneyRepository _moneyRepository;
        public DataService(
            IUserRepository userRepository,
            IUserProfileRepository userProfileRepository,
            ICommentRepository commentRepository,
            IMoneyRepository moneyRepository)
        {
            _userRepository = userRepository;
            _userProfileRepository = userProfileRepository;
            _commentRepository = commentRepository;
            _moneyRepository = moneyRepository;
        }

        public UserDataResponse GetAllUsersAndTheirProfiles(QueryParameters queryParameters)
        {
            var result = _userProfileRepository.GetUsersAndTheirProfiles(queryParameters);
            var profileCount = _userProfileRepository.CountProfiles();
            var userDataResponse = new UserDataResponse
            {
                UserData = result,
                CurrentPage = queryParameters.PageNumber,
                TotalItems = profileCount,
                Success = true
            };
            return userDataResponse;
        }

        public CommentResponse GetAllComments(QueryParameters queryParameters)
        {
            var result = _commentRepository.GetAllUsersComments(queryParameters);
            var commentCount = _commentRepository.CountUserComments();
            var commentResponse = new CommentResponse
            {
                Comments = result,
                CurrentPage = queryParameters.PageNumber,
                TotalItems = commentCount,
                Success = true
            };
            return commentResponse;
        }

        public object GetTransactionsPerMonth(string transactionType)
        {
            var query = _moneyRepository.GetTransactionsPerMonth(transactionType);
            var response = new
            {
                Transactions = query,
                Success = true
            };
            return response;
        }

        public object GetTransactionsPerCategory(string transactionType, string month)
        {
            var query = _moneyRepository.GetTransactionPerCategory(transactionType, month);
            var response = new
            {
                Transactions = query,
                Success = true
            };
            return response;
        }
    }
}
