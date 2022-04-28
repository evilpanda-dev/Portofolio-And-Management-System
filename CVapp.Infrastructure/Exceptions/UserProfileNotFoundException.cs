using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Exceptions
{
    public class UserProfileNotFoundException : ApplicationException
    {
        public UserProfileNotFoundException(string message) : base(message)
        {

        }
    }
}
