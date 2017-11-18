Ext.define('TianZun.view.person.PersonProwledPlanLook', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.personProwledPlanLook',

    title: '查看人员巡查计划',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            width: 260,
            height: 350,
            overflowY: 'hidden',
            layout: {
                type: 'table',
                columns: 1,
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
                    fieldLabel: '开始日期',
                    name: 'startdate',
                    editable: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '结束日期',
                    name: 'enddate',
                    editable: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '开始时间',
                    name: 'starttime',
                    editable: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '结束时间',
                    name: 'endtime',
                    editable: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '所属监督员',
                    name: 'username',
                    editable: false,
                    margin: '10 0 10 20',
                },
                {
                    fieldLabel: '所属路线',
                    xtype: 'textarea',
                    height: 40,
                    name: 'linename',
                    editable: false,
                    margin: '10 0 10 20',
                },
            ],
            buttons: [
            '->',{
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
        this.child('form').loadRecord(this.record);
    }
});