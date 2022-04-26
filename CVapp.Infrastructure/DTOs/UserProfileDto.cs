using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.DTOs
{
    public class UserProfileDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public int? PhoneNumber { get; set; }
        public string? AboutMe { get; set; }
        public IFormFile? Files { get; set; }
        public byte[]? ImgByte { get; set; }
        public string? Message { get; set; }
        public int UserId { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
    }
}
