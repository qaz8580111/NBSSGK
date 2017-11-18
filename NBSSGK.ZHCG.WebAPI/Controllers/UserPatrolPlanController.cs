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
    public class UserPatrolPlanController : ApiController
    {
        private UserPatrolPlanBLL bll = new UserPatrolPlanBLL();

        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<UserPatrolPlanModel>> GetUserPatrolPlan(int start, int limit,int regionid)
        {
            return bll.GetUserPatrolPlanList(null, start, limit, regionid);
        }
        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<UserPatrolPlanModel>> GetUserPatrolPlan(string filter, int start, int limit, int regionid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetUserPatrolPlanList(filters, start, limit,regionid);
        }

        /// <summary>
        /// 根据ID获得详细信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserPatrolPlanModel GetUserPatrolPlanByID(int id)
        {
            return bll.GetUserPatrolPlanByID(id);
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddUserPatrolPlan(UserPatrolPlanModel model)
        {
            int result = bll.AddUserPatrolPlan(model);

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
        public HttpResponseMessage DeleteUserPatrolPlan(string ids)
        {
            bll.DeleteUserPatrolPlan(ids);
            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html")
            };
            return response;
        }

        [HttpPost]
        public HttpResponseMessage EditUserPatrolPlan(UserPatrolPlanModel model)
        {
            int result = bll.EditUserPatrolPlan(model);

            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html")
            };
            return response;
        }

    }
}
