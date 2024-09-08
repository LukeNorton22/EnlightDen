using LearningStarter.Entities.LearningStarter.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LearningStarter.Entities
    {
        public class Inventories
        {
            public int Id { get; set; }
            public string ItemName { get; set; }
            public string ProductionCost { get; set; }
            public string Quantity { get; set; }
            public Boolean Availabilty { get; set; }
            public string Comments { get; set; }
            public string SiteListing { get; set; }
            public string DateAdded { get; set; }
            public string OnlineStoreId { get; set; }    
            public OnlineStores OnlineStores { get; set; }
            public List<OnlineStores> OnlineStoresList { get; set; } = new List<OnlineStores>();
    }

    public class InventoriesCreateDto
    {
        public string ItemName { get; set; }
        public string ProductionCost { get; set; }
        public string Quantity { get; set; }
        public Boolean Availabilty { get; set; }
        public string Comments { get; set; }
        public string OnlineStoreId { get; set; }
        public string SiteListing { get; set; }
        public string DateAdded { get; set; }
    }
    public class InventoriesGetDto
        {
            public int Id { get; set; }
            public string ItemName { get; set; }
            public string ProductionCost { get; set; }
            public string Quantity { get; set; }
            public Boolean Availabilty { get; set; }
        public string Comments { get; set; }
        public string OnlineStoreId { get; set; }
            public string SiteListing { get; set; }
            public string DateAdded { get; set; }
        }

        public class InventoriesUpdateDto
        {
            public string ItemName { get; set; }
            public string ProductionCost { get; set; }
            public string Quantity { get; set; }
            public Boolean Availabilty { get; set; }
        public string Comments { get; set; }
        public string OnlineStoreId { get; set; }
            public string SiteListing { get; set; }
            public string DateAdded { get; set; }
        }
    }

