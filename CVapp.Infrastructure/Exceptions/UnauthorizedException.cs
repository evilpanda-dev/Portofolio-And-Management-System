﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Exceptions
{
    public class UnauthorizedException : ApplicationException
    {
        public UnauthorizedException (string message) : base(message)
        {

        }
    }
}
