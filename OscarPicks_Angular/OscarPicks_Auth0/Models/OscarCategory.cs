using System;
using System.Collections.Generic;

namespace OscarPicks_Auth0.Models
{
    public partial class OscarCategory
    {
        public OscarCategory()
        {
            OscarRecipient = new HashSet<OscarRecipient>();
            OscarRecipientCategory = new HashSet<OscarRecipientCategory>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? IsActive { get; set; }
        public int Type { get; set; }

        public ICollection<OscarRecipient> OscarRecipient { get; set; }
        public ICollection<OscarRecipientCategory> OscarRecipientCategory { get; set; }
    }
}
