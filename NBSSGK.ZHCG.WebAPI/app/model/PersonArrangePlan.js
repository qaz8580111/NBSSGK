Ext.define('TianZun.model.PersonArrangePlan', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'dutyid', type: 'int' },
        { name: 'subject', type: 'string' },
        {
            name: 'statsdate', type: 'string', convert: function (value, record) {
                return value.split('T')[0];
            }
        },
        { name: 'description', type: 'string' },
        { name: 'zhzids', type: 'string' },
        { name: 'zbzids', type: 'string' },
        { name: 'slryids', type: 'string' },
        { name: 'czryids', type: 'string' },
        { name: 'kpryids', type: 'string' },
        { name: 'copytime', type: 'string' },
    ]
});
