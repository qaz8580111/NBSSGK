using HZW.ZHCG.WebAPI.Attributes;
using NBSSGK.ZHCG.BLL;
using NBSSGK.ZHCG.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace NBSSGK.ZHCG.WebAPI.Controllers
{
    [LoggingFilter]
    public class CarPatrolPlanController : ApiController
    {
        private CarPatrolPlanBLL bll = new CarPatrolPlanBLL();

        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<CarPatrolPlanModel>> GetCarPatrolPlan(int start, int limit,int regionid)
        {
            return bll.GetCarPatrolPlanList(null, start, limit,regionid);
        }
        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<CarPatrolPlanModel>> GetCarPatrolPlan(string filter, int start, int limit, int regionid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetCarPatrolPlanList(filters, start, limit,regionid);
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddCarPatrolPlan(CarPatrolPlanModel model)
        {
            int result = bll.AddCarPatrolPlan(model);

            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html")
            };
            return response;
        }

        [HttpPost]
        public HttpResponseMessage EditCarPatrolPlan(CarPatrolPlanModel model)
        {
            int result = bll.EditCarPatrolPlan(model);

            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html")
            };
            return response;
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage DeleteCarPatrolPlan(string id)
        {
            int result = 0;
            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html")
            };
            string ids = id.Substring(0, id.Length - 1);
            string[] a = ids.Split(',');
            foreach (var c in a)
            {
                int b = int.Parse(c);
                result = bll.DeleteCarPatrolPlan(b);
            }
            return response;
        }
    }
}
