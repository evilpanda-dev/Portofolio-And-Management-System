using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Exceptions
{
    public class AvatarNotFoundException : ApplicationException
    {
        public AvatarNotFoundException(string message) : base(message)
        {

        }
    }
}
