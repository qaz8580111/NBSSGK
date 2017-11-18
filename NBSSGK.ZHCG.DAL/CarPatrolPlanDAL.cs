using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.DAL
{
    public class CarPatrolPlanDAL
    {
        /// <summary>
        /// 获取人员路线表分页数据
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<CarPatrolPlanModel> GetCarPatrolPlanList(List<Filter> filters, int start, int limit, int regionid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<CarPatrolPlanModel> queryable = from bu in db.bm_carpatrolplans
                                                           join b_u in db.bm_carpatrollines on bu.lineid equals b_u.lineid into temp1
                                                           from b_user in temp1.DefaultIfEmpty()

                                                           join m in db.mapelements on bu.carid equals m.id into temp2
                                                           from mm in temp2.DefaultIfEmpty()

                                                           join a in db.regions on bu.regionid equals a.id into temp3
                                                           from a in temp3.DefaultIfEmpty()
                                                           
                                                           join c in db.mapelementbiztypes on mm.mapelementbiztypeid equals c.id into temp4
                                                           from cc in temp4.DefaultIfEmpty()

                                                           where mm.mapelementcategoryid == 2 && cc.mapelementcategoryid == 2
                                                           select new CarPatrolPlanModel
                                                           {
                                                               planid = bu.planid,
                                                               modifieddate = bu.modifieddate,
                                                               createddate = bu.createddate,
                                                               lineid = bu.lineid,
                                                               carid = bu.carid,
                                                               startdate = bu.startdate,
                                                               enddate = bu.enddate,
                                                               starttime = bu.starttime,
                                                               endtime = bu.endtime,
                                                               linename = b_user.linename,
                                                               carname = mm.reservedfield1,
                                                               regionid = bu.regionid,
                                                               regionname = a.name,
                                                               cartypename=cc.name
                                                           };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "starttime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int starttime = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.starttime == starttime);
                                }
                                break;
                            case "endtime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int endtime = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.endtime == endtime);
                                }
                                break;
                            case "carname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.carname.Contains(value));
                                }
                                break;
                            case "regionname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.regionname.Contains(value));
                                }
                                break;
                            case "linename":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.linename.Contains(value));
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
        public int GetCarPatrolPlanCoutn(List<Filter> filters, int regionid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<bm_carpatrolplans> queryable = db.bm_carpatrolplans.Where(a => a.regionid == regionid).AsQueryable();
                return queryable.Count();

            }
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        public int DeleteCarPatrolPlan(int id)
        {
            using (Entities db = new Entities())
            {
                bm_carpatrolplans user = db.bm_carpatrolplans.SingleOrDefault(t => t.planid == id);

                if (user != null)
                {
                    //删除
                    db.bm_carpatrolplans.Remove(user);
                }
                return db.SaveChanges();
            }
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        public void AddCarPatrolPlan(CarPatrolPlanModel model)
        {
            using (Entities db = new Entities())
            {
                string[] ids = model.ids.Split(',');
                foreach (var item in ids)
                {
                    int id = int.Parse(item);
                    bm_carpatrolplans newCarPatrolPlan = new bm_carpatrolplans()
                    {
                        planid = model.planid,
                        modifieddate = model.modifieddate,
                        createddate = model.createddate,
                        lineid = model.lineid,
                        carid = id,
                        startdate = model.startdate,
                        enddate = model.enddate,
                        starttime = model.starttime,
                        endtime = model.endtime,
                        regionid = model.regionid
                    };
                    db.bm_carpatrolplans.Add(newCarPatrolPlan);
                }


                db.SaveChanges();

            }
        }

        public int EditCarPatrolPlan(CarPatrolPlanModel model)
        {
            using (Entities db = new Entities())
            {
                bm_carpatrolplans entit = db.bm_carpatrolplans.Where(t => t.planid == model.planid).FirstOrDefault();
                entit.starttime = model.starttime;
                entit.endtime = model.endtime;
                entit.lineid = model.lineid;
                return db.SaveChanges();
            };
        }
    }
}
