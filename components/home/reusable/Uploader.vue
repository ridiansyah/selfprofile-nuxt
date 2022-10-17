<template>
  <v-dialog v-model="is_open" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Upload {{ title }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg"
            :placeholder="'Pick an ' + from"
            prepend-icon="mdi-camera"
            label="title"
            required
            v-model="files"
          ></v-file-input>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="is_open = false">
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="handleSave"
          :loading="save_loading"
          :disabled="save_loading || form.img === ''"
        >
          Upload
          <template v-slot:loader>
            <span>Loading...</span>
          </template></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Uploader",
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Cover size should be less than 2 MB!",
    ],
    loading: false,
    form: {
      img: "",
    },
  }),
  props: {
    dialog: { type: Boolean, default: false },
    title: { type: String, default: "" },
    from: { type: String, default: "" },
  },
  computed: {
    files: {
      get() {
        return this.form.img;
      },
      set(value) {
        this.form.img = value;
      },
    },
    save_loading() {
      return this.$store.get("profile/upload_loading");
    },
    is_open: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$parent.handleDialog(value);
      },
    },
  },
  watch: {
    is_open(val) {
      if (val) {
        this.form = {
          img: "",
        };
      }
    },
  },
  methods: {
    handleSave() {
      let tempFormData = new FormData();
      if (this.from === "cover") {
        tempFormData.append("image", this.form?.img);

        const statusAPI = this.$store.dispatch(
          "profile/uploadCover",
          tempFormData
        );
        if (statusAPI) {
          this.is_open = false;
        }
      } else if (this.from === "gallery") {
        tempFormData.append("image", this.form?.img);

        const statusAPI = this.$store.dispatch(
          "profile/uploadGallery",
          tempFormData
        );
        if (statusAPI) {
          this.is_open = false;
        }
      }
    },
  },
};
</script>
