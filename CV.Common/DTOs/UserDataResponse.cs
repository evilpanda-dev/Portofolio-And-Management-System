namespace CV.Common.DTOs
{
    public class UserDataResponse
    {
        public List<UserDataDto>? UserData { get; set; }
        public int CurrentPage { get; set; }
        public int TotalItems { get; set; }
        public bool Success { get; set; }
        public string? Message { get; set; }
    }
}
