using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.Model
{
   public class DutyPlanModel
    {
        public int dutyid { get; set; }
        public Nullable<System.DateTime> modifieddate { get; set; }
        public Nullable<System.DateTime> createddate { get; set; }
        public Nullable<System.DateTime> statsdate { get; set; }
        public Nullable<int> zhzid { get; set; }
        public Nullable<int> zbzid { get; set; }
        public Nullable<int> regionid { get; set; }
        public Nullable<System.DateTime> starttime { get; set; }
        public Nullable<System.DateTime> endtime { get; set; }
        public string subject { get; set; }
        public string description { get; set; }

        public Nullable<int> postid { get; set; }
        public string postname { get; set; }
        public Nullable<int> userid { get; set; }
        public string zhzids { get; set; }
        public string zbzids { get; set; }
        public string slryids { get; set; }
        public string czryids { get; set; }
        public string kpryids { get; set; }
        public string username { get; set; }
        public string copytime { get; set; }
        public Nullable<int> dutyuserid { get; set; }
        public string zhzname { get; set; }
        public string zbzname { get; set; }
        public string slryname { get; set; }
        public string czryname { get; set; }
        public string kpryname { get; set; }
        public string name { get; set; }
    }
}
