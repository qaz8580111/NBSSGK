using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.Model
{
    public class Paging<T>
    {
        /// <summary>
        /// 数据
        /// </summary>
        public T Items { get; set; }

        /// <summary>
        /// 总数量
        /// </summary>
        public int Total { get; set; }
    }
}
