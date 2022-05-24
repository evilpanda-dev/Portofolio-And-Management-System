using CV.Common.DTOs;
using CV.Dal.Query;

namespace CV.Bll.Abstractions
{
    public interface IDataService
    {
        public UserDataResponse GetAllUsersAndTheirProfiles(QueryParameters queryParameters);
        public CommentResponse GetAllComments(QueryParameters queryParameters);
        public object GetTransactionsPerMonth(string transactionType);
        public object GetTransactionsPerCategory(string transactionType, string month);
    }
}
