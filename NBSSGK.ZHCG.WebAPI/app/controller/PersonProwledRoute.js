Ext.define('TianZun.controller.PersonProwledRoute', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personprowledroute',

    requires: [
        'TianZun.view.person.PersonProwledRouteAdd',
        'TianZun.view.person.PersonProwledRouteLook',
        'TianZun.view.person.PersonProwledRouteQuery',
        'TianZun.view.person.PersonProwledRouteEdit',
    ],

    showTip: function (view, record, item, index, e, eOpts) {
        if (view.tip == null) {
            view.tip = Ext.create('Ext.tip.ToolTip', {
                target: view.el,
                delegate: view.itemSelector,
                renderTo: Ext.getBody()
            });
        };
        var gridColums = view.getGridColumns();
        var column = gridColums[e.getTarget(view.cellSelector).cellIndex];
        view.el.clean();
        view.tip.update(record.data[column.dataIndex]);
    },

    itemDBClick: function (grid, record) {
        var me = this;
        var grid = this.getView().child('gridpanel');
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var win = Ext.create('widget.personProwledRouteLook', { record: record });
        me.getView().add(win);

        win.show();
    },

    onAdd: function (button, e) {
        var me = this;
        var win = Ext.create('TianZun.view.person.PersonProwledRouteAdd');
        me.getView().add(win);
        win.show();
    },

    onAddOK: function (button, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        var formData = form.getValues();

        if (!form.isValid()) {
            return;
        }

        form.submit({
            url: 'api/UserPatrolLine/AddUserPatrolLine',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getSelectionModel().clearSelections();
                store.reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            },
            failure: function (form, action) {
                Ext.MessageBox.show({ title: "提示", msg: "操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            }
        });
    },

    onDelete: function (obj, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        var record = sm.getSelection();

        var ids = [];
        for (var i = 0; i < record.length; i++) {
            ids += record[i].get("lineid");
            if (i < record.length - 1) ids += ",";
        }

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                grid.mask("正在处理中,请稍候.....");
                PostAjax({
                    url: 'api/UserPatrolLine/DeleteUserPatrolLine?ids=' + ids,
                    complete: function (jqXHR, textStatus, errorThrown) {
                        grid.unmask();
                        if (textStatus == "success") {
                            grid.getSelectionModel().clearSelections();
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
                        } else {
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
                        }
                    }
                });
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { grid.unmask(); Ext.Msg.hide(); }, 2000));
            }
        });
    },

    onQuery: function (obj) {
        var win = this.getView().child("personProwledRouteQuery");

        if (!win) {
            win = Ext.create('widget.personProwledRouteQuery');
            this.getView().add(win);
        }

        win.show();
    },

    onQueryOK: function (button, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        var linecode = form.getForm().findField("linecode").getValue();
        var linename = form.getForm().findField("linename").getValue();
        var regionid = form.getForm().findField("regionid").getValue();
        var startlocation = form.getForm().findField("startlocation").getValue();
        var endlocation = form.getForm().findField("endlocation").getValue();
        var diffculty = form.getForm().findField("diffculty").getValue();
        var filter = [];

        if ($.trim(linecode) != null && $.trim(linecode) != "") {
            filter.push({ property: "linecode", value: $.trim(linecode) });
        }
        if ($.trim(linename) != null && $.trim(linename) != "") {
            filter.push({ property: "linename", value: $.trim(linename) });
        }
        if ($.trim(regionid) != null && $.trim(regionid) != "") {
            filter.push({ property: "regionid", value: $.trim(regionid) });
        }
        if ($.trim(startlocation) != null && $.trim(startlocation) != "") {
            filter.push({ property: "startlocation", value: $.trim(startlocation) });
        }
        if ($.trim(endlocation) != null && $.trim(endlocation) != "") {
            filter.push({ property: "endlocation", value: $.trim(endlocation) });
        }
        if ($.trim(diffculty) != null && $.trim(diffculty) != "") {
            filter.push({ property: "diffculty", value: $.trim(diffculty) });
        }
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        win.hide();
    },

    onEdit: function (obj, e) {
        var grid = this.getView().child('gridpanel');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        if (sm.getSelection().length > 1) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var id = record.data["lineid"];

        var _data = [];
        Ext.Ajax.request({
            url: '/api/UserPatrolLine/GetUserPatrolLineByID?id=' + id,
            noCache: false,
            async: false,
            method: "GET",
            callback: function (obj, success, response, options) {
                var _tempdata = Ext.JSON.decode(response.responseText);
                if (_tempdata == null) {
                    confirm("该数据已使用，无法进行此次操作！");
                    _data = null;
                } else if ($.trim(_tempdata) != "") {
                    _data = _tempdata;
                }
            }
        });

        if (_data == null)
            return;

        var win = Ext.create('widget.personProwledRouteEdit', { data: _data });
        this.getView().add(win);
        win.show();
    },

    onEditOK: function (button, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        var formData = form.getValues();

        if (!form.isValid()) {
            return;
        }

        form.submit({
            url: 'api/UserPatrolLine/EditUserPatrolLine',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getSelectionModel().clearSelections();
                store.reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            },
            failure: function (form, action) {
                Ext.MessageBox.show({ title: "提示", msg: "操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            }
        });
    },

    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    onEmpty: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        form.getForm().reset();
    },

    onHide: function (button) {
        button.up('form').reset();
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    }
});