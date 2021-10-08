<template>
  <div class="app">
    <NavBar />
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NavBar from './components/NavBar.vue';
import RouterView from './components/RouterView.vue';

export default defineComponent({
  name: 'App',
  created: () => {
    document.title = "Image Filter";
  },
  components: {
    NavBar, RouterView
  }
})
</script>
