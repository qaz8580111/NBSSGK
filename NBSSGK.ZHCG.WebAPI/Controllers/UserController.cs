using HZW.ZHCG.WebAPI.Attributes;
using NBSSGK.ZHCG.BLL;
using NBSSGK.ZHCG.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NBSSGK.ZHCG.WebAPI.Controllers
{
     [LoggingFilter]
    public class UserController : ApiController
    {
         private UserBLL bll = new UserBLL();

        
         public List<UserModel> GetUsersAllList(string filter,int regionid)
         {
             List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
             return bll.GetUsersAllList(filters, regionid);
         }

        public List<UserModel> GetUsersAllListByID(string filter, int regionid,int id)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetUsersAllListByID(filters, regionid,id);
        }
    }
}
