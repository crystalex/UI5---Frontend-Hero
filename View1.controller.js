sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/ODataModel"
], function(Controller, ODataModel) {
	"use strict";

	return Controller.extend("com.sap.ui5.training.destination.test.destination_test.controller.View1", {

		// onInit: function(oEvent) {

		// 	var that = this;

		// 	setTimeout(function() {
		// 		that.getView().byId("helloWorldText").setText("bau bau");

		// 		var oViewModel = that.getView().getModel("view1Model");
		// 		alert(oViewModel.getProperty("/helloWorldText/text"));
		// 	}, 5000);
		// },

		_busyDialog: null,

		onRedirectToView2: function(oEvent) {
			
			var oParam = {
				id: 32,
			    text: "test"
			};

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", oParam);
		},

		onMyButtonPress: function(oEvent) {
			console.log(oEvent);

			var oButton = oEvent.getSource();

			console.log(oButton.data("myData"));

			this.getView().byId("helloWorldText").setText(oButton.data("myData"));
		},

		customFormatter: function(UnitsInStock, UnitsOnOrder) {
			console.log(UnitsInStock, UnitsOnOrder)
			return 'UnitsInStock = ' + UnitsInStock + ", UnitsOnOrder = " + UnitsOnOrder;
		},

		onSelectionChange: function(oEvent) {
			var oView = this.getView();
			var oTable = oView.byId("table1");
			var oBindingItems = oTable.getBinding("items");

			// console.log(oBindingItems);

			var supplierId = 1;
			var oComboBox = oEvent.getSource();
			supplierId = oComboBox.getSelectedKey();

			var aFilters = [];
			var newFilter = new sap.ui.model.Filter("SupplierID", sap.ui.model.FilterOperator.EQ, supplierId);
			aFilters.push(newFilter);

			oBindingItems.filter(aFilters);

			var oSorter = new sap.ui.model.Sorter("ProductName", false, false);
			oBindingItems.sort(oSorter);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail");

			// console.log(oBindingItems);
		},
		
		onTableSelectionChange: function(oEvent){
			
			// var oRow = oEvent.getSource();
			var oRow = oEvent.getParameter("listItem");
			var bindingContext = oRow.getBindingContext("odatamodel");
			var sPath = bindingContext.getPath();
			
			var oProduct = this.getView().getModel("odatamodel").getProperty(sPath);
			console.log(oProduct);
			
			var oParam = {
				id: oProduct.ProductID,
				text: oProduct.ProductName
			};
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", oParam);
		},

		onLoadData: function(oEvent) {

			// instantiate dialog
			if (!this._busyDialog) {
				this._busyDialog = sap.ui.xmlfragment("com.sap.ui5.training.destination.test.destination_test.fragments.BusyDialog", this);
				this.getView().addDependent(this._busyDialog);
			}

			// open dialog
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._busyDialog);
			this._busyDialog.open();

			// odata model load
			var oModel = new ODataModel("/northwind", {
				serviceurl: "/northwind",
				syncronizationMode: "None"
			});

			var that = this;

			oModel.attachRequestCompleted(function() {
				that._busyDialog.close();
			});

			this.getView().setModel(oModel, "odatamodel");
		}
	});
});
