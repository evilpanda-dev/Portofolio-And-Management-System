﻿using System.ComponentModel.DataAnnotations;

namespace CV.Common.DTOs
{
    public class NewsletterDto
    {
        public int Id { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public int UserId { get; set; }
    }
}
