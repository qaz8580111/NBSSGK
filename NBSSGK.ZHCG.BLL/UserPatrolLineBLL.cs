using NBSSGK.ZHCG.DAL;
using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.BLL
{
   public class UserPatrolLineBLL
    {
       private UserPatrolLineDAL dal = new UserPatrolLineDAL();

       /// <summary>
       /// 查询用户分页列表
       /// </summary>
       public Paging<List<UserPatrolLineModel>> GetUserPatrolLineList(List<Filter> filters, int start, int limit,int regionid)
       {
           List<UserPatrolLineModel> items = dal.GetUserPatrolLineList(filters, start, limit, regionid);
           int total = dal.GetUserPatrolLineCoutn(filters, regionid);

           Paging<List<UserPatrolLineModel>> paging = new Paging<List<UserPatrolLineModel>>();
           paging.Items = items;
           paging.Total = total;

           return paging;
       }

        /// <summary>
        /// 根据ID获得详细信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserPatrolLineModel GetUserPatrolLineByID(int id)
        {
            return dal.GetUserPatrolLineByID(id);
        }


        /// <summary>
        /// 删除单位
        /// </summary>
        public void DeleteUserPatrolLine(string ids)
        {
            string[] idArr = ids.Split(',');
            dal.DeleteUserPatrolLine(idArr);
        }


       /// <summary>
       /// 添加用户
       /// </summary>
       /// <returns>1 添加成功</returns>
       public int AddUserPatrolLine(UserPatrolLineModel model)
       {
           model.createddate = model.modifieddate = DateTime.Now;
           dal.AddUserPatrolLine(model);

           return 1;
       }

        /// <summary>
        /// 编辑用户
        /// </summary>
        /// <returns>1 添加成功</returns>
        public int EditUserPatrolLine(UserPatrolLineModel model)
        {
            model.createddate = model.modifieddate = DateTime.Now;
            dal.EditUserPatrolLine(model);

            return 1;
        }

        //所属区域
        public List<RegionModel> GetRegion()
        {
            return dal.GetRegion();
        }
    }
}
