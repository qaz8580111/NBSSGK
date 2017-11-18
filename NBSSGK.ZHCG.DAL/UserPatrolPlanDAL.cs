using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.DAL
{
   public class UserPatrolPlanDAL
    {
        /// <summary>
        /// 获取人员计划分页数据
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
       public List<UserPatrolPlanModel> GetUserPatrolPlanList(List<Filter> filters, int start, int limit,int regionid)
        {
            List<UserPatrolPlanModel> list = new List<UserPatrolPlanModel>();
            using (Entities db = new Entities())
            {
                IQueryable<UserPatrolPlanModel> queryable = from bu in db.bm_userpatrolplans
                                                            join b_u in db.bm_userpatrollines on bu.lineid equals b_u.lineid into temp1
                                                            from b_user in temp1.DefaultIfEmpty()
                                                            join m in db.mapelements on bu.userid equals m.id into temp2
                                                            from mm in temp2.DefaultIfEmpty()
                                                            join r in db.regions on bu.regionid equals r.id into temp3
                                                            from rr in temp3.DefaultIfEmpty()
                                                            join a in db.mapelementbiztypes on mm.mapelementbiztypeid equals a.id into temp4
                                                            from aa in temp4.DefaultIfEmpty()
                                                            where mm.mapelementcategoryid == 1  && aa.mapelementcategoryid == 1
                                                            select new UserPatrolPlanModel
                                                            {
                                                                planid = bu.planid,
                                                                modifieddate = bu.modifieddate,
                                                                createddate = bu.createddate,
                                                                lineid = bu.lineid,
                                                                userid = bu.userid,
                                                                startdate = bu.startdate,
                                                                enddate = bu.enddate,
                                                                starttime = bu.starttime,
                                                                endtime = bu.endtime,
                                                                linename = b_user.linename,
                                                                username=mm.reservedfield1,
                                                                regionid=bu.regionid,
                                                                regionidname=rr.name,
                                                                usertypename=aa.name
                                                            };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.username.Contains(value));
                                break;
                            case "regionid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int regionids = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.regionid == regionids);
                                }
                                break;
                            case "linename":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.linename.Contains(value));
                                }
                                break;
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
                        }
                    }
                }

                if (regionid != 0)
                {
                    queryable = queryable.Where(a => a.regionid == regionid);
                }
                
                queryable = queryable.OrderByDescending(t => t.modifieddate).Skip(start).Take(limit);
                list = queryable.ToList();
            }
            return list;
        }

        /// <summary>
        /// 总数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public int GetUserPatrolPlanCoutn(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IQueryable<UserPatrolPlanModel> queryable = from bu in db.bm_userpatrolplans
                                                            join b_u in db.bm_userpatrollines on bu.lineid equals b_u.lineid into temp1
                                                            from b_user in temp1.DefaultIfEmpty()
                                                            join m in db.mapelements on bu.userid equals m.id into temp2
                                                            from mm in temp2.DefaultIfEmpty()
                                                            join r in db.regions on bu.regionid equals r.id into temp3
                                                            from rr in temp3.DefaultIfEmpty()
                                                            join a in db.mapelementbiztypes on mm.mapelementbiztypeid equals a.id into temp4
                                                            from aa in temp4.DefaultIfEmpty()
                                                            where mm.mapelementcategoryid == 1 && aa.mapelementcategoryid == 1
                                                            select new UserPatrolPlanModel
                                                            {
                                                                planid = bu.planid,
                                                                modifieddate = bu.modifieddate,
                                                                createddate = bu.createddate,
                                                                lineid = bu.lineid,
                                                                userid = bu.userid,
                                                                startdate = bu.startdate,
                                                                enddate = bu.enddate,
                                                                starttime = bu.starttime,
                                                                endtime = bu.endtime,
                                                                linename = b_user.linename,
                                                                username = mm.reservedfield1,
                                                                regionid = bu.regionid,
                                                                regionidname = rr.name,
                                                                usertypename = aa.name
                                                            };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "username":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.username.Contains(value));
                                break;
                            case "regionid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int regionids = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.regionid == regionids);
                                }
                                break;
                            case "linename":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.linename.Contains(value));
                                }
                                break;
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
                        }
                    }
                }

                return queryable.Count();

            }
        }

        /// <summary>
        /// 根据ID获得详细信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserPatrolPlanModel GetUserPatrolPlanByID(int id)
        {
            UserPatrolPlanModel space = new UserPatrolPlanModel();
            using (Entities db = new Entities())
            {
                IQueryable<UserPatrolPlanModel> queryable = from bu in db.bm_userpatrolplans
                                                            join b_u in db.bm_userpatrollines on bu.lineid equals b_u.lineid into temp1
                                                            from b_user in temp1.DefaultIfEmpty()
                                                            join m in db.mapelements on bu.userid equals m.id into temp2
                                                            from mm in temp2.DefaultIfEmpty()
                                                            join r in db.regions on bu.regionid equals r.id into temp3
                                                            from rr in temp3.DefaultIfEmpty()
                                                            where mm.mapelementcategoryid == 1&bu.planid==id
                                                            select new UserPatrolPlanModel
                                                            {
                                                                planid = bu.planid,
                                                                modifieddate = bu.modifieddate,
                                                                createddate = bu.createddate,
                                                                lineid = bu.lineid,
                                                                userid = bu.userid,
                                                                startdate = bu.startdate,
                                                                enddate = bu.enddate,
                                                                starttime = bu.starttime,
                                                                endtime = bu.endtime,
                                                                linename = b_user.linename,
                                                                username = mm.reservedfield1,
                                                                regionid = bu.regionid,
                                                                regionidname = rr.name
                                                            };
                space = queryable.FirstOrDefault();
            };
            return space;
        }

        public void DeleteUserPatrolPlan(string[] ids)
        {
            using (Entities db = new Entities())
            {
                foreach (var value in ids)
                {
                    int id = Convert.ToInt32(value);
                    bm_userpatrolplans user = db.bm_userpatrolplans.Find(id);

                    if (user != null)
                    {
                        //删除
                        db.bm_userpatrolplans.Remove(user);
                    }

                }

                db.SaveChanges();
            }
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        public void AddUserPatrolPlan(UserPatrolPlanModel model)
        {
            using (Entities db = new Entities())
            {
                string[] ids = model.ids.Split(',');
                foreach (var item in ids)
                {
                    int id = int.Parse(item);
                    bm_userpatrolplans newUserPatrolPlan = new bm_userpatrolplans()
                    {
                        planid = model.planid,
                        modifieddate = model.modifieddate,
                        createddate = model.createddate,
                        lineid = model.lineid,
                        userid = id,
                        startdate = model.startdate,
                        enddate = model.enddate,
                        starttime = model.starttime,
                        endtime = model.endtime,
                        regionid=model.regionid
                    };
                    db.bm_userpatrolplans.Add(newUserPatrolPlan);

                }
               

                db.SaveChanges();

            }
        }

        public int EditUserPatrolPlan(UserPatrolPlanModel model)
        {
            using (Entities db = new Entities())
            {
                bm_userpatrolplans entit = db.bm_userpatrolplans.Where(t => t.planid == model.planid).FirstOrDefault();
                entit.starttime = model.starttime;
                entit.endtime = model.endtime;
                entit.lineid = model.lineid;
                return db.SaveChanges();
            };
        }
    }
}
