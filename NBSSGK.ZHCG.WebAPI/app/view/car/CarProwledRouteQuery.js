Ext.define('TianZun.view.car.CarProwledRouteQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.carProwledRouteQuery',

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
                    fieldLabel: '路线编码',
                    name: 'linecode'
                },
                {
                    fieldLabel: '路线名称',
                    name: 'linename',
                },
                {
                    fieldLabel: '所属区域',
                    name: 'regionname',
                },
                {
                    fieldLabel: '开始位置',
                    name: 'startlocation'
                },
                {
                    fieldLabel: '结束位置',
                    name: 'endlocation'
                },
                {
                    fieldLabel: '难度',
                    name: 'diffculty'
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