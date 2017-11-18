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
    public class DutyPlanController : ApiController
    {
        private DutyPlanBLL bll = new DutyPlanBLL();

        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<DutyPlanModel>> GetDutyPlan(int start, int limit, int regionid)
        {
            return bll.GetDutyPlanList(null, start, limit, regionid);
        }
        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<DutyPlanModel>> GetDutyPlan(string filter, int start, int limit, int regionid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetDutyPlanList(filters, start, limit, regionid);
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddDutyPlan(DutyPlanModel model)
        {
            int result = bll.AddDutyPlan(model);
            if (!string.IsNullOrEmpty(model.copytime))
            {
                model.statsdate = DateTime.Parse(model.copytime);
                bll.AddDutyPlan(model);
            }

            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html")
            };
            return response;
        }

        [HttpPost]
        public HttpResponseMessage EditDutyPlan(DutyPlanModel model)
        {
            int result = bll.EditDutyPlan(model);

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
        public HttpResponseMessage DeleteDutyPlan(string ids)
        {
            bll.DeleteDutyPlan(ids);
            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html")
            };
            return response;
        }

        public List<UserModel> GetDutyPlanListByID(int id, int postid)
        {
            return bll.GetDutyPlanListByID(id, postid);
        }

        /// <summary>
        /// 导出
        /// </summary>
        [HttpGet]
        public HttpResponseMessage Export(int regionid)
        {
            return bll.Export(regionid);
        }
    }
}
