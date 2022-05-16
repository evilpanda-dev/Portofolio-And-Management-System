using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Query;

namespace CVapp.Infrastructure.Abstractions
{
    public interface IDataService
    {
        public UserDataResponse GetAllUsersAndTheirProfiles(QueryParameters queryParameters);
        public CommentResponse GetAllComments(QueryParameters queryParameters);
        public object GetTransactionsPerMonth(string transactionType);
        public object GetTransactionsPerCategory(string transactionType, string month);
    }
}
