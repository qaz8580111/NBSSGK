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
    
    public partial class user
    {
        public int id { get; set; }
        public string code { get; set; }
        public Nullable<int> regionid { get; set; }
        public Nullable<int> unitid { get; set; }
        public string loginname { get; set; }
        public string loginpassword { get; set; }
    }
}