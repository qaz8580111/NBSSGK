Ext.define('TianZun.view.person.PersonProwledRouteEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.personProwledRouteEdit',

    title: '编辑人员巡查路线',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        var data = this.config.data;
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
        }
        var regionid = str.split('=')[1];// theRequest[0];
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
                      name: 'lineid',
                      value: data.lineid
                  },
                {
                    fieldLabel: '路线名称',
                    xtype: 'textfield',
                    name: 'linename',
                    value: data.linename,
                    width: '94%',
                    allowBlank: false,
                    colspan: 2,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '路线编码',
                    xtype: 'textfield',
                    name: 'linecode',
                    value: data.linecode,
                    allowBlank: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '难度',
                    xtype: 'textfield',
                    name: 'diffculty',
                    value: data.diffculty,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '起点',
                    xtype: 'textfield',
                    name: 'startlocation',
                    value: data.startlocation,
                    allowBlank: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '终点',
                    xtype: 'textfield',
                    name: 'endlocation',
                    value: data.endlocation,
                    allowBlank: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '路线描述',
                    xtype: 'textarea',
                    name: 'linedesc',
                    value: data.linedesc,
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
                        value: data.linedata,
                        colspan: 2,
                        width: '87%',
                        listeners: {
                            render: function (p) {
                                p.getEl().on('click', function (p) {
                                    CreateAarcgisMap('RouteData', '路线坐标', 3, 2, this.component.getValue());
                                });
                            },
                        }
                    }]
                },
            ],
            buttons: [
            '->', {
                text: '确定',
                handler: 'onEditOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});