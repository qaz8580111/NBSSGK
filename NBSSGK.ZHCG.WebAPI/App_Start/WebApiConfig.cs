using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace NBSSGK.ZHCG.WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //移除XML格式
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            ////时间格式化
            //config.Formatters.JsonFormatter.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm:ss";

            ////log4net日志
            log4net.Config.XmlConfigurator.Configure();
        }
    }
}
