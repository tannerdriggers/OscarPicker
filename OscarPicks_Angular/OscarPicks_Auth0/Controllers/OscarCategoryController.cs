using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OscarPicks_Auth0.Models;

namespace OscarPicks_Auth0.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class OscarCategoryController : Controller
    {
        private readonly OscarPickerContext _context;

        public OscarCategoryController(OscarPickerContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public IEnumerable<OscarCategory> GetAll()
        {
            return _context.OscarCategory.ToList().Where(category => category.IsActive == true);
        }

        [HttpGet("{id}", Name = "GetOscarCategory"), Authorize]
        public IActionResult GetById(long id)
        {
            var category = _context.OscarCategory.FirstOrDefault(t => t.Id == id);
            if (category == null)
            {
                return NotFound();
            }
            return new ObjectResult(category);
        }

        [HttpPost, Authorize]
        public IActionResult Create([FromBody] OscarCategory category)
        {
            if (category == null)
            {
                return BadRequest();
            }

            category.IsActive = true;
            _context.OscarCategory.Add(category);
            _context.SaveChanges();

            return CreatedAtRoute("GetOscarCategory", new { id = category.Id }, category);
        }

        [HttpDelete("{id}"), Authorize]
        public IActionResult Delete(long id)
        {
            var category = _context.OscarCategory.First(t => t.Id == id);
            if (category == null)
            {
                return NotFound();
            }

            category.IsActive = false;
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}