﻿Ext.define('TianZun.store.CarProwledPlanPage', {
    extend: 'Ext.data.Store',
    model: 'TianZun.model.CarProwledPlan',
    pageSize: configs.PageSize,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        method: "GET",
        url: configs.WebApi + 'api/CarPatrolPlan/GetCarPatrolPlan',
        reader: {
            type: 'json',
            rootProperty: 'Items',
            totalProperty: 'Total',
            idProperty: 'ID'
        }
    }
});