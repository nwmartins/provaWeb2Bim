using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vacinaAPI.Models;

namespace vacinaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacinaController : ControllerBase
    {
        private readonly vacinaDbContext _context;

        public VacinaController(vacinaDbContext context)
        {
            _context = context;
        }

        // GET: api/Vacina
        [HttpGet]
        public IEnumerable<Vacina> GetVacina()
        {
            return _context.Vacina;
        }

        // GET: api/Vacina/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVacina([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vacina = await _context.Vacina.FindAsync(id);

            if (vacina == null)
            {
                return NotFound();
            }

            return Ok(vacina);
        }

        // PUT: api/Vacina/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVacina([FromRoute] int id, [FromBody] Vacina vacina)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vacina.Id)
            {
                return BadRequest();
            }

            _context.Entry(vacina).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacinaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(vacina);
        }

        // POST: api/Vacina
        [HttpPost]
        public async Task<IActionResult> PostVacina([FromBody] Vacina vacina)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //vacina.DtVacina = Date.Now;
            _context.Vacina.Add(vacina);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVacina", new { id = vacina.Id }, vacina);
        }

        // DELETE: api/Vacina/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVacina([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vacina = await _context.Vacina.FindAsync(id);
            if (vacina == null)
            {
                return NotFound();
            }

            _context.Vacina.Remove(vacina);
            await _context.SaveChangesAsync();

            return Ok(vacina);
        }

        private bool VacinaExists(int id)
        {
            return _context.Vacina.Any(e => e.Id == id);
        }
    }
}