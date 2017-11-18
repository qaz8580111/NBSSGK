Ext.define('TianZun.model.CarProwledRoute', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'lineid', type: 'int' },
        { name: 'linename', type: 'string' },
        { name: 'linecode', type: 'string' },
        { name: 'linedesc', type: 'string' },
        { name: 'startlocation', type: 'string' },
        { name: 'endlocation', type: 'string' },
        { name: 'diffculty', type: 'string' },
        { name: 'linedata', type: 'string' },
        { name: 'regionname', type: 'string' },
    ]
});
