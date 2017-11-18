using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.DAL
{
    public class UserPatrolLineDAL
    {
        /// <summary>
        /// 获取人员路线表分页数据
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<UserPatrolLineModel> GetUserPatrolLineList(List<Filter> filters, int start, int limit, int regionid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<UserPatrolLineModel> queryable = from bu in db.bm_userpatrollines
                                                            join r in db.regions on bu.regionid equals r.id into temp
                                                            from rr in temp.DefaultIfEmpty()
                                                            select new UserPatrolLineModel
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
                                                                regionidname=rr.name
                                                            };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "linecode":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.linecode.Contains(value));
                                break;
                            case "linename":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.linename.Contains(value));
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
                            case "regionid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int regionids = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.regionid == regionids);
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
        public int GetUserPatrolLineCoutn(List<Filter> filters, int regionid)
        {
            using (Entities db = new Entities())
            {
                IQueryable<UserPatrolLineModel> queryable = from bu in db.bm_userpatrollines
                                                            select new UserPatrolLineModel
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
                                                                regionid = bu.regionid
                                                            };
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "linecode":
                                if (!string.IsNullOrEmpty(value))
                                    queryable = queryable.Where(t => t.linecode.Contains(value));
                                break;
                            case "linename":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.linename.Contains(value));
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
                            case "regionid":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int regionids = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.regionid == regionids);
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
        public UserPatrolLineModel GetUserPatrolLineByID(int id)
        {
            UserPatrolLineModel space = new UserPatrolLineModel();
            using (Entities db = new Entities())
            {
                IQueryable<UserPatrolLineModel> queryable = from bu in db.bm_userpatrollines
                                                            where bu.lineid == id
                                                            select new UserPatrolLineModel
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
                                                                regionid = bu.regionid
                                                            };
                space = queryable.FirstOrDefault();
            };
            return space;
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        public void DeleteUserPatrolLine(string[] ids)
        {
            using (Entities db = new Entities())
            {
                foreach (var value in ids)
                {
                    int id = Convert.ToInt32(value);
                    bm_userpatrollines user = db.bm_userpatrollines.Find(id);

                    if (user != null)
                    {
                        //删除
                        db.bm_userpatrollines.Remove(user);
                    }

                }

                db.SaveChanges();
            }
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        public void AddUserPatrolLine(UserPatrolLineModel model)
        {
            using (Entities db = new Entities())
            {
                bm_userpatrollines newUserPatrolLine = new bm_userpatrollines()
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

                db.bm_userpatrollines.Add(newUserPatrolLine);
                db.SaveChanges();
            }
        }

        /// <summary>
        /// 编辑
        /// </summary>
        /// <param name="space"></param>
        /// <returns></returns>
        public int EditUserPatrolLine(UserPatrolLineModel model)
        {
            using (Entities db = new Entities())
            {
                bm_userpatrollines entit = db.bm_userpatrollines.Where(t => t.lineid == model.lineid).FirstOrDefault();

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

        //所属区域
        public List<RegionModel> GetRegion()
        {
            List<RegionModel> list = new List<RegionModel>();

            using (Entities db = new Entities())
            {
                IQueryable<RegionModel> queryable =
                    db.regions
                    .OrderBy(t => t.id)
                    .Select(t => new RegionModel()
                    {
                        id = t.id,
                        name = t.name,
                    });

                list = queryable.ToList();
            }

            return list;
        }
    }
}
