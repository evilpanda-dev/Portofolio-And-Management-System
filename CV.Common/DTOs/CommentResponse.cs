﻿namespace CV.Common.DTOs
{
    public class CommentResponse
    {
        public List<CommentDto> Comments { get; set; }
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
        public int? TotalItems { get; set; }
        public bool? Success { get; set; }
        public string? Message { get; set; }
    }
}
