<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="">
      <q-toolbar
        class="q-pa-md row col-12 shadow-2 bg-secondary text-white items-center"
      >
        <q-toolbar-title class="col-6 q-ml-md">
          CRUD - House Rules
          <div class="text-subtitle2">
            The system in question is an example of efficient implementation of
            the CRUD model.
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>
