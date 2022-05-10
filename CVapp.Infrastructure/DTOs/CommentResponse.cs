﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.DTOs
{
    public class CommentResponse
    {
        public List<CommentDto> Comments { get; set; }
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
