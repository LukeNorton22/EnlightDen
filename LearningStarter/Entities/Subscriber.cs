using System;
using System.Data;

namespace LearningStarter.Entities
{
    public class Subscriber
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTimeOffset DateSubscribed { get; set; }

    }

    public class SubscriberGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTimeOffset DateSubscribed { get; set; }

    }
    public class SubscriberCreateDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTimeOffset DateSubscribed { get; set; }

    }
    public class SubscriberUpdateDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTimeOffset DateSubscribed { get; set; }
    }
    public class SubscriberListingDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTimeOffset DateSubscribed { get; set; }
    }

    public class SubscriberDeleteDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTimeOffset DateSubscribed { get; set; }    
    }
}

