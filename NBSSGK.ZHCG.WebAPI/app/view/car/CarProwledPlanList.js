Ext.define('TianZun.view.car.CarProwledPlanList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.carProwledPlanList',
    title: '车辆巡查计划',
    requires: [
        'TianZun.controller.CarProwledPlan'
    ],
    controller: 'carprowledplan',
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
        var store = Ext.create('TianZun.store.CarProwledPlanPage', { proxy: { extraParams: { regionid: regionid } } });
        store.load();

        Ext.apply(this, {
            layout: 'border',
            items: [{
                xtype: 'grid',
                region: 'center',
                selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SIMPLE" }),
                multiSelect: true,
                columnLines: true,
                columns: [
                        { header: '车牌号', dataIndex: 'carname', flex: 1, align: 'center' },
                        { header: '车辆类型', dataIndex: 'cartypename', flex: 1, align: 'center' },
                        { header: '所属区域', dataIndex: 'regionname', flex: 1, align: 'center' },
                        { header: '所属路线', dataIndex: 'linename', flex: 1, align: 'center' },
                        { header: '开始时间', dataIndex: 'starttime', flex: 1, align: 'center', },
                        { header: '结束时间', dataIndex: 'endtime', flex: 1, align: 'center', },
                ],
                store: store,
                tbar: [
                    {
                        text: '查询',
                        action: 'query',
                        handler: 'onQuery',
                    },
                   {
                       text: '添加',
                       action: 'add',
                       handler: 'onAdd'
                   },
                   {
                       text: '编辑',
                       action: 'edit',
                       handler: 'onEdit'
                   },
                   {
                       text: '删除',
                       action: 'delete',
                       handler: 'onDelete'
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