using NBSSGK.ZHCG.DAL;
using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.BLL
{
    public class CarPatrolLineBLL
    {
        private CarPatrolLineDAL dal = new CarPatrolLineDAL();

        /// <summary>
        /// 查询用户分页列表
        /// </summary>
        public Paging<List<CarPatrolLineModel>> GetCarPatrolLineList(List<Filter> filters, int start, int limit, int regionid)
        {
            List<CarPatrolLineModel> items = dal.GetCarPatrolLineList(filters, start, limit, regionid);
            int total = dal.GetCarPatrolLineCoutn(filters, regionid);

            Paging<List<CarPatrolLineModel>> paging = new Paging<List<CarPatrolLineModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }


        /// <summary>
        /// 删除单位
        /// </summary>
        public int DeleteCarPatrolLine(int id)
        {
            return dal.DeleteCarPatrolLine(id);
        }


        /// <summary>
        /// 添加用户
        /// </summary>
        /// <returns>1 添加成功</returns>
        public int AddCarPatrolLine(CarPatrolLineModel model)
        {
            model.createddate = model.modifieddate = DateTime.Now;
            dal.AddCarPatrolLine(model);

            return 1;
        }

        public int EditCarPatrolLine(CarPatrolLineModel model)
        {
            try
            {
                dal.EditCarPatrolLine(model);
                return 1;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
