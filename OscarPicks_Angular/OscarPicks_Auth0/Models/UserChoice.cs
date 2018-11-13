using System;
using System.Collections.Generic;

namespace OscarPicks_Auth0.Models
{
    public partial class UserChoice
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long OscarRecipientCategoryId { get; set; }
        public bool? IsActive { get; set; }

        public OscarRecipientCategory OscarRecipientCategory { get; set; }
    }
}
