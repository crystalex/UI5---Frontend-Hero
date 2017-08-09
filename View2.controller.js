sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.sap.ui5.training.destination.test.destination_test.controller.View2", {
		
		id: null,
		text: '',
		
		getParametersFromRoute: function(oEvent){
			var oArgs = oEvent.getParameter("arguments");
			
			this.id = oArgs.id;
			this.text = oArgs.text;
			
			// var oModel = new JSONModel();
			// oModel.setData(oArgs);
			// this.getView().setModel(oModel, "param");
			
			//get object
			var oProduct = this.getView().getModel("odatamodel").getProperty("/Products(" + oArgs.id + ")");
			
			var oModel = new JSONModel();
			oModel.loadData('/northwind/Products(' + oArgs.id + ')', {}, false);
			var data = oModel.getData();
			oModel.setData(data.d);
			
			// alert(JSON.stringify(oProduct));
			var oModel = new JSONModel();
			oModel.setData(oProduct);
			this.getView().setModel(oModel, "Product");
		},

		onInit: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this.getParametersFromRoute, this);
		},

			onRedirectToView1: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("");
		}

	});
});
