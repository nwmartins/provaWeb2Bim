using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace vacinaAPI.Models
{
    public partial class Animal
    {
        public Animal()
        {
            Vacina = new HashSet<Vacina>();
        }

        public int Id { get; set; }
        public string Descricao { get; set; }

        [JsonIgnore]
        public ICollection<Vacina> Vacina { get; set; }
    }
}
