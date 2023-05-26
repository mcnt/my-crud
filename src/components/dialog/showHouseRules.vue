<template>
  <q-card style="width: 400px; max-width: 80vw">
    <q-card-section class="col-12 row items-between">
      <div class="text-h6">Show House Rules</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup>
        <q-tooltip>Close</q-tooltip>
      </q-btn>
    </q-card-section>
    <q-card-section class="col-gutter-sm">
      <div class="row col-12 q-col-gutter-md">
        <div class="col-12 q-mb-md">
          <div class="custom-border">
            <div
              class="col-12 q-mt-md text-subtitle2 text-weight-regular q-pr-xs q-pl-xs"
            >
              <span class="text-bold">Id:</span>
              {{ house.id }}<br />
              <span class="text-bold">Name:</span>
              {{ house.name }} <br />
              <span class="text-bold">Active:</span>
              {{ house.active }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import axios from "axios";
export default {
  name: "dialogShowHouse",
  props: {
    id: {
      type: [String, Number],
    },
  },
  data() {
    return {
      house: [],
    };
  },
  methods: {
    async loadShow() {
      const token = localStorage.getItem("token");
      const id = this.id;
      console.log(id);
      if (token) {
        const headers = {
          Authorization: token,
        };
        await axios
          .get(
            `https://sys-dev.searchandstay.com/api/admin/house_rules/${id}`,
            {
              headers,
            }
          )
          .then((response) => {
            this.house = response.data.data;
            console.log(house);
          })
          .catch((error) => {
            this.$q.notify({
              message: `${error.response.data.message}`,
              color: "negative",
            });
          });
      } else {
        this.$q.notify({
          message: "Token não encontrado na seção do usuário",
          color: "negative",
        });
      }
    },
  },
  mounted() {
    this.loadShow();
  },
};
</script>
