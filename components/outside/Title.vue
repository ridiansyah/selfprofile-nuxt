<template>
  <div class="white--text align-end w-card__div">
    <v-card-title class="w-card__div__card-title">{{ title }}</v-card-title>
  </div>
</template>

<script>
export default {
  name: "OutsideTitle",
  props: {
    title: { type: String, default: "" },
  },
};
</script>
