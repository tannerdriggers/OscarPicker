using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OscarPicks_Auth0.Models;

namespace OscarPicks_Auth0.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class OscarRecipientController : Controller
    {
        private readonly OscarPickerContext _context;

        public OscarRecipientController(OscarPickerContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public IEnumerable<OscarRecipient> GetAll()
        {
            return _context.OscarRecipient.ToList().Where(recipient => recipient.IsActive == true);
        }

        [HttpGet("{id}", Name = "GetOscarRecipient"), Authorize]
        public IActionResult GetById(long id)
        {
            var recipient = _context.OscarRecipient.FirstOrDefault(t => t.Id == id);
            if (recipient == null)
            {
                return NotFound();
            }
            return new ObjectResult(recipient);
        }

        [HttpPost, Authorize]
        public IActionResult Create([FromBody] OscarRecipient recipient)
        {
            if (recipient == null)
            {
                return BadRequest();
            }

            recipient.IsActive = true;
            _context.OscarRecipient.Add(recipient);
            _context.SaveChanges();

            return CreatedAtRoute("GetOscarRecipient", new { id = recipient.Id }, recipient);
        }

        [HttpDelete("{id}"), Authorize]
        public IActionResult Delete(long id)
        {
            var recipient = _context.OscarRecipient.First(t => t.Id == id);
            if (recipient == null)
            {
                return NotFound();
            }

            recipient.IsActive = false;
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}