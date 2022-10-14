<template>
  <v-card class="w-cover-card">
    <v-img class="w-cover-img" :src="cover"></v-img>
    <v-btn class="w-button-cover mx-2" fab dark color="blue-grey">
      <v-icon dark> mdi-camera </v-icon>
    </v-btn>
    <v-avatar class="w-profile-card" width="240px" height="240px">
      <img class="w-profile-img" :src="avatar" alt="avatar" />
    </v-avatar>
  </v-card>
</template>

<script>
export default {
  name: "HomeHeaderCard",
  props: {
    avatar: { type: String, default: "" },
    cover: { type: String, default: "" },
  },
};
</script>
