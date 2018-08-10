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
   
    public class HaplotypeController : ApiController
    {
        private HLAPointModelContainer db = new HLAPointModelContainer();

        // GET: api/Haplotype
        public IHttpActionResult GetHaplotypeFrequencies()

        {

            try
            {


                var res = db.HaplotypeFrequencies.Select(h =>

                 new
                 {
                     h.Id,
                     h.Haplotype,
                     h.Count,
                     h.Frequency,
                     h.LinkageDisEquilibrium,
                     populationName = db.Populations.Where(p => p.Id == h.PopulationId).FirstOrDefault().Name,
                     h.CreatedDateTime,
                     h.LastModifiedDateTime,
                     createdbyuser = db.Users.Where(u => u.Id == h.CreatedBy).FirstOrDefault().UserName,
                     LastModifiedByUser = db.Users.Where(u => u.Id == h.LastModifiedBy).FirstOrDefault().UserName,
                     h.isDeleted

                 }


                ).ToList();


                return Json(res);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        // GET: api/Haplotype/5
        [ResponseType(typeof(HaplotypeFrequency))]
        public IHttpActionResult GetHaplotypeFrequency(int id)
        {
            HaplotypeFrequency haplotypeFrequency = db.HaplotypeFrequencies.Find(id);
            if (haplotypeFrequency == null)
            {
                return NotFound();
            }

            return Ok(haplotypeFrequency);
        }

        // PUT: api/Haplotype/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutHaplotypeFrequency(int id, HaplotypeFrequency haplotypeFrequency)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != haplotypeFrequency.Id)
            {
                return BadRequest();
            }

            db.Entry(haplotypeFrequency).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HaplotypeFrequencyExists(id))
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

        // POST: api/Haplotype
        [ResponseType(typeof(HaplotypeFrequency))]
        public IHttpActionResult PostHaplotypeFrequency(HaplotypeFrequency haplotypeFrequency)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.HaplotypeFrequencies.Add(haplotypeFrequency);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = haplotypeFrequency.Id }, haplotypeFrequency);
        }

        // DELETE: api/Haplotype/5
        [ResponseType(typeof(HaplotypeFrequency))]
        public IHttpActionResult DeleteHaplotypeFrequency(int id)
        {
            HaplotypeFrequency haplotypeFrequency = db.HaplotypeFrequencies.Find(id);
            if (haplotypeFrequency == null)
            {
                return NotFound();
            }

            db.HaplotypeFrequencies.Remove(haplotypeFrequency);
            db.SaveChanges();

            return Ok(haplotypeFrequency);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HaplotypeFrequencyExists(int id)
        {
            return db.HaplotypeFrequencies.Count(e => e.Id == id) > 0;
        }

        public IHttpActionResult GetHaplotypeFrequencies(string PopulationName, string Haplotype,
            string UserName, string Id, string isDeleted,string Count,string Frequency,string LinkDisEq)
        {
            try
            {
                var userdet = new User();
                userdet = db.Users.Where(u => u.UserName == UserName).FirstOrDefault();
                var id = 0;
                int HapId = int.Parse(Id);
                decimal Hapcount = decimal.Parse(Count);
                decimal HapFreq = decimal.Parse(Frequency);
                decimal HapLinkDisEq = decimal.Parse(Count);
                bool Hapstatus = bool.Parse(isDeleted);
                var selpop = db.Populations.Where(p => p.Name == PopulationName).FirstOrDefault();

                if (HapId == 0)
                {
                    

                    var newhap = new HaplotypeFrequency
                    {
                       PopulationId=selpop.Id,
                       Haplotype=Haplotype,
                       Count=Hapcount,
                       Frequency=HapFreq,
                       LinkageDisEquilibrium=HapLinkDisEq,
                       CreatedBy= userdet.Id,
                       LastModifiedBy=userdet.Id,
                       CreatedDateTime=DateTimeOffset.Now,
                       LastModifiedDateTime= DateTimeOffset.Now,
                       isDeleted=false,                  
                    };

                    db.HaplotypeFrequencies.Add(newhap);
                    db.SaveChanges();

                    id = newhap.Id;
                }
                else
                {

                    id = HapId;

                    var upd = db.HaplotypeFrequencies.Where(p => p.Id == id).FirstOrDefault();

                    upd.PopulationId = selpop.Id;
                    upd.Count = Hapcount;
                    upd.Frequency = HapFreq;
                    upd.LinkageDisEquilibrium = HapLinkDisEq;
                    upd.Haplotype = Haplotype;                   
                    upd.LastModifiedBy = userdet.Id;                   
                    upd.LastModifiedDateTime = DateTimeOffset.Now;
                    upd.isDeleted = Hapstatus;

                    db.SaveChanges();

                }
                var res = db.HaplotypeFrequencies.Where(h => h.Id == id).Select(f => new
                {
                    f.Id,
                    f.Haplotype,
                    f.Count,
                    f.Frequency,
                    f.LinkageDisEquilibrium,
                    populationName = db.Populations.Where(p => p.Id == f.PopulationId).FirstOrDefault().Name,
                    f.CreatedDateTime,
                    f.LastModifiedDateTime,
                    f.isDeleted,
                    createdbyuser = db.Users.Where(u => u.Id == f.CreatedBy).FirstOrDefault().UserName,
                    LastModifiedByUser = db.Users.Where(u => u.Id == f.LastModifiedBy).FirstOrDefault().UserName
                   

                }          ).ToList();


                return Json(res);

            }
            catch (Exception ex)
            {
                return Json(ex);
            }


        }

        [Route("api/Haplotype/GetChartData")]

        public IHttpActionResult GetChartData()
        {
            try
            {
                var totalcnt = db.HaplotypeFrequencies.Count();
                var chartdet = db.HaplotypeFrequencies.Where(h => h.isDeleted==false).GroupBy(a => a.Population.Name).Select(s => new
                {
                    PopulationName = s.Key,
                    Count = s.Count()

                }).ToList();
                
                //var chartdet = db.HaplotypeFrequencies.Select(a => new {a.Population.Name,a.isDeleted}).Where(a => a.isDeleted == false).GroupBy(a => a.Name).ToList();
                var res = chartdet.Select(n => new
                {
                   key= n.PopulationName,
                    Count = Math.Round((((double)n.Count / (double)totalcnt) * 100), 2),
                    Description = n.PopulationName.ToString() + " " + Math.Round((((double)n.Count / (double)totalcnt) * 100), 2).ToString()
                });
                return Json(res);
            }catch(Exception ex)
            {
                return Json(ex);
            }
        }

    }
}