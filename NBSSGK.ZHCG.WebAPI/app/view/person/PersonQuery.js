Ext.define('TianZun.view.person.PersonQuery', {
    extend: 'Ext.Window',
    alias: 'widget.personQuery',
    controller: 'personprowledplan',
    title: '查找人员',
    layout: 'fit',
    autoShow: true,
    modal: true,
    buildStore: function () {
        return Ext.create('TianZun.store.PersonPage'); //new object
    },
    initComponent: function () {
        var myStore = this.buildStore();
        this.items = [{
            xtype: 'form',
            border: false,
            width: 300,
            height: 262,
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
                width: 250
            },
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    border: false,
                    width: 300,
                    height: 212,
                    items: [{
                        margin: '0px 10px 0px 0px',
                        width: 300,
                        height: 212,
                        border: false,
                        items: [{
                            width: 300,
                            height: 50,
                            border: false,
                            layout: 'hbox',
                            margin: '10px 0 0 20',
                            items: [
                                { xtype: 'textfield', fieldLabel: '姓名', name: 'UserName', labelWidth: 40, width: 200 },
                                { xtype: 'button', icon: '/Images/icon/搜索.png', minWidth: 24, margin: '0 0 0 8px', handler: 'SearchName' },
                            ]
                        }, {
                            width: 300,
                            height: 242,
                            border: false,
                            items: [{
                                xtype: 'grid',
                                region: 'center',
                                hidden: true,
                                selModel: new Ext.selection.CheckboxModel(),
                                columns: [                                    
                                    { header: '用户标识', dataIndex: 'UserID', flex: 1, align: 'center', hidden: true },
                                    { header: '用户姓名', dataIndex: 'UserName', flex: 1, align: 'center' },
                                ],
                                store: myStore,
                            }]
                        }]
                    }],
                }
            ],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});