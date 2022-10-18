<template>
  <div>
    <client-only>
      <v-overlay slot="placeholder" :value="true" opacity="1" color="#121212">
        <v-progress-circular
          indeterminate
          size="35"
          color="#FFA000"
        ></v-progress-circular>
      </v-overlay>

      <v-app>
        <v-main>
          <div class="w-container">
            <nuxt />
          </div>
        </v-main>
      </v-app>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "InsideLayout",
};
</script>
