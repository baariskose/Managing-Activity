sap.ui.define([
	"sap/ui/core/Fragment",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/json/JSONModel",
	"sap/ui/unified/library",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/type/DateTime",
	"../model/localStorage"

],
	function (Fragment,
		Controller,
		DateFormat,
		JSONModel,
		unifiedLibrary,
		MessageToast,
		Filter,
		FilterOperator,
		DateTime,
		localStorage

	) {
		"use strict";
		var CalendarDayType = unifiedLibrary.CalendarDayType;
		var PageController = Controller.extend("com.smod.calendaractivity.controller.CalendarView", {
			onInit: function () {

				localStorage.createAndPushData(CalendarDayType);
				var data = localStorage.GetDataById("id");
				var oModel = new JSONModel();
				oModel.setData({ // verileri modele attığım kısım
					startDate: new Date("2022", "6", "9"),
					appointments: [],
					supportedAppointmentItems: [],
				});

				this.getView().setModel(oModel);
				var oViewModel = this.getView().getModel();
				oViewModel.setProperty("/startDate", this._dateFormatterStorage(data.startDate));
				var parsedAppointments = this._iterateAppointmentsData(data.appointments);
				oViewModel.setProperty("/appointments", parsedAppointments);
				oViewModel.setProperty("/supportedAppointmentItems", data.supportedAppointmentItems);

				oModel = new JSONModel();
				oModel.setData({ allDay: false });
				this.getView().setModel(oModel, "allDay");

				oModel = new JSONModel();
				oModel.setData({ selectedCompany: "", selectedProject: "", currFoodPrice: 0, currTransportPrice: 0 });
				this.getView().setModel(oModel, "currTaskInfo");

				oModel = new JSONModel();
				oModel.setData({ isBilled: false, isFoodPayed: false, isOutCity: false });
				this.getView().setModel(oModel, "currSwitchInfo");

				oModel = new JSONModel();
				oModel.setData({ eforTime: 0 });
				this.getView().setModel(oModel, "eforInfo");

				oModel = new JSONModel();
				oModel.setData({ timerTextValue: "" , timerVisible:false});
				this.getView().setModel(oModel, "timerTextInfo");



			},
			_dateFormatterStorage: function (date) {
				var parsedDate = new Date(Date.parse(date))
				return parsedDate;
			},
			_iterateAppointmentsData: function (appointments) {
				appointments.forEach(element => {
					element.startDate = this._dateFormatterStorage(element.startDate),
						element.endDate = this._dateFormatterStorage(element.endDate)
				});
				return appointments;
			},

			_typeFormatter: function (sType) {
				var sTypeText = "",
					aTypes = this.getView().getModel().getData().supportedAppointmentItems;

				for (var i = 0; i < aTypes.length; i++) {
					if (aTypes[i].type === sType) {
						sTypeText = aTypes[i].text;
					}
				}

				if (sTypeText !== "") {
					return sTypeText;
				} else {
					return sType;
				}
			},

			handleAppointmentDrop: function (oEvent) {
				var oAppointment = oEvent.getParameter("appointment"),
					oBindObject = oAppointment.getBindingContext().getObject(),
					oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate"),
					bCopy = oEvent.getParameter("copy"),
					sAppointmentTitle = oAppointment.getTitle(),
					oModel = this.getView().getModel(),
					oNewAppointment;

				if (bCopy) {
					oNewAppointment = {
						title: sAppointmentTitle,
						text: oAppointment.getText(),
						type: oAppointment.getType(),
						startDate: oStartDate,
						endDate: oEndDate,
						isBilled: oBindObject.isBilled,
						isFoodPayed: oBindObject.isFoodPayed,
						isOutCity: oBindObject.isOutCity,
						eforTime: oBindObject.eforTime,
						foodPrice: oBindObject.foodPrice,
						transportPrice: oBindObject.transportPrice,
						description: oAppointment.getDescription(),
					};
					localStorage.pushData(oNewAppointment, "id");
					oModel.getData().appointments.push(oNewAppointment);
					oModel.updateBindings();
				} else {
					oAppointment.setStartDate(oStartDate);
					oAppointment.setEndDate(oEndDate);
					var data = oAppointment.getBindingContext().getObject();
					var allData = oModel.getProperty("/appointments");
					var index = allData.indexOf(data);
					localStorage.updateData(data, index, "id");
				}

				MessageToast.show("Appointment with title \n'"
					+ sAppointmentTitle
					+ "'\n has been " + (bCopy ? "create" : "moved")
				);
			},

			handleAppointmentResize: function (oEvent) {
				var oAppointment = oEvent.getParameter("appointment"),
					oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate"),
					sAppointmentTitle = oAppointment.getTitle();

				oAppointment.setStartDate(oStartDate);
				oAppointment.setEndDate(oEndDate);

				MessageToast.show("Appointment with title \n'"
					+ sAppointmentTitle
					+ "'\n has been resized"
				);
			},

			handleAppointmentCreateDnD: function (oEvent) {
				var oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate"),
					sAppointmentTitle = "New Appointment",
					oModel = this.getView().getModel(),
					oNewAppointment = {
						title: sAppointmentTitle,
						startDate: oStartDate,
						endDate: oEndDate
					};

				oModel.getData().appointments.push(oNewAppointment);
				localStorage.pushData(oNewAppointment, "id");
				oModel.updateBindings();

				sap.m.MessageToast.show("Appointment with title \n'"
					+ sAppointmentTitle
					+ "'\n has been created"
				);
			},

			onExit: function () {
				this.sPath = null;
				if (this._oDetailsPopover) {
					this._oDetailsPopover.destroy();
				}
				if (this._oNewAppointmentDialog) {
					this._oNewAppointmentDialog.destroy();
				}
			},

			handleViewChange: function () {
				MessageToast.show("'viewChange' event fired.");
			},

			handleAppointmentSelect: function (oEvent) {
				var oAppointment = oEvent.getParameter("appointment"),
					oStartDate,
					oEndDate,
					oTrimmedStartDate,
					oTrimmedEndDate,
					bAllDate,
					oModel;

				if (oAppointment === undefined) {
					return;
				}

				oStartDate = oAppointment.getStartDate();
				oEndDate = oAppointment.getEndDate();
				oTrimmedStartDate = new Date(oStartDate);
				oTrimmedEndDate = new Date(oEndDate);
				bAllDate = false;
				oModel = this.getView().getModel("allDay");
				var oModelForSelectedCompany = this.getView().getModel("currTaskInfo");
				oModelForSelectedCompany.setProperty("/selectedCompany", oAppointment.getDescription())
				var oModelForSwitchInfo = this.getView().getModel("currSwitchInfo");
				var oModelForTransportAndFoodPrice = this.getView().getModel("currSwitchInfo");

				if (!oAppointment.getSelected()) {
					this._oDetailsPopover.close();
					return;
				}

				this._setHoursToZero(oTrimmedStartDate);
				this._setHoursToZero(oTrimmedEndDate);

				if (oStartDate.getTime() === oTrimmedStartDate.getTime() && oEndDate.getTime() === oTrimmedEndDate.getTime()) {
					bAllDate = true;
				}

				oModel.getData().allDay = bAllDate;
				oModelForSwitchInfo.getData().isBilled = oAppointment.getBindingContext().getObject().isBilled;
				oModelForSwitchInfo.getData().isFoodPayed = oAppointment.getBindingContext().getObject().isFoodPayed;
				oModelForSwitchInfo.getData().isOutCity = oAppointment.getBindingContext().getObject().isOutCity;
				oModelForTransportAndFoodPrice.getData().currFoodPrice = oAppointment.getBindingContext().getObject().foodPrice;
				oModelForTransportAndFoodPrice.getData().currTransportPrice = oAppointment.getBindingContext().getObject().transportPrice;
				this._updateModel(oModel);
				this._updateModel(oModelForSwitchInfo);
				this._updateModel(oModelForSelectedCompany);
				this._updateModel(oModelForTransportAndFoodPrice);

				if (!this._oDetailsPopover) {
					Fragment.load({
						id: "popoverFrag",
						name: "com.smod.calendaractivity.view.Details",
						controller: this
					})
						.then(function (oPopoverContent) {
							this._oDetailsPopover = oPopoverContent;
							this._oDetailsPopover.setBindingContext(oAppointment.getBindingContext());
							this.getView().addDependent(this._oDetailsPopover);
							this._oDetailsPopover.openBy(oAppointment);
						}.bind(this));
				} else {
					this._oDetailsPopover.setBindingContext(oAppointment.getBindingContext());
					this._oDetailsPopover.openBy(oAppointment);
				}
			},

			handleMoreLinkPress: function (oEvent) {
				var oDate = oEvent.getParameter("date"),
					oSinglePlanningCalendar = this.getView().byId("SPC1");

				oSinglePlanningCalendar.setSelectedView(oSinglePlanningCalendar.getViews()[2]); // DayView

				this.getView().getModel().setData({ startDate: oDate }, true);
			},

			handleEditButton: function () {
				// The sap.m.Popover has to be closed before the sap.m.Dialog gets opened
				this._oDetailsPopover.close();
				this.sPath = this._oDetailsPopover.getBindingContext().getPath();
				this._arrangeDialogFragment("Edit appointment");
			},

			handlePopoverDeleteButton: function () {
				var oModel = this.getView().getModel(),
					oAppointments = oModel.getData().appointments,
					oAppointment = this._oDetailsPopover._getBindingContext().getObject();

				this._oDetailsPopover.close();

				oAppointments.splice(oAppointments.indexOf(oAppointment), 1);
				localStorage.deleteData(oAppointments, "id");
				oModel.updateBindings();
			},

			_arrangeDialogFragment: function (sTitle) {
				if (!this._oNewAppointmentDialog) {
					Fragment.load({
						id: "dialogFrag",
						name: "com.smod.calendaractivity.view.Modify",
						controller: this
					})
						.then(function (oDialog) {
							this._oNewAppointmentDialog = oDialog;
							this.getView().addDependent(this._oNewAppointmentDialog);
							this._arrangeDialog(sTitle);
						}.bind(this));
				} else {
					this._arrangeDialog(sTitle);
				}
			},

			_arrangeDialog: function (sTitle) {
				this._setValuesToDialogContent();
				this._oNewAppointmentDialog.setTitle(sTitle);
				this._oNewAppointmentDialog.open();
			},

			_setValuesToDialogContent: function () {
				var oAllDayAppointment = (Fragment.byId("dialogFrag", "allDay")),
					sStartDatePickerID = "DPStartDate",
					sEndDatePickerID = "DPEndDate",
					
					sStartTime = "TPStartTime",
					sEndTime = "TPEndTime",
					SearcInput ="searchCompanyProject",
					oTitleControl = Fragment.byId("dialogFrag", "appTitle"),
					oSearcInput= Fragment.byId("dialogFrag", SearcInput),
					oTextControl = Fragment.byId("dialogFrag", "moreInfo"),
					oBoolControlFood = Fragment.byId("dialogFrag", "yemekSwitch"),
					oBoolControlBil = Fragment.byId("dialogFrag", "faturaSwitch"),
					oBoolControlIsOutCity = Fragment.byId("dialogFrag", "isOutCity"),
					oEforControl = Fragment.byId("dialogFrag", "idEfor"),
					oFoodPriceInput = Fragment.byId("dialogFrag", "isOutCityFoodPrice"),
					oTransportPriceInput = Fragment.byId("dialogFrag", "isOutCityTransportPrice"),
					oTypeControl = Fragment.byId("dialogFrag", "appType"),
					oStartDateControl = Fragment.byId("dialogFrag", sStartDatePickerID),
					oEndDateControl = Fragment.byId("dialogFrag", sEndDatePickerID),
					oStartTimeControl = Fragment.byId("dialogFrag", sStartTime),
					oEndTimeControl = Fragment.byId("dialogFrag", sEndTime),
					oEmptyError = { errorState: false, errorMessage: "" },
					oContext,
					oContextObject,
					oSPCStartDate,
					sTitle,
					sText,
					fFoodPrice,
					fTranportPrice,
					iEforTime,
					bFoodSwitched,
					bBillSwitched,
					bIsOutCity,
					oStartDate,
					oEndDate,
					sType;


				if (this.sPath) {
					oContext = this._oDetailsPopover.getBindingContext();
					oContextObject = oContext.getObject();
					sTitle = oContextObject.title;
					sText = oContextObject.text;
					oStartDate = oContextObject.startDate;
					oEndDate = oContextObject.endDate;
					sType = oContextObject.type;
					bFoodSwitched = oContextObject.isFoodPayed;
					bBillSwitched = oContextObject.isBilled;
					bIsOutCity = oContextObject.isOutCity;
					fFoodPrice = oContextObject.foodPrice;
					fTranportPrice = oContextObject.transportPrice;
					iEforTime = oContextObject.eforTime
				} else {
					sTitle = "";
					sText = "";
					if (this._oChosenDayData) {
						oStartDate = this._oChosenDayData.start;
						oEndDate = this._oChosenDayData.end;

						delete this._oChosenDayData;
					} else {
						oSPCStartDate = this.getView().byId("SPC1").getStartDate();
						oStartDate = new Date(oSPCStartDate);
						oStartDate.setHours(this._getDefaultAppointmentStartHour());
						oEndDate = new Date(oSPCStartDate);
						oEndDate.setHours(this._getDefaultAppointmentEndHour());
					}
					oAllDayAppointment.setSelected(false);
					sType = "Type01";
				}

				if(this._oTimerTitleValue){ // timerdan gelen  bir dialogsa çalıştır
					oSearcInput.setValue(  this._oTimerTitleValue.timeText);
					delete this._oTimerTitleValue;
				}
				
				oTitleControl.setValue(sTitle);
				oTextControl.setValue(sText);
				oFoodPriceInput.setValue(fFoodPrice);
				oTransportPriceInput.setValue(fTranportPrice);
				oBoolControlFood.setState(bFoodSwitched);
				oBoolControlBil.setState(bBillSwitched);
				oBoolControlIsOutCity.setState(bIsOutCity);
				oStartDateControl.setDateValue(oStartDate);
				oEndDateControl.setDateValue(oEndDate);
				oStartTimeControl.setDateValue(oStartDate);
				oEndTimeControl.setDateValue(oEndDate);
				oTypeControl.setSelectedKey(sType);
				oEforControl.setText(iEforTime);
				// düzelt
				this._setDateValueState(oStartDateControl, oStartTimeControl, oEmptyError);
				this._setDateValueState(oEndDateControl, oEndTimeControl, oEmptyError);
				this.updateButtonEnabledState(oStartDateControl, oEndDateControl, this._oNewAppointmentDialog.getBeginButton());
			},

			handleDialogOkButton: function () {
				var bAllDayAppointment = (Fragment.byId("dialogFrag", "allDay")).getSelected(),
					sStartDate = "DPStartDate",
					sStartTime = "TPStartTime",
					sEndTime = "TPEndTime",
					sTitle = Fragment.byId("dialogFrag", "appTitle").getValue(),
					sText = Fragment.byId("dialogFrag", "moreInfo").getValue(),
					sType = Fragment.byId("dialogFrag", "appType").getSelectedItem().getKey(),
					sDescription = Fragment.byId("dialogFrag", "idCompanyName").getValue(),
					bFoodSwitched = Fragment.byId("dialogFrag", "yemekSwitch").getState(),
					bBillSwitched = Fragment.byId("dialogFrag", "faturaSwitch").getState(),
					fFoodPrice = Fragment.byId("dialogFrag", "isOutCityFoodPrice").getValue(),
					fTranportPrice = Fragment.byId("dialogFrag", "isOutCityTransportPrice").getValue(),
					bIsOutCity = Fragment.byId("dialogFrag", "isOutCity").getState(),
					oStartDate = Fragment.byId("dialogFrag", sStartDate).getDateValue(),
					oStartTime = Fragment.byId("dialogFrag", sStartTime).getDateValue(),
					oEndTime = Fragment.byId("dialogFrag", sEndTime).getDateValue(),
					oModel = this.getView().getModel(),
					iEforTime = this._calculateEfor(this.getProperDate(oStartTime, oStartDate), this.getProperDate(oEndTime, oStartDate)),
					sAppointmentPath;

				if (Fragment.byId("dialogFrag", sStartDate).getValueState() !== "Error"
					) {

					if (this.sPath) {
						// edit yaptıktan ok basılınca girilen yer
						sAppointmentPath = this.sPath;
						oModel.setProperty(sAppointmentPath + "/title", sTitle);
						oModel.setProperty(sAppointmentPath + "/text", sText);
						oModel.setProperty(sAppointmentPath + "/type", sType);
						oModel.setProperty(sAppointmentPath + "/startDate", this.getProperDate(oStartTime, oStartDate));
						oModel.setProperty(sAppointmentPath + "/endDate", this.getProperDate(oEndTime, oStartDate));
						oModel.setProperty(sAppointmentPath + "/description", sDescription);
						oModel.setProperty(sAppointmentPath + "/isFoodPayed", bFoodSwitched);
						oModel.setProperty(sAppointmentPath + "/isBilled", bBillSwitched);
						oModel.setProperty(sAppointmentPath + "/isOutCity", bIsOutCity);
						oModel.setProperty(sAppointmentPath + "/foodPrice", bIsOutCity ? fFoodPrice : 0);
						oModel.setProperty(sAppointmentPath + "/transportPrice", bIsOutCity ? fTranportPrice : 0);
						oModel.setProperty(sAppointmentPath + "/eforTime", iEforTime);

						var data = oModel.getProperty(sAppointmentPath);
						var allData = oModel.getProperty("/appointments");
						var index = allData.indexOf(data);
						localStorage.updateData(data, index, "id");
					} else {
						// sıfırdan appointments oluşturulup açılınca çalışan yer
						var pushData = {
							title: sTitle,
							text: sText,
							type: sType,
							startDate: this.getProperDate(oStartTime, oStartDate),
							endDate: this.getProperDate(oEndTime, oStartDate),
							description: sDescription,
							isFoodPayed: bFoodSwitched,
							isBilled: bBillSwitched,
							isOutCity: bIsOutCity,
							foodPrice: fFoodPrice,
							transportPrice: fTranportPrice,
							eforTime: iEforTime,
						}
						oModel.getData().appointments.push(pushData);
						localStorage.pushData(pushData, "id");
					}

					this._updateModel(oModel);

					this._oNewAppointmentDialog.close();
				}
			},
			getProperDate: function (oTime, oDate) {
				var year = oDate.getFullYear();
				var month = oDate.getMonth();
				var day = oDate.getDate();
				var hour = oTime.getHours();
				var minute = oTime.getMinutes();
				var fullDate = new Date(year, month, day, hour, minute);
				return fullDate;
			},
			formatDate: function (oDate) {
				if (oDate) {
					var iHours = oDate.getHours(),
						iMinutes = oDate.getMinutes(),
						iSeconds = oDate.getSeconds();

					if (iHours !== 0 || iMinutes !== 0 || iSeconds !== 0) {
						return DateFormat.getDateTimeInstance({ style: "medium" }).format(oDate);
					} else {
						return DateFormat.getDateInstance({ style: "medium" }).format(oDate);
					}
				}
			},

			handleDialogCancelButton: function () {
				this.sPath = null;
				this._oNewAppointmentDialog.close();
			},


			_updateModel: function (oModel) {
				oModel.updateBindings();
			},
			_getDefaultAppointmentStartHour: function () {
				return 9;
			},

			_getDefaultAppointmentEndHour: function () {
				return 10;
			},

			_setHoursToZero: function (oDate) {
				oDate.setHours(0, 0, 0, 0);
			},

			handleAppointmentCreate: function () {
				this._createInitialDialogValues(this.getView().byId("SPC1").getStartDate());
			},

			handleHeaderDateSelect: function (oEvent) {
				this._createInitialDialogValues(oEvent.getParameter("date"));
			},

			_createInitialDialogValues: function (oDate) {
				var oStartDate = new Date(oDate),
					oEndDate = new Date(oStartDate);

				oStartDate.setHours(this._getDefaultAppointmentStartHour());
				oEndDate.setHours(this._getDefaultAppointmentEndHour());
				this._oChosenDayData = { start: oStartDate, end: oEndDate };
				this.sPath = null;

				this._arrangeDialogFragment("Create appointment");
			},
			_createInitialTimerDialogValues: function (hour, minute, second) {
				var oStartDate = new Date(),
					oEndDate = new Date();


				oStartDate = this._getStartTimeForTimer(hour, minute, second);

				this._oChosenDayData = { start: oStartDate, end: oEndDate };
				this.sPath = null;

				this._arrangeDialogFragment("Create appointment");
			},
			_getStartTimeForTimer: function (hour, minute, second) {
				var oCurrDate = new Date();
				var currHour = oCurrDate.getHours();
				var currMinute = oCurrDate.getMinutes();
				var currDay = oCurrDate.getDate();;

				if (currMinute < minute) {
					currMinute = currMinute + 60
					currHour = currHour - 1;
					if (currHour < 0) {
						currDay = currDay - 1;
						currHour = currHour + 24;
					}

				}
				if (currHour < hour) {
					currHour = currHour + 24;
					currDay = currDay - 1;
				}
				var diffHour = currHour-hour;
				var diffMinute = currMinute-minute;


				oCurrDate.setHours(diffHour);
				oCurrDate.setMinutes(diffMinute);
				oCurrDate.setDate(currDay);
				return oCurrDate;

			},



			handleStartDateChange: function (oEvent) {
				var oStartDate = oEvent.getParameter("date");
				MessageToast.show("'startDateChange' event fired.\n\nNew start date is " + oStartDate.toString());
			},

			updateButtonEnabledState: function (oDateTimePickerStart, oDateTimePickerEnd, oButton) {
				var bEnabled = oDateTimePickerStart.getValueState() !== "Error"
					&& oDateTimePickerStart.getValue() !== ""
					&& oDateTimePickerEnd.getValue() !== ""
					&& oDateTimePickerEnd.getValueState() !== "Error";

				oButton.setEnabled(bEnabled);
			},

			handleDatePickerChange: function () {
				var oDatePickerStart = Fragment.byId("dialogFrag", "DPStartDate"),
					oStartTime = Fragment.byId("dialogFrag", "TPStartTime"),
					oEndTime = Fragment.byId("dialogFrag", "TPEndTime"),
					oStartDate = oDatePickerStart.getDateValue(),
					oStartDateFull = this.getProperDate(oStartTime.getDateValue(), oStartDate),
					oEndDateFull = this.getProperDate(oEndTime.getDateValue(), oStartDate),
					//oEndDate = oEndTime.getDateValue(),
					bEndDateBiggerThanStartDate = oEndDateFull.getTime() <= oStartDateFull.getTime(),
					oErrorState = { errorState: false, errorMessage: "" };

				if (oStartDateFull && oEndDateFull && bEndDateBiggerThanStartDate) {
					oErrorState.errorState = true;
					oErrorState.errorMessage = "Start date should be before End date";
				}
				var timeDiff = this._calculateEfor(oStartDateFull, oEndDateFull);
				var oViewModel = this.getView().getModel("eforInfo");
				oViewModel.setProperty("/eforTime", timeDiff);
				this._setDateValueState(oDatePickerStart, oStartTime, oErrorState);
				this._setDateValueState(oDatePickerStart, oEndTime, oErrorState);
				this.updateButtonEnabledState(oDatePickerStart, oEndTime, this._oNewAppointmentDialog.getBeginButton());
			},
			_setDateValueState: function (oPicker, oTime, oErrorState) {
				if (oErrorState.errorState) {
					oPicker.setValueState("Error");
					oPicker.setValueStateText(oErrorState.errorMessage);
					oTime.setValueState("Error");
					oTime.setValueStateText(oErrorState.errorMessage);
				} else {
					oPicker.setValueState("None");
					oTime.setValueState("None");
				}
			},
			handleOpenLegend: function (oEvent) {
				var oSource = oEvent.getSource();

				if (!this._oLegendPopover) {
					Fragment.load({
						id: "LegendFrag",
						name: "com.smod.calendaractivity.view.Legend",
						controller: this
					}).then(function (oPopoverContent) {
						this._oLegendPopover = oPopoverContent;
						this.getView().addDependent(this._oLegendPopover);
						this._oLegendPopover.openBy(oSource);
					}.bind(this));
				} else if (this._oLegendPopover.isOpen()) {
					this._oLegendPopover.close();
				} else {
					this._oLegendPopover.openBy(oSource);
				}
			},
			onInputTaskChanged: function (oEvent) {
				var text = oEvent.getParameters().selectedItem.getProperty("text");
				var adText = oEvent.getParameters().selectedItem.getProperty("additionalText");
				var oViewModel = this.getView().getModel("currTaskInfo");
				oViewModel.setProperty("/selectedCompany", text);
				oViewModel.setProperty("/selectedProject", adText);
			},
			onIsOutCityChange: function (oEvent) {
				var oViewModel = this.getView().getModel("currSwitchInfo");
				var state = oEvent.getParameter("state");
				oViewModel.setProperty("/isOutCity", state);
			},
			getTimerValues: function (oEvent) {
				var hour = oEvent.getParameter("hour");
				var minute = oEvent.getParameter("minute");
				var second = oEvent.getParameter("second");
				var textValue = oEvent.getParameter("textValue");
				this._oTimerTitleValue = { timeText: textValue };
				this._createInitialTimerDialogValues(hour,minute,second);
			},
			_calculateEfor: function (oStartTime, oEndTime) {
				var difference = oEndTime.getTime() - oStartTime.getTime();
				return Math.round(difference / 3600000);
			},
			handleShowTimePanel: function(){
				var oViewModel = this.getView().getModel("timerTextInfo");
				var bTime = oViewModel.getProperty("/timerVisible");
				oViewModel.setProperty("/timerVisible",!bTime);
			}


		});

		return PageController;
	});