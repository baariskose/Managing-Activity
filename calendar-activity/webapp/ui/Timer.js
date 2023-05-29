sap.ui.define([
  "sap/ui/core/Control"
], function (
  Control
) {
  "use strict";

  return Control.extend("com.smod.calendaractivity.ui.Timer", {
    metadata: {
      properties: {
        title: { bindable: "true", type: "string", defaultValue: "N/A" },
        hour: { bindable: "true", type: "int", defaultValue: 0 },
        minute: { bindable: "true", type: "int", defaultValue: 0 },
        second: { bindable: "true", type: "int", defaultValue: 0 },
        textValue: { bindable: "true", type: "string", defaultValue: "N/A" },
        _started: { type: "boolean", bindable: false, defaultValue: false },
      },
      aggregations: {
        _playButton: { type: "sap.m.Button", multiple: false },
        _stopButton: { type: "sap.m.Button", multiple: false, visible: false },
        _titleInput: { type: "sap.m.Input", multiple: false, visible: false },
      },
      events: {
        getTimeValues: {
          parameters: {
            hour: { type: "int", },
            minute: { type: "int", },
            second: { type: "int", },
            textValue:{type:"string"},
          },
        },
      },
    },

    init: function () {
      var oPB = new sap.m.Button({
        icon: "sap-icon://media-play",
        type: "Accept",
        tooltip: "Başlat/Durdur",
        press: this.toggleTimer.bind(this),
      });
      var oSB = new sap.m.Button({
        icon: "sap-icon://color-fill",
        type: "Reject",
        tooltip: "Durdur",
        press: this.stopTime.bind(this),
        visible:false,
      });
      var oIF = new sap.m.Input({
        value:"",
        placeholder:"Project Name",
        required:true,
        type:"Text",
      });
      var sLibraryPath = jQuery.sap.getModulePath("com.smod.calendaractivity"); //get the server location of the ui library
      jQuery.sap.includeStyleSheet(sLibraryPath + "/ui/Timer.css");

      this.setAggregation("_playButton", oPB);
      this.setAggregation("_stopButton", oSB);
      this.setAggregation("_titleInput", oIF);
    },
    toggleTimer: function () {
      var bStarted = this.getProperty("_started");
      var oPB = this.getAggregation("_playButton");
      var oSB = this.getAggregation("_stopButton");
      this.setProperty("_started", !bStarted);
      oPB.setIcon(bStarted ? "sap-icon://media-play" : "sap-icon://media-pause")
      oPB.setType(bStarted ? "Accept" : "Reject");
      if (!bStarted) {
        this.startTimer();
        oSB.setVisible(true);
      } else {
        this.pauseTime();
        oSB.setVisible(false);
      }
    },

    startTimer: function () {
      var h = this.getHour();
      var m = this.getMinute();
      var s = this.getSecond();
      this._timerInterval = setInterval(
        function () {
          s = s + 1;
          if (s === 60) {
            m = m + 1;
            s = 0;
          }
          if (m === 60) {
            h = h + 1;
            m = 0;
          }
          this.setHour(h);
          this.setMinute(m);
          this.setSecond(s);

        }.bind(this),
        1000
      );

    },
    pauseTime: function () {
      clearInterval(this._timerInterval);
    },
    stopTime: function () {
      var h = this.getHour();
      var m = this.getMinute();
      var s = this.getSecond();
      var s = this.getSecond();
      var oIF = this.getAggregation("_titleInput");
      var textValue = oIF.getValue()
      this.fireGetTimeValues({ hour: h, minute: m, second: s , textValue:textValue});

      this.setHour(0);
      this.setMinute(0);
      this.setSecond(0);
      var oPB = this.getAggregation("_playButton");
      var oSB = this.getAggregation("_stopButton");
      this.setProperty("_started", false);
      oPB.setIcon("sap-icon://media-play")
      oPB.setType("Accept");
      oSB.setVisible(false);
      clearInterval(this._timerInterval);
    },
    renderer: function (oRM, oControl) {
      var oPB = oControl.getAggregation("_playButton");
      var oSB = oControl.getAggregation("_stopButton");
      var oIF = oControl.getAggregation("_titleInput");

      oRM.openStart("div");// <div main
      oRM.writeControlData(oControl);
      oRM.class("smod-timer");
      oRM.openEnd();// >

      oRM.openStart("div"); // <div  title
      oRM.class("smod-timer-title");
      oRM.openEnd();//  >
      oRM.renderControl(oIF);
      oRM.close("div"); //</div> title end

      oRM.openStart("div"); // <div  content
      oRM.class("smod-timer-content");
      oRM.openEnd();//  >

      oRM.openStart("div"); // <div  time
      oRM.class("smod-timer-content-timer");
      oRM.openEnd();//  >
      var sTimer =
        oControl.pad2Digits(oControl.getHour()) +
        ":" +
        oControl.pad2Digits(oControl.getMinute()) +
        ":" +
        oControl.pad2Digits(oControl.getSecond());

      oRM.text(sTimer);
      oRM.close("div"); //</div> time end

      oRM.openStart("div"); // <div  button content start
      oRM.class("smod-timer-content-buttons-content");
      oRM.openEnd();//  >

      oRM.openStart("div"); // <div  button play start
      oRM.class("smod-timer-content-button-play");
      oRM.openEnd();//  >
      oRM.renderControl(oPB);
      oRM.close("div"); //</div> button play end

      oRM.openStart("div"); // <div  button stop start
      oRM.class("smod-timer-content-button-stop");
      oRM.openEnd();//  >
      oRM.renderControl(oSB);
      oRM.close("div"); //</div> button stop end

      oRM.close("div"); //</div> button-content-buttons end

      oRM.close("div"); //</div> content end



      oRM.close("div") //</div> main end

    },
    pad2Digits: function (n) {
      return n.toString().padStart(2, "0");
    },
  });
});