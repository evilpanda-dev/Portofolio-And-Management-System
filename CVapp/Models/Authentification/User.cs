﻿using CVapp.Repository;

namespace CVapp.Models.Authentification
{
    public class User : IEntityBase
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
