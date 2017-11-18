//创建地图
function CreateAarcgisMap(input_id, title, model, show_model, map_data) {
    arcgisMapLoaded = function () {
        if (show_model == 1) {
            addMapPoint(map_data);
        } else if (show_model == 2) {
            addMapPolyline(map_data);
        } else if (show_model == 3) {
            addMapPolygon(map_data);
        }
    }
    var mapWindow = new Ext.Window({
        title: title,
        layout: 'fit',
        autoShow: true,
        modal: true,
        html: "<div style='width:600px;height:400px'><object id='arcgisMapApp' data='data:application/x-silverlight-2,' type='application/x-silverlight-2' width='100%' height='100%'><param name='source' value='ClientBin/ArcGISMapApp.xap' /><param name='onError' value='onSilverlightError' /><param name='background' value='white' /><param name='minRuntimeVersion' value='5.0.61118.0' /><param name='autoUpgrade' value='true' /><param name='initParams' value='mode=" + model + ",url=http://183.136.153.51:8787/arcgis/rest/services/NBCG20140707/MapServer,minx=268920.96020963124,miny=3221517.2643878204,maxx=514190.20074811234,maxy=3356058.1584696085' /></object></div>",
        buttons: [
            {
                text: '确定',
                hidden: function () {
                    if (model == 0) {
                        return true;
                    }
                }(),
                handler: function () {
                    var mapData = getMapData();
                    Ext.getCmp(input_id).setValue(mapData);
                    mapWindow.close();
                }
            }, {
                text: '关闭',
                handler: function () {
                    mapWindow.close();
                }
            }
        ]
    });
    mapWindow.show();
}