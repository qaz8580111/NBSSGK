Ext.define('TianZun.controller.PersonProwledPlan', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personprowledplan',

    requires: [
        'TianZun.view.person.PersonProwledPlanAdd',
        'TianZun.view.person.PersonProwledPlanLook',
        'TianZun.view.person.PersonProwledPlanQuery',
        'TianZun.view.person.PersonProwledPlanEdit'
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
        var win = Ext.create('widget.personProwledPlanLook', { record: record });
        me.getView().add(win);

        win.show();
    },

    onAdd: function (button, e) {
        var me = this;
        var win = Ext.create('TianZun.view.person.PersonProwledPlanAdd');
        me.getView().add(win);
        win.show();
    },

    onAddOK: function (button, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        var StartTime, EndTime;
        var userstr = "";

        var st = form.getForm().findField("sstarttime").getValue();
        var et = form.getForm().findField("eendtime").getValue();

        var stD = form.getForm().findField("startdate").getValue();
        var etD = form.getForm().findField("enddate").getValue();

        if (stD > etD) {
            Ext.Msg.alert("提示", "开始时间不能大于结束时间!");
            return;
        }
        else if (stD < etD) {

        }
        else {
            if (st > et) {
                Ext.Msg.alert("提示", "开始时间不能大于结束时间!");
                return;
            }
        }

        if (!form.isValid()) {
            return;
        }



        var arr = form.query('gridpanel')[1].getStore().data.items;

        if (arr.length == 0) {
            Ext.Msg.alert("提示", "请选择巡查人员!");
            return;
        }

        if (st != "" && st != null)
            StartTime = st.getHours();
        if (et != "" && et != null)
            EndTime = et.getHours();
        formData.sstarttime = StartTime;
        formData.eendtime = EndTime;
        for (var i = 0; i < arr.length; i++) {
            userstr += "," + arr[i].data.UserID;
        }
        userstr = userstr.substr(1, userstr.length - 1);
        form.submit({
            url: 'api/UserPatrolPlan/AddUserPatrolPlan',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            params: {
                starttime: formData.sstarttime,
                endtime: formData.eendtime,
                ids: userstr
            },
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

    SearchName: function (obj) {
        var form = obj.up('form');
        var grid = obj.up().up().up().query('gridpanel')[0];
        var panel = obj.up().up().query('panel')[1];
        var userName = form.getForm().findField("UserName").getValue();
        var filter = '[{"property":"UserName","value":"' + userName + '"}]';
        var gridStore = obj.up().up().up().query('gridpanel')[0].getStore();
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
        }
        var regionid = str.split('=')[1];// theRequest[0];
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
            ids += record[i].get("planid");
            if (i < record.length - 1) ids += ",";
        }


        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                grid.mask();

                PostAjax({
                    url: 'api/UserPatrolPlan/DeleteUserPatrolPlan?ids=' + ids,
                    complete: function (jqXHR, textStatus, errorThrown) {
                        grid.unmask();

                        if (textStatus == "success") {
                            grid.getSelectionModel().clearSelections();
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                        } else {
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作失败！" });
                        }
                    }
                });
            }
        });
    },

    onQuery: function (obj) {
        var win = this.getView().child("personProwledPlanQuery");

        if (!win) {
            win = Ext.create('widget.personProwledPlanQuery');
            this.getView().add(win);
        }

        win.show();
    },

    onQueryOK: function (button, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        var usernames = form.getForm().findField("username").getValue();
        var regionid = form.getForm().findField("regionid").getValue();
        //var regionidnames = form.getForm().findField("regionidname").getValue();
        var linenames = form.getForm().findField("linename").getValue();
        var starttimes = form.getForm().findField("starttime").getValue();
        var endtimes = form.getForm().findField("endtime").getValue();
        var filter = [];

        if ($.trim(usernames) != null && $.trim(usernames) != "") {
            filter.push({ property: "username", value: $.trim(usernames) });
        }
        //if ($.trim(regionidnames) != null && $.trim(regionidnames) != "") {
        //    filter.push({ property: "regionidname", value: $.trim(regionidnames) });
        //}
        if ($.trim(regionid) != null && $.trim(regionid) != "") {
            filter.push({ property: "regionid", value: $.trim(regionid) });
        }
        if ($.trim(linenames) != null && $.trim(linenames) != "") {
            filter.push({ property: "linename", value: $.trim(linenames) });
        }
        if (typeof starttime == "number") {
            filter.push({ property: "starttime", value: starttime });
        }
        if (typeof endtime == "number") {
            filter.push({ property: "endtime", value: endtime });
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

        var record = sm.getSelection()[0];
        var win = Ext.create('widget.personProwledPlanEdit', { record: record });
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
            url: 'api/UserPatrolPlan/EditUserPatrolPlan',
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

    onEmpty: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        form.getForm().reset();
    },

    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },
});