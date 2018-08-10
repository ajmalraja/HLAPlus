using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HlaPoint.web.Models;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Web.Http.Description;
using HLAPoint.Domain.Entities;
using System.Collections;
using System.Linq.Dynamic;
using HlaPoint.web.EnumsConstants;
using Newtonsoft.Json;
namespace HlaPoint.web.Controllers
{
    [RoutePrefix("api/AdvanceSearch")]
    [Authorize]
    public class AdvanceSerachController : ApiController
    {
        private HLAPointModelContainer db = new HLAPointModelContainer();
        #region Tablelist
        public Dictionary<string, Type> Tablelist = new Dictionary<string, Type>()
        {
            {"Populations",typeof(Population) },
            {"Haplotype",typeof(HaplotypeFrequency)},
            {"Users",typeof(HLAPoint.Domain.Entities.User)},
        };

        #endregion

        [Route("GetResult")]
        [HttpPost]
        public IHttpActionResult GetResult( [FromBody]Criteria[] Criteria)
        {
            var SqlQuery = QueryGenerator(Criteria);

            return Json(ExecuteQuery<Population>(SqlQuery).Select(p => new
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


                ).ToList());

        }


        private IEnumerable<TEntity> ExecuteQuery<TEntity>(string query) where TEntity : class
        {
            
            DbSet<TEntity> DbSet;
             DbSet = db.Set<TEntity>();
            var res = DbSet.SqlQuery(query).ToList();           
            return (res);
        }

        private string GetUserInfo(string userName)
        {

            var id = db.Users.Where(u => u.UserName == userName).FirstOrDefault().Id;
            return id.ToString();
            
        }

        private string  QueryGenerator(Criteria[] criterialst)

        {
            var desTableName = criterialst[0].gridName;
            var SqlQuery = "Select * From " + desTableName + "  Where ";
            var i = 0;
            var bracketcnt = 0;
            foreach (var item in criterialst)
            {
                if (i > 0)
                {
                    SqlQuery = SqlQuery + " " + item.RelOperator + " ";
                    if (item.RelOperator.Contains("("))
                    {
                        bracketcnt++;
                    }
                    if (item.RelOperator.Contains(")"))
                    {
                        bracketcnt--;
                    }
                }
                    

                var value = item.Value; ;

                if (desTableName != item.tableName)
                {

                    if (item.tableName == HlaPointEnumsConstants.tblUsers)
                        value = GetUserInfo(item.Value);
                }
              

                SqlQuery = SqlQuery + OperatorParser(item.ColumnName, item.Operator, value, item.ColumnType);


                i++;
            }

            for (var cnt=1;cnt<=bracketcnt;cnt++)
            {
                SqlQuery = SqlQuery + ")";

            }

            return SqlQuery;
        }

