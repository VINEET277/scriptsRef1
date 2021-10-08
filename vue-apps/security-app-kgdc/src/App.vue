<template>
  <div id="app">
    <img src="@/assets/logo.png" alt="SOI" width="100">
    <div style="font-size:2em;">Security Unit</div>
    <div>Karnataka Geospatial Data Centre</div>
    <qrcode-stream class="camera" :camera="camera" @decode="onDecode" @init="onInit">
      <span class="material-icons-outlined camerastartpause" @click="startRStopCamera">
        {{ cameraicon }}
      </span>
    </qrcode-stream><br>
    <button @click="clearData" class="btns">
      <span class="material-icons-outlined">sync</span>
    </button><br>
    <div>
      <input type="radio" value="Entry" v-model="entryRexit">
      <label for="one">Entry</label>
      <input type="radio" value="Exit" v-model="entryRexit">
      <label for="two">Exit</label>
      <br>
    </div>
    <div class="details">
      <div v-show="invalidVehicle">Vehicle Not In Records</div>
      <div v-for="(value, name, index) in currentinfoobj" v-bind:key="index">{{ name }}: {{ value }}</div>
    </div>
  </div>
</template>

<script>
import './App.scss';
import { QrcodeStream } from 'vue-qrcode-reader';
const PublicGoogleSheetsParser = require('public-google-sheets-parser');

const sheetID = '1ayR2YZchyXfpPmwjm2Nedc5WG0jxyWjj3Zcbm5TTeBc';
const entryURL = 'https://script.google.com/macros/s/AKfycbw6C7tdsvIeH9VvxxM6hrItnqSgqUQhyJ8jGZ7WCTdUiIRulFkP4jGHSKnrfTSQUsXcZg/exec';

export default {
  name: 'App',
  components: {
    QrcodeStream
  },
  data() {
    return {
      camera: 'auto',
      currentinfoobj: {},
      vehicleRows: [],
      invalidVehicle: false,
      entryRexit: 'Entry',
      cameraicon: 'pause_circle'
    }
  },
  methods: {
    onDecode(value) {
      console.log(value);

      this.restartCamera();

      let currentObj = this.vehicleRows.find((row) => {
        return row.ID == value;
      });

      console.log(currentObj);
      if(currentObj == undefined){
        this.clearData();
        this.invalidVehicle = true;

        setTimeout(() => {
          this.invalidVehicle = false;
        }, 2000);
      } else {
        this.currentinfoobj = currentObj;
        this.makeEntry();
      }
    },
    onInit(promise) {
      promise
        .then(console.log)
        .catch(console.error);
    },
    clearData(){
      this.currentinfoobj = {};
      this.cameraicon = 'pause_circle';
      this.restartCamera();
    },
    restartCamera(){
      this.camera = 'off';

      setTimeout(() => {
        this.camera = 'auto';  
      }, 500);
    },
    startRStopCamera(){
      if(this.camera == 'auto'){
        this.camera = 'off';
        this.cameraicon = 'play_arrow';
      } else {
        this.camera = 'auto';
        this.cameraicon = 'pause_circle';
      }
    },
    async makeEntry() {
      let datetime = new Date().toISOString();

      let request = `${entryURL}?action=makeentry&datetime=${datetime}&entryexit=${this.entryRexit}&vehicleid=${this.currentinfoobj.ID}`;
      request += `&name=${this.currentinfoobj.NAME}&designation=${this.currentinfoobj.DESIGNATION}`;
      request += `&vehicletype=${this.currentinfoobj.VEHICLETYPE}&vehicleno=${this.currentinfoobj.VEHICLENO}`;
      request += `&model=${this.currentinfoobj.MODEL}&color=${this.currentinfoobj.VEHICLECOLOR}`;
      console.log(request);

      fetch(request, { mode: 'no-cors'})
      .then((res) => {
        console.log(res);
      }).catch(() => {
        console.log('Error Making An Entry');
      })
    }
  },
  mounted: function() {
    const parser = new PublicGoogleSheetsParser(sheetID);
    parser.parse().then((vehicleRows) => {
      this.vehicleRows = vehicleRows;
      console.log(vehicleRows);
    });
  }
}
</script>