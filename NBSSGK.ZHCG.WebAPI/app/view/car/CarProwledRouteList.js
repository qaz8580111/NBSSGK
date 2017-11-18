Ext.define('TianZun.view.car.CarProwledRouteList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.carProwledRouteList',
    title: '车辆巡查路线',
    requires: [
        'TianZun.controller.CarProwledRoute'
    ],
    controller: 'carprowledroute',
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
        var store = Ext.create('TianZun.store.CarProwledRoutePage', { proxy: { extraParams: { regionid: regionid } } });//{extraParams: { regionid :}}
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
                        { header: '路线编码', dataIndex: 'linecode', flex: 1, align: 'center' },
                        { header: '路线名称', dataIndex: 'linename', flex: 1, align: 'center' },
                        { header: '所属区域', dataIndex: 'regionname', flex: 1, align: 'center' },
                        { header: '开始位置', dataIndex: 'startlocation', flex: 1, align: 'center', },
                        { header: '结束位置', dataIndex: 'endlocation', flex: 1, align: 'center', },
                        { header: '难度', dataIndex: 'diffculty', flex: 1, align: 'center', },
                        { header: '路线描述', dataIndex: 'linedesc', flex: 1, align: 'center', },
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