sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.stellium.demo.products.controller.NotFound", {
        onInit: function() {
        },

        handleGoHomeBtnPress:function(){
            this.getOwnerComponent().getRouter().navTo("RouteProducts");
        }
      });
    }
  );
  