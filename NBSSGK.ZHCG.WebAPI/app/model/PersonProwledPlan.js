Ext.define('TianZun.model.PersonProwledPlan', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'planid', type: 'int' },
        { name: 'lineid', type: 'int' },
        { name: 'ids', type: 'string' },
        { name: 'username', type: 'string'},
        { name: 'linename', type: 'string' },
        { name: 'regionidname', type: 'string' },
        { name: 'usertypename', type: 'string' },
        {
            name: 'startdate', type: 'string', convert: function (value, record) {
                var sd = value.split('T')[0];
                return sd;
            }
        },
        {
            name: 'starttime', type: 'int', convert: function (value, record) {
                return value + ":00";
            }
        },
        {
            name: 'enddate', type: 'string', convert: function (value, record) {
                var ed = value.split('T')[0];
                return ed;
            }
        },
        {
            name: 'endtime', type: 'int', convert: function (value, record) {
                return value + ":00";
            }
        },
    ]
});
