sap.ui.define(
  [
    "./BaseController"
  ],
  function (BaseController) {
    "use strict";

    return BaseController.extend("com.stellium.demo.products.controller.Detail", {
      onInit: function () {
        this.getRouter().getRoute("RouteDetail").attachPatternMatched(this._onDetailPatternMatched, this)
      },

      numberUnitFormatter:function(sValue){
        if(!sValue) return 0;

        return parseFloat(sValue).toFixed(2);
      },

      quantityState:function(iValue){
        if(iValue > 10) return "Success";
        if(iValue > 1) return "Warning";
        else return "Error";
      },

      _onDetailPatternMatched: function (oEvent) {
        var oArgs = oEvent.getParameter('arguments'),
          sProductID = oArgs.productID;

        var oView = this.getView(),
          oModel = oView.getModel();

        oModel.metadataLoaded().then(function () {
          //Create the binding key
          var sKey = oModel.createKey("/Products", {
            ProductID: sProductID
          });

          oView.bindElement({
              path: sKey,
              parameters:{
                expand: 'Supplier,Category'
              }
          });
        })
      }
    });
  }
);