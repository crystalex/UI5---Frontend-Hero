sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/ODataModel"
], function(Controller, ODataModel) {
	"use strict";

	return Controller.extend("com.sap.ui5.training.destination.test.destination_test.controller.View1", {

		onInit: function(oEvent) {

				var that = this;

			setTimeout(function(){
				that.getView().byId("helloWorldText").setText("bau bau");	

				var oViewModel = that.getView().getModel("view1Model");
				alert(oViewModel.getProperty("/helloWorldText/text"));
			}, 5000);
		},

		_busyDialog: null,

		onMyButtonPress: function(oEvent) {
			console.log(oEvent);

			var oButton = oEvent.getSource();

			console.log(oButton.data("myData"));

			this.getView().byId("helloWorldText").setText(oButton.data("myData"));
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
