Ext.define('TianZun.view.car.CarProwledRouteLook', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.carProwledRouteLook',

    title: '查看车辆巡查路线',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            width: 500,
            height: 320,
            overflowY: 'hidden',
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
                width: 210
            },
            items: [
                {
                    fieldLabel: '路线名称',
                    name: 'linename',
                    editable: false,
                    width: '89%',
                    margin: '10 0 10 20',
                    colspan: 2,
                },
                {
                    fieldLabel: '路线编码',
                    name: 'linecode',
                    editable: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '难度',
                    name: 'diffculty',
                    editable: false,
                    margin: '10 0 10 0',
                },
                {
                    fieldLabel: '起点',
                    name: 'startlocation',
                    editable: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '终点',
                    name: 'endlocation',
                    editable: false,
                    margin: '10 0 10 0',
                },
                {
                    fieldLabel: '路线描述',
                    xtype: 'textarea',
                    name: 'linedesc',
                    editable: false,
                    colspan: 2,
                    width: '89%',
                    height: 20,
                    margin: '10 0 10 20',
                },
                {
                    xtype: 'panel',
                    border: false,
                    bodyBorder: false,
                    colspan: 2,
                    margin: '10 0 10 20',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'label',
                        html: '具体路线:',
                        margin: '0 10 0 0'
                    },
                    {
                        id: 'RouteData',
                        name: 'linedata',
                        xtype: 'textfield',
                        allowBlank: false,
                        editable: false,
                        colspan: 2,
                        width: '81%',
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
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
        this.child('form').loadRecord(this.record);
    }
});