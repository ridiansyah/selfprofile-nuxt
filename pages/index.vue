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
        <v-col lg="8" md="12" sm="12">
          <p class="w-name">{{ data?.name }}</p>
        </v-col>
        <v-col lg="4" md="12" sm="12">
          <v-row>
            <v-col lg="6" md="6" sm="12" class="w-col-area-button"
              ><v-btn value="left" block>
                <v-icon left> mdi-camera-account </v-icon>
                <span>Change Avatar</span>
              </v-btn></v-col
            >
            <v-col lg="6" md="6" sm="12" class="w-col-area-button"
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
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="4" md="12" sm="12">
          <v-card elevation="2">
            <div class="d-flex justify-space-between align-center">
              <v-card-title> About </v-card-title>
              <v-btn depressed rounded small>Edit</v-btn>
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
          <br />
          <v-card elevation="2">
            <v-card-title> Career & Education </v-card-title>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon dark>mdi-briefcase-variant</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{
                  data?.career?.company_name
                }}</v-list-item-title>

                <v-list-item-subtitle
                  >{{ data?.career?.starting_from }} until
                  {{ data?.career?.ending_in }}</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon dark>mdi-book-open-variant</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{
                  data?.education?.school_name
                }}</v-list-item-title>

                <v-list-item-subtitle>{{
                  data?.education?.graduation_time
                }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-card-text> </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="8" md="12" sm="12">
          <v-card elevation="2">
            <div class="d-flex justify-space-between align-center">
              <v-card-title> Gallery </v-card-title>
              <v-btn depressed rounded small>Upload Photo</v-btn>
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
                        (dialog = true),
                          (id = index),
                          (imgSrc = obj.picture?.url)
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
                <v-dialog v-model="dialog" isDark="">
                  <v-card>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn @click="dialog = false" color="red darken-1" text>
                        Close
                      </v-btn>
                    </v-card-actions>
                    <v-img :src="imgSrc"></v-img>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import HeaderCard from "@/components/home/HeaderCard";

export default {
  name: "IndexPage",
  layout: "inside",
  components: { HeaderCard },
  data() {
    return {
      dialog: false,
      imgSrc: "",
      images: [
        {
          id: 1,
          imgSrc: "https://dummyimage.com/400x400/591559/fff",
        },
        {
          id: 2,
          imgSrc: "https://dummyimage.com/400x400/591559/fff",
        },
        {
          id: 3,
          imgSrc: "https://dummyimage.com/400x400/591559/fff",
        },
        {
          id: 4,
          imgSrc: "https://dummyimage.com/400x400/591559/fff",
        },
        {
          id: 5,
          imgSrc: "https://dummyimage.com/400x400/591559/fff",
        },
        {
          id: 6,
          imgSrc: "https://dummyimage.com/400x400/591559/fff",
        },
        {
          id: 7,
          imgSrc: "https://dummyimage.com/400x400/591559/fff",
        },
        {
          id: 8,
          imgSrc: "https://dummyimage.com/400x400/591559/fff",
        },
      ],
    };
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
