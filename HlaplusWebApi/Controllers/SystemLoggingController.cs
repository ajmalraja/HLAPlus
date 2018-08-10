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
using SendGrid;
using SendGrid.Helpers.Mail;


namespace HlaPoint.web.Controllers
{
    public class SystemLoggingController : ApiController
    {
        private HLAPointModelContainer db = new HLAPointModelContainer();

        // GET: api/SystemLogging
        public IQueryable<System_Logging> GetSystem_Logging()
        {
            return db.System_Logging;
        }

        // GET: api/SystemLogging/5
        [ResponseType(typeof(System_Logging))]
        public IHttpActionResult GetSystem_Logging(int id)
        {
            System_Logging system_Logging = db.System_Logging.Find(id);
            if (system_Logging == null)
            {
                return NotFound();
            }

            return Ok(system_Logging);
        }

        // PUT: api/SystemLogging/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSystem_Logging(int id, System_Logging system_Logging)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != system_Logging.Id)
            {
                return BadRequest();
            }

            db.Entry(system_Logging).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!System_LoggingExists(id))
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

        // POST: api/SystemLogging
        [ResponseType(typeof(System_Logging))]
        public IHttpActionResult PostSystem_Logging([FromBody]System_Logging system_Logging)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var syslog = new System_Logging
                {
                    Id = 0,
                    EnteredDate = system_Logging.EnteredDate,
                    logMessage = '@' + system_Logging.logMessage.ToString(),
                    logRouteInfo = system_Logging.logRouteInfo,
                    loguserName = system_Logging.loguserName != null ? system_Logging.loguserName : "Loginfailed"




                };

                db.System_Logging.Add(syslog);
                db.SaveChanges();
           


            var client = new SendGridClient("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");
            var msg = new SendGrid.Helpers.Mail.SendGridMessage()
            {
                From = new EmailAddress("DonotReply@Hlapoint.com"),
                Subject = "HLAPointErrorNotification<DonotReply>",
                PlainTextContent = "HLAPointErrorNotification",
                HtmlContent = "<strong>ErrorReportedFor :</strong>" + syslog.loguserName + "</br>"
                                + "<strong>Resource Accessed :</strong>" + system_Logging.logRouteInfo + "</br>"
                                + "<strong>ErrorDetails :</strong>" + system_Logging.logMessage + "</br>"

            };

                //var emailst = new List<EmailAddress>();
                //var emailaddr1 = new EmailAddress("ARaja@abmdr.org.au");
                //emailst.Add(emailaddr1);
                //var emailaddr2 = new EmailAddress("GPearson@abmdr.org.au");
                //emailst.Add(emailaddr1);
                //msg.AddTos(emailst);
                msg.AddTo(new EmailAddress("ARaja@abmdr.org.au", "Test User"));
            var response = client.SendEmailAsync(msg);

            return CreatedAtRoute("DefaultApi", new { id = system_Logging.Id }, system_Logging);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }

        }

        // DELETE: api/SystemLogging/5
        [ResponseType(typeof(System_Logging))]
        public IHttpActionResult DeleteSystem_Logging(int id)
        {
            System_Logging system_Logging = db.System_Logging.Find(id);
            if (system_Logging == null)
            {
                return NotFound();
            }

            db.System_Logging.Remove(system_Logging);
            db.SaveChanges();

            return Ok(system_Logging);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool System_LoggingExists(int id)
        {
            return db.System_Logging.Count(e => e.Id == id) > 0;
        }
    }
}