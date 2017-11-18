Ext.define('TianZun.controller.PersonArrangePlan', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personarrageplan',

    requires: [
        'TianZun.view.person.PersonArrangePlanAdd',
        'TianZun.view.person.PersonArrangePlanLook',
        'TianZun.view.person.PersonArrangePlanQuery',
        'TianZun.view.person.PersonArrangePlanEdit',
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

        var win = Ext.create('widget.personArrangePlanLook', { record: record });
        me.getView().add(win);

        win.show();
    },

    onAdd: function (button, e) {
        var me = this;
        var win = Ext.create('TianZun.view.person.PersonArrangePlanAdd');
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
        var zhzstr = "";
        var zbzstr = "";
        var slrystr = "";
        var czrystr = "";
        var kprystr = "";
        var arr1 = form.query('gridpanel')[1].getStore().data.items;
        var arr2 = form.query('gridpanel')[3].getStore().data.items;
        var arr3 = form.query('gridpanel')[5].getStore().data.items;
        var arr4 = form.query('gridpanel')[7].getStore().data.items;
        var arr5 = form.query('gridpanel')[9].getStore().data.items;

        if (button.text == "复制") {
            if (formData["copytime"] == "") {
                Ext.Msg.alert("提示", "请选择哪天复制!");
                return;
            }
            if (formData["copytime"] == formData["statsdate"]) {
                Ext.Msg.alert("提示", "排班时间与复制时间不能相同!");
                return;
            }
        }

        if (arr1.length == 0 && arr2.length == 0 && arr3.length == 0 && arr4.length == 0 && arr5.length == 0) {
            Ext.Msg.alert("提示", "请选择排班人员!");
            return;
        }

        if (form.getForm().findField("statsdate").getValue() == formData["statsdate"]) {
            Ext.Msg.alert("提示", "当天已经排班!");
            return
        }

        for (var i = 0; i < arr1.length; i++) {
            zhzstr += "," + arr1[i].data.UserID;
        }
        zhzstr = zhzstr.substr(1, zhzstr.length - 1);
        formData["zhzids"] = zhzstr;

        for (var i = 0; i < arr2.length; i++) {
            zbzstr += "," + arr2[i].data.UserID;
        }
        zbzstr = zbzstr.substr(1, zbzstr.length - 1);
        formData["zbzids"] = zbzstr;

        for (var i = 0; i < arr3.length; i++) {
            slrystr += "," + arr3[i].data.UserID;
        }
        slrystr = slrystr.substr(1, slrystr.length - 1);
        formData["slryids"] = slrystr;

        for (var i = 0; i < arr4.length; i++) {
            czrystr += "," + arr4[i].data.UserID;
        }
        czrystr = czrystr.substr(1, czrystr.length - 1);
        formData["czryids"] = czrystr;

        for (var i = 0; i < arr5.length; i++) {
            kprystr += "," + arr5[i].data.UserID;
        }
        kprystr = kprystr.substr(1, kprystr.length - 1);
        formData["kpryids"] = kprystr;

        win.mask("正在提交，请稍候...");

        PostAjax({
            url: 'api/DutyPlan/AddDutyPlan',
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

        var ids = [];
        for (var i = 0; i < record.length; i++) {
            ids += record[i].get("dutyid");
            if (i < record.length - 1) ids += ",";
        }

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                grid.mask("正在处理中,请稍候.....");
                PostAjax({
                    url: 'api/DutyPlan/DeleteDutyPlan?ids=' + ids,
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
        var userName = form.getForm().findField("UserName").getValue();
        var filter = '[{"property":"UserName","value":"' + userName + '"}]';
        var gridStore = obj.up().up().up().query('gridpanel')[0].getStore();
        var label = obj.up().up().up().query('label')[0];
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
        }
        var regionid =  str.split('=')[1];// theRequest[0];
        if ($.trim(userName) != null && $.trim(userName) != "") {
            form.mask("正在处理中,请稍候.....");
            $.ajax({
                method: "Get",
                url: 'api/User/GetUsersAllList',
                data: {
                    filter: filter,
                    regionid: regionid
                },
                complete: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.responseJSON != "" && jqXHR.responseJSON != null) {
                        label.hide();
                        gridStore.removeAll();
                        gridStore.add(jqXHR.responseJSON);
                        grid.show();
                    } else {
                        grid.hide();
                        gridStore.removeAll();
                        label.show();
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
        var win = this.getView().child("personArrangePlanQuery");

        if (!win) {
            win = Ext.create('widget.personArrangePlanQuery');
            this.getView().add(win);
        }

        win.show();
    },

    onQueryOK: function (button, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        var statsdate = form.getForm().findField("statsdate").getValue();
        var regionid = form.getForm().findField("regionid").getValue();
        var filter = [];

        if ($.trim(statsdate) != null && $.trim(statsdate) != "") {
            filter.push({ property: "statsdate", value: new Date($.trim(statsdate)) });
        }
        if ($.trim(regionid) != null && $.trim(regionid) != "") {
            filter.push({ property: "regionid", value: $.trim(regionid) });
        }
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        win.hide();
    },

    onEdit: function (button, e) {
        var me = this;
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
        var id = record.data["dutyid"];
        var win = Ext.create('widget.personArrangePlanEdit', { record: record });
        me.getView().add(win);

        win.show();
    },

    onEditOK: function (button, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        var formData = form.getValues();

        var zhzstr = "";
        var zbzstr = "";
        var slrystr = "";
        var czrystr = "";
        var kprystr = "";
        var arr1 = form.query('gridpanel')[1].getStore().data.items;
        var arr2 = form.query('gridpanel')[3].getStore().data.items;
        var arr3 = form.query('gridpanel')[5].getStore().data.items;
        var arr4 = form.query('gridpanel')[7].getStore().data.items;
        var arr5 = form.query('gridpanel')[9].getStore().data.items;


        if (arr1.length == 0 && arr2.length == 0 && arr3.length == 0 && arr4.length == 0 && arr5.length == 0) {
            Ext.Msg.alert("提示", "请选择排班人员!");
            return;
        }

        for (var i = 0; i < arr1.length; i++) {
            zhzstr += "," + arr1[i].data.UserID;
        }
        zhzstr = zhzstr.substr(1, zhzstr.length - 1);
        formData["zhzids"] = zhzstr;

        for (var i = 0; i < arr2.length; i++) {
            zbzstr += "," + arr2[i].data.UserID;
        }
        zbzstr = zbzstr.substr(1, zbzstr.length - 1);
        formData["zbzids"] = zbzstr;

        for (var i = 0; i < arr3.length; i++) {
            slrystr += "," + arr3[i].data.UserID;
        }
        slrystr = slrystr.substr(1, slrystr.length - 1);
        formData["slryids"] = slrystr;

        for (var i = 0; i < arr4.length; i++) {
            czrystr += "," + arr4[i].data.UserID;
        }
        czrystr = czrystr.substr(1, czrystr.length - 1);
        formData["czryids"] = czrystr;

        for (var i = 0; i < arr5.length; i++) {
            kprystr += "," + arr5[i].data.UserID;
        }
        kprystr = kprystr.substr(1, kprystr.length - 1);
        formData["kpryids"] = kprystr;

        if (!form.isValid()) {
            return;
        }

        PostAjax({
            url: 'api/DutyPlan/EditDutyPlan',
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

    //导出
    onExport: function (obj, e) {
        var grid = obj.up('grid');
        var url = 'api/DutyPlan/Export?regionid=1';
        location.href = url;
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