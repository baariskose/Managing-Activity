/*global QUnit*/

sap.ui.define([
	"comsmod/calendar-activity/controller/CalendarView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CalendarView Controller");

	QUnit.test("I should test the CalendarView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
