using NBSSGK.ZHCG.DAL;
using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.BLL
{
    public class UserBLL
    {
        private UserDAL dal = new UserDAL();

        public List<UserModel> GetUsersAllList(List<Filter> filters,int regionid)
        {
            return dal.GetUsersAllList(filters, regionid);
        }

        public List<UserModel> GetUsersAllListByID(List<Filter> filters, int regionid,int id)
        {
            return dal.GetUsersAllListByID(filters, regionid,id);
        }
    }
}
