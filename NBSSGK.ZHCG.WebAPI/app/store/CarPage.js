Ext.define('TianZun.store.CarPage', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.Car',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/Car/GetCarsAllList',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    }
});