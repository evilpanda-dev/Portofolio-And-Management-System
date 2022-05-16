namespace CVapp.Infrastructure.Exceptions
{
    public class UserProfileNotFoundException : ApplicationException
    {
        public UserProfileNotFoundException(string message) : base(message)
        {

        }
    }
}
