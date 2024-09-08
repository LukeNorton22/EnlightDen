using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/BulletJournal")]
    public class BulletJournalEntriesController : ControllerBase
    {
        private class BulletJournalOptionsResponseDto
        {
            public List<BulletJournalOptionsDto> ItemTypeOptions { get; set; }
            public List<BulletJournalOptionsDto> EffectTypeOptions { get; set; }
        }

        private readonly DataContext _dataContext;

        public BulletJournalEntriesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var response = new Response();

            var BulletJournalEntries = _dataContext
                .BulletJournalEntries
                .Select(BulletJournalEntry => new BulletJournalEntryGetDto
                {
                    Id = BulletJournalEntry.Id,
                    Contents = BulletJournalEntry.Contents,
                    DateCreated = BulletJournalEntry.DateCreated,
                    IsDone = BulletJournalEntry.IsDone,
                    Pushes = BulletJournalEntry.Pushes,
                })
                .ToList();

            response.Data = BulletJournalEntries;
            return Ok(response);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var response = new Response();

            var bulletJournalEntryToReturn = _dataContext
                .BulletJournalEntries
                .Select(bulletJournalEntry => new BulletJournalEntryGetDto
                {
                    Id = bulletJournalEntry.Id,
                    DateCreated = bulletJournalEntry.DateCreated,
                    Contents = bulletJournalEntry.Contents,
                    IsDone = bulletJournalEntry.IsDone,
                    Pushes = bulletJournalEntry.Pushes,
                })
                .FirstOrDefault(BulletJournalEntry => BulletJournalEntry.Id == id);

            if (bulletJournalEntryToReturn == null)
            {
                response.AddError("id", "Order Not Found");
                return BadRequest(response);
            }

            response.Data = bulletJournalEntryToReturn;
            return Ok(response);
        }

        [HttpPost]
        public IActionResult Create([FromBody] BulletJournalEntryCreateDto bulletJournalEntryCreateDto)
        {
            var response = new Response();

            if (string.IsNullOrEmpty(bulletJournalEntryCreateDto.Contents))
            {
                response.AddError("Contents", "Contents cannot be empty");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }

           /* if (bulletJournalEntryGetDto) 
            {

            } */
           //Keeping this here because i had an idea but i lost it

            var bulletJournalEntryToAdd = new BulletJournalEntry
            {
                DateCreated = DateTimeOffset.Now,
                Contents = bulletJournalEntryCreateDto.Contents,
            };

            _dataContext.BulletJournalEntries.Add(bulletJournalEntryToAdd);
            _dataContext.SaveChanges();

            var bulletJournalEntryToReturn = new BulletJournalEntryGetDto
            {
                Id = bulletJournalEntryToAdd.Id,
                DateCreated = bulletJournalEntryToAdd.DateCreated,
                Contents = bulletJournalEntryToAdd.Contents,
                IsDone = bulletJournalEntryToAdd.IsDone,
                Pushes = bulletJournalEntryToAdd.Pushes,
            };

            response.Data = bulletJournalEntryToReturn;
            return Created("", response);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(
            [FromRoute] int id,
            [FromBody] BulletJournalEntryUpdateDto bulletJournalEntryUpdateDto)
        {
            var response = new Response();

            var bulletJournalEntryToUpdate = _dataContext
                .BulletJournalEntries
                .FirstOrDefault(BulletJournalEntry => BulletJournalEntry.Id == id);

            if (bulletJournalEntryToUpdate == null)
            {
                response.AddError("id", "Order not found");
                return BadRequest(response);
            }

            bulletJournalEntryToUpdate.Contents = bulletJournalEntryUpdateDto.Contents;
            _dataContext.SaveChanges();

            var bulletJournalEntryToReturn = new BulletJournalEntryGetDto
            {
                Id = bulletJournalEntryToUpdate.Id,
                DateCreated = bulletJournalEntryToUpdate.DateCreated,
                Contents = bulletJournalEntryToUpdate.Contents,
                IsDone = bulletJournalEntryToUpdate.IsDone,
                Pushes = bulletJournalEntryToUpdate.Pushes,
            };

            response.Data = bulletJournalEntryToReturn;
            return Ok(response);
        }

        [HttpPut("mark-done/{id}")]
        public IActionResult MarkDone([FromRoute] int id, [FromBody] bool isDone)
        {
            var response = new Response();

            var bulletJournalEntry = _dataContext
                .BulletJournalEntries
                .FirstOrDefault(bulletJournalEntry => bulletJournalEntry.Id == id);

            bulletJournalEntry.IsDone = isDone;

            _dataContext.SaveChanges();

            var bulletJournalEntryToReturn = new BulletJournalEntryGetDto
            {
                Id = bulletJournalEntry.Id,
                DateCreated = bulletJournalEntry.DateCreated,
                Contents = bulletJournalEntry.Contents,
                IsDone = bulletJournalEntry.IsDone,
                Pushes = bulletJournalEntry.Pushes,
            };

            response.Data = bulletJournalEntryToReturn;
            return Ok(response);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var response = new Response();

            var bulletJournalEntryToDelete = _dataContext
                .BulletJournalEntries
                .FirstOrDefault(BulletJournalEntry => BulletJournalEntry.Id == id);

            if (bulletJournalEntryToDelete == null)
            {
                response.AddError("id", "Order not found");
                return BadRequest(response);
            }

            _dataContext.Remove(bulletJournalEntryToDelete);
            _dataContext.SaveChanges();

            response.Data = true;
            return Ok(response);
        }

        [HttpGet ("options")]

        public IActionResult GetBulletJournalOptions()
        {
            var response = new Response();
            var responseData = new BulletJournalOptionsResponseDto();
            var bulletJournalEntries = _dataContext.BulletJournalEntries
                .Select(x => new BulletJournalOptionsDto
                {
                    Text = x.Contents,
                    Value = x.Id    
                })
                .ToList();

            responseData.ItemTypeOptions = bulletJournalEntries;
            response.Data = responseData;
            return Ok(response);
        }
    }
}
