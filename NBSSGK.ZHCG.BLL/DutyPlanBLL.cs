using NBSSGK.ZHCG.DAL;
using NBSSGK.ZHCG.Model;
using NPOI.HPSF;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.BLL
{
    public class DutyPlanBLL
    {
        private DutyPlanDAL dal = new DutyPlanDAL();
        /// <summary>
        /// 查询分页列表
        /// </summary>
        public Paging<List<DutyPlanModel>> GetDutyPlanList(List<Filter> filters, int start, int limit, int regionid)
        {
            List<DutyPlanModel> items = dal.GetDutyPlanList(filters, regionid);
            int total = items.Count();
            items = items.Skip(start).Take(limit).ToList();

            Paging<List<DutyPlanModel>> paging = new Paging<List<DutyPlanModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }


        /// <summary>
        /// 删除单位
        /// </summary>
        public void DeleteDutyPlan(string ids)
        {
            string[] idArr = ids.Split(',');
            dal.DeleteDutyPlan(idArr);
        }


        /// <summary>
        /// 添加
        /// </summary>
        /// <returns>1 添加成功</returns>
        public int AddDutyPlan(DutyPlanModel model)
        {
            model.createddate = model.modifieddate = DateTime.Now;
            dal.AddDutyPlan(model);

            return 1;
        }

        public int EditDutyPlan(DutyPlanModel model)
        {
            try
            {
                dal.EditDutyPlan(model);
                return 1;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public List<UserModel> GetDutyPlanListByID(int id, int postid)
        {
            return dal.GetDutyPlanListByID(id, postid);
        }

        /// <summary>
        /// 制定检测清单--导出
        /// </summary>
        public HttpResponseMessage Export(int regionid)
        {
            List<DutyPlanModel> list = dal.GetDutyPlanList(null, regionid);

            //创建Excel文件的对象
            NPOI.HSSF.UserModel.HSSFWorkbook book = new NPOI.HSSF.UserModel.HSSFWorkbook();
            //添加一个sheet
            NPOI.SS.UserModel.ISheet sheet1 = book.CreateSheet("Sheet1");

            //设置excel标题
            NPOI.SS.UserModel.IRow row0 = sheet1.CreateRow(0);

            //设置各种样式字体颜色背景等
            ICellStyle style = book.CreateCellStyle();
            style.Alignment = HorizontalAlignment.CENTER;
            IFont font = book.CreateFont();//新建一个字体样式对象         
            font.Boldweight = short.MaxValue;//设置字体加粗样式 
            font.FontHeightInPoints = 20;
            style.SetFont(font);//使用SetFont方法将字体样式添加到单元格样式中 

            var cell = row0.CreateCell(0);
            cell.CellStyle.Alignment = HorizontalAlignment.CENTER;
            cell.CellStyle = style;
            cell.SetCellValue("排班计划");
            sheet1.AddMergedRegion(new CellRangeAddress(0, 0, 0, 12));

            //给sheet1添加第二行的头部标题
            NPOI.SS.UserModel.IRow row1 = sheet1.CreateRow(1);
            row1.CreateCell(0).SetCellValue("序号");
            row1.CreateCell(1).SetCellValue("排班时间");
            row1.CreateCell(2).SetCellValue("所属区域");
            row1.CreateCell(3).SetCellValue("指挥长");
            row1.CreateCell(4).SetCellValue("值班长");
            row1.CreateCell(5).SetCellValue("受理人员");
            row1.CreateCell(6).SetCellValue("处置人员");
            row1.CreateCell(7).SetCellValue("考评人员");
            row1.CreateCell(8).SetCellValue("排班标题");
            row1.CreateCell(9).SetCellValue("排班描述");

            //将数据逐步写入sheet1各个行
            for (int i = 0; i < list.Count; i++)
            {
                NPOI.SS.UserModel.IRow rowtemp = sheet1.CreateRow(i + 2);
                rowtemp.CreateCell(0).SetCellValue((i + 1));
                rowtemp.CreateCell(1).SetCellValue(list[i].statsdate.ToString());
                rowtemp.CreateCell(2).SetCellValue(list[i].name);
                rowtemp.CreateCell(3).SetCellValue(list[i].zhzname == null ? "暂无人员" : list[i].zhzname);
                rowtemp.CreateCell(4).SetCellValue(list[i].zbzname == null ? "暂无人员" : list[i].zbzname);
                rowtemp.CreateCell(5).SetCellValue(list[i].slryname == null ? "暂无人员" : list[i].slryname);
                rowtemp.CreateCell(6).SetCellValue(list[i].czryname == null ? "暂无人员" : list[i].czryname);
                rowtemp.CreateCell(7).SetCellValue(list[i].kpryname == null ? "暂无人员" : list[i].kpryname);
                rowtemp.CreateCell(8).SetCellValue(list[i].subject);
                rowtemp.CreateCell(9).SetCellValue(list[i].description);
            }

            //using (var fs = File.OpenWrite(url))
            //{
            //    book.Write(fs);
            //}

            // 写入到客户端
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            book.Write(ms);
            ms.Seek(0, SeekOrigin.Begin);

            var result = new HttpResponseMessage(System.Net.HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(ms.ToArray())
            };

            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = "排班计划.xls"
                };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            return result;
        }
    }
}
