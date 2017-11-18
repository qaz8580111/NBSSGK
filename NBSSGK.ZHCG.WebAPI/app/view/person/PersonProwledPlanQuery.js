//人员巡查计划查询
Ext.define('TianZun.view.person.PersonProwledPlanQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.personProwledPlanQuery',

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
                    fieldLabel: '人员名称',
                    name: 'username',
                },
                //{
                //    fieldLabel: '人员类型',
                //    name: 'regionidname',
                //},
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
                    fieldLabel: '所属路线',
                    name: 'linename',
                },
                {
                    xtype: 'timefield',
                    fieldLabel: '开始时间',
                    name: 'starttime',
                    format: 'H:i'
                },
                {
                    xtype: 'timefield',
                    fieldLabel: '结束时间',
                    name: 'endtime',
                    format: 'H:i'
                }
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