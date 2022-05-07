using CVapp.Domain.Models.Authentification;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Domain.Models.Content
{
    public class Newsletter : IEntityBase
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
