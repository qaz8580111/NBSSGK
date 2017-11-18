Ext.define('TianZun.model.Person', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'UserID', type: 'int' },
        { name: 'UserName', type: 'string' },
        { name: 'UnitID', type: 'int' },
        { name: 'UnitName', type: 'string' },
        { name: 'RegionID', type: 'int' },
        { name: 'RegionName', type: 'string' },
        { name: 'MapeleMentbizTypeID', type: 'int' },
    ]
});
