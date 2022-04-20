﻿using CVapp.Models.Authentification;
using CVapp.Repository.GenericRepository;
using CVapp.Repository.UserProfileRepository;
using System.ComponentModel.DataAnnotations.Schema;

namespace CVapp.Models.Authentificated
{
    public class UserProfile : IUserProfile,IEntityBase
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
        [NotMapped]
        public IFormFile? Files { get; set; }
        [NotMapped]
        public byte[]? ImgByte { get; set; }
        [NotMapped]
        public string? Message { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
    }
}