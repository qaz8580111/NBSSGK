//人员排班计划查询
Ext.define('TianZun.view.person.PersonArrangePlanQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.personArrangePlanQuery',

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
                    fieldLabel: '所属区域',
                    xtype: 'combo',
                    name: 'regionid',
                    store: Ext.create('TianZun.store.RegionStore'),
                    displayField: 'name',
                    valueField: 'id',
                    editable: false,
                },
                {
                    fieldLabel: '排班时间',
                    xtype: 'datefield',
                    name: 'statsdate',
                    allowBlank: false,
                    format:'Y-m-d'
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