﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NBSSGK.ZHCG.Model
{
   public class UserPatrolPlanModel
    {
        public int planid { get; set; }
        public Nullable<System.DateTime> modifieddate { get; set; }
        public Nullable<System.DateTime> createddate { get; set; }
        public Nullable<int> lineid { get; set; }
        public string linename { get; set; }
        public Nullable<int> userid { get; set; }
        public string ids { get; set; }
        public string username { get; set; }
        public Nullable<System.DateTime> startdate { get; set; }
        public Nullable<System.DateTime> enddate { get; set; }
        public Nullable<int> starttime { get; set; }
        public Nullable<int> endtime { get; set; }
        public Nullable<int> regionid { get; set; }
        public string regionidname { get; set; }
        public string usertypename { get; set; }
    }
}
