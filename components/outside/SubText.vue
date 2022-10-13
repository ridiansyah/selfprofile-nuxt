<template>
  <p>
    {{ text }}
    <span class="w-text-button" @click="$router.push(destination)">
      {{ text_click }}
    </span>
  </p>
</template>

<script>
export default {
  name: "OutsideSubText",
  props: {
    text: { type: String, default: "" },
    text_click: { type: String, default: "" },
    destination: { type: String, default: "/" },
  },
};
</script>
