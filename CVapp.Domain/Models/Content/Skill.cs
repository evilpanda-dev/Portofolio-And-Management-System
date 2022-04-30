using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Domain.Models.Content
{
    public class Skill : IEntityBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Range { get; set; }
    }
}
