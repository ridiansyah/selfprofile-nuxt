<template>
  <v-card class="w-card mx-auto">
    <Title :title="title" />
    <v-card-text>
      <v-text-field
        label="Phone Number"
        prefix="+62"
        type="tel"
        required
      ></v-text-field>
      <v-text-field
        label="Password"
        required
        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_password ? 'text' : 'password'"
        @click:append="show_password = !show_password"
      ></v-text-field>
      <br />
      <PrimaryButton :is_loading="is_loading" :text="primary_button_text" />
      <br />
      <SubText :text="subtext_text" :text_click="subtext_click" />
    </v-card-text>
  </v-card>
</template>

<script>
import Title from "@/components/outside/Title";
import PrimaryButton from "@/components/outside/PrimaryButton";
import SubText from "@/components/outside/SubText";
export default {
  name: "LoginIndex",
  layout: "outside",
  components: { Title, PrimaryButton, SubText },
  data() {
    return {
      title: "Login",
      show_password: false,
      is_loading: false,
      primary_button_text: "Login",
      subtext_text: "Belum terdaftar? ",
      subtext_click: "Daftar disini",
    };
  },
};
</script>
