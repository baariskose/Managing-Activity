sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/model/json/JSONModel",

], function (
    ManagedObject,
    JSONModel,
) {
    "use strict";

    return {
        createAndPushData: function (calendar) {
            var CalendarDayType = calendar;
            var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            var storCheck = oStore.get("id");
            if (storCheck == null) {
                oStore.put("id", { // locale veri attığım kısım
                    startDate: new Date("2018", "6", "9"),
                    appointments: [{
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type08,
                        startDate: new Date("2018", "6", "8", "5", "0"),
                        endDate: new Date("2018", "6", "8", "6", "0"),
                        isFoodPayed:false,
                        isBilled:true,
                        isOutCity:true,
                        foodPrice:150,
                        transportPrice:350,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type10,
                        startDate: new Date("2018", "6", "8", "5", "0"),
                        endDate: new Date("2018", "6", "8", "6", "0"),
                        isFoodPayed:true,
                        isBilled:true,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type08,
                        startDate: new Date("2018", "6", "8", "5", "0"),
                        endDate: new Date("2018", "6", "8", "6", "0"),
                        isFoodPayed:true,
                        isBilled:false,
                        isOutCity:true,
                        foodPrice:250,
                        transportPrice:450,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type10,
                        startDate: new Date("2018", "6", "8", "5", "0"),
                        endDate: new Date("2018", "6", "8", "6", "0"),
                        isFoodPayed:false,
                        isBilled:false,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type20,
                        startDate: new Date("2018", "6", "8", "5", "0"),
                        endDate: new Date("2018", "6", "8", "6", "0"),
                        isFoodPayed:true,
                        isBilled:false,
                        isOutCity:true,
                        foodPrice:275,
                        transportPrice:650,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type10,
                        startDate: new Date("2018", "6", "8", "5", "0"),
                        endDate: new Date("2018", "6", "8", "6", "0"),
                        isFoodPayed:false,
                        isBilled:true,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type09,
                        startDate: new Date("2018", "6", "8", "5", "0"),
                        endDate: new Date("2018", "6", "8", "6", "0"),
                        isFoodPayed:false,
                        isBilled:false,
                        isOutCity:true,
                        foodPrice:275,
                        transportPrice:500,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type08,
                        startDate: new Date("2018", "6", "8", "5", "0"),
                        endDate: new Date("2018", "6", "8", "6", "0"),
                        isFoodPayed:true,
                        isBilled:true,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type20,
                        startDate: new Date("2018", "6", "8", "5", "0"),
                        endDate: new Date("2018", "6", "8", "6", "0"),
                        isFoodPayed:false,
                        isBilled:true,
                        isOutCity:true,
                        foodPrice:150,
                        transportPrice:710,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type10,
                        startDate: new Date("2018", "6", "8", "5", "0"),
                        endDate: new Date("2018", "6", "8", "6", "0"),
                        isFoodPayed:true,
                        isBilled:true,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type08,
                        startDate: new Date("2018", "6", "8", "5", "0"),
                        endDate: new Date("2018", "6", "8", "6", "0"),
                        isFoodPayed:true,
                        isBilled:false,
                        isOutCity:true,
                        foodPrice:300,
                        transportPrice:200,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type09,
                        startDate: new Date("2018", "6", "9", "5", "0"),
                        endDate: new Date("2018", "6", "9", "6", "0"),
                        isFoodPayed:true,
                        isBilled:true,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type10,
                        startDate: new Date("2018", "6", "11", "5", "0"),
                        endDate: new Date("2018", "6", "11", "6", "0"),
                        isFoodPayed:false,
                        isBilled:false,
                        isOutCity:true,
                        foodPrice:175,
                        transportPrice:420,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type09,
                        startDate: new Date("2018", "6", "12", "5", "0"),
                        endDate: new Date("2018", "6", "12", "6", "0"),
                        isFoodPayed:true,
                        isBilled:false,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type08,
                        startDate: new Date("2018", "6", "11", "11", "0"),
                        endDate: new Date("2018", "6", "11", "13", "0"),
                        isFoodPayed:false,
                        isBilled:true,
                        isOutCity:true,
                        foodPrice:50,
                        transportPrice:250,
                        eforTime: 2,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type20,
                        startDate: new Date("2018", "6", "15", "5", "0"),
                        endDate: new Date("2018", "6", "16", "6", "0"),
                        isFoodPayed:true,
                        isBilled:true,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type09,
                        startDate: new Date("2018", "6", "16", "17", "0"),
                        endDate: new Date("2018", "6", "8", "17", "30"),
                        isFoodPayed:true,
                        isBilled:true,
                        isOutCity:true,
                        foodPrice:150,
                        transportPrice:200,
                        eforTime: 1
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type08,
                        startDate: new Date("2018", "6", "18", "5", "0"),
                        endDate: new Date("2018", "6", "18", "6", "0"),
                        isFoodPayed:false,
                        isBilled:false,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type20,
                        startDate: new Date("2018", "6", "19", "5", "0"),
                        endDate: new Date("2018", "6", "19", "6", "0"),
                        isFoodPayed:true,
                        isBilled:true,
                        isOutCity:true,
                        foodPrice:175,
                        transportPrice:333,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type08,
                        startDate: new Date("2018", "6", "20", "5", "0"),
                        endDate: new Date("2018", "6", "20", "6", "0"),
                        isFoodPayed:false,
                        isBilled:true,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type09,
                        startDate: new Date("2018", "6", "21", "5", "0"),
                        endDate: new Date("2018", "6", "21", "6", "0"),
                        isFoodPayed:true,
                        isBilled:false,
                        isOutCity:true,
                        foodPrice:147,
                        transportPrice:852,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type20,
                        startDate: new Date("2018", "6", "23", "5", "0"),
                        endDate: new Date("2018", "6", "23", "6", "0"),
                        isFoodPayed:false,
                        isBilled:true,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type09,
                        startDate: new Date("2018", "6", "23", "14", "0"),
                        endDate: new Date("2018", "6", "23", "16", "0"),
                        isFoodPayed:true,
                        isBilled:true,
                        isOutCity:true,
                        foodPrice:153,
                        transportPrice:963,
                        eforTime: 2,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type08,
                        startDate: new Date("2018", "6", "24", "13", "0"),
                        endDate: new Date("2018", "6", "24", "14", "0"),
                        isFoodPayed:true,
                        isBilled:false,
                        isOutCity:false,
                        foodPrice:0,
                        transportPrice:0,
                        eforTime: 1,
                    }, 
                    {
                        title:  this._createRandomProjectName(),
                        text:this._createRandomDescription(),
                        description:this._createRandomCompanyName(),
                        type: CalendarDayType.Type09,
                        startDate: new Date("2018", "6", "25", "10", "0"),
                        endDate: new Date("2018", "6", "25", "12", "0"),
                        isFoodPayed:false,
                        isBilled:true,
                        isOutCity:true,
                        foodPrice:730,
                        transportPrice:714,
                        eforTime: 2,

                    }
                   
                    ],
                    supportedAppointmentItems: [
                        {
                            text: "In Progress",
                            type: CalendarDayType.Type20
                        },
                        {
                            text: "Done",
                            type: CalendarDayType.Type08
                        },
                        {
                            text: "To Do",
                            type: CalendarDayType.Type09
                        },
                        {
                            text: "To Revise",
                            type: CalendarDayType.Type10
                        },
                    ]
                });
            }


        },
        _createRandomCompanyName(){

            var aCompanyNames= Array("Koç","Hakmar","Migros","LC Waikiki","Atasay");
            return aCompanyNames[Math.floor(Math.random()*aCompanyNames.length)];
        },
        _createRandomProjectName(){

            var aProjectNames= Array("İşe alım","Bordro hatası","Kıdem hesaplama","Yakacak yardımı","İzin hesaplama","ALV Rapor");
            return aProjectNames[Math.floor(Math.random()*aProjectNames.length)];
        },
         _createRandomDescription(){

            var aDescription= Array("açıklama1 açıklama1","açıklama2 açıklama2","açıklama3 açıklama3","açıklama4 açıklama4","açıklama5 açıklama5","açıklama6 açıklama6");
            return aDescription[Math.floor(Math.random()*aDescription.length)];
        },
        GetDataById(id) {
            var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            return oStore.get(id);
        },
        pushData: function (data, id) {
            var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            var allData = this.GetDataById(id);
            allData.appointments.push(data);
            oStore.put(id, allData);

        },
        deleteData: function (data, id) {
            var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            var allData = this.GetDataById(id);
            allData.appointments.splice(allData.appointments.indexOf(data), 1);
            oStore.put(id, allData);
        },
        updateData:  function (data, index, id) {
            var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            var allData = this.GetDataById(id);
            allData.appointments[index] = data;
            oStore.put(id, allData);

        },
        _calculateEfor: function(oStartTime, oEndTime){
            var difference =  oEndTime.getTime() -oStartTime.getTime();
            return difference/3600000;
        }

    };
});