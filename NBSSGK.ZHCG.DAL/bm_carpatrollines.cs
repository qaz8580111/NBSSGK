//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace NBSSGK.ZHCG.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class bm_carpatrollines
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
    }
}