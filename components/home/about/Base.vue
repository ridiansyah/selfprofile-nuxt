<template>
  <!-- Unreusable Component -->
  <v-card elevation="2">
    <div class="d-flex justify-space-between align-center">
      <v-card-title> About </v-card-title>
      <v-btn depressed rounded small @click="$parent.handleOpenAbout(true)"
        >Edit</v-btn
      >
    </div>

    <v-card-text>
      <v-textarea
        outlined
        name="bio-textarea"
        label="Bio"
        disabled
        :value="data.bio"
      ></v-textarea>
      <v-text-field
        outlined
        label="Birthday"
        prepend-inner-icon="mdi-cake"
        disabled
        :value="data?.birthday + ' (' + data?.age + ' y.o)'"
      ></v-text-field>
      <v-text-field
        outlined
        label="Gender"
        prepend-inner-icon="mdi-gender-male-female"
        disabled
        :value="data?.gender"
      ></v-text-field>
      <v-text-field
        outlined
        label="Zodiac"
        prepend-inner-icon="mdi-zodiac-capricorn"
        disabled
        :value="data?.zodiac"
      ></v-text-field>
      <v-text-field
        outlined
        label="Hometown"
        prepend-inner-icon="mdi-home-map-marker"
        disabled
        :value="data?.hometown"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AboutBase",
  props: {
    data: { type: Object, default: {} },
  },
};
</script>
