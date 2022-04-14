using CVapp.Repository.GenericRepository;
using CVapp.Repository.UserRepository;
using System.Text.Json.Serialization;

namespace CVapp.Models.Authentification
{
    public class User : IEntityBase,IUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        [JsonIgnore] 
        public string Password { get; set; }
    }
}
