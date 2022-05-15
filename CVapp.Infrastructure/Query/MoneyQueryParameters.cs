using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Query
{
    public class MoneyQueryParameters : QueryParameters
    {
        public string? Item { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public string? Search { get; set; }
        public string? OrderDirection { get; set; }
        public string? OrderByProperty { get; set; }
    }
}
