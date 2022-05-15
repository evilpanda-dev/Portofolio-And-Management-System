using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Domain.Models.Content
{
    public class Money : IEntityBase
    {
        public int Id { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionAccount { get; set; }
        public string Category { get; set; }
        public string Item { get; set; }
        public float Sum { get; set; }
        public string TransactionType { get; set; }
        public string Currency { get; set; }
    }
}
