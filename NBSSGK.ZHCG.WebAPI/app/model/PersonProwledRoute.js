Ext.define('TianZun.model.PersonProwledRoute', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'lineid', type: 'int' },
        { name: 'linecode', type: 'string' },
        { name: 'linename', type: 'string' },
        { name: 'regionidname', type: 'string' },
        { name: 'UnitId', type: 'int' },
        { name: 'UnitName', type: 'string' },
        { name: 'startlocation', type: 'string' },
        { name: 'endlocation', type: 'string' },
        { name: 'DifficultyId', type: 'int' },
        { name: 'diffculty', type: 'string' },
        { name: 'linedesc', type: 'string' },
        { name: 'linedata', type: 'string' },
    ]
});
