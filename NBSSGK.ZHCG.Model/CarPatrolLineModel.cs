using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.Model
{
    public class CarPatrolLineModel
    {
        public int lineid { get; set; }
        public Nullable<System.DateTime> modifieddate { get; set; }
        public Nullable<System.DateTime> createddate { get; set; }
        public string linename { get; set; }
        public string linecode { get; set; }
        public string linedesc { get; set; }
        public string startlocation { get; set; }
        public string endlocation { get; set; }
        public string diffculty { get; set; }
        public Nullable<int> unitid { get; set; }
        public string linedata { get; set; }
        public Nullable<int> regionid { get; set; }

        public string regionname { get; set; }
    }
}
