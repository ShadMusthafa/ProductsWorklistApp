sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function (Controller) {
        "use strict";

        return Controller.extend("com.stellium.demo.products.controller.BaseController", {

            getRouter: function () {
                return this.getOwnerComponent().getRouter();
            }
        });
    }
);
