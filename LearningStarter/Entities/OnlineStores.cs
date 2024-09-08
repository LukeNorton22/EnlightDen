namespace LearningStarter.Entities
{
    using System;
    using System.Collections.Generic;

    namespace LearningStarter.Entities
    {
        public class OnlineStores
        {
            public int Id { get; set; }
            public string StoreName { get; set; }
        }
        public class OnlineStoresGetDto
        {
            public int Id { get; set; }
            public string StoreName { get; set; }
        }

        public class OnlinestoresCreateDto
        {
            public string StoreName { get; set; }
        }

        public class OnlinestoresUpdateDto
        {
            public string StoreName { get; set; }
        }

    }
}
