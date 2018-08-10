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

using System.Collections.Concurrent;
using Microsoft.Owin.Security.Infrastructure;

namespace HlaplusWebApi
{
    public class SimpleRefreshTokenProvider : IAuthenticationTokenProvider
    {
        private static System.Collections.Concurrent.ConcurrentDictionary<string, AuthenticationTicket> _refreshTokens = new ConcurrentDictionary<string, AuthenticationTicket>();

        public void Create(AuthenticationTokenCreateContext context)
        {
            throw new NotImplementedException();
        }

        public async Task CreateAsync(AuthenticationTokenCreateContext context)
        {
            var guid = Guid.NewGuid().ToString();

            // maybe only create a handle the first time, then re-use
            _refreshTokens.TryAdd(guid, context.Ticket);

            // consider storing only the hash of the handle
            context.SetToken(guid);
        }

        public void Receive(AuthenticationTokenReceiveContext context)
        {
            throw new NotImplementedException();
        }

        public async Task ReceiveAsync(AuthenticationTokenReceiveContext context)
        {
            AuthenticationTicket ticket;
            if (_refreshTokens.TryRemove(context.Token, out ticket))
            {
                context.SetTicket(ticket);
            }
        }

    }
    
}