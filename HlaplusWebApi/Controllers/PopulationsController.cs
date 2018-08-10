using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using HLAPoint.Domain.Entities;
using System.Net.Http.Headers;

namespace HlaPoint.web.Controllers
{
    [Authorize]
    public class PopulationsController : ApiController
    {
        private HLAPointModelContainer db = new HLAPointModelContainer();

        // GET: api/Populations
        public IHttpActionResult GetPopulations()
        {
            try
            {
                var res = db.Populations.Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.CreatedDateTime,
                    p.LastModifiedDateTime,
                    CreatedBy = db.Users.Where(u => u.Id == p.CreatedBy).FirstOrDefault().UserName,
                    LastModifiedByUser= db.Users.Where(u => u.Id == p.LastModifiedBy).FirstOrDefault().UserName,
                    p.IsDeleted

                }


                ).ToList();


                var response = Request.CreateResponse(HttpStatusCode.OK, res);
                response.Headers.CacheControl = new CacheControlHeaderValue()
                {
                    NoCache = true,


                };



                return Json(res);
            }catch(Exception ex)
            {
                return Json(ex);
            }
        }

        // GET: api/Populations/5
        [ResponseType(typeof(Population))]
        public IHttpActionResult GetPopulation(int id)
        {
            Population population = db.Populations.Find(id);
            if (population == null)
            {
                return NotFound();
            }

            return Ok(population);
        }

        // PUT: api/Populations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPopulation(int id, Population population)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != population.Id)
            {
                return BadRequest();
            }

            db.Entry(population).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PopulationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Populations
       
        public IHttpActionResult GetPopulations(string Name,string Description,string UserName,string Id,string isDeleted)
        {
            try
            {
                 var userdet = new User();
                 userdet = db.Users.Where(u => u.UserName == UserName).FirstOrDefault();
                 var id = 0;
                int PopId = int.Parse(Id);
                bool PopStatus = bool.Parse(isDeleted);
                if (PopId == 0)
                {

                    var newpop = new Population
                    {
                        Name = Name,
                        Description = Description,
                        CreatedBy = (short)userdet.Id,
                        CreatedDateTime = DateTimeOffset.Now,
                        IsDeleted = false,
                        LastModifiedBy = (short)userdet.Id,
                        LastModifiedDateTime = DateTimeOffset.Now,
                        Id = 0

                    };

                    db.Populations.Add(newpop);
                    db.SaveChanges();

                    id = newpop.Id;
                }
                else {

                    id = PopId;

                    var upd = db.Populations.Where(p => p.Id == id).FirstOrDefault();
                    upd.Name = Name;
                    upd.Description = Description;                   
                    upd.LastModifiedBy = (short)userdet.Id;                   
                    upd.LastModifiedDateTime = DateTimeOffset.Now;
                    upd.IsDeleted = PopStatus;
                    db.SaveChanges();
                    
                }
                var res = db.Populations.Where (p => p.Id==id).Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.CreatedDateTime,
                    p.LastModifiedDateTime,
                    CreatedBy = db.Users.Where(u => u.Id == p.CreatedBy).FirstOrDefault().UserName,
                    LastModifiedByUser = db.Users.Where(u => u.Id == p.LastModifiedBy).FirstOrDefault().UserName,
                    p.IsDeleted

                }


                ).ToList();


                return Json(res);

            }
            catch (Exception ex)
            {
                return Json(ex);
            }

            
        }

        // DELETE: api/Populations/5
        [ResponseType(typeof(Population))]
        public IHttpActionResult DeletePopulation(int id)
        {
            Population population = db.Populations.Find(id);
            if (population == null)
            {
                return NotFound();
            }

            db.Populations.Remove(population);
            db.SaveChanges();

            return Ok(population);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PopulationExists(int id)
        {
            return db.Populations.Count(e => e.Id == id) > 0;
        }
    }
}