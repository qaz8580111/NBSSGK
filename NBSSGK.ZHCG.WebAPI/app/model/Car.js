Ext.define('TianZun.model.Car', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'CarID', type: 'int' },
        { name: 'CarName', type: 'string' },
        { name: 'UnitID', type: 'int' },
        { name: 'UnitName', type: 'string' },
        { name: 'RegionID', type: 'int' },
        { name: 'RegionName', type: 'string' },
        { name: 'MapeleMentbizTypeID', type: 'int' },
    ]
});
