using CVapp.Domain.Models.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Repository.CommentRepository
{
    public interface ICommentRepository
    {
        public IEnumerable<Comment> GetAllComments();
        
    }
}
