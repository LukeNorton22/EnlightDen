using System;

namespace LearningStarter.Entities
{
    public class BulletJournalEntry
    {
        public int Id { get; set; }
        public string Contents { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public bool IsDone { get; set; }
        public int Pushes { get; set; }
    }

    public class BulletJournalEntryGetDto
    {
        public int Id { get; set; }
        public string Contents { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public bool IsDone { get; set; }
        public int Pushes { get; set; }
    }

    public class BulletJournalEntryCreateDto
    {
        public string Contents { get; set; }
        public DateTimeOffset DateCreated { get; set; }
    }
    
    public class BulletJournalEntryUpdateDto
    {
        public string Contents { get; set; }

   }

   public class BulletJournalEntryListingDto
    {
        public int Id { get; set; }
        public string Contents { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public bool IsDone { get; set; }
    }

    public class BulletJournalOptionsDto
    {
        public string Text { get; set; }
        public int Value { get; set; }
/*        public string Contents { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public bool IsDone { get; set; }
        public int Pushes { get; set; }  */
    }

}
