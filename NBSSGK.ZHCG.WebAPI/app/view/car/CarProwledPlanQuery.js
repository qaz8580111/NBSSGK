Ext.define('TianZun.view.car.CarProwledPlanQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.carProwledPlanQuery',

    title: '查询',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            layout: {
                type: 'table',
                columns: 3,
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 75
            },
            defaults: {
                xtype: 'textfield',
                width: 255,
            },
            items: [
                {
                    fieldLabel: '开始时间',
                    xtype: 'timefield',
                    name: 'starttime',
                    allowBlank: false,
                    increment: 60,
                    anchor: '100%',
                },
                {
                    fieldLabel: '结束时间',
                    xtype: 'timefield',
                    name: 'endtime',
                    allowBlank: false,
                    increment: 60,
                    anchor: '100%',
                    colspan: 2
                },
                {
                    fieldLabel: '车牌号',
                    name: 'carname',
                },
                {
                    fieldLabel: '所属区域',
                    name: 'regionname'
                },
                {
                    fieldLabel: '所属路线',
                    name: 'linename'
                }
            ],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK'
            }, {
                text: '清空',
                handler: 'onEmpty'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});