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
using HlaPoint.web.Models;
using Newtonsoft.Json;

namespace HlaPoint.web.Controllers
{
    [Authorize]
    public class UserPreferencesController : ApiController
    {
        private HLAPointModelContainer db = new HLAPointModelContainer();

        // GET: api/UserPreferences/5
        [ResponseType(typeof(UserPreference))]
        public IHttpActionResult GetUserPreference(string key,string userName)
        {
            var userDet = db.Users.Where(u => u.UserName == userName).FirstOrDefault();
            var userPreference = db.UserPreferences.Where(p => p.Key == key && p.UserId == userDet.Id).FirstOrDefault().Values;
            if (userPreference == null)
            {
                return NotFound();
            }

            return Json(userPreference);
        }

        // PUT: api/UserPreferences/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserPreference(int id, UserPreference userPreference)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userPreference.Id)
            {
                return BadRequest();
            }

            db.Entry(userPreference).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserPreferenceExists(id))
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

        // POST: api/UserPreferences
        [ResponseType(typeof(UserPreference))]
        public IHttpActionResult PostUserPreference(string key, [FromBody]GridSettingDet[] griddet,string username)
        {

            try { 
            var userDet = db.Users.Where(u => u.UserName == username).FirstOrDefault();
            var userPreference = db.UserPreferences.Where(p => p.Key == key && p.UserId == userDet.Id);

                  if (userPreference.Count()==0 )
                    {
                        var userPrefDet = new UserPreference
                        {
                            Key = key,
                            Values = JsonConvert.SerializeObject(griddet),
                            LastModifiedDate = DateTimeOffset.Now,
                            UserId = userDet.Id

                        };
                        db.UserPreferences.Add(userPrefDet);
                        db.SaveChanges();
                        return Json("Ok");
                    }
                  else
                {
                  var  upduserPreference = userPreference.FirstOrDefault();

                    upduserPreference.Values = JsonConvert.SerializeObject(griddet);
                    upduserPreference.LastModifiedDate = DateTimeOffset.Now;
                    db.SaveChanges();
                    return Json("Ok");

                }
                
            }
            catch (Exception ex)
            {
                return Json(ex);
            }

        }

        // DELETE: api/UserPreferences/5
        [ResponseType(typeof(UserPreference))]
        public IHttpActionResult DeleteUserPreference(int id)
        {
            UserPreference userPreference = db.UserPreferences.Find(id);
            if (userPreference == null)
            {
                return NotFound();
            }

            db.UserPreferences.Remove(userPreference);
            db.SaveChanges();

            return Ok(userPreference);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserPreferenceExists(int id)
        {
            return db.UserPreferences.Count(e => e.Id == id) > 0;
        }
    }
}