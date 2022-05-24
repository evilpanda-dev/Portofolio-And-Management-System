namespace CV.Common.DTOs
{
    public class MoneyResponse
    {
        public List<MoneyDto> Transactions { get; set; }
        public int CurrentPage { get; set; }
        public int TotalItems { get; set; }
        public bool? Success { get; set; }
        public string? Message { get; set; }
    }
}
