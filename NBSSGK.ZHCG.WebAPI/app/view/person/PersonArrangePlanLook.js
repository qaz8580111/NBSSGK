Ext.define('TianZun.view.person.PersonArrangePlanLook', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.personArrangePlanLook',

    title: '查看人员排班计划',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            width: 500,
            overflowY: 'hidden',
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 60,
                margin: '10 0 10 20',
            },
            defaults: {
                xtype: 'textfield',
                width: 220
            },
            items: [
                {
                    fieldLabel: '排班时间',
                    name: 'statsdate',
                    editable: false,
                },
                {
                    fieldLabel: '指挥长',
                    name: 'zhzname',
                    editable: false,
                    listeners: {
                        afterrender: function (obj) {
                            if (Ext.isEmpty(obj.getValue())) {
                                obj.setValue("暂无人员");
                            }
                        }
                    }
                },
                {
                    fieldLabel: '值班长',
                    name: 'zbzname',
                    editable: false,
                    listeners: {
                        afterrender: function (obj) {
                            if (Ext.isEmpty(obj.getValue())) {
                                obj.setValue("暂无人员");
                            }
                        }
                    }
                },
                {
                    fieldLabel: '受理人员',
                    name: 'slryname',
                    editable: false,
                    listeners: {
                        afterrender: function (obj) {
                            if (Ext.isEmpty(obj.getValue())) {
                                obj.setValue("暂无人员");
                            }
                        }
                    }
                },
                {
                    fieldLabel: '处置人员',
                    name: 'czryname',
                    editable: false,
                    listeners: {
                        afterrender: function (obj) {
                            if (Ext.isEmpty(obj.getValue())) {
                                obj.setValue("暂无人员");
                            }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '考评人员',
                    name: 'kpryname',
                    editable: false,
                    listeners: {
                        afterrender: function (obj) {
                            if (Ext.isEmpty(obj.getValue())) {
                                obj.setValue("暂无人员");
                            }
                        }
                    }
                },
                {
                    fieldLabel: '标题',
                    name: 'subject',
                    width: 465,
                    colspan: 2,
                    editable: false,
                },
                {
                    fieldLabel: '描述',
                    xtype: 'textarea',
                    name: 'description',
                    height: 100,
                    width: 465,
                    colspan: 2,
                    editable: false,
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