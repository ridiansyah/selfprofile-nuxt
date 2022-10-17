<template>
  <div>
    <Uploader :dialog="dialog" title="Gallery" from="gallery" />
    <ImagePreview :dialog="preview_dialog" :selected_img="selected_img" />
    <v-card elevation="2">
      <div class="d-flex justify-space-between align-center">
        <v-card-title> Gallery </v-card-title>
        <v-btn depressed rounded small @click="dialog = true"
          >Upload Photo</v-btn
        >
      </div>
      <v-card-text>
        <v-row cols="12" sm="9" offset-sm="1">
          <v-col
            v-for="(obj, index) in data?.user_pictures ?? []"
            :key="index"
            class="d-flex child-flex"
            cols="4"
          >
            <v-card flat tile class="d-flex w-gallery-img">
              <v-img
                :src="obj.picture?.url"
                @click.stop="
                  (preview_dialog = true),
                    (id = index),
                    (selected_img = {
                      id: obj?.id,
                      img_src: obj.picture?.url,
                    })
                "
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Uploader from "@/components/home/reusable/Uploader";
import ImagePreview from "@/components/home/gallery/ImagePreview";

export default {
  name: "HomeGallery",
  components: { Uploader, ImagePreview },
  data() {
    return {
      dialog: false,
      preview_dialog: false,
      selected_img: {
        id: "",
        img_src: "",
      },
    };
  },
  computed: {
    data() {
      return this.$store.get("profile/data");
    },
  },
  methods: {
    handleDialog(value) {
      this.dialog = value;
    },
    handlePreviewDialog(value) {
      this.preview_dialog = value;
    },
  },
};
</script>
