using CVapp.Domain.Models.Authentificated;
using CVapp.Infrastructure.DTOs;
using Microsoft.AspNetCore.JsonPatch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Abstractions
{
    public interface IUserProfileService
    {
        public UserProfileDto SaveAvatar(string path, UserProfileDto userProfileDto);
        public UserProfileDto GetUserProfileData(string environment);
        public UserProfileDto UpdateUserProfileData(int id,UserProfileDto userProfileDto);
        public UserProfileDto GetPersonalUserProfileData(string name);
    }
}
