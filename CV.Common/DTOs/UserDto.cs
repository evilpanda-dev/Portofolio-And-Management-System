﻿using CV.Domain.Models.Content;

namespace CV.Common.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string? Role { get; set; }
    }
}
