sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("com.stellium.demo.products.controller.Products", {
            onInit: function () {
                var oView = this.getView();

                var oViewModel = new JSONModel({
                    inStock: 0,
                    shortage: 0,
                    outOfStock: 0,
                    countAll: 0
                });
                oView.setModel(oViewModel, 'viewModel');
            },
            onProductsTableUpdateFinished: function (oEvent) {
                var oView = this.getView(),
                    oViewModel = oView.getModel("viewModel"),
                    iTotalItems = oEvent.getParameter('total');

                oViewModel.setProperty("/countAll", iTotalItems);
            }
        });
    });
