using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.DTOs
{
    public class MoneyDto
    {
        public int Id { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionAccount { get; set; }
        public string Category { get; set; }
        public string Item { get; set; }
        public decimal Sum { get; set; }
        public string TransactionType { get; set; }
        public string Currency { get; set; }
    }
}
