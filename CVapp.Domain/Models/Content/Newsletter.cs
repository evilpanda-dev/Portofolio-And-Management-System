﻿using CV.Domain.Models.Auth;

namespace CV.Domain.Models.Content
{
    public class Newsletter : IEntityBase
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
