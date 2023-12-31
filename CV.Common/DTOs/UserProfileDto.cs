﻿using CV.Domain.Models.Auth;
using Microsoft.AspNetCore.Http;

namespace CV.Common.DTOs
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
        public UserDto? User { get; set; }
    }
}
