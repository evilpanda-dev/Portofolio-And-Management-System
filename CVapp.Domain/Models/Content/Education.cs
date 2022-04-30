using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Domain.Models.Content
{
    public class Education : IEntityBase
    {
        public int Id { get; set; }
        public int Date { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
    }
}
