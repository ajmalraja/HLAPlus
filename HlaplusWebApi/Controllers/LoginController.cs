using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HlaplusWebApi.Domain;

namespace HlaPoint.web.Controllers
{
    [RoutePrefix("api/Logon")]
  
    public class LoginController : ApiController
    {
       
        [Route("")]
        public IHttpActionResult Get()
        {
            try {
                using (hlaplusEntities db = new hlaplusEntities())
                {
                    UserAccount user = new UserAccount();

                    user = db.UserAccounts.Where(u => u.Email == "gpearsonn@hotmail.com").FirstOrDefault();
                        


                    if (user == null)
                    {
                        return Json("Error");

                    }
                    else
                    {
                        return Json("Web API was sucessfully Tested..v2.2");
                    }
                }

            }catch(Exception ex)
            {
                return Json(ex);
            }

        }
    }
}
