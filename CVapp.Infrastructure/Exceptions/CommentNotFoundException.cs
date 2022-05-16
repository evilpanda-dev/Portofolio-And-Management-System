namespace CVapp.Infrastructure.Exceptions
{
    public class CommentNotFoundException : ApplicationException
    {
        public CommentNotFoundException(string message) : base(message)
        {

        }
    }
}
