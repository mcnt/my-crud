<template>
  <q-card style="width: 700px; max-width: 80vw">
    <q-card-section class="col-12 row items-between">
      <div class="text-h6">Create new</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup>
        <q-tooltip>Close</q-tooltip>
      </q-btn>
    </q-card-section>
    <q-form @submit="create">
      <q-card-section class="row col-12 q-col-gutter-md">
        <div class="col-12 row q-col-gutter-sm">
          <q-input
            clearable
            filled
            class="col-12 col-sm-6 col-md-8"
            v-model="house.name"
            label="Name"
            :rules="[(val) => !!val || 'Campo Obrigatório!']"
          />
          <q-input
            clearable
            class="col-12 col-sm-6 col-md-4"
            type="number"
            filled
            v-model="house.active"
            label="Active"
            :rules="[(val) => !!val || 'Campo Obrigatório!']"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right" class="row col-grow items-baseline q-pa-md">
        <q-separator />
        <div class="q-mt-sm self-baseline">
          <q-btn label="Cancel" color="red-5" v-close-popup>
            <q-tooltip>Cancel</q-tooltip>
          </q-btn>
          <q-btn label="Create" type="submit" class="q-ml-sm" color="secondary">
            <q-tooltip>Create</q-tooltip>
          </q-btn>
        </div>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import axios from "axios";
export default {
  name: "dialogCreateHouse",
  data() {
    return {
      house: {
        name: "",
        active: 1,
      },
    };
  },
  methods: {
    async create() {
      this.$q.loading.show();
      const token = localStorage.getItem("token");
      if (token) {
        const headers = {
          Authorization: token,
        };
        await axios
          .post(
            "https://sys-dev.searchandstay.com/api/admin/house_rules",
            { house_rules: this.house },
            { headers }
          )
          .then((response) => {
            this.$q.notify({
              message: `${response.data.message}`,
              color: "green",
            });
          })
          .catch((error) => {
            this.$q.notify({
              message: `${error.response.data.message}`,
              color: "negative",
            });
          })
          .finally(() => {
            this.$q.loading.hide();
            this.$emit("close");
          });
      } else {
        this.$q.notify({
          message: "Token não encontrado na seção do usuário",
          color: "negative",
        });
      }
    },
  },
};
</script>
