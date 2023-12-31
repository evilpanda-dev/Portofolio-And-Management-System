﻿using CV.Domain.Models.Content;

namespace CV.Domain.Models.Auth
{
    public class User : IEntityBase
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
    }
}
