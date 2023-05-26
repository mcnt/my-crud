<template>
  <q-page padding>
    <q-toolbar class="text-black row q-pr-none">
      <q-toolbar-title class="col-9 text-h5">House Rules List</q-toolbar-title>
      <q-space />
      <div class="q-gutter-md">
        <q-btn
          color="secondary"
          size="md"
          @click="createHouse = true"
          icon="add"
        >
          <q-tooltip>New add</q-tooltip>
        </q-btn>
      </div>
    </q-toolbar>
    <q-card class="col-12 q-mt-lg">
      <div class="q-pa-md">
        <q-table
          flat
          dense
          :columns="columns"
          :rows="houseRules"
          table-style=""
          row-key="id"
          :filter="filterHouse"
          v-model:pagination="pagination"
          hide-bottom
        >
          <template v-slot:top>
            <q-input
              dense
              debounce="300"
              class="col-12 q-mb-md"
              v-model="filterHouse"
              label="Pesquisar"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id">{{ props.row.id }}</q-td>
              <q-td key="name">{{ props.row.name }}</q-td>
              <q-td key="action" auto-width>
                <div class="q-gutter-sm">
                  <q-btn
                    flat
                    dense
                    size="sm"
                    icon="visibility"
                    @click="onclickShow(props.row.id)"
                  >
                    <q-tooltip>View</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    dense
                    size="sm"
                    icon="edit_note"
                    @click="onclickEdit(props.row)"
                  >
                    <q-tooltip>edit</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    dense
                    size="sm"
                    icon="delete"
                    color="red"
                    @click="onselectDelete(props.row.id)"
                  >
                    <q-tooltip>Delete</q-tooltip>
                  </q-btn>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="pagination.current_page"
            color="grey-8"
            :max="pagination.total_pages"
            @update="pagination.current_page"
            @click="loadList()"
            direction-links
            flat
            active-color="secondary"
          />
        </div>
      </div>
    </q-card>
    <div>
      <q-dialog v-model="createHouse">
        <create-house-rules
          @close="
            loadList();
            createHouse = false;
          "
        />
      </q-dialog>
      <q-dialog v-model="editHouse">
        <edit-house-rules
          :item="itemSelected"
          @close="
            loadList();
            editHouse = false;
          "
        />
      </q-dialog>
      <q-dialog v-model="showHouse">
        <show-house-rules :id="idSelected" />
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import CreateHouseRules from "src/components/dialog/createHouseRules.vue";
import EditHouseRules from "src/components/dialog/editHouseRules.vue";
import ShowHouseRules from "src/components/dialog/showHouseRules.vue";
import exportFromJSON from "export-from-json";
import axios from "axios";
export default {
  name: "PageName",
  components: {
    CreateHouseRules,
    EditHouseRules,
    ShowHouseRules,
  },
  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        current_page: 1,
        total_pages: 4,
      },

      createHouse: false,
      editHouse: false,
      showHouse: false,
      idSelected: "",
      itemSelected: {},
      filterHouse: "",
      houseRules: [],
      columns: [
        {
          name: "id",
          label: "Id",
          field: "id",
          align: "left",
          sortable: false,
        },
        {
          name: "name",
          label: "Name",
          field: "name",
          align: "left",
          sortable: true,
        },

        {
          name: "action",
          label: "Action",
          field: "action",
          align: "left",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    onclickEdit(item) {
      this.itemSelected = item;
      this.editHouse = true;
    },
    onselectDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Do you really want to delete the record?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          const token = localStorage.getItem("token");
          if (token) {
            const headers = {
              Authorization: token,
            };
            await axios
              .delete(
                `https://sys-dev.searchandstay.com/api/admin/house_rules/${id}`,
                {
                  headers,
                }
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
                this.loadList();
              });
          } else {
            this.$q.notify({
              message: "Token não encontrado na seção do usuário",
              color: "negative",
            });
          }
        });
    },
    onclickShow(id) {
      this.idSelected = id;
      this.showHouse = true;
    },
    async loadList() {
      const token = localStorage.getItem("token");
      if (token) {
        const headers = {
          Authorization: token,
        };
        await axios
          .get(
            `https://sys-dev.searchandstay.com/api/admin/house_rules?page=${this.pagination.current_page}`,
            {
              headers,
            }
          )
          .then((response) => {
            this.houseRules = response.data.data.entities;
            this.pagination = response.data.data.pagination;
            //
          })
          .catch((error) => {
            this.$q.notify({
              message: `${error.response.data.message}`,
              color: "negative",
            });
          });
      } else {
        this.$q.notify({
          message: "Token not found in user section",
          color: "negative",
        });
      }
    },
  },
  mounted() {
    this.loadList();
  },
};
</script>
