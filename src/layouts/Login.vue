<template>
  <q-layout>
    <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="bg-white"> </q-header>
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "mainLogin",

  data() {
    return {};
  },
};
</script>