        private string OperatorParser(string predicate,string oper, string value,string valuetype)
        {

            var qrypredicate = " WITH(NOLOCK) ";
            switch (oper.ToUpper())
            {
                case HlaPointEnumsConstants.operEql:

                    {
                        if ((valuetype.ToUpper() == HlaPointEnumsConstants.dtypestr) || (valuetype.ToUpper() == HlaPointEnumsConstants.dtypedate))
                            qrypredicate = " " + predicate + " = '" + value + "'";
                        else
                            qrypredicate = " " + predicate + " = " + value ;
                        return qrypredicate;                        
                    }

                case HlaPointEnumsConstants.operNotEql:

                    {
                        if ((valuetype.ToUpper() == HlaPointEnumsConstants.dtypestr) || (valuetype.ToUpper() == HlaPointEnumsConstants.dtypedate))
                            qrypredicate = " " + predicate + " <> '" + value + "'";
                        else
                            qrypredicate = " " + predicate + " <> " + value;
                        return qrypredicate;
                    }


                case HlaPointEnumsConstants.operGt:

                    {
                        if ((valuetype.ToUpper() == HlaPointEnumsConstants.dtypestr) || (valuetype.ToUpper() == HlaPointEnumsConstants.dtypedate))
                            qrypredicate = " " + predicate + " > '" + value + "'";
                        else
                            qrypredicate = " " + predicate + " > " + value;
                        return qrypredicate;
                    }

                case HlaPointEnumsConstants.operLT:

                    {
                        if ((valuetype.ToUpper() == HlaPointEnumsConstants.dtypestr) || (valuetype.ToUpper() == HlaPointEnumsConstants.dtypedate))
                            qrypredicate = " " + predicate + " < '" + value + "'";
                        else
                            qrypredicate = " " + predicate + " > " + value;
                        return qrypredicate;
                    }

                case HlaPointEnumsConstants.operGtEql:

                    {
                        if ((valuetype.ToUpper() == HlaPointEnumsConstants.dtypestr) || (valuetype.ToUpper() == HlaPointEnumsConstants.dtypedate))
                            qrypredicate = " " + predicate + " >= '" + value + "'";
                        else
                            qrypredicate = " " + predicate + " >= " + value;
                        return qrypredicate;
                    }

                case HlaPointEnumsConstants.operLtEql:

                    {
                        if ((valuetype.ToUpper() == HlaPointEnumsConstants.dtypestr) || (valuetype.ToUpper() == HlaPointEnumsConstants.dtypedate))
                            qrypredicate = " " + predicate + " <= '" + value + "'";
                        else
                            qrypredicate = " " + predicate + " <= " + value;
                        return qrypredicate;
                    }
                case HlaPointEnumsConstants.operCont:

                    {
                        if (valuetype.ToUpper() == HlaPointEnumsConstants.dtypestr)
                            qrypredicate = " " + predicate + " like ( '%" + value + "%' )";
                       
                        return qrypredicate;
                    }

                case HlaPointEnumsConstants.operNotcont:

                    {
                        if (valuetype.ToUpper() == HlaPointEnumsConstants.dtypestr)
                            qrypredicate = " " + predicate + " not like ( '%" + value + "%' )";
                      
                        return qrypredicate;
                    }

                case HlaPointEnumsConstants.operStart:

                    {
                        if (valuetype.ToUpper() == HlaPointEnumsConstants.dtypestr)
                            qrypredicate = " " + predicate + " like ( '" + value + "%' )";
                        
                        return qrypredicate;
                    }
                case HlaPointEnumsConstants.operEnd:

                    {
                        if (valuetype.ToUpper() == HlaPointEnumsConstants.dtypestr)
                            qrypredicate = " " + predicate + " like ( '%" + value + "' )";

                        return qrypredicate;
                    }

            }
            return qrypredicate;
        }
        
        [Route("SaveQuery")]
        [HttpPost]
       
        public IHttpActionResult SaveQuery([FromBody]Criteria[] Criteria,string UserName,string Description,string GridName)
        {
            try { 
            var userdet = db.Users.Where(u => u.UserName == UserName).FirstOrDefault().Id;

                var qryobj = new AdvancedSearch
                {
                    Description = Description,
                    QueryObject = JsonConvert.SerializeObject(Criteria),
                    LastModifiedDate = DateTimeOffset.Now,
                    UserId = userdet,
                    gridName= GridName


                };

            db.AdvancedSearches.Add(qryobj);
            db.SaveChanges();

            return Json("Ok");
            }catch (Exception ex)
            {
                return Json(ex);
            }

        }
        
        [Route("GetQueries")]
        [HttpGet]
        public IHttpActionResult GetQueries(string UserName,string gridname)
        {

            var userDet = db.Users.Where(u => u.UserName == UserName).FirstOrDefault();
            var res = db.AdvancedSearches.Where(a => a.UserId == userDet.Id && a.gridName== gridname).Select(a => new {
                a.Description,
                a.QueryObject

            }).ToList();
            return Json(res);

        }


        }

    } 
    
