using CVapp.Domain.Models.Authentificated;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Services
{
    public class UserProfileService : IUserProfileService
    {
        public UserProfile GetUserProfile()
        {
            throw new NotImplementedException();
        }

        public UserProfileDto SaveAvatar(int id, UserProfile userProfile)
        {
            throw new NotImplementedException();
        }
    }
}
