Ext.define('TianZun.store.PersonProwledPlanPage', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.PersonProwledPlan',
    pageSize: configs.PageSize,
    remoteFilter: true,

    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/UserPatrolPlan/GetUserPatrolPlan',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    }
});