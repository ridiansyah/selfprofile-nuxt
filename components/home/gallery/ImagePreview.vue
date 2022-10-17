<template>
  <v-dialog v-model="is_open" isDark="" max-width="50%">
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="is_open = false" color="red darken-1" text>
          Close
        </v-btn>
      </v-card-actions>
      <v-img :src="selected_img.img_src"></v-img>
      <br />
      <div style="max-width: 90%">
        <v-row>
          <v-col lg="10" md="8" sm="6"
            ><v-btn
              @click="handleSave"
              :loading="save_loading"
              :disabled="save_loading"
              block
              color="green"
            >
              Make Avatar
              <template v-slot:loader>
                <span>Loading...</span>
              </template>
            </v-btn></v-col
          >
          <v-col lg="2" md="4" sm="6"
            ><v-btn
              @click="handleDelete"
              :loading="delete_loading"
              :disabled="delete_loading"
              block
              color="red"
            >
              Delete Photo
              <template v-slot:loader>
                <span>Loading...</span>
              </template>
            </v-btn></v-col
          >
        </v-row>
      </div>

      <br />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ImagePreview",
  props: {
    dialog: { type: Boolean, default: false },
    selected_img: { type: Object, default: {} },
  },
  computed: {
    data() {
      return this.$store.get("profile/data");
    },
    is_open: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$parent.handlePreviewDialog(value);
      },
    },
    save_loading() {
      return this.$store.get("profile/avatar_loading");
    },
    delete_loading() {
      return this.$store.get("profile/deletephoto_loading");
    },
  },
  methods: {
    handleDialog(value) {
      this.dialog = value;
    },
    handleSave() {
      let tempFormData = new FormData();
      tempFormData.append("id", this.selected_img?.id);

      const statusAPI = this.$store.dispatch(
        "profile/chooseAvatar",
        tempFormData
      );
      if (statusAPI) {
        this.is_open = false;
      }
    },
    handleDelete() {
      const statusAPI = this.$store.dispatch(
        "profile/deletePhoto",
        this.selected_img?.id
      );
      if (statusAPI) {
        this.is_open = false;
      }
    },
  },
};
</script>
