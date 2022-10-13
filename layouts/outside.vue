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
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex>
                <nuxt />
              </v-flex>
            </v-layout>
          </v-container>
        </v-main>
      </v-app>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "OutsideLayout",
  //   data() {
  //     return {
  //       logoutButton: 'top',
  //     }
  //   },
};
</script>
