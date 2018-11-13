using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OscarPicks_Auth0.Models;

namespace OscarPicks_Auth0.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class OscarRecipientCategoryController : Controller
    {
        private readonly OscarPickerContext _context;

        public OscarRecipientCategoryController(OscarPickerContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public IEnumerable<OscarRecipientCategory> GetAll()
        {
            return _context.OscarRecipientCategory.ToList();
        }

        [HttpGet("{id}", Name = "GetOscarRecipientCategory"), Authorize]
        public IActionResult GetById(long id)
        {
            var recipient = _context.OscarRecipientCategory.FirstOrDefault(t => t.Id == id);
            if (recipient == null)
            {
                return NotFound();
            }
            return new ObjectResult(recipient);
        }

        [HttpPost, Authorize]
        public IActionResult Create([FromBody] OscarRecipientCategory recipient)
        {
            if (recipient == null)
            {
                return BadRequest();
            }
            
            _context.OscarRecipientCategory.Add(recipient);
            _context.SaveChanges();

            return CreatedAtRoute("GetOscarRecipientCategory", new { id = recipient.Id }, recipient);
        }

        [HttpDelete("{id}"), Authorize]
        public IActionResult Delete(long id)
        {
            var recipient = _context.OscarRecipientCategory.First(t => t.Id == id);
            if (recipient == null)
            {
                return NotFound();
            }

            _context.Remove(recipient);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}