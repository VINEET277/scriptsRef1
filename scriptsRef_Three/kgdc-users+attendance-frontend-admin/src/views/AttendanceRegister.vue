<template>
  <div>
    <h1 style="display:inline-block;">Field Attendance Register KGDC</h1>
    &emsp;&emsp;
    
    <input type="number" v-model="rowscountref"/>
    <button v-on:click="getAttendanceRegister">Get Register</button>
    &emsp;&emsp;
    <select v-model="selectedMobile">
      <option selected value="1">All</option>
      <option v-for="(mobilenumber, index) in getUniqueMobileNumbers" v-bind:key="index" v-bind:value="mobilenumber">
        {{ mobilenumber }}
      </option>
    </select>
    <br/><br/>
    <table border="1" class="tablecenter">
      <tr>
          <th>ServerDate</th><th>ServerTime</th><th>ClientDate</th><th>ClientTime</th>
          <th>Name</th><th>AttendanceType</th><th>Remarks</th><th>MobileNumber</th>
          <th>UUID</th><th>Latitude</th><th>Longitude</th><th>Accuracy</th><th>Location</th>
      </tr>
      
      <tr v-for="(register, index) in registerEntriesComputed" v-bind:key="index">
        <td>{{ register.serverdate }}</td><td>{{ register.servertime }}</td><td>{{ register.clientdate }}</td><td>{{ register.clienttime }}</td>
        <td>{{ register.name }}</td><td>{{ register.attendancetype }}</td><td>{{ register.remarks }}</td><td>{{ register.mobilenumber }}</td>
        <td>{{ register.uuid }}</td><td>{{ register.latitude }}</td><td>{{ register.longitude }}</td><td>{{ register.accuracy }}</td>
        <td><a v-bind:href="gmpasurl(register.latitude, register.longitude)" target="_blank">Location</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const wsServerURL = ref('');
    const usernameref = ref('');
    const passwordref = ref('');
    const rowscountref = ref(100);
    const registerentries = ref([]);

    const selectedMobile = ref('1');

    const store = useStore();

    const getWSURL = async () => {
      wsServerURL.value = store.getters.getWSURL;
      usernameref.value = store.getters.getAdminUser;
      passwordref.value = store.getters.getAdminPass;

      getAttendanceRegister();
    }
            
    onMounted(getWSURL);

    const gmpasurl = computed(() => {
        return (lat, lon) => {
            return 'https://www.google.com/maps/place/' + deg_to_dms(lat) + "N+" + deg_to_dms(lon) + "E";
        }
    });

    const deg_to_dms = (deg) => {
      let d = Math.floor(deg);
      let minfloat = (deg - d) * 60;
      let m = Math.floor(minfloat);
      let secfloat = (minfloat - m) * 60;
      let s = secfloat.toFixed(6);

      return (d + "°" + m + "'" + s + "\"");
    }

    const getAttendanceRegister = () => {
      let ws = new WebSocket(wsServerURL.value);
      ws.addEventListener('message', (event) => {
        // console.log(event.data);

        let msgObj = JSON.parse(Buffer.from(event.data, 'base64').toString());
        console.log(msgObj);

        registerentries.value = msgObj;

        setTimeout(()=>{
          ws.close();
        }, 1000);
      });

      ws.addEventListener('open', (event) => {
        console.log(usernameref.value, passwordref.value);

        let attendanceRegisterObj = {
          requesttype: 'attendanceregister',
          rowscount: rowscountref.value,
          user: usernameref.value,
          pass: passwordref.value,
        }

        // console.log(attendanceRegisterObj);

        ws.send(Buffer.from(JSON.stringify(attendanceRegisterObj)).toString('base64'));
      });
    }

    const getUniqueMobileNumbers = computed(() => {
      return [...new Set(registerentries.value.map(register => register.mobilenumber))];
    });

    const registerEntriesComputed = computed(() => {
      if (selectedMobile.value == '1'){
        return registerentries.value;
      } else {
        return registerentries.value.filter(entry => entry.mobilenumber == selectedMobile.value);
      }
    });

    return { registerEntriesComputed, selectedMobile, gmpasurl, rowscountref, getAttendanceRegister, getUniqueMobileNumbers }
  },
}
</script>

<style scoped>
  .tablecenter {
    margin-left: auto;
    margin-right: auto;
  }
</style>