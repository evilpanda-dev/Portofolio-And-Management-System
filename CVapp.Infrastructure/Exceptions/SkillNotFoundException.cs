using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Exceptions
{
    public class SkillNotFoundException : ApplicationException
    {
        public SkillNotFoundException(string message) : base(message)
        {

        }
    }
}
