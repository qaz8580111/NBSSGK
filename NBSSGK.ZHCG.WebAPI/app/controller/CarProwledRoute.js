Ext.define('TianZun.controller.CarProwledRoute', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.carprowledroute',

    requires: [
        'TianZun.view.car.CarProwledRouteAdd',
        'TianZun.view.car.CarProwledRouteLook',
        'TianZun.view.car.CarProwledRouteEdit',
        'TianZun.view.car.CarProwledRouteQuery'
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
        var win = Ext.create('widget.carProwledRouteLook', { record: record });
        me.getView().add(win);

        win.show();
    },

    onAdd: function (button, e) {
        var me = this;
        var win = Ext.create('TianZun.view.car.CarProwledRouteAdd');
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
            url: 'api/CarPatrolLine/AddCarPatrolLine',
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

    onEdit: function (button, e) {
        var me = this;
        var grid = this.getView().child('gridpanel');
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var win = Ext.create('widget.carProwledRouteEdit', { record: record });
        me.getView().add(win);

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
            url: 'api/CarPatrolLine/EditCarPatrolLine',
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

        var id = "";
        for (var i = 0; i < record.length; i++) {
            id += record[i].data["lineid"];
            id += ",";
        }

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                grid.mask("正在处理中,请稍候.....");
                PostAjax({
                    url: 'api/CarPatrolLine/DeleteCarPatrolLine?id=' + id,
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
        var win = this.getView().child("carProwledRouteQuery");

        if (!win) {
            win = Ext.create('widget.carProwledRouteQuery');
            this.getView().add(win);
        }

        win.show();
    },

    onQueryOK: function (obj) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = obj.up('window');
        var form = win.down('form');

        var linecode = form.getForm().findField("linecode").getValue();
        var linename = form.getForm().findField("linename").getValue();
        var startlocation = form.getForm().findField("startlocation").getValue();
        var endlocation = form.getForm().findField("endlocation").getValue();
        var diffculty = form.getForm().findField("diffculty").getValue();
        var regionname = form.getForm().findField("regionname").getValue();

        var filters = [];

        if ($.trim(linecode) != null && $.trim(linecode) != "") {
            filters.push({ property: "linecode", value: $.trim(linecode) });
        }
        if ($.trim(linename) != null && $.trim(linename) != "") {
            filters.push({ property: "linename", value: $.trim(linename) });
        }
        if ($.trim(startlocation) != null && $.trim(startlocation) != "") {
            filters.push({ property: "startlocation", value: $.trim(startlocation) });
        }
        if ($.trim(endlocation) != null && $.trim(endlocation) != "") {
            filters.push({ property: "endlocation", value: $.trim(endlocation) });
        }
        if ($.trim(diffculty) != null && $.trim(diffculty) != "") {
            filters.push({ property: "diffculty", value: $.trim(diffculty) });
        }
        if ($.trim(regionname) != null && $.trim(regionname) != "") {
            filters.push({ property: "regionname", value: $.trim(regionname) });
        }

        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();
        store.clearFilter(true);
        store.filter(filters);
        store.load();
        win.hide();
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