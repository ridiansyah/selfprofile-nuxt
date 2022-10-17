<template>
  <div>
    <Uploader :dialog="dialog" title="Cover" from="cover" />
    <v-card class="w-cover-card">
      <v-img class="w-cover-img" :src="cover"></v-img>
      <v-btn
        class="w-button-cover mx-2"
        fab
        dark
        color="blue-grey"
        @click="handleDialog(true)"
      >
        <v-icon dark> mdi-camera </v-icon>
      </v-btn>
      <v-avatar class="w-profile-card" width="240px" height="240px">
        <img class="w-profile-img" :src="avatar" alt="avatar" />
      </v-avatar>
    </v-card>
  </div>
</template>

<script>
import Uploader from "@/components/home/reusable/Uploader";

export default {
  name: "HomeHeaderCard",
  components: { Uploader },
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    avatar: { type: String, default: "" },
    cover: { type: String, default: "" },
  },
  methods: {
    handleDialog(value) {
      this.dialog = value;
    },
  },
};
</script>
