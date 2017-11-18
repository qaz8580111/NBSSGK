Ext.define('TianZun.controller.CarProwledPlan', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.carprowledplan',

    requires: [
        'TianZun.view.car.CarProwledPlanAdd',
        'TianZun.view.car.CarProwledPlanLook',
        'TianZun.view.car.CarProwledPlanEdit',
        'TianZun.view.car.CarProwledPlanQuery'
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

        var win = Ext.create('widget.carProwledPlanLook', { record: record });
        me.getView().add(win);

        win.show();
    },

    onAdd: function (button, e) {
        var me = this;
        var win = Ext.create('TianZun.view.car.CarProwledPlanAdd');
        me.getView().add(win);
        win.show();
    },

    onAddOK: function (button, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();
        var win = button.up('window');
        var form = win.down('form');

        if (!form.isValid()) {
            return;
        }

        var formData = form.getValues();
        var str = "";
        var arr = form.query('gridpanel')[1].getStore().data.items;

        if (arr.length == 0) {
            Ext.Msg.alert("提示", "请选择巡查车辆!");
            return;
        }

        for (var i = 0; i < arr.length; i++) {
            str += "," + arr[i].data.CarID;
        }
        str = str.substr(1, str.length - 1);
        formData["ids"] = str;
        formData["starttime"] = form.getForm().findField("starttime").getValue().getHours();
        formData["endtime"] = form.getForm().findField("endtime").getValue().getHours();
        win.mask("正在提交，请稍候...");

        PostAjax({
            url: 'api/CarPatrolPlan/AddCarPatrolPlan',
            data: formData,
            complete: function (jqXHR, textStatus) {
                win.unmask();

                if (textStatus == "success") {
                    var result = jqXHR.responseText;
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
                } else {
                    Ext.Msg.alert("提示", "操作失败！");
                }
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
        var win = Ext.create('widget.carProwledPlanEdit', { record: record });
        me.getView().add(win);

        win.show();
    },

    onEditOK: function (button, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        var formData = form.getValues();

        formData["starttime"] = form.getForm().findField("starttime").getValue().getHours();
        formData["endtime"] = form.getForm().findField("endtime").getValue().getHours();

        if (!form.isValid()) {
            return;
        }

        PostAjax({
            url: 'api/CarPatrolPlan/EditCarPatrolPlan',
            data: formData,
            complete: function (jqXHR, textStatus) {
                win.unmask();

                if (textStatus == "success") {
                    var result = jqXHR.responseText;
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
                } else {
                    Ext.Msg.alert("提示", "操作失败！");
                }
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
            id += record[i].data["planid"];
            id += ",";
        }

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                grid.mask("正在处理中,请稍候.....");
                PostAjax({
                    url: 'api/CarPatrolPlan/DeleteCarPatrolPlan?id=' + id,
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

    SearchName: function (obj) {
        var form = obj.up('form');
        var grid = obj.up().up().up().query('gridpanel')[0];
        var panel = obj.up().up().query('panel')[1];
        var carName = form.getForm().findField("CarName").getValue();
        var filter = '[{"property":"CarName","value":"' + carName + '"}]';
        var gridStore = obj.up().up().up().query('gridpanel')[0].getStore();
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
        }
        var regionid =  str.split('=')[1];// theRequest[0];
        if ($.trim(carName) != null && $.trim(carName) != "") {
            form.mask("正在处理中,请稍候.....");
            $.ajax({
                method: "Get",
                url: 'api/Car/GetCarsAllList',
                data: {
                    filter: filter,
                    regionid: regionid
                },
                complete: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseJSON != "" && jqXHR.responseJSON != null) {
                        panel.remove('boxcmp');
                        gridStore.removeAll();
                        gridStore.add(jqXHR.responseJSON);
                        grid.show();
                    } else {
                        panel.remove('boxcmp');
                        grid.hide();
                        gridStore.removeAll();
                        panel.add([{ xtype: 'box', id: 'boxcmp', style: 'margin:5px 0 0 10px;border:none;', html: '没有数据' }]);
                    }
                    form.unmask();
                }
            });
        }
    },

    MoveRightAll: function (obj) {
        var grid = obj.up().up().up().query('gridpanel')[0]
        var gridshow = obj.up().up().up().query('gridpanel')[1]
        if (grid.getEl().dom.style.display != "none") {
            gridshow.getStore().add(grid.getStore().data.items);
            gridshow.show();
        }
    },

    MoveRight: function (obj) {
        var grid = obj.up().up().up().query('gridpanel')[0]
        var gridshow = obj.up().up().up().query('gridpanel')[1]

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        gridshow.getStore().add(record);
        gridshow.show();
    },

    MoveLeft: function (obj) {
        var grid = obj.up().up().up().query('gridpanel')[0]
        var gridshow = obj.up().up().up().query('gridpanel')[1]

        var sm = gridshow.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        gridshow.getStore().remove(record);
        if (gridshow.getStore().data.items.length == 0)
            gridshow.hide();
    },

    MoveLeftAll: function (obj) {
        var gridshow = obj.up().up().up().query('gridpanel')[1];
        gridshow.hide();
        gridshow.getStore().removeAll();
    },

    onQuery: function (obj) {
        var win = this.getView().child("carProwledPlanQuery");

        if (!win) {
            win = Ext.create('widget.carProwledPlanQuery');
            this.getView().add(win);
        }

        win.show();
    },

    onQueryOK: function (obj) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = obj.up('window');
        var form = win.down('form');
        var starttime = form.getForm().findField("starttime").getValue() == null ? form.getForm().findField("starttime").getValue() : form.getForm().findField("starttime").getValue().getHours();
        var endtime = form.getForm().findField("endtime").getValue() == null ? form.getForm().findField("endtime").getValue() : form.getForm().findField("endtime").getValue().getHours();
        var carname = form.getForm().findField("carname").getValue();
        var regionname = form.getForm().findField("regionname").getValue();
        var linename = form.getForm().findField("linename").getValue();

        var filters = [];

        if (typeof starttime == "number") {
            filters.push({ property: "starttime", value: starttime });
        }
        if (typeof endtime == "number") {
            filters.push({ property: "endtime", value: endtime });
        }
        if ($.trim(carname) != null && $.trim(carname) != "") {
            filters.push({ property: "carname", value: $.trim(carname) });
        }
        if ($.trim(regionname) != null && $.trim(regionname) != "") {
            filters.push({ property: "regionname", value: $.trim(regionname) });
        }
        if ($.trim(linename) != null && $.trim(linename) != "") {
            filters.push({ property: "linename", value: $.trim(linename) });
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