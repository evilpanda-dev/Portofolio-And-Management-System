using CVapp.Domain.Models.Authentification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Domain.Models.Content
{
    public class Comment : IEntityBase
    {
        public int Id { get; set; }
        public byte[]? Image { get; set; }
        public string Text { get; set; }
        public string UserName { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int? ParentId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
