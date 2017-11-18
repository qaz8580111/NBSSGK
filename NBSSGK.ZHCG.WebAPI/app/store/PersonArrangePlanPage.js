Ext.define('TianZun.store.PersonArrangePlanPage', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.PersonArrangePlan',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/DutyPlan/GetDutyPlan',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    }
});