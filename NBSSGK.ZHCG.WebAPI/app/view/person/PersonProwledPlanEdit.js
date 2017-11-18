Ext.define('TianZun.view.person.PersonProwledPlanEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.personProwledPlanEdit',

    title: '编辑人员巡查计划',
    layout: 'fit',
    buildStore: function () {
        return Ext.create('TianZun.store.PersonPage');
    },
    buildStore2: function () {
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
        }
        var regionid = str.split('=')[1];// theRequest[0];
        return Ext.create('TianZun.store.PersonProwledRoutePage', { pageSize: 10000000, proxy: { extraParams: { regionid: regionid } } });
    },
    buildStore3: function () {
        return Ext.define('TianZun.store.PersonSecondPage', {
            extend: 'Ext.data.Store',
            data: [],
        });
    },

    initComponent: function () {
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
        }
        var regionid = str.split('=')[1];// theRequest[0];
        var myStore = this.buildStore();
        var myStore2 = this.buildStore2();
        myStore2.load();
        var myStore3 = this.buildStore3();
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            width: 750,
            height: 100,
            overflowY: 'hidden',
            layout: {
                type: 'table',
                columns: 3,
            },
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 60
            },
            defaults: {
                xtype: 'textfield',
                width: 220
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'planid',
                },
                {
                    fieldLabel: '开始时间',
                    xtype: 'timefield',
                    name: 'starttime',
                    margin: '10 0 10 20',
                    increment: 60,
                    anchor: '100%',
                    format: 'H:i'
                },
                {
                    fieldLabel: '结束时间',
                    xtype: 'timefield',
                    name: 'endtime',
                    margin: '10 0 10 20',
                    increment: 60,
                    anchor: '100%',
                    format: 'H:i'
                },
                {
                    fieldLabel: '所属路线',
                    id: 'LineComboBox',
                    name: 'lineid',
                    xtype: 'combobox',
                    store: myStore2,
                    typeAhead: true,
                    triggerAction: 'all',
                    queryMode: 'remote',
                    queryParam: 'linename',
                    selectOnFocus: true,
                    enableKeyEvents: true,
                    minChars: 1,
                    displayField: 'linename',
                    valueField: 'lineid',
                    margin: '10 0 10 20',
                    allowBlank: false,
                    listeners: {
                        beforequery: function (e) {
                            var combo = e.combo;
                            if (!e.forceAll) {
                                var value = e.query;
                                var filter = [];
                                if ($.trim(value) != null && $.trim(value) != "") {
                                    filter.push({ property: 'linename', value: $.trim(value) });
                                }
                                combo.store.clearFilter(true);
                                combo.store.filter(filter);
                                Ext.get('LineComboBox').down('div.x-form-trigger').dom.click();
                            }
                        },
                    }
                },
            ],
            buttons: [
            '->', {
                text: '确定',
                handler: 'onEditOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
        this.child('form').loadRecord(this.record);
    }
});