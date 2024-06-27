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
              path: sKey
          });
        })
      }
    });
  }
);