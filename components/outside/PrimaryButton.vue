<template>
  <v-btn
    :loading="is_loading"
    :disabled="is_loading"
    block
    color="#ffa000"
    @click="handler"
  >
    {{ text }}
    <template v-slot:loader>
      <span>Loading...</span>
    </template>
  </v-btn>
</template>

<script>
export default {
  name: "OutsidePrimaryButton",
  props: {
    is_loading: { type: Boolean, default: false },
    text: { type: String, default: "" },
    handler: { type: Function, default: () => {} },
  },
};
</script>
