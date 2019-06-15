using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace vacinaAPI.Models
{
    public partial class Vacina
    {
        public int Id { get; set; }
        public DateTime DtVacina { get; set; }
        public int? Peso { get; set; }
        public string Aplicador { get; set; }
        public string DescMedicamento { get; set; }
        public int? Dosagem { get; set; }
        public int? IdAnimal { get; set; }

        [JsonIgnore]
        public Animal IdAnimalNavigation { get; set; }
    }
}
