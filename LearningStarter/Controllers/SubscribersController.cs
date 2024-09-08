 using System;
using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;


namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/subscriber")]
    public class SubscribersController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public int Id { get; private set; }
        public string Email { get; private set; }
        public DateTimeOffset DateSubscribed { get; private set; }
        public string Name { get; private set; }

        public SubscribersController(
            DataContext dataContext)
        {
            _dataContext = dataContext;

        }
        [HttpGet]

        public IActionResult GetAll()
        {
            var response = new Response();
            var subscribers = _dataContext
            .Subscribers
            .Select(subscriber => new SubscriberGetDto
            {
                Id = subscriber.Id,
                Name = subscriber.Name,
                Email = subscriber.Email,
                DateSubscribed = subscriber.DateSubscribed,
            })
            .ToList();

            response.Data = subscribers;
            return Ok(response);
        }
        [HttpGet("{id:int}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var response = new Response();

            var subscribersToReturn = _dataContext
                .Subscribers
                .Select(subscriber => new SubscriberGetDto
                {
                    Id = subscriber.Id,
                    Name = subscriber.Name,
                    Email = subscriber.Email,
                    DateSubscribed = subscriber.DateSubscribed,


                })
                .FirstOrDefault(Subscriber => Subscriber.Id == id);

            if (subscribersToReturn == null)
            {
                response.AddError("id", "Subscriber Not Found");
                return BadRequest(response);
            }

            response.Data = subscribersToReturn;
            return Ok(response);
        }

        [HttpPost]

        public IActionResult Create([FromBody] SubscriberCreateDto subscriberCreateDto)
        {
            var response = new Response();

            var subscriberToAdd = new Subscriber
            {
                DateSubscribed = DateTimeOffset.Now,
                Name = subscriberCreateDto.Name,
                Email = subscriberCreateDto.Email,
            };
            _dataContext.Subscribers.Add(subscriberToAdd);
            _dataContext.SaveChanges();

            var subscriberToReturn = new SubscriberGetDto();
            {
                Id = subscriberToAdd.Id;
                Email = subscriberToAdd.Email;
                DateSubscribed = subscriberToAdd.DateSubscribed;
                Name = subscriberToAdd.Name;
                    
            };

            response.Data = subscriberToReturn;
            return Created("", response);
        }

        [HttpPut("{id:int}")]

        public IActionResult Update([FromRoute] int id,
        [FromBody] SubscriberUpdateDto subscriberUpdateDto)
        {
            var response = new Response();

            var subscriberToUpdate = _dataContext
                .Subscribers
                .FirstOrDefault(subscriber => subscriber.Id == id);

            if (subscriberToUpdate == null)
            {
                response.AddError("id", "Subscriber not found");
                return BadRequest(response);
            }
            subscriberToUpdate.Name = subscriberUpdateDto.Name;
            subscriberToUpdate.Email = subscriberUpdateDto.Email;
            _dataContext.SaveChanges();

            var subscriberToReturn = new SubscriberGetDto
            {
                Id = subscriberToUpdate.Id,
                Name = subscriberToUpdate.Name,
                Email = subscriberToUpdate.Email,
                DateSubscribed = subscriberToUpdate.DateSubscribed,
               
            };

            response.Data = subscriberToReturn;
            return Ok(response);

        }


        [HttpDelete("{id:int}")]

        public IActionResult Delete([FromRoute] int id)
        {
            var response = new Response();
            
            var subscriberToDelete = _dataContext
                .Subscribers
                .FirstOrDefault(subscriber => subscriber.Id == id);

            if (subscriberToDelete == null)
            {
                response.AddError("id", "Subscriber not found.");
                return BadRequest(response);
            }

            _dataContext.Remove(subscriberToDelete);
            _dataContext.SaveChanges();

            response.Data = true;
            return Ok(response);
        }


       
    }
   
    }

