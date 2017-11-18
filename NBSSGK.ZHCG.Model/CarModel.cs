using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.Model
{
   public class CarModel
    {
        /// <summary>
        /// 人员id
        /// </summary>
        public int CarID { get; set; }
        /// <summary>
        /// 人员姓名
        /// </summary>
        public string CarName { get; set; }
        /// <summary>
        /// 所属单位标识
        /// </summary>
        public int? UnitID { get; set; }
        /// <summary>
        /// 所属单位名称
        /// </summary>
        public string UnitName { get; set; }
        /// <summary>
        /// 所属区域标识
        /// </summary>
        public int? RegionID { get; set; }
        /// <summary>
        /// 所属区域名称
        /// </summary>
        public string RegionName { get; set; }
        /// <summary>
        /// 所属地图元素业务类型标识
        /// </summary>
        public int? MapeleMentbizTypeID { get; set; }

        /// <summary>
        /// 所属地图元素业务类型标识
        /// </summary>
        public string MapeleMentbizTypeName { get; set; }
    }
}
