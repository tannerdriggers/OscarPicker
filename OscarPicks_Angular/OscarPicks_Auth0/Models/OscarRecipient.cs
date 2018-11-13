using System;
using System.Collections.Generic;

namespace OscarPicks_Auth0.Models
{
    public partial class OscarRecipient
    {
        public OscarRecipient()
        {
            OscarRecipientCategory = new HashSet<OscarRecipientCategory>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
        public string Description { get; set; }
        public long OscarCategoryId { get; set; }
        public bool? IsActive { get; set; }

        public OscarCategory OscarCategory { get; set; }
        public ICollection<OscarRecipientCategory> OscarRecipientCategory { get; set; }
    }
}
