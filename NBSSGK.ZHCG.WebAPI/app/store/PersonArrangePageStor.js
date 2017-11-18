Ext.define('TianZun.store.PersonArrangePageStor', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.Person',

    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/DutyPlan/GetDutyPlanListByID',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    }
});