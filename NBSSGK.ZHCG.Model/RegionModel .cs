using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.Model
{
    public class RegionModel
    {
        public int id { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public int regiontypeid { get; set; }
        public int parentid { get; set; }
        public int level { get; set; }
    }
}
