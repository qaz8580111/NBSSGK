using NBSSGK.ZHCG.DAL;
using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.BLL
{
   public class CarPatrolPlanBLL
    {
        private CarPatrolPlanDAL dal = new CarPatrolPlanDAL();
        /// <summary>
        /// 查询用户分页列表
        /// </summary>
        public Paging<List<CarPatrolPlanModel>> GetCarPatrolPlanList(List<Filter> filters, int start, int limit,int regionid)
        {
            List<CarPatrolPlanModel> items = dal.GetCarPatrolPlanList(filters, start, limit, regionid);
            int total = dal.GetCarPatrolPlanCoutn(filters, regionid);

            Paging<List<CarPatrolPlanModel>> paging = new Paging<List<CarPatrolPlanModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }


        /// <summary>
        /// 删除单位
        /// </summary>
        public int DeleteCarPatrolPlan(int id)
        {
            return dal.DeleteCarPatrolPlan(id);
        }


        /// <summary>
        /// 添加用户
        /// </summary>
        /// <returns>1 添加成功</returns>
        public int AddCarPatrolPlan(CarPatrolPlanModel model)
        {
            model.createddate = model.modifieddate = DateTime.Now;
            dal.AddCarPatrolPlan(model);

            return 1;
        }

        public int EditCarPatrolPlan(CarPatrolPlanModel model)
        {
            try
            {
                dal.EditCarPatrolPlan(model);
                return 1;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
