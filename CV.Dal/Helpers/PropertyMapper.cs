using System.Linq.Expressions;
using System.Reflection;

namespace CV.Dal.Helpers
{
    public class PropertyMapper<T1, T2> : IPropertyMapper<T1, T2>
    {
        private readonly T1 _source;
        private readonly T2 _destination;

        public PropertyMapper(T1 source, T2 destination)
        {
            _source = source;
            _destination = destination;
        }

        public PropertyMapper<T1, T2> ForMember<T3>(Expression<Func<T1, T3>> funcType1)
        {
            var expression = (MemberExpression)funcType1.Body;
            string name = expression.Member.Name;
            var source = funcType1.Compile()(_source);

            if (source is string type1AsString && !string.IsNullOrEmpty(type1AsString) || !(source is string) && source != null)
            {
                PropertyInfo instance = typeof(T2).GetProperty(name);
                instance.SetValue(_destination, source);
            }
            return this;
        }

        public PropertyMapper<T1, T2> Map<T1, T2>(T1 source, T2 destination)
        {
            return new PropertyMapper<T1, T2>(source, destination);
        }

    }
}
