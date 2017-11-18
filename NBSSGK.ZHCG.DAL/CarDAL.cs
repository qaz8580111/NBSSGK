using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.DAL
{
    public class CarDAL
    {
        public List<CarModel> GetCarAllList(List<Filter> filters,int regionid)
        {
            List<CarModel> list = new List<CarModel>();

            using (Entities db = new Entities())
            {
                IQueryable<CarModel> queryable = from m in db.mapelements
                                                  //join u in db.units on m.unitid equals u.id into temp1
                                                  //from un in temp1.DefaultIfEmpty()
                                                  join r in db.regions on m.regionid equals r.id into temp2
                                                  from re in temp2.DefaultIfEmpty()
                                                 where m.mapelementcategoryid==2
                                                 select new CarModel
                                                  {
                                                      CarID = m.id,
                                                      CarName = m.reservedfield1,
                                                      //UnitID = m.unitid,
                                                      //UnitName = un.name,
                                                      RegionID = m.regionid,
                                                      RegionName = re.name,
                                                      MapeleMentbizTypeID = m.mapelementbiztypeid
                                                  };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "CarName":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.CarName.Contains(value));
                                }
                                break;
                        }
                    }
                }
                if (regionid != 0)
                {
                    queryable = queryable.Where(a => a.RegionID == regionid);
                }
                list = queryable.ToList();
                return list;

            }
        }


    }
}
