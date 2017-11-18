Ext.define('TianZun.view.car.CarProwledRouteAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.carProwledRouteAdd',

    title: '添加车辆巡查路线',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
        }
        var regionid =str.split('=')[1];// theRequest[0];
        this.items = [{
            xtype: 'form',
            border: false,
            width: 500,
            height: 350,
            overflowY: 'auto',
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 60
            },
            defaults: {
                xtype: 'textfield',
                width: 220
            },
            items: [
                  {
                      xtype: 'hidden',
                      name: 'regionid',
                      value: regionid
                  },
                {
                    fieldLabel: '路线名称',
                    xtype: 'textfield',
                    name: 'linename',
                    width: '94%',
                    allowBlank: false,
                    colspan: 2,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '路线编码',
                    xtype: 'textfield',
                    name: 'linecode',
                    allowBlank: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '难度',
                    xtype: 'textfield',
                    name: 'diffculty',
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '起点',
                    xtype: 'textfield',
                    name: 'startlocation',
                    allowBlank: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '终点',
                    xtype: 'textfield',
                    name: 'endlocation',
                    allowBlank: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '路线描述',
                    xtype: 'textarea',
                    name: 'linedesc',
                    width: '94%',
                    height: 20,
                    colspan: 2,
                    margin: '10 0 10 20',
                },
                {
                    xtype: 'panel',
                    border: false,
                    bodyBorder: false,
                    colspan: 2,
                    margin: '10 0 10 0',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'label',
                        html: '具体路线',
                        margin: '10 15 10 20'
                    },
                    {
                        id: 'RouteData',
                        name: 'linedata',
                        xtype: 'textfield',
                        allowBlank: false,
                        colspan: 2,
                        width: '87%',
                        listeners: {
                            render: function (p) {
                                p.getEl().on('click', function (p) {
                                    CreateAarcgisMap('RouteData', '路线坐标', 2, 2, this.component.getValue());
                                });
                            },
                        }
                    }]
                },
            ],
            buttons: [
            '->', {
                text: '确定',
                handler: 'onAddOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});