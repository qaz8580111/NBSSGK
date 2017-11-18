//人员巡查路线查询
Ext.define('TianZun.view.person.PersonProwledRouteQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.personProwledRouteQuery',

    title: '查询条件',
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
                    name: 'linecode',
                },
                {
                    fieldLabel: '路线名称',
                    name: 'linename',
                },
                {
                    fieldLabel: '所属区域',
                    xtype: 'combo',
                    name: 'regionid',
                    store: Ext.create('TianZun.store.RegionStore'),
                    displayField: 'name',
                    valueField: 'id',
                    editable: false,
                },
                {
                    fieldLabel: '开始位置',
                    name: 'startlocation',
                },
                {
                    fieldLabel: '结束位置',
                    name: 'endlocation',
                },
                {
                    fieldLabel: '路线难度',
                    name: 'diffculty',
                },
            ],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK'
            },
            {
                text: '清空',
                handler: 'onEmpty'
            },
            {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});