Ext.define('TianZun.controller.ContentLeft', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contentLeft',

    onShow: function (obj, eOpts) {
        var treeMenus = configs.MenuData

        for (var i in treeMenus) {
            var mainMenu = treeMenus[i];

            var treePanel = Ext.create('Ext.tree.Panel', {
                border: false,
                rootVisible: false,
                root: {
                    children: mainMenu.children
                },
                listeners: {
                    render: function () {
                        var rootNode = treePanel.getStore().getRootNode();
                        var child = rootNode.getChildAt(0);                        
                        treePanel.getSelectionModel().select(child);

                        var itemObj, item, index;
                        treePanel.fireEvent('itemclick', itemObj, child, item, index);
                    },
                    itemclick: function (itemObj, record, item, index) {
                        var url = record.get("Url");

                        if (url != null && url != "") {
                            var content = Ext.create(url);
                            var view = Ext.ComponentQuery.query('viewport')[0];
                            var panel = view.items.getAt(3)
                            view.remove(panel)
                            content.region = 'center';
                            view.add(content);
                        }
                    }
                },
            });

            obj.add({
                title: mainMenu.text,
                items: treePanel
            });

        }

    },
});
