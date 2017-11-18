using NBSSGK.ZHCG.DAL;
using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.BLL
{
   public class CarBLL
    {
        private CarDAL dal = new CarDAL();

        public List<CarModel> GetCarsAllList(List<Filter> filters,int regionid)
        {
            return dal.GetCarAllList(filters, regionid);
        }
    }
}
