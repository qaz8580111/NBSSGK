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
    public class CarController : ApiController
    {
        private CarBLL bll = new CarBLL();


        public List<CarModel> GetCarsAllList(string filter,int regionid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetCarsAllList(filters, regionid);
        }
    }
}
