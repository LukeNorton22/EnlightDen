using System;
using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/email-newsletter")]
    public class EmailNewslettersController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public EmailNewslettersController(
            DataContext dataContext)
        {
            _dataContext = dataContext;

        }

        public int Id { get; private set; }
        public DateTimeOffset DateSent { get; private set; }
        public string Title { get; private set; }
        public string Message { get; private set; }
        public object emailNewsletter { get; private set; }

        [HttpGet]

        public IActionResult GetAll()
        {
            var response = new Response();
            var emailNewsletters = _dataContext
            .EmailNewsletters
            .Select(emailNewsletter => new EmailNewsletterGetDto
            {
                Id = emailNewsletter.Id,
                Title = emailNewsletter.Title,
                Message = emailNewsletter.Message,
                DateSent = emailNewsletter.DateSent,
            })
            .ToList();

            response.Data = emailNewsletters;
            return Ok(response);
        }


        [HttpGet("{id:int}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var response = new Response();

            var emailNewslettersToReturn = _dataContext
                .EmailNewsletters
                .Select(emailNewsleter => new EmailNewsletterGetDto
                {
                    Id = emailNewsleter.Id,
                    Title = emailNewsleter.Title,
                    Message = emailNewsleter.Message,
                    DateSent = emailNewsleter.DateSent,



                })
                .FirstOrDefault(EmailNewsletter => EmailNewsletter.Id == id);

            if (emailNewslettersToReturn == null)
            {
                response.AddError("id", "Email NewsLetter Not Found");
                return BadRequest(response);
            }

            response.Data = emailNewslettersToReturn;
            return Ok(response);
        }

        [HttpPost]

        public IActionResult Create([FromBody] EmailNewsletterCreateDto emailNewsletterCreateDto)
        {
            var response = new Response();

            var emailNewsletterToAdd = new EmailNewsletter
            {
                DateSent = DateTimeOffset.Now,
                Title = emailNewsletterCreateDto.Title,
                Message = emailNewsletterCreateDto.Message,
            };
            _dataContext.EmailNewsletters.Add(emailNewsletterToAdd);
            _dataContext.SaveChanges();

            var emailNewsletterToReturn = new EmailNewsletterGetDto();
            {
                Id = emailNewsletterToAdd.Id;
                Title = emailNewsletterToAdd.Title;
                Message = emailNewsletterToAdd.Message;
                DateSent = DateTimeOffset.Now;
            };
            response.Data = emailNewsletterToReturn;
            return Created("", response);
        }

        [HttpPut("{id:int}")]

        public IActionResult Update([FromRoute] int id,
            [FromBody] EmailNewsletterUpdateDto emailNewsletterUpdateDto)
        {
            var response = new Response();

            var emailNewsletterToUpdate = _dataContext
                .EmailNewsletters
                .FirstOrDefault(emailNewsletter => emailNewsletter.Id == id);

            if (emailNewsletterToUpdate == null)
            {
                response.AddError("id", "Email Newsletter not found.");
                return BadRequest(response);
            }

            emailNewsletterToUpdate.Title = emailNewsletterUpdateDto.Title;
            emailNewsletterToUpdate.Message = emailNewsletterUpdateDto.Message;
            _dataContext.SaveChanges();

            var emailNewsletterToReturn = new EmailNewsletterGetDto
            {
                Id = emailNewsletterToUpdate.Id,
                Title = emailNewsletterToUpdate.Title,
                Message = emailNewsletterToUpdate.Message,
                DateSent = DateTimeOffset.Now
            };

            response.Data = emailNewsletterToReturn;
            return Ok(response);
        }

        [HttpDelete("{id:int}")]

        public IActionResult Delete([FromRoute] int id)
        {
            var response = new Response();

            var emailNewsletterToDelete = _dataContext
                .EmailNewsletters
                .FirstOrDefault(emailNewsletter => emailNewsletter.Id == id);

            if (emailNewsletterToDelete == null)
            {
                response.AddError("id", "Email Newsletter not found.");
                return BadRequest(response);

            }
            _dataContext.Remove(emailNewsletterToDelete);
            _dataContext.SaveChanges();

            response.Data = true;
            return Ok(response);

        }
    }
}



