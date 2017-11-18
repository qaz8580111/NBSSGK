Ext.define('TianZun.store.PersonPage', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.Person',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/User/GetUsersAllList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    }
});