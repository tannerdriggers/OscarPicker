using System;
using System.Collections.Generic;

namespace OscarPicks_Auth0.Models
{
    public partial class OscarRecipientCategory
    {
        public OscarRecipientCategory()
        {
            UserChoice = new HashSet<UserChoice>();
        }

        public long Id { get; set; }
        public long RecipientId { get; set; }
        public long CategoryId { get; set; }

        public OscarCategory Category { get; set; }
        public OscarRecipient Recipient { get; set; }
        public ICollection<UserChoice> UserChoice { get; set; }
    }
}
