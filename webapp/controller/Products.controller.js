sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
    function (Controller, JSONModel, Filter, FilterOperator) {
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

                // Create an object of filters
                this._mFilters = {
                    "inStock": [new Filter("UnitsInStock", FilterOperator.GT, 10)],
                    "shortage": [new Filter("UnitsInStock", FilterOperator.BT, 1, 10)],
                    "outOfStock": [new Filter("UnitsInStock", FilterOperator.LE, 0)],
                    "all": []
                };
            },
            onProductsTableUpdateFinished: function (oEvent) {
                var oView = this.getView(),
                    oViewModel = oView.getModel("viewModel"),
                    oModel = oView.getModel(),
                    iTotalItems = oEvent.getParameter('total');

                oViewModel.setProperty("/countAll", iTotalItems);

                //Count of products that are in stock
                oModel.read('/Products/$count', {
                    filters: this._mFilters.inStock,
                    success: function (oData) {
                        oViewModel.setProperty("/inStock", oData);
                    }
                })

                // read the count for the outOfStock filter
                oModel.read("/Products/$count", {
                    success: function (oData) {
                        oViewModel.setProperty("/outOfStock", oData);
                    },
                    filters: this._mFilters.outOfStock
                });

                // read the count for the shortage filter
                oModel.read("/Products/$count", {
                    success: function (oData) {
                        oViewModel.setProperty("/shortage", oData);
                    },
                    filters: this._mFilters.shortage
                });
            },

            onQuickFilter: function (oEvent) {
                var oView = this.getView(),
                    sKey = oEvent.getParameter("key"),
                    oTable = oView.byId("idProductsTable"),
                    oItemsBinding = oTable.getBinding("items");

                // var oFilter = new Filter({
                //     path: 'UnitsInStock',
                //     operator: FilterOperator.BT,
                //     value1: 1,
                //     value2: 10
                // });

                var oFilter = this._mFilters[sKey];

                oItemsBinding.filter(oFilter);
            },

            onPress: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo("RouteDetail",{
                    productID: oEvent.getSource().getBindingContext().getProperty('ProductID')
                });
            }
        });
    });
