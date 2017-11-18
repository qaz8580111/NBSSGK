using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.DAL
{
    public class DutyPlanDAL
    {
        /// <summary>
        /// 获取人员路线表分页数据
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<DutyPlanModel> GetDutyPlanList(List<Filter> filters, int regionid)
        {
            using (Entities db = new Entities())
            {
                string sql = @"SELECT s.dutyid,s.statsdate,s.regionid,s.description,s.subject,s.regionname as name
,group_concat(DISTINCT s.zbzname separator ',') as zbzname
,group_concat(DISTINCT s.slryname separator ',') as slryname
,group_concat(DISTINCT s.kpryname separator ',') as kpryname
,group_concat(DISTINCT s.czryname separator ',') as czryname
,group_concat(DISTINCT s.zhzname separator ',') as zhzname
FROM(SELECT t.dutyid,t.statsdate,t.regionid,t.description,t.subject,r.`name` as regionname 
   ,u1.reservedfield1 as slryname 
   ,u2.reservedfield1 as kpryname    
   ,u3.reservedfield1 as czryname
   ,u4.reservedfield1 as zhzname
   ,u5.reservedfield1 as zbzname
   FROM bm_dutyplans t 
   LEFT JOIN regions r on t.regionid=r.id
   LEFT JOIN (
   SELECT d.dutyid,m.reservedfield1 FROM bm_dutyusers d 
   LEFT JOIN mapelements m on d.userid=m.id
   where m.mapelementcategoryid=1 and d.postid=3
   ) u1 on t.dutyid = u1.dutyid 
   LEFT JOIN (
   SELECT d.dutyid,m.reservedfield1 FROM bm_dutyusers d 
   LEFT JOIN mapelements m on d.userid=m.id
   where m.mapelementcategoryid=1 and d.postid=4
   ) u2 on t.dutyid = u2.dutyid 

   LEFT JOIN (
   SELECT d.dutyid,m.reservedfield1 FROM bm_dutyusers d 
   LEFT JOIN mapelements m on d.userid=m.id
   where m.mapelementcategoryid=1 and d.postid=5
   ) u3 on t.dutyid = u3.dutyid 

   LEFT JOIN (
   SELECT d.dutyid,m.reservedfield1 FROM bm_dutyusers d 
   LEFT JOIN mapelements m on d.userid=m.id
   where m.mapelementcategoryid=1 and d.postid=7
   ) u4 on t.dutyid = u4.dutyid 

   LEFT JOIN (
   SELECT d.dutyid,m.reservedfield1 FROM bm_dutyusers d 
   LEFT JOIN mapelements m on d.userid=m.id
   where m.mapelementcategoryid=1 and d.postid=8
   ) u5 on t.dutyid = u5.dutyid )as s
group by s.dutyid
";

                List<DutyPlanModel> queryable = db.Database.SqlQuery<DutyPlanModel>(sql).ToList();

                if (regionid != 0)
                {
                    queryable = queryable.Where(a => a.regionid == regionid).ToList();
                }

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "statsdate":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    DateTime statsdates = Convert.ToDateTime(value);
                                    queryable = queryable.Where(t => t.statsdate == statsdates).ToList();
                                }
                                break;
                            case "regionid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int regionids = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.regionid == regionids).ToList();
                                }
                                break;
                        }
                    }
                }
                return queryable;
            }
        }

        /// <summary>
        /// 总数量
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public int GetDutyPlanCoutn(List<Filter> filters, int regionid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<bm_dutyusers> queryable = db.bm_dutyusers.Where(a => a.regionid == regionid).AsQueryable();
                return queryable.Count();

            }
        }


        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        public void DeleteDutyPlan(string[] ids)
        {
            using (Entities db = new Entities())
            {
                foreach (var value in ids)
                {
                    int id = Convert.ToInt32(value);
                    bm_dutyplans user = db.bm_dutyplans.Find(id);
                    int dutyid = 0;
                    if (user != null)
                    {
                        dutyid = (int)user.dutyid;
                        db.bm_dutyplans.Remove(user);
                        db.SaveChanges();
                    }
                    IQueryable<bm_dutyusers> querydb = db.bm_dutyusers.Where(t => t.dutyid == dutyid);
                    if (querydb.Count() == 0)
                    {
                        bm_dutyplans users = db.bm_dutyplans.SingleOrDefault(t => t.dutyid == dutyid);
                        db.bm_dutyplans.Remove(users);
                        db.SaveChanges();
                    }
                }
            }
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        public void AddDutyPlan(DutyPlanModel model)
        {
            using (Entities db = new Entities())
            {
                bm_dutyplans newDutyPlan = new bm_dutyplans()
                {
                    modifieddate = model.modifieddate,
                    createddate = model.createddate,
                    statsdate = model.statsdate,
                    zhzid = model.zhzid,
                    zbzid = model.zbzid,
                    regionid = model.regionid,
                    starttime = model.starttime,
                    endtime = model.endtime,
                    subject = model.subject,
                    description = model.description,
                };
                db.bm_dutyplans.Add(newDutyPlan);
                db.SaveChanges();
                if (!string.IsNullOrEmpty(model.zhzids))
                {
                    string[] ids = model.zhzids.Split(',');
                    AddDutyUser(7, db, newDutyPlan.dutyid, ids);
                }
                if (!string.IsNullOrEmpty(model.zbzids))
                {
                    string[] ids = model.zbzids.Split(',');
                    AddDutyUser(8, db, newDutyPlan.dutyid, ids);
                }
                if (!string.IsNullOrEmpty(model.slryids))
                {
                    string[] ids = model.slryids.Split(',');
                    AddDutyUser(3, db, newDutyPlan.dutyid, ids);
                }
                if (!string.IsNullOrEmpty(model.czryids))
                {
                    string[] ids = model.czryids.Split(',');
                    AddDutyUser(5, db, newDutyPlan.dutyid, ids);
                }
                if (!string.IsNullOrEmpty(model.kpryids))
                {
                    string[] ids = model.kpryids.Split(',');
                    AddDutyUser(4, db, newDutyPlan.dutyid, ids);
                }

            }
        }

        public void EditDutyPlan(DutyPlanModel model)
        {
            using (Entities db = new Entities())
            {
                bm_dutyplans entit = db.bm_dutyplans.Where(t => t.dutyid == model.dutyid).FirstOrDefault();
                entit.subject = model.subject;
                entit.statsdate = model.statsdate;
                entit.description = model.description;
                db.SaveChanges();

                List<bm_dutyusers> list = db.bm_dutyusers.Where(a => a.dutyid == model.dutyid).ToList();

                foreach (var item in list)
                {
                    db.bm_dutyusers.Remove(item);
                }

                if (!string.IsNullOrEmpty(model.zhzids))
                {
                    string[] ids = model.zhzids.Split(',');
                    AddDutyUser(7, db, model.dutyid, ids);
                }
                if (!string.IsNullOrEmpty(model.zbzids))
                {
                    string[] ids = model.zbzids.Split(',');
                    AddDutyUser(8, db, model.dutyid, ids);
                }
                if (!string.IsNullOrEmpty(model.slryids))
                {
                    string[] ids = model.slryids.Split(',');
                    AddDutyUser(3, db, model.dutyid, ids);
                }
                if (!string.IsNullOrEmpty(model.czryids))
                {
                    string[] ids = model.czryids.Split(',');
                    AddDutyUser(5, db, model.dutyid, ids);
                }
                if (!string.IsNullOrEmpty(model.kpryids))
                {
                    string[] ids = model.kpryids.Split(',');
                    AddDutyUser(4, db, model.dutyid, ids);
                }

            };
        }

        private static void AddDutyUser(int postid, Entities db, int dutyid, string[] ids)
        {
            foreach (string item in ids)
            {
                int id = int.Parse(item);
                bm_dutyusers newDutyUser = new bm_dutyusers()
                {
                    dutyid = dutyid,
                    postid = postid,
                    userid = id,
                };
                db.bm_dutyusers.Add(newDutyUser);
            }
            db.SaveChanges();
        }

        public List<UserModel> GetDutyPlanListByID(int id, int postid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<UserModel> queryable = from pian in db.bm_dutyplans
                                                  join users in db.bm_dutyusers on pian.dutyid equals users.dutyid into temp1
                                                  from b_users in temp1.DefaultIfEmpty()
                                                  join post in db.bm_dutyposts on b_users.postid equals post.postid into temp2
                                                  from b_post in temp2.DefaultIfEmpty()
                                                  join u in db.mapelements on b_users.userid equals u.id into temp3
                                                  from ment in temp3.DefaultIfEmpty()
                                                  where ment.mapelementcategoryid == 1 && pian.dutyid == id && b_post.postid == postid
                                                  select new UserModel
                                                  {
                                                      UserID = b_users.userid.Value,
                                                      UserName = ment.reservedfield1
                                                  };
                return queryable.ToList();
            }
        }
    }
}
