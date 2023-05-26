<template>
  <q-page class="row justify-center items-center">
    <q-card class="col-11 col-md-6 col-lg-4 bg-white shadow-15">
      <q-card-section class="bg-secondary">
        <h4 class="text-h5 text-white q-my-md">HOUSE RULE</h4>
      </q-card-section>
      <q-card-section class="">
        <q-form @submit="login">
          <div class="text-white">
            <q-input
              :rules="[(val) => !!val || 'Campo Obrigatório!']"
              v-model="usuario.login"
              icon="person"
              float-label="Login"
              class="q-pa-sm"
            >
              <template v-slot:before>
                <q-icon name="perm_identity" />
              </template>
            </q-input>
            <q-input
              :type="isPwd ? 'password' : 'text'"
              v-model="usuario.pass"
              float-label="Password"
              icon="lock"
              class="q-pa-sm q-my-md"
              color="white"
              :rules="[(val) => !!val || 'Campo Obrigatório!']"
            >
              <template v-slot:before>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="text-right">
            <q-btn
              class="bg-secondary q-mt-sm text-white"
              type="submit"
              label="Login"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuario: {
        username: "",
        password: "",
      },

      isPwd: true,
    };
  },
  methods: {
    async login() {
      const token =
        "Bearer 40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8";
      if (token) {
        localStorage.setItem("token", token);
        this.$router.push("/house-rules-list");
      } else {
        console.error("Token não definido nas variáveis de ambiente");
      }
    },
  },
};
</script>
