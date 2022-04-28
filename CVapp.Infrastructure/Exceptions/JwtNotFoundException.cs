using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Exceptions
{
    public class JwtNotFoundException : ApplicationException
    {
        public JwtNotFoundException(string message) : base(message)
        {

        }
    }
}
