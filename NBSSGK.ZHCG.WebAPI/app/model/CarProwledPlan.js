Ext.define('TianZun.model.CarProwledPlan', {//计划
    extend: 'Ext.data.Model',
    fields: [
        { name: 'planid', type: 'int' },
        { name: 'carid', type: 'string' },
         { name: 'ids', type: 'string' },
         { name: 'regionname', type: 'string' },
         { name: 'cartypename', type: 'string' },
    { name: 'carname', type: 'string' },
{ name: 'lineid', type: 'int' },
{ name: 'linename', type: 'string' },
{
    name: 'startdate', type: 'string', convert: function (value, record) {
        return value.split('T')[0];
    }
},
{
    name: 'enddate', type: 'string', convert: function (value, record) {
        return value.split('T')[0];
    }
},
{
    name: 'starttime', type: 'string', convert: function (value, record) {
        return value + ":00";
    }
},
{
    name: 'endtime', type: 'string', convert: function (value, record) {
        return value + ":00";
    }
},
    ]
});
