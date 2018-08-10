using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Data.Common;
using System.Web;
using Microsoft.Owin;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using HlaplusWebApi.Domain;
//using HLAPoint.Domain.Concrete;
using BCrypt.Net;
using Microsoft.Owin.Security;


namespace HlaplusWebApi.App_Start
{
    public class SimpleAuthorizationServerProvider : Microsoft.Owin.Security.OAuth.OAuthAuthorizationServerProvider
    {

        public override async Task ValidateClientAuthentication(Microsoft.Owin.Security.OAuth.OAuthValidateClientAuthenticationContext context)
        {
            var clientId=string.Empty;
            var clientSecret=string.Empty;
            context.TryGetFormCredentials(out clientId, out clientSecret);
            context.Validated(clientId);
        }

        public override async Task GrantResourceOwnerCredentials(Microsoft.Owin.Security.OAuth.OAuthGrantResourceOwnerCredentialsContext context)
        {
            try
            {
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });


                using (hlaplusEntities con = new hlaplusEntities())
                {



                    var user = con.UserAccounts.Where(u => u.Email == context.UserName).FirstOrDefault();
                   // var userAccount = con.UserAccounts.ToList();
                   // var user=userAccount.Find(u => u.Email.Trim() == context.UserName);

                    if (user == null)
                    {
                        context.SetError("invalid_grant", "The user name is incorrect.");
                        return;
                    }
                    else
                    {
                        if (!BCrypt.Net.BCrypt.Verify(context.Password, user.Password))
                        {
                            context.SetError("invalid_grant", "The Password is incorrect.");
                            return;
                        }

                    }

                   
                }

                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
             
                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
                identity.AddClaim(new Claim("sub", context.UserName));

                var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                        "as:client_id", (context.ClientId == null) ?  context.UserName : context.ClientId
                    },
                    {
                        "userName", context.UserName
                    }
                });

                var db = new hlaplusEntities();
                var activeuser = db.UserAccounts.Where(u => u.Email == context.UserName).FirstOrDefault();
                //activeuser.LastActivityDate = DateTimeOffset.Now;
                //activeuser.LastLoginDate = DateTimeOffset.Now;
                //activeuser.IsOnline = true;
                db.SaveChanges();
                var ticket = new AuthenticationTicket(identity, props);
                context.Validated(ticket);
            }
        catch (Exception ex)
        {
            throw new Exception(ex.ToString());
    }
}

    public override Task GrantRefreshToken(Microsoft.Owin.Security.OAuth.OAuthGrantRefreshTokenContext context)
        {
            var originalClient = context.Ticket.Properties.Dictionary["as:client_id"];
            var currentClient = context.ClientId;

            if (originalClient != currentClient)
            {
                context.SetError("invalid_clientId", "Refresh token is issued to a different clientId.");
                return Task.FromResult<object>(null);
            }

            // Change auth ticket for refresh token requests
            var newIdentity = new ClaimsIdentity(context.Ticket.Identity);

            var newClaim = newIdentity.Claims.Where(c => c.Type == "newClaim").FirstOrDefault();
            if (newClaim != null)
            {
                newIdentity.RemoveClaim(newClaim);
            }
            newIdentity.AddClaim(new Claim("newClaim", "newValue"));

            var newTicket = new AuthenticationTicket(newIdentity, context.Ticket.Properties);
            context.Validated(newTicket);

            return Task.FromResult<object>(null);
        }

        public override Task TokenEndpoint(Microsoft.Owin.Security.OAuth.OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

    }
}