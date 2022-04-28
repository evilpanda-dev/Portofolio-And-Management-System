using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Helpers
{
    public interface IPropertyMapper<T1,T2>
    {
        public PropertyMapper<T1, T2> ForMember<T3>(Expression<Func<T1, T3>> funcType1);
        public PropertyMapper<T1, T2> Map<T1, T2>(T1 source, T2 destination);
    }
}
