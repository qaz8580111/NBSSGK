Ext.define('TianZun.view.person.PersonArrangePlanList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pprlist',
    title: '人员排班计划',
    requires: [
        'TianZun.controller.PersonArrangePlan'
    ],
    controller: 'personarrageplan',
    sortable: false,
    layout: 'hbox',
    initComponent: function () {
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
        }
        var regionid = str.split('=')[1];// theRequest[0];
        var store = Ext.create('TianZun.store.PersonArrangePlanPage', { proxy: { extraParams: { regionid: regionid } } });
        store.load();

        Ext.apply(this, {
            layout: 'border',
            items: [{
                xtype: 'grid',
                region: 'center',
                selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SIMPLE" }),
                columns: [
                    { header: '排班时间', dataIndex: 'statsdate', flex: 1, align: 'center' },
                        { header: '所属区域', dataIndex: 'name', flex: 1, align: 'center', },
                        {
                            header: '指挥长', dataIndex: 'zhzname', flex: 1, align: 'center',
                            renderer: function (val, meta, rec) {
                                if (val == null) {
                                    return val = "暂无人员"
                                }
                                else {
                                    return val = val
                                }
                            },
                        },
                        {
                            header: '值班长', dataIndex: 'zbzname', flex: 1, align: 'center',
                            renderer: function (val, meta, rec) {
                                if (val == null) {
                                    return val = "暂无人员"
                                }
                                else {
                                    return val = val
                                }
                            },
                        },
                        {
                            header: '受理人员', dataIndex: 'slryname', flex: 1, align: 'center',
                            renderer: function (val, meta, rec) {
                                if (val == null) {
                                    return val = "暂无人员"
                                }
                                else {
                                    return val = val
                                }
                            },
                        },
                        {
                            header: '处置人员', dataIndex: 'czryname', flex: 1, align: 'center',
                            renderer: function (val, meta, rec) {
                                if (val == null) {
                                    return val = "暂无人员"
                                }
                                else {
                                    return val = val
                                }
                            },
                        },
                        {
                            header: '考评人员', dataIndex: 'kpryname', flex: 1, align: 'center',
                            renderer: function (val, meta, rec) {
                                if (val == null) {
                                    return val = "暂无人员"
                                }
                                else {
                                    return val = val
                                }
                            },
                        },
                        { header: '排班标题', dataIndex: 'subject', flex: 1, align: 'center', },
                        { header: '排班描述', dataIndex: 'description', flex: 1, align: 'center', },
                ],
                store: store,
                tbar: [
                    {
                        text: '查询',
                        action: 'query',
                        handler: 'onQuery'
                    },
                   {
                       text: '添加',
                       action: 'add',
                       handler: 'onAdd'
                   },
                   {
                       text: '删除',
                       action: 'delete',
                       handler: 'onDelete'
                   },
                   {
                       text: '编辑',
                       action: 'edit',
                       handler: 'onEdit'
                   },
                   {
                       text: '导出',
                       action: 'export',
                       handler: 'onExport'
                   }
                ],
                bbar: {
                    xtype: 'pagingtoolbar',
                    store: store,
                    displayInfo: true
                },
                listeners: {
                    itemmouseenter: 'showTip',
                    itemdblclick: 'itemDBClick',
                }
            }]
        });
        this.callParent();
    }
});