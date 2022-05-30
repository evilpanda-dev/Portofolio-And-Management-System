using AutoMapper;
using CV.Common.DTOs;
using CV.Dal.Helpers;
using CV.Dal.Interfaces;
using CV.Dal.Query;
using CV.Domain.Models.Content;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        private readonly IMapper _mapper;
        public CommentRepository(DbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }

        public CommentResponse GetAllCommentsPaginated(int page)
        {
            var pageResults = 3f;
            var pagedComments = _dbSet
                .Skip((page - 1) * (int)pageResults)
                .Take((int)pageResults)
                .ToList();
            var commentsResult = _mapper.Map<IEnumerable<CommentDto>>(pagedComments);
            var pageCount = (int)Math.Ceiling(commentsResult.Count() / pageResults);
            var response = new CommentResponse
            {
                Comments = commentsResult.ToList(),
                CurrentPage = page,
                Pages = pageCount,
                Success = true,
                Message = "Success"
            };
            return response;
        }


        public List<CommentDto> GetAllUsersComments(QueryParameters queryParameters)
        {
            var result = (from a in _dbSet.Include(x => x.User)
                          select new CommentDto
                          {
                              Id = a.Id,
                              Text = a.Text,
                              UserName = a.UserName,
                              ParentId = a.ParentId,
                              CreatedAt = a.CreatedAt
                          }).ToList();
            var queryableResult = CommonMethods.Paginate(result, queryParameters);
            return queryableResult;
        }

        public int CountUserComments()
        {
            return _dbSet.Include(x => x.User).Count();
        }
    }
}
