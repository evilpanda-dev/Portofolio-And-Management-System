using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.DTOs
{
    public class MoneyResponse
    {
        public List<MoneyDto> Transactions { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int TotalItems { get; set; }
    }
}
