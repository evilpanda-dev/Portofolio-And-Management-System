using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Exceptions
{
    public class DuplicateException : ApplicationException
    {
        public DuplicateException(string message) : base(message)
        {

        }
    }
}
