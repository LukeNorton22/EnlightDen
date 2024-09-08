using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using LearningStarter.Entities.LearningStarter.Entities;
using LearningStarter.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace LearningStarter
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();

            services.AddHsts(options =>
            {
                options.MaxAge = TimeSpan.MaxValue;
                options.Preload = true;
                options.IncludeSubDomains = true;
            });

            services.AddDbContext<DataContext>(options =>
            {
                // options.UseInMemoryDatabase("FooBar");
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            //TODO
            services.AddMvc();

            services
                .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Events.OnRedirectToLogin = context =>
                    {
                        context.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    };
                });

            services.AddAuthorization();

            // Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Learning Starter Server",
                    Version = "v1",
                    Description = "Description for the API goes here.",
                });

                c.CustomOperationIds(apiDesc => apiDesc.TryGetMethodInfo(out var methodInfo) ? methodInfo.Name : null);
                c.MapType(typeof(IFormFile), () => new OpenApiSchema { Type = "file", Format = "binary" });
            });

            services.AddSpaStaticFiles(config =>
            {
                config.RootPath = "learning-starter-web/build";
            });

            services.AddHttpContextAccessor();

            // configure DI for application services
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dataContext)
        {
            dataContext.Database.EnsureDeleted();
            dataContext.Database.EnsureCreated();
            
            app.UseHsts();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger(options =>
            {
                options.SerializeAsV2 = true;
            }); ;

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Learning Starter Server API V1");
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(x => x.MapControllers());

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "learning-starter-web";
                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3001");
                }
            });

            SeedUsers(dataContext);

            SeedSubscribers(dataContext);
            SeedEmailNewsletters(dataContext); 
            SeedInventories(dataContext);
            SeedBulletJournalEntries(dataContext);
            SeedOnlineStores(dataContext);
        }

        private void SeedSubscribers(DataContext dataContext)
        {
            if (!dataContext.Subscribers.Any())
            {
                var seededSubscriber = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Fist Larst",
                    Email = "FL@aol.net",
                };
                var seededSubscriber1 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Kearney Butler",
                    Email = "kearneybutler95@gmail.com",
                };
                var seededSubscriber2 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Elijah Phifer",
                    Email = "elijahphifer@selu.edu",
                };
                var seededSubscriber3 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Aiden Hrenyk",
                    Email = "aidenhrenyk@selu.edu",
                };
                var seededSubscriber4 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Kim Jones",
                    Email = "KimThaBimbo32@yahoo.com",
                };
                var seededSubscriber5 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Bobby Philips",
                    Email = "BBoiBob@gmail.com",
                };
                var seededSubscriber6 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Michael Clayton",
                    Email = "ImAMovie@yahoo.com",
                };
                var seededSubscriber7 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Jerry Kaywood",
                    Email = "JKversion1942@gmail.com",
                };
                var seededSubscriber8 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Lenora Burton",
                    Email = "Lgunner@gmail.com",
                };
                var seededSubscriber9 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "David Young",
                    Email = "MRnobody11@yahoo.com",
                };
                var seededSubscriber10 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Erica Simms",
                    Email = "EricaSims90@gmail.com",
                };
                var seededSubscriber11 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Humphry Gathers",
                    Email = "DotheHump567@gmail.com",
                };
                var seededSubscriber12 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Yvone Johnson",
                    Email = "YvoneJohn@gmail.com",
                };
                var seededSubscriber13 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Gerald Hope",
                    Email = "TheGreat1@gmail.com",
                };
                var seededSubscriber14 = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Kelly Rowe",
                    Email = "kellythedoll@yahoo.com",
                };

                dataContext.Subscribers.Add(seededSubscriber);
                dataContext.Subscribers.Add(seededSubscriber1);
                dataContext.Subscribers.Add(seededSubscriber2);
                dataContext.Subscribers.Add(seededSubscriber3);
                dataContext.Subscribers.Add(seededSubscriber4);
                dataContext.Subscribers.Add(seededSubscriber5);
                dataContext.Subscribers.Add(seededSubscriber6);
                dataContext.Subscribers.Add(seededSubscriber7);
                dataContext.Subscribers.Add(seededSubscriber8);
                dataContext.Subscribers.Add(seededSubscriber9);
                dataContext.Subscribers.Add(seededSubscriber10);
                dataContext.Subscribers.Add(seededSubscriber11);
                dataContext.Subscribers.Add(seededSubscriber12);
                dataContext.Subscribers.Add(seededSubscriber13);
                dataContext.Subscribers.Add(seededSubscriber14);
                dataContext.SaveChanges();
            }
        }
    
        private void SeedEmailNewsletters(DataContext dataContext)
        {
            if (!dataContext.EmailNewsletters.Any())
            {
                var seededEmailNewsletter = new EmailNewsletter
                {
                    DateSent = DateTimeOffset.Now,
                    Title = "Welcome!",
                    Message = "Hi, Welcome to your Virtual Newsletter!...",
                };
                var seededEmailNewsletter1 = new EmailNewsletter
                {
                    DateSent = DateTimeOffset.Now,
                    Title = "This Week's Deals!",
                    Message = "Check out this Week's Deals!...",
                };
                var seededEmailNewsletter2 = new EmailNewsletter
                {
                    DateSent = DateTimeOffset.Now,
                    Title = "Best Things to Buy this Month!",
                    Message = "Here's the Things to buy!...",
                };
                var seededEmailNewsletter3 = new EmailNewsletter
                {
                    DateSent = DateTimeOffset.Now,
                    Title = "Deals on Top of Deals!",
                    Message = "Let's take a look!...",
                };
                var seededEmailNewsletter4 = new EmailNewsletter
                {
                    DateSent = DateTimeOffset.Now,
                    Title = "Holiday Deals!",
                    Message = "Check out these deals for the holidays!...",
                };
                var seededEmailNewsletter5 = new EmailNewsletter
                {
                    DateSent = DateTimeOffset.Now,
                    Title = "Happy Thanksgiving!",
                    Message = "Happy Thansgiving!..."
                };
                var seededEmailNewsletter6 = new EmailNewsletter
                {
                    DateSent = DateTimeOffset.Now,
                    Title = "Black Friday Sale!",
                    Message = "Black Friday is here!...",
                };
                var seededEmailNewsletter7 = new EmailNewsletter
                {
                    DateSent = DateTimeOffset.Now,
                    Title = "Merry Christmas!",
                    Message = "Merry Christmas!...",
                };
                dataContext.EmailNewsletters.Add(seededEmailNewsletter);
                dataContext.EmailNewsletters.Add(seededEmailNewsletter1);
                dataContext.EmailNewsletters.Add(seededEmailNewsletter2);
                dataContext.EmailNewsletters.Add(seededEmailNewsletter3);
                dataContext.EmailNewsletters.Add(seededEmailNewsletter4);
                dataContext.EmailNewsletters.Add(seededEmailNewsletter5);
                dataContext.EmailNewsletters.Add(seededEmailNewsletter6);
                dataContext.EmailNewsletters.Add(seededEmailNewsletter7);
                dataContext.SaveChanges();
            }
        }





        private void SeedOnlineStores(DataContext dataContext) 
        { 
            if (!dataContext.Onlinestores.Any())
            {
                var seededOnlineStores = new OnlineStores
                {
                    StoreName = "Ebay",
                };
                
                var seededOnlineStores1 = new OnlineStores
                {
                    StoreName = "Etsy",
                };
                dataContext.Onlinestores.Add(seededOnlineStores);
                dataContext.Onlinestores.Add(seededOnlineStores1);
                dataContext.SaveChanges();
                

            }
        }
        private void SeedInventories(DataContext dataContext)
        {
            if (!dataContext.Inventories.Any()) {
                var seededInventory = new Inventories 
                {
                    ItemName = "Blue Dress",
                    ProductionCost = "$12.32",
                    Quantity = "4", 
                    Availabilty = false,
                    Comments = "All dresses are at the dry cleaners",
                    OnlineStoreId = "Ebay",
                    SiteListing = "$43.64",
                    DateAdded = "2/3/20",
                };
                var seededInventory1 = new Inventories
                {
                    ItemName = "Red Heels",
                    ProductionCost = "$2.00",
                    Quantity = "12",
                    Availabilty = true,
                    Comments = "Saved for friends wedding",
                    OnlineStoreId = "Etsy",
                    SiteListing = "$35.23",
                    DateAdded = "2/3/22",
                };
                var seededInventory2 = new Inventories
                {
                    ItemName = "Pokemon Socks-pikachu",
                    ProductionCost = "$5.00",
                    Quantity = "3",
                    Availabilty = false,
                    Comments = "Don't buy anymore; They dont sell well",
                    OnlineStoreId = "Ebay",
                    SiteListing = "$9.00",
                    DateAdded = "5/23/20",
                };
                var seededInventory3 = new Inventories
                {
                    ItemName = "False Dimond Ring",
                    ProductionCost = "$3.76",
                    Quantity = "1",
                    Availabilty = false,
                    Comments = "Some sucker bought it, make more false rings",
                    OnlineStoreId = "Ebay",
                    SiteListing = "$26.32",
                    DateAdded = "2/3/21",
                };
                var seededInventory4 = new Inventories
                {
                    ItemName = "Hitch Hiker's guide to the galaxy - the book",
                    ProductionCost = "Free",
                    Quantity = "1",
                    Availabilty = true,
                    Comments = "Nobody wants it, ill keep it listed though",
                    OnlineStoreId = "Amazon",
                    SiteListing = "$42.00",
                    DateAdded = "8/1/22",
                };
                dataContext.Inventories.Add(seededInventory);
                dataContext.Inventories.Add(seededInventory1);
                dataContext.Inventories.Add(seededInventory2);
                dataContext.Inventories.Add(seededInventory3);
                dataContext.Inventories.Add(seededInventory4);
                dataContext.SaveChanges();

            }
               
        }


        private void SeedBulletJournalEntries(DataContext dataContext)
        {
            if (!dataContext.BulletJournalEntries.Any())
            {
                var seededBulletJournalEntry = new BulletJournalEntry
                {
                    DateCreated = DateTimeOffset.Now,
                    Contents = "Buy Dresses",
                    IsDone = false,
                    Pushes = 0
                };

                var seededBulletJournalEntry1 = new BulletJournalEntry
                {
                    DateCreated = DateTimeOffset.Now,
                    Contents = "Buy red shoes",
                    IsDone = false,
                    Pushes = 0
                };

                dataContext.BulletJournalEntries.Add(seededBulletJournalEntry);
                dataContext.BulletJournalEntries.Add(seededBulletJournalEntry1);
                dataContext.SaveChanges();
            }

        }

        public void SeedUsers(DataContext dataContext)
        {

            var numUsers = dataContext.Users.Count();

            if (numUsers == 0)
            {
                var seededUser = new User
                {
                    FirstName = "Seeded",
                    LastName = "User",
                    Username = "admin",
                    Password = "password",
                    Email = "Email"
                };



                dataContext.Users.Add(seededUser);
                dataContext.SaveChanges();
            }

        }
        
    }
}