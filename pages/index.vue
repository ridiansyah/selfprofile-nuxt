<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      max-width="300"
      type="card"
    ></v-skeleton-loader>
    <div v-else>
      <HeaderCard
        :avatar="data?.user_picture?.picture?.url"
        :cover="data?.cover_picture?.url"
      />
      <v-row>
        <v-col lg="10" md="8" sm="12">
          <p class="w-name">{{ data?.name }}</p>
        </v-col>
        <v-col lg="2" md="4" sm="12" class="w-col-area-button"
          ><v-btn
            value="left"
            block
            color="red"
            @click="handleLogout"
            :disabled="logout_loading"
          >
            <v-icon left> mdi-logout </v-icon>
            <span v-if="logout_loading">Loading...</span>
            <span v-else>Log Out</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="4" md="12" sm="12">
          <AboutBase :data="data" />
          <br />
          <CareerAndEducationBase :data="data" />
        </v-col>
        <v-col lg="8" md="12" sm="12">
          <GalleryBase />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import HeaderCard from "@/components/home/header/Base";
import AboutBase from "@/components/home/about/Base";
import CareerAndEducationBase from "@/components/home/careerAndEducation/Base";
import GalleryBase from "@/components/home/gallery/Base";

export default {
  name: "IndexPage",
  layout: "inside",
  components: {
    HeaderCard,
    AboutBase,
    CareerAndEducationBase,
    GalleryBase,
  },
  computed: {
    loading() {
      return this.$store.get("profile/loading");
    },
    show_alert() {
      return this.$store.get("profile/show_alert");
    },
    status() {
      return this.$store.get("profile/status");
    },
    message() {
      return this.$store.get("profile/message");
    },
    data() {
      return this.$store.get("profile/data");
    },
    logout_loading() {
      return this.$store.get("auth/logout_loading");
    },
    logout_show_alert() {
      return this.$store.get("auth/logout_show_alert");
    },
    auth_status() {
      return this.$store.get("auth/status");
    },
    auth_message() {
      return this.$store.get("auth/message");
    },
  },
  watch: {
    show_alert(val) {
      if (val) {
        this.$notify({
          title: this.status === "success" ? "Success" : "Error",
          type: this.status,
          text: this.message,
        });

        this.$store.set("profile/show_alert", false);
      }
    },
    logout_show_alert(val) {
      if (val) {
        this.$notify({
          title: this.logout_status === "success" ? "Success" : "Error",
          type: this.logout_status,
          text: this.logout_message,
        });

        this.$store.set("auth/logout_show_alert", false);
      }
    },
  },
  mounted() {
    this.getCredentials();
  },
  methods: {
    getCredentials() {
      this.$store.dispatch("profile/getProfile");
    },
    async handleLogout() {
      let tempFormData = new FormData();
      tempFormData.append(
        "access_token",
        this.$cookiz.get("selfprofile_token")
      );
      tempFormData.append("confirm", 1);

      const statusAPI = await this.$store.dispatch(
        "auth/handleLogout",
        tempFormData
      );
      if (statusAPI) {
        this.$router.push("/login");
      }
    },
  },
};
</script>
