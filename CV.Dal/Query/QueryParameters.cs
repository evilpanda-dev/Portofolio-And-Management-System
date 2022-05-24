namespace CV.Dal.Query
{
    public class QueryParameters
    {
        const int _maxSize = int.MaxValue;
        private int _pageSize = 5;

        public int PageNumber { get; set; }
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = value > _maxSize ? _maxSize : value;
            }
        }
    }
}
