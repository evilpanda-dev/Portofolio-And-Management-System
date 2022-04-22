﻿using CVapp.Domain.Models.Authentificated;
using CVapp.Infrastructure.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Abstractions
{
    public interface IUserProfileService
    {
        public UserProfileDto SaveAvatar(int id, UserProfile userProfile);
        public UserProfile GetUserProfile();
    }
}
