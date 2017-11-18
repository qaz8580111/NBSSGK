using NBSSGK.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.DAL
{
    public class UserDAL
    {
        public List<UserModel> GetUsersAllList(List<Filter> filters,int regionid)
        {
            List<UserModel> list = new List<UserModel>();

            using (Entities db = new Entities())
            {
                IQueryable<UserModel> queryable = from m in db.mapelements
                                                  join u in db.units on m.unitid equals u.id into temp1
                                                  from un in temp1.DefaultIfEmpty()
                                                  join r in db.regions on m.regionid equals r.id into temp2
                                                  from re in temp2.DefaultIfEmpty()
                                                  where m.mapelementcategoryid == 1
                                                  select new UserModel
                                                  {
                                                      UserID = m.id,
                                                      UserName = m.reservedfield1,
                                                      UnitID = m.unitid,
                                                      UnitName = un.name,
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
                               
                            case "ZHZ":
                                queryable = queryable.Where(t2p =>
                                    !t2p.UserName.Contains("考评") &&
                                    !t2p.UserName.Contains("采集") &&
                                    !t2p.UserName.Contains("浙B") &&
                                    !t2p.UserName.Contains("hung") &&
                                    !t2p.UserName.Contains("处置") &&
                                    !t2p.UserName.Contains("受理") &&
                                    !t2p.UserName.Contains("值班") &&
                                    !t2p.UserName.Contains("委员") &&
                                    !t2p.UserName.Contains("公司") &&
                                    !t2p.UserName.Contains("上报") &&
                                    !t2p.UserName.Contains("新增") &&
                                    !t2p.UserName.Contains("坐席") &&
                                    !t2p.UserName.Contains("中心") &&
                                    !t2p.UserName.Contains("局长") &&
                                    !t2p.UserName.Contains("政府") &&
                                    !t2p.UserName.Contains("工商局") &&
                                    !t2p.UserName.Contains("公安") &&
                                    !t2p.UserName.Contains("测试") &&
                                    !t2p.UserName.Contains("审查") &&
                                    !t2p.UserName.Contains("指挥") &&
                                    !t2p.UserName.Contains("交警") &&
                                    !t2p.UserName.Contains("科长") &&
                                    !t2p.UserName.Contains("集团") &&
                                    !t2p.UserName.Contains("管理") &&
                                    !t2p.UserName.Contains("旅游") &&
                                    !t2p.UserName.Contains("宣传") &&
                                    !t2p.UserName.Contains("电力") &&
                                    !t2p.UserName.Contains("环境") &&
                                    !t2p.UserName.Contains("民政") &&
                                    !t2p.UserName.Contains("海洋") &&
                                    !t2p.UserName.Contains("l") &&
                                    !t2p.UserName.Contains("x"));
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "ZBZ":
                                queryable = queryable.Where(t2p =>
                                        !t2p.UserName.Contains("考评") &&
                                        !t2p.UserName.Contains("采集") &&
                                        !t2p.UserName.Contains("浙B") &&
                                        !t2p.UserName.Contains("hung") &&
                                        !t2p.UserName.Contains("处置") &&
                                        !t2p.UserName.Contains("受理") &&
                                        !t2p.UserName.Contains("值班") &&
                                        !t2p.UserName.Contains("委员") &&
                                        !t2p.UserName.Contains("公司") &&
                                        !t2p.UserName.Contains("上报") &&
                                        !t2p.UserName.Contains("新增") &&
                                        !t2p.UserName.Contains("坐席") &&
                                        !t2p.UserName.Contains("中心") &&
                                        !t2p.UserName.Contains("局长") &&
                                        !t2p.UserName.Contains("政府") &&
                                        !t2p.UserName.Contains("工商局") &&
                                        !t2p.UserName.Contains("公安") &&
                                        !t2p.UserName.Contains("测试") &&
                                        !t2p.UserName.Contains("审查") &&
                                        !t2p.UserName.Contains("指挥") &&
                                        !t2p.UserName.Contains("交警") &&
                                        !t2p.UserName.Contains("科长") &&
                                        !t2p.UserName.Contains("集团") &&
                                        !t2p.UserName.Contains("管理") &&
                                        !t2p.UserName.Contains("旅游") &&
                                        !t2p.UserName.Contains("宣传") &&
                                        !t2p.UserName.Contains("电力") &&
                                        !t2p.UserName.Contains("环境") &&
                                        !t2p.UserName.Contains("民政") &&
                                        !t2p.UserName.Contains("海洋") &&
                                        !t2p.UserName.Contains("l") &&
                                        !t2p.UserName.Contains("x"));
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "SLRY":
                                queryable = queryable.Where(t2p =>
                                        !t2p.UserName.Contains("考评") &&
                                        !t2p.UserName.Contains("采集") &&
                                        !t2p.UserName.Contains("浙B") &&
                                        !t2p.UserName.Contains("hung") &&
                                        !t2p.UserName.Contains("处置") &&
                                        !t2p.UserName.Contains("受理") &&
                                        !t2p.UserName.Contains("值班") &&
                                        !t2p.UserName.Contains("委员") &&
                                        !t2p.UserName.Contains("公司") &&
                                        !t2p.UserName.Contains("上报") &&
                                        !t2p.UserName.Contains("新增") &&
                                        !t2p.UserName.Contains("坐席") &&
                                        !t2p.UserName.Contains("中心") &&
                                        !t2p.UserName.Contains("局长") &&
                                        !t2p.UserName.Contains("政府") &&
                                        !t2p.UserName.Contains("工商局") &&
                                        !t2p.UserName.Contains("公安") &&
                                        !t2p.UserName.Contains("测试") &&
                                        !t2p.UserName.Contains("审查") &&
                                        !t2p.UserName.Contains("指挥") &&
                                        !t2p.UserName.Contains("交警") &&
                                        !t2p.UserName.Contains("科长") &&
                                        !t2p.UserName.Contains("集团") &&
                                        !t2p.UserName.Contains("管理") &&
                                        !t2p.UserName.Contains("旅游") &&
                                        !t2p.UserName.Contains("宣传") &&
                                        !t2p.UserName.Contains("电力") &&
                                        !t2p.UserName.Contains("环境") &&
                                        !t2p.UserName.Contains("民政") &&
                                        !t2p.UserName.Contains("海洋") &&
                                        !t2p.UserName.Contains("l") &&
                                        !t2p.UserName.Contains("x"));
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "CZRY":
                                queryable = queryable.Where(t => t.MapeleMentbizTypeID == 5);
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "KPRY":
                                queryable = queryable.Where(t => t.MapeleMentbizTypeID == 4);
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "XXCJRY":
                                queryable = queryable.Where(t => t.MapeleMentbizTypeID == 2);
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "ZFRY":
                                queryable = queryable.Where(t => t.MapeleMentbizTypeID == 1);
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "UserName":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.UserName.Contains(value));
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

        public List<UserModel> GetUsersAllListByID(List<Filter> filters, int regionid,int id)
        {
            List<UserModel> list = new List<UserModel>();

            using (Entities db = new Entities())
            {
                IQueryable<UserModel> queryable = from m in db.mapelements
                                                  join u in db.units on m.unitid equals u.id into temp1
                                                  from un in temp1.DefaultIfEmpty()
                                                  join r in db.regions on m.regionid equals r.id into temp2
                                                  from re in temp2.DefaultIfEmpty()
                                                  join b in db.bm_dutyusers on m.id equals b.userid into temp3
                                                  from bb in temp3.DefaultIfEmpty()
                                                  join d in db.bm_dutyplans on bb.dutyid equals d.dutyid into temp4
                                                  from dd in temp4.DefaultIfEmpty()
                                                  where m.mapelementcategoryid == 1 & dd.dutyid==id
                                                  select new UserModel
                                                  {
                                                      UserID = m.id,
                                                      UserName = m.reservedfield1,
                                                      UnitID = m.unitid,
                                                      UnitName = un.name,
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

                            case "ZHZ":
                                queryable = queryable.Where(t2p =>
                                    !t2p.UserName.Contains("考评") &&
                                    !t2p.UserName.Contains("采集") &&
                                    !t2p.UserName.Contains("浙B") &&
                                    !t2p.UserName.Contains("hung") &&
                                    !t2p.UserName.Contains("处置") &&
                                    !t2p.UserName.Contains("受理") &&
                                    !t2p.UserName.Contains("值班") &&
                                    !t2p.UserName.Contains("委员") &&
                                    !t2p.UserName.Contains("公司") &&
                                    !t2p.UserName.Contains("上报") &&
                                    !t2p.UserName.Contains("新增") &&
                                    !t2p.UserName.Contains("坐席") &&
                                    !t2p.UserName.Contains("中心") &&
                                    !t2p.UserName.Contains("局长") &&
                                    !t2p.UserName.Contains("政府") &&
                                    !t2p.UserName.Contains("工商局") &&
                                    !t2p.UserName.Contains("公安") &&
                                    !t2p.UserName.Contains("测试") &&
                                    !t2p.UserName.Contains("审查") &&
                                    !t2p.UserName.Contains("指挥") &&
                                    !t2p.UserName.Contains("交警") &&
                                    !t2p.UserName.Contains("科长") &&
                                    !t2p.UserName.Contains("集团") &&
                                    !t2p.UserName.Contains("管理") &&
                                    !t2p.UserName.Contains("旅游") &&
                                    !t2p.UserName.Contains("宣传") &&
                                    !t2p.UserName.Contains("电力") &&
                                    !t2p.UserName.Contains("环境") &&
                                    !t2p.UserName.Contains("民政") &&
                                    !t2p.UserName.Contains("海洋") &&
                                    !t2p.UserName.Contains("l") &&
                                    !t2p.UserName.Contains("x"));
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "ZBZ":
                                queryable = queryable.Where(t2p =>
                                        !t2p.UserName.Contains("考评") &&
                                        !t2p.UserName.Contains("采集") &&
                                        !t2p.UserName.Contains("浙B") &&
                                        !t2p.UserName.Contains("hung") &&
                                        !t2p.UserName.Contains("处置") &&
                                        !t2p.UserName.Contains("受理") &&
                                        !t2p.UserName.Contains("值班") &&
                                        !t2p.UserName.Contains("委员") &&
                                        !t2p.UserName.Contains("公司") &&
                                        !t2p.UserName.Contains("上报") &&
                                        !t2p.UserName.Contains("新增") &&
                                        !t2p.UserName.Contains("坐席") &&
                                        !t2p.UserName.Contains("中心") &&
                                        !t2p.UserName.Contains("局长") &&
                                        !t2p.UserName.Contains("政府") &&
                                        !t2p.UserName.Contains("工商局") &&
                                        !t2p.UserName.Contains("公安") &&
                                        !t2p.UserName.Contains("测试") &&
                                        !t2p.UserName.Contains("审查") &&
                                        !t2p.UserName.Contains("指挥") &&
                                        !t2p.UserName.Contains("交警") &&
                                        !t2p.UserName.Contains("科长") &&
                                        !t2p.UserName.Contains("集团") &&
                                        !t2p.UserName.Contains("管理") &&
                                        !t2p.UserName.Contains("旅游") &&
                                        !t2p.UserName.Contains("宣传") &&
                                        !t2p.UserName.Contains("电力") &&
                                        !t2p.UserName.Contains("环境") &&
                                        !t2p.UserName.Contains("民政") &&
                                        !t2p.UserName.Contains("海洋") &&
                                        !t2p.UserName.Contains("l") &&
                                        !t2p.UserName.Contains("x"));
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "SLRY":
                                queryable = queryable.Where(t2p =>
                                        !t2p.UserName.Contains("考评") &&
                                        !t2p.UserName.Contains("采集") &&
                                        !t2p.UserName.Contains("浙B") &&
                                        !t2p.UserName.Contains("hung") &&
                                        !t2p.UserName.Contains("处置") &&
                                        !t2p.UserName.Contains("受理") &&
                                        !t2p.UserName.Contains("值班") &&
                                        !t2p.UserName.Contains("委员") &&
                                        !t2p.UserName.Contains("公司") &&
                                        !t2p.UserName.Contains("上报") &&
                                        !t2p.UserName.Contains("新增") &&
                                        !t2p.UserName.Contains("坐席") &&
                                        !t2p.UserName.Contains("中心") &&
                                        !t2p.UserName.Contains("局长") &&
                                        !t2p.UserName.Contains("政府") &&
                                        !t2p.UserName.Contains("工商局") &&
                                        !t2p.UserName.Contains("公安") &&
                                        !t2p.UserName.Contains("测试") &&
                                        !t2p.UserName.Contains("审查") &&
                                        !t2p.UserName.Contains("指挥") &&
                                        !t2p.UserName.Contains("交警") &&
                                        !t2p.UserName.Contains("科长") &&
                                        !t2p.UserName.Contains("集团") &&
                                        !t2p.UserName.Contains("管理") &&
                                        !t2p.UserName.Contains("旅游") &&
                                        !t2p.UserName.Contains("宣传") &&
                                        !t2p.UserName.Contains("电力") &&
                                        !t2p.UserName.Contains("环境") &&
                                        !t2p.UserName.Contains("民政") &&
                                        !t2p.UserName.Contains("海洋") &&
                                        !t2p.UserName.Contains("l") &&
                                        !t2p.UserName.Contains("x"));
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "CZRY":
                                queryable = queryable.Where(t => t.MapeleMentbizTypeID == 5);
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "KPRY":
                                queryable = queryable.Where(t => t.MapeleMentbizTypeID == 4);
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "XXCJRY":
                                queryable = queryable.Where(t => t.MapeleMentbizTypeID == 2);
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "ZFRY":
                                queryable = queryable.Where(t => t.MapeleMentbizTypeID == 1);
                                //queryable = queryable.Where(t => t.RegionID == 0);后面替换
                                break;
                            case "UserName":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.UserName.Contains(value));
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
