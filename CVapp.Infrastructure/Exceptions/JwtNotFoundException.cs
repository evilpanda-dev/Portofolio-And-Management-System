namespace CVapp.Infrastructure.Exceptions
{
    public class JwtNotFoundException : ApplicationException
    {
        public JwtNotFoundException(string message) : base(message)
        {

        }
    }
}
