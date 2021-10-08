<template>
  <div id="main">
    <iframe v-bind:src="iframeurl" frameborder="0" height="100%" width="100%"></iframe>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const iframeurl = ref('https://chat-server-rh.herokuapp.com/');

    return { iframeurl }
  },
}
</script>

<style>
  body, html {
    margin: 0; padding: 0; height: 100%; overflow: hidden;
  }

  #main{
    position:absolute; left: 0; right: 0; bottom: 0; top: 0px; 
  }
</style>