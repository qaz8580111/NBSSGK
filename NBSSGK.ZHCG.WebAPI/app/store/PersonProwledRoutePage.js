Ext.define('TianZun.store.PersonProwledRoutePage', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.PersonProwledRoute',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/UserPatrolLine/GetUserPatrolLine',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    }
});