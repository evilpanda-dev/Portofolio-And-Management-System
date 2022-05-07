using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.DTOs
{
    public class NewsletterDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public int UserId { get; set; }
    }
}
