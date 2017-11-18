Ext.define('TianZun.view.car.CarProwledPlanAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.carProwledPlanAdd',

    title: '添加车辆巡查计划',
    layout: 'fit',
    buildStore: function () {
        return Ext.create('TianZun.store.CarPage');
    },
    buildStore2: function () {
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
        }
        var regionid = str.split('=')[1];// theRequest[0];
        return Ext.create('TianZun.store.CarProwledRoutePage', { pageSize: 10000000, proxy: { extraParams: { regionid: regionid } } });
    },
    buildStore3: function () {
        return Ext.define('TianZun.store.CarSecondPage', {
            extend: 'Ext.data.Store',
            data: [],
        });
    },

    initComponent: function () {
        var me = this;
        var myStore = this.buildStore();
        var myStore2 = this.buildStore2();
        var myStore3 = this.buildStore3();
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
        }
        var regionid = str.split('=')[1];// theRequest[0];
        this.items = [{
            xtype: 'form',
            border: false,
            width: 500,
            height: 400,
            overflowY: 'hidden',
            layout: {
                type: 'table',
                columns: 2,
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
                    name: 'regionid',
                    value: regionid
                },
                {
                    fieldLabel: '开始日期',
                    xtype: 'datefield',
                    name: 'startdate',
                    allowBlank: false,
                    margin: '10 0 10 20',
                    listeners: {
                        render: function () {
                            this.setMinValue(new Date());
                        },
                        change: function () {
                            var val = new Date(this.getValue());
                            newDate = val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + (val.getDate() + 1);
                            var newTime = Date.parse(newDate)
                            this.up('form').down('datefield[name=enddate]').setMinValue(new Date(newTime));
                        }
                    }
                },
                {
                    fieldLabel: '结束日期',
                    xtype: 'datefield',
                    name: 'enddate',
                    allowBlank: false,
                    margin: '10 0 10 20',
                    listeners: {
                        render: function () {
                            var date = new Date(new Date().getTime() + 86400000);
                            youWant = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                            this.setMinValue(youWant);
                        },
                        change: function () {
                            var val = new Date(this.getValue());
                            newDate = val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + (val.getDate() - 1);
                            var newTime = Date.parse(newDate);
                            this.up('form').down('datefield[name=startdate]').setMaxValue(new Date(newTime));
                        }
                    }
                },
                {
                    fieldLabel: '开始时间',
                    xtype: 'timefield',
                    name: 'starttime',
                    allowBlank: false,
                    margin: '10 0 10 20',
                    increment: 60,
                    anchor: '100%',
                },
                {
                    fieldLabel: '结束时间',
                    xtype: 'timefield',
                    name: 'endtime',
                    allowBlank: false,
                    margin: '10 0 10 20',
                    increment: 60,
                    anchor: '100%',
                },
                {
                    xtype: 'panel',
                    border: false,
                    bodyBorder: false,
                    colspan: 2,
                    margin: '10 0 10 20',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'label',
                        html: '车牌号',
                        margin: '10 27 10 0',
                    },

                    {
                        xtype: 'form',
                        layout: 'hbox',
                        width: 410,
                        height: 212,

                        items: [{
                            margin: '0px 9px 0px 0px',
                            width: 180,
                            height: 212,
                            border: false,
                            style: 'border-right:1px solid #d1d1d1;',
                            items: [{
                                width: 180,
                                height: 30,
                                border: false,
                                layout: 'hbox',
                                margin: '5px 0 0 0',
                                style: 'border-bottom:1px solid #d1d1d1;',
                                items: [
                                    { xtype: 'textfield', name: 'CarName', labelWidth: 0, width: 120, margin: '0 0 0 10' },
                                    { xtype: 'button', icon: '/Images/icon/搜索.png', minWidth: 24, margin: '0 0 0 8px', handler: 'SearchName' },
                                ]
                            }, {
                                width: 'auto',
                                height: 182,
                                border: false,
                                overflowY: 'auto',

                                items: [{
                                    xtype: 'grid',
                                    region: 'center',
                                    hideHeaders: true,
                                    hidden: true,
                                    columns: [
                                            { header: '车辆标识', dataIndex: 'CarID', flex: 1, align: 'center', hidden: true },
                                            { header: '车牌号', dataIndex: 'CarName', flex: 1, align: 'left' },
                                    ],
                                    store: myStore,
                                }]
                            }]
                        },
                        {
                            border: false,
                            items: [{
                                border: false,
                                width: 32,
                                height: 200,
                                style: 'text-align:center;line-height:40px;margin-top:25px;',
                                items: [
                                    { xtype: 'button', text: '>>', width: 32, handler: 'MoveRightAll' },
                                    { xtype: 'button', text: '>', width: 32, handler: 'MoveRight' },
                                    { xtype: 'button', text: '<', width: 32, handler: 'MoveLeft' },
                                    { xtype: 'button', text: '<<', width: 32, handler: 'MoveLeftAll' },
                                ],
                            }]
                        },
                        {
                            margin: '0px 0px 0px 9px',
                            width: 180,
                            height: 212,
                            border: false,
                            style: 'border-left:1px solid #d1d1d1;',
                            items: [{
                                width: 'auto',
                                height: 30,
                                border: false,
                                style: 'border-bottom:1px solid #d1d1d1;',
                                html: '<span style="line-height:30px;margin-left:10px;">选定车辆</span>'
                            }, {
                                width: 'auto',
                                height: 182,
                                border: false,
                                overflowY: 'auto',
                                items: [{
                                    xtype: 'grid',
                                    region: 'center',
                                    hideHeaders: true,
                                    hidden: true,
                                    border: false,
                                    columns: [
                                            { header: '车辆标识', dataIndex: 'CarID', flex: 1, align: 'center', hidden: true },
                                            { header: '车牌号', dataIndex: 'CarName', flex: 1, align: 'left' },
                                    ],
                                    store: myStore3
                                }]
                            }]
                        }
                        ],
                    }

                    ]
                },
                {
                    xtype: 'hidden',
                    name: 'ids',
                },
                {
                    fieldLabel: '路线',
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
                handler: 'onAddOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});