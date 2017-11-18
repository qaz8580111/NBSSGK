using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.DAL
{
    public class CarPatrolLineDAL
    {
        /// <summary>
        /// 获取人员路线表分页数据
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<CarPatrolLineModel> GetCarPatrolLineList(List<Filter> filters, int start, int limit, int regionid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<CarPatrolLineModel> queryable =
                    from bu in db.bm_carpatrollines
                    join a_join in db.regions on bu.regionid equals a_join.id into aTemp
                    from a in aTemp.DefaultIfEmpty()
                    select new CarPatrolLineModel
                    {
                        lineid = bu.lineid,
                        modifieddate = bu.modifieddate,
                        createddate = bu.createddate,
                        linename = bu.linename,
                        linecode = bu.linecode,
                        linedesc = bu.linedesc,
                        startlocation = bu.startlocation,
                        endlocation = bu.endlocation,
                        diffculty = bu.diffculty,
                        unitid = bu.unitid,
                        linedata = bu.linedata,
                        regionid = bu.regionid,
                        regionname = a.name
                    };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "linename":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.linename.Contains(value));
                                }
                                break;
                            case "linecode":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.linecode.Contains(value));
                                }
                                break;
                            case "startlocation":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.startlocation.Contains(value));
                                }
                                break;
                            case "endlocation":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.endlocation.Contains(value));
                                }
                                break;
                            case "diffculty":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.diffculty.Contains(value));
                                }
                                break;
                            case "regionname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.regionname.Contains(value));
                                }
                                break;
                        }
                    }
                }
                if (regionid != 0)
                {
                    queryable = queryable.Where(a => a.regionid == regionid);
                }
                queryable = queryable.OrderByDescending(t => t.modifieddate).Skip(start).Take(limit);
                return queryable.ToList();
            }
        }

        /// <summary>
        /// 总数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public int GetCarPatrolLineCoutn(List<Filter> filters, int regionid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<bm_carpatrollines> queryable = db.bm_carpatrollines.Where(a => a.regionid == regionid).AsQueryable();
                return queryable.Count();

            }
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        public int DeleteCarPatrolLine(int id)
        {
            using (Entities db = new Entities())
            {
                bm_carpatrollines user = db.bm_carpatrollines.SingleOrDefault(t => t.lineid == id);

                if (user != null)
                {
                    //删除
                    db.bm_carpatrollines.Remove(user);
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        public void AddCarPatrolLine(CarPatrolLineModel model)
        {
            using (Entities db = new Entities())
            {
                bm_carpatrollines newCarPatrolLine = new bm_carpatrollines()
                {
                    lineid = model.lineid,
                    modifieddate = model.modifieddate,
                    createddate = model.createddate,
                    linename = model.linename,
                    linecode = model.linecode,
                    linedesc = model.linedesc,
                    startlocation = model.startlocation,
                    endlocation = model.endlocation,
                    diffculty = model.diffculty,
                    unitid = model.unitid,
                    linedata = model.linedata,
                    regionid = model.regionid
                };

                db.bm_carpatrollines.Add(newCarPatrolLine);
                db.SaveChanges();
            }
        }

        public int EditCarPatrolLine(CarPatrolLineModel model)
        {
            using (Entities db = new Entities())
            {
                bm_carpatrollines entit = db.bm_carpatrollines.Where(t => t.lineid == model.lineid).FirstOrDefault();
                entit.linename = model.linename;
                entit.linecode = model.linecode;
                entit.diffculty = model.diffculty;
                entit.startlocation = model.startlocation;
                entit.endlocation = model.endlocation;
                entit.linedesc = model.linedesc;
                entit.linedata = model.linedata;
                return db.SaveChanges();
            };
        }
    }
}
