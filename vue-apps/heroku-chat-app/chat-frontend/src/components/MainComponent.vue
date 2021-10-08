<template>
  <div>
    <div class="messages" >
    <template v-for="(msg, index) in messagesArry" v-bind:key="index">
      <div>{{ msg }}</div>
    </template>
    </div>
    <input class="messagetxt" ref="msgEl" type="text" name="message" id="message" v-on:keyup.enter="sendtoserver"/>
    <button class="sendbtn" v-on:click="sendtoserver">Send</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
  setup() {
    const ws = ref(null);
    const msgEl = ref(null);
    const messagesArry = ref([]);
    const name = ref('');

    const openWSConnection = () => {
      const wssURL = location.origin.replace(/^http/, 'ws');
      ws.value = new WebSocket(wssURL);

      ws.value.onmessage = function(event) {
        // console.log(event.data);
        messagesArry.value.push(event.data);
      };

      msgEl.value.focus();

      name.value = prompt('Please Enter Your Good Name', 'X');
      if(name.value == '') name.value = 'X'
    }

    onMounted(openWSConnection);

    const sendtoserver = () => {
      if(msgEl.value.value != ''){
        // console.log(msg.value);

        let msg = name.value.toUpperCase() + " > " + (new Date()).toLocaleTimeString() + " > " + msgEl.value.value;

        ws.value.send(msg);
        
        msgEl.value.value = '';
      }
    }

    return { messagesArry, msgEl, sendtoserver }
  },
}
</script>

<style scoped>
.messages {
  margin: auto;
  border: 2px solid red;
  min-height: 400px;
  max-height: 400px;
  width: 600px;
  text-align: left;
  padding: 10px;
  overflow-y: scroll;
}

.messagetxt {
  margin: 20px;
  padding: 20px;
  width: 400px;
}

.sendbtn {
  padding: 20px;
}
</style>