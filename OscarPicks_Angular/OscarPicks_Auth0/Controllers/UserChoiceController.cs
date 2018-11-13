using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OscarPicks_Auth0.Models;

namespace OscarPicks_Auth0.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserChoiceController : Controller
    {
        private readonly OscarPickerContext _context;

        public UserChoiceController(OscarPickerContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public IEnumerable<UserChoice> GetAll()
        {
            return _context.UserChoice.ToList().Where(choice => choice.IsActive == true);
        }

        [HttpGet("{id}", Name = "GetUserChoice"), Authorize]
        public IActionResult GetById(long id)
        {
            var user = _context.UserChoice.ToList().Where(choice => choice.UserId == id && choice.IsActive == true);
            if (user == null)
            {
                return NotFound();
            }
            return new ObjectResult(user);
        }

        [HttpPost, Authorize]
        public IActionResult Create([FromBody] OscarRecipient user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            var possibleUser = _context.UserChoice.Find(user.Id);
            if (possibleUser != null && possibleUser.IsActive == false)
            {
                possibleUser.IsActive = true;
                return CreatedAtRoute("GetUserChoice", new { id = possibleUser.Id }, possibleUser);
            }

            user.IsActive = true;
            _context.OscarRecipient.Add(user);
            _context.SaveChanges();

            return CreatedAtRoute("GetUserChoice", new { id = user.Id }, user);
        }

        [HttpDelete("{id}"), Authorize]
        public IActionResult Delete(long id)
        {
            var user = _context.UserChoice.First(t => t.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            user.IsActive = false;
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}