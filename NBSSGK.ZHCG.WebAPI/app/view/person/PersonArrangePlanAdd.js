Ext.define('TianZun.view.person.PersonArrangePlanAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.personArrangePlanAdd',

    title: '添加人员排班计划',
    layout: 'fit',
    buildStore: function () {
        return Ext.create('TianZun.store.PersonArrangePage');
    },
    buildStore2: function () {
        return Ext.define('TianZun.store.PersonThirdPage', {
            extend: 'Ext.data.Store',
            data: [],
        });
    },
    buildStore11: function () {
        return Ext.define('TianZun.store.PersonArrangePage11', {
            extend: 'TianZun.store.PersonArrangePage',
            data: [],
        });
    },
    buildStore12: function () {
        return Ext.define('TianZun.store.PersonArrangePage12', {
            extend: 'TianZun.store.PersonArrangePage',
            data: [],
        });
    },
    buildStore13: function () {
        return Ext.define('TianZun.store.PersonArrangePage13', {
            extend: 'TianZun.store.PersonArrangePage',
            data: [],
        });
    },
    buildStore14: function () {
        return Ext.define('TianZun.store.PersonArrangePage14', {
            extend: 'TianZun.store.PersonArrangePage',
            data: [],
        });
    },
    buildStore15: function () {
        return Ext.define('TianZun.store.PersonArrangePage15', {
            extend: 'TianZun.store.PersonArrangePage',
            data: [],
        });
    },
    initComponent: function () {
        var me = this;
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
        }
        var regionid = str.split('=')[1];// theRequest[0];
        var myStore = this.buildStore();
        var myStore2 = this.buildStore2();
        var myStore11 = this.buildStore11();//指挥长
        var myStore12 = this.buildStore12();//值班长
        var myStore13 = this.buildStore13();//受理人员
        var myStore14 = this.buildStore14();//处置人员
        var myStore15 = this.buildStore15();//考评人员
        this.items = [{
            xtype: 'form',
            border: false,
            width: 500,
            height: 390,
            overflowY: 'auto',
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
                    fieldLabel: '标题',
                    xtype: 'textfield',
                    name: 'subject',
                    allowBlank: false,
                    margin: '10 0 10 20',
                    width: 180,
                    labelWidth: 40
                },
                {
                    fieldLabel: '排班时间',
                    xtype: 'datefield',
                    name: 'statsdate',
                    allowBlank: false,
                    margin: '10 0 10 0',
                    listeners: {
                        render: function () {
                            this.setMinValue(new Date());
                        },
                    }
                },
                {
                    fieldLabel: '描述',
                    xtype: 'textfield',
                    name: 'description',
                    colspan: 2,
                    allowBlank: false,
                    margin: '10 0 10 20',
                    width: '86%',
                    labelWidth: 40
                },
                {
                    xtype: 'panel',
                    border: false,
                    bodyBorder: false,
                    colspan: 2,
                    margin: '10 0 0 20',
                    width:'100%',
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'label',
                        html: '人员:',
                    },
                    {
                        xtype: 'tabpanel',
                        activeTab: 0,
                        plain: true,
                        width: 410,
                        height: 250,
                        margin: '0 0 0 15px',
                        items: [
                            {
                                id: "tab1",
                                title: '指挥长',
                                items: [
                                    //tab页内容
                                    {
                                        xtype: 'form',
                                        layout: 'hbox',
                                        border: false,
                                        width: 410,
                                        height: 212,
                                        items: [{
                                            margin: '0px 10px 0px 0px',                                            
                                            width: 180,
                                            height: 212,
                                            border: false,
                                            style: 'border-right:1px solid #d1d1d1;',
                                            items: [{
                                                width: 180,
                                                height: 30,
                                                border: false,
                                                layout: 'hbox',
                                                margin:'5px 0 0 0',
                                                style: 'border-bottom:1px solid #d1d1d1;',
                                                items: [
                                                    { xtype: 'textfield', fieldLabel: '姓名', name: 'UserName', labelWidth: 30, width: 130, margin: '0 0 0 10' },
                                                    { xtype: 'button', icon:'/Images/icon/搜索.png', minWidth: 24, margin: '0 0 0 8px', handler: 'SearchName' },
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
                                                    border:false,
                                                    columns: [
                                                            { header: '用户标识', dataIndex: 'UserID', flex: 1, align: 'center',hidden:true },
                                                            { header: '用户姓名', dataIndex: 'UserName', flex: 1, align: 'left' },
                                                    ],
                                                    store: myStore11,
                                                }, {
                                                    xtype: 'label',
                                                    hidden: true,
                                                    html: '<span style="margin:5px 0 0 10px;border:none;display:inline-block;">没有数据</span>'
                                                }]
                                            }]
                                        },
                                        {
                                            border: false,                                            
                                            items: [{
                                                border: false,
                                                width: 32,
                                                height: 200,
                                                style:'text-align:center;line-height:40px;margin-top:25px;',
                                                items: [
                                                    { xtype: 'button', text: '>>', width: 32, handler: 'MoveRightAll' },
                                                    { xtype: 'button', text: '>' , width: 32, handler: 'MoveRight' },
                                                    { xtype: 'button', text: '<' , width: 32, handler: 'MoveLeft' },
                                                    { xtype: 'button', text: '<<', width: 32, handler: 'MoveLeftAll' },
                                                ],
                                            }]
                                        },
                                        {
                                            margin: '0px 0px 0px 10px',
                                            width: 180,
                                            height: 212,
                                            border: false,
                                            style: 'border-left:1px solid #d1d1d1;',
                                            items: [{
                                                width: 180,
                                                height: 30,
                                                border: false,
                                                style: 'border-bottom:1px solid #d1d1d1;',
                                                html: '<span style="line-height:30px;margin-left:10px;">指挥长</span>'
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
                                                            { header: '用户标识', dataIndex: 'UserID', flex: 1, align: 'center', hidden: true },
                                                            { header: '用户姓名', dataIndex: 'UserName', flex: 1, align: 'left' },
                                                    ],
                                                    store: myStore2
                                                }]
                                            }]
                                        }, {
                                            xtype: 'hidden',
                                            name: 'zhzids'
                                        }
                                        ],
                                    }

                                ],
                            },
                            {
                                id: "tab2",
                                title: '值班长',
                                items: [

                                    {
                                        xtype: 'form',
                                        layout: 'hbox',
                                        border: false,
                                        width: 410,
                                        height: 212,
                                        items: [{
                                            margin: '0px 10px 0px 0px',
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
                                                    { xtype: 'textfield', fieldLabel: '姓名', name: 'UserName', labelWidth: 30, width: 130, margin: '0 0 0 10' },
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
                                                    border: false,
                                                    columns: [
                                                            { header: '用户标识', dataIndex: 'UserID', flex: 1, align: 'center', hidden: true },
                                                            { header: '用户姓名', dataIndex: 'UserName', flex: 1, align: 'left' },
                                                    ],
                                                    store: myStore12,
                                                }, {
                                                    xtype: 'label',
                                                    hidden: true,
                                                    html: '<span style="margin:5px 0 0 10px;border:none;display:inline-block;">没有数据</span>'
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
                                            margin: '0px 0px 0px 10px',
                                            width: 180,
                                            height: 212,
                                            border: false,
                                            style: 'border-left:1px solid #d1d1d1;',
                                            items: [{
                                                width: 180,
                                                height: 30,
                                                border: false,
                                                style: 'border-bottom:1px solid #d1d1d1;',
                                                html: '<span style="line-height:30px;margin-left:10px;">值班长</span>'
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
                                                            { header: '用户标识', dataIndex: 'UserID', flex: 1, align: 'center', hidden: true },
                                                            { header: '用户姓名', dataIndex: 'UserName', flex: 1, align: 'left' },
                                                    ],
                                                    store: myStore2
                                                }]
                                            }]
                                        }, {
                                            xtype: 'hidden',
                                            name: 'zbzids'
                                        }
                                        ],
                                    }

                                ],
                            },
                            {
                                id: "tab3",
                                title: '受理人员',
                                items: [

                                    {
                                        xtype: 'form',
                                        layout: 'hbox',
                                        border: false,
                                        width: 410,
                                        height: 212,
                                        items: [{
                                            margin: '0px 10px 0px 0px',
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
                                                    { xtype: 'textfield', fieldLabel: '姓名', name: 'UserName', labelWidth: 30, width: 130, margin: '0 0 0 10' },
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
                                                    border: false,
                                                    columns: [
                                                            { header: '用户标识', dataIndex: 'UserID', flex: 1, align: 'center', hidden: true },
                                                            { header: '用户姓名', dataIndex: 'UserName', flex: 1, align: 'left' },
                                                    ],
                                                    store: myStore13,
                                                }, {
                                                    xtype: 'label',
                                                    hidden: true,
                                                    html: '<span style="margin:5px 0 0 10px;border:none;display:inline-block;">没有数据</span>'
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
                                            margin: '0px 0px 0px 10px',
                                            width: 180,
                                            height: 212,
                                            border: false,
                                            style: 'border-left:1px solid #d1d1d1;',
                                            items: [{
                                                width: 180,
                                                height: 30,
                                                border: false,
                                                style: 'border-bottom:1px solid #d1d1d1;',
                                                html: '<span style="line-height:30px;margin-left:10px;">受理人员</span>'
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
                                                            { header: '用户标识', dataIndex: 'UserID', flex: 1, align: 'center', hidden: true },
                                                            { header: '用户姓名', dataIndex: 'UserName', flex: 1, align: 'left' },
                                                    ],
                                                    store: myStore2
                                                }]
                                            }]
                                        }, {
                                            xtype: 'hidden',
                                            name: 'slryids'
                                        }
                                        ],
                                    }

                                ],
                            },
                            {
                                id: "tab4",
                                title: '处置人员',
                                items: [

                                    {
                                        xtype: 'form',
                                        layout: 'hbox',
                                        border: false,
                                        width: 410,
                                        height: 212,
                                        items: [{
                                            margin: '0px 10px 0px 0px',
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
                                                    { xtype: 'textfield', fieldLabel: '姓名', name: 'UserName', labelWidth: 30, width: 130, margin: '0 0 0 10' },
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
                                                    border: false,
                                                    columns: [
                                                            { header: '用户标识', dataIndex: 'UserID', flex: 1, align: 'center', hidden: true },
                                                            { header: '用户姓名', dataIndex: 'UserName', flex: 1, align: 'left' },
                                                    ],
                                                    store: myStore14,
                                                }, {
                                                    xtype: 'label',
                                                    hidden: true,
                                                    html: '<span style="margin:5px 0 0 10px;border:none;display:inline-block;">没有数据</span>'
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
                                            margin: '0px 0px 0px 10px',
                                            width: 180,
                                            height: 212,
                                            border: false,
                                            style: 'border-left:1px solid #d1d1d1;',
                                            items: [{
                                                width: 180,
                                                height: 30,
                                                border: false,
                                                style: 'border-bottom:1px solid #d1d1d1;',
                                                html: '<span style="line-height:30px;margin-left:10px;">处置人员</span>'
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
                                                            { header: '用户标识', dataIndex: 'UserID', flex: 1, align: 'center', hidden: true },
                                                            { header: '用户姓名', dataIndex: 'UserName', flex: 1, align: 'left' },
                                                    ],
                                                    store: myStore2
                                                }]
                                            }]
                                        }, {
                                            xtype: 'hidden',
                                            name: 'czryids'
                                        }
                                        ],
                                    }

                                ],
                            },
                            {
                                id: "tab5",
                                title: '考评人员',
                                items: [

                                    {
                                        xtype: 'form',
                                        layout: 'hbox',
                                        border: false,
                                        width: 410,
                                        height: 212,
                                        items: [{
                                            margin: '0px 10px 0px 0px',
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
                                                    { xtype: 'textfield', fieldLabel: '姓名', name: 'UserName', labelWidth: 30, width: 130, margin: '0 0 0 10' },
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
                                                    border: false,
                                                    columns: [
                                                            { header: '用户标识', dataIndex: 'UserID', flex: 1, align: 'center', hidden: true },
                                                            { header: '用户姓名', dataIndex: 'UserName', flex: 1, align: 'left' },
                                                    ],
                                                    store: myStore15,
                                                }, {
                                                    xtype: 'label',
                                                    hidden: true,
                                                    html: '<span style="margin:5px 0 0 10px;border:none;display:inline-block;">没有数据</span>'
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
                                            margin: '0px 0px 0px 10px',
                                            width: 180,
                                            height: 212,
                                            border: false,
                                            style: 'border-left:1px solid #d1d1d1;',
                                            items: [{
                                                width: 180,
                                                height: 30,
                                                border: false,
                                                style: 'border-bottom:1px solid #d1d1d1;',
                                                html: '<span style="line-height:30px;margin-left:10px;">考评人员</span>'
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
                                                            { header: '用户标识', dataIndex: 'UserID', flex: 1, align: 'center', hidden: true },
                                                            { header: '用户姓名', dataIndex: 'UserName', flex: 1, align: 'left' },
                                                    ],
                                                    store: myStore2
                                                }]
                                            }]
                                        },
                                        {
                                            xtype: 'hidden',
                                            name: 'kpryids'
                                        }
                                        ],
                                    }

                                ],
                            }
                        ],
                    }]
                },
            ],
            buttons: [
            {
                fieldLabel: '复制到:',
                xtype: 'datefield',
                name: 'copytime',
                editable: false,
                width: 200,
                labelWidth: 60
            },
            '-', {
                text: '复制',
                handler: 'onAddOK'
            },
            '->', {
                text: '保存',
                handler: 'onAddOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});