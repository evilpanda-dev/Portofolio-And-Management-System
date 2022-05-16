﻿using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Abstractions
{
    public interface IDataService
    {
        public UserDataResponse GetAllUsersAndTheirProfiles(QueryParameters queryParameters);
    }
}
