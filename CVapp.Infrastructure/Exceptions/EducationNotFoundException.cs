using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Exceptions
{
    public class EducationNotFoundException : ApplicationException
    {
        public EducationNotFoundException(string message) : base(message)
        {

        }
    }
}
