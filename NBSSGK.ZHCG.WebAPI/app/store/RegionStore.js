Ext.define('TianZun.store.RegionStore', {
    extend: 'Ext.data.Store',
    pageSize: 0,
    proxy: {
        type: 'ajax',
        method: "Get",
        url: configs.WebApi + 'api/UserPatrolLine/GetRegion',
        useDefaultXhrHeader: false,
    },
    fields: ['id', 'name']
});