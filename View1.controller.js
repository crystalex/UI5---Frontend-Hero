sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sap.ui5.training.destination.test.destination_test.controller.View1", {

		onInit: function(oEvent){
			
			var that = this;
			
			setTimeout(function(){
				that.getView().byId("helloWorldText").setText("bau bau");	
				
				var oViewModel = that.getView().getModel("view1Model");
				alert(oViewModel.getProperty("/helloWorldText/text"));
			}, 5000);

		}
	});
});
