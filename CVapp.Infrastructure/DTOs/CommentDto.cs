using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string UserName { get; set; }
        public int UserId { get; set; }
        public int? ParentId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
