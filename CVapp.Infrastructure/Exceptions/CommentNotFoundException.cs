using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Exceptions
{
    public class CommentNotFoundException : ApplicationException
    {
        public CommentNotFoundException(string message) : base(message)
        {

        }
    }
}
