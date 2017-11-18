using NBSSGK.ZHCG.DAL;
using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.BLL
{
    public class UserPatrolPlanBLL
    {
        private UserPatrolPlanDAL dal = new UserPatrolPlanDAL();
        /// <summary>
        /// 查询用户计划列表
        /// </summary>
        public Paging<List<UserPatrolPlanModel>> GetUserPatrolPlanList(List<Filter> filters, int start, int limit, int regionid)
        {
            List<UserPatrolPlanModel> items = dal.GetUserPatrolPlanList(filters, start, limit, regionid);
            int total = dal.GetUserPatrolPlanCoutn(filters);

            Paging<List<UserPatrolPlanModel>> paging = new Paging<List<UserPatrolPlanModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 根据ID获得详细信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserPatrolPlanModel GetUserPatrolPlanByID(int id)
        {
            return dal.GetUserPatrolPlanByID(id);
        }

        /// <summary>
        /// 删除单位
        /// </summary>
        public void DeleteUserPatrolPlan(string ids)
        {
            string[] idArr = ids.Split(',');
            dal.DeleteUserPatrolPlan(idArr);
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <returns>1 添加成功</returns>
        public int AddUserPatrolPlan(UserPatrolPlanModel model)
        {
            model.createddate = model.modifieddate = DateTime.Now;
            dal.AddUserPatrolPlan(model);

            return 1;
        }

        public int EditUserPatrolPlan(UserPatrolPlanModel model)
        {
            try
            {
                dal.EditUserPatrolPlan(model);
                return 1;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
