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
    public class UserPatrolLineController : ApiController
    {
        private UserPatrolLineBLL bll = new UserPatrolLineBLL();

         /// <summary>
         /// 列表
         /// </summary>
         /// <param name="start"></param>
         /// <param name="limit"></param>
         /// <returns></returns>
        [HttpGet]
        public Paging<List<UserPatrolLineModel>> GetUserPatrolLine(int start, int limit,int regionid)
        {
            return bll.GetUserPatrolLineList(null, start, limit,regionid);
        }
        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<UserPatrolLineModel>> GetUserPatrolLine(string filter, int start, int limit, int regionid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetUserPatrolLineList(filters, start, limit,regionid);
        }

        /// <summary>
        /// 根据ID获得详细信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserPatrolLineModel GetUserPatrolLineByID(int id)
        {
            return bll.GetUserPatrolLineByID(id);
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddUserPatrolLine(UserPatrolLineModel model)
        {
            int result = bll.AddUserPatrolLine(model);

            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html")
            };
            return response;
        }

        /// <summary>
        /// 编辑
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditUserPatrolLine(UserPatrolLineModel model)
        {
            int result = bll.EditUserPatrolLine(model);

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
        public HttpResponseMessage DeleteUserPatrolLine(string ids)
        {
            bll.DeleteUserPatrolLine(ids);
            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html")
            };
            return response;
        }

        //所属区域
        [HttpGet]
        public List<RegionModel> GetRegion()
        {
            return bll.GetRegion();
        }
    }
}
