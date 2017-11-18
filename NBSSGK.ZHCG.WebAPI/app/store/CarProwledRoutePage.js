Ext.define('TianZun.store.CarProwledRoutePage', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.CarProwledRoute',
    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CarPatrolLine/GetCarPatrolLine',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }        
    }
});