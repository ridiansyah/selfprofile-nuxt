<template>
  <v-card class="w-card mx-auto">
    <Title :title="title" />
    <v-card-text>
      <v-text-field
        v-model="form.phone"
        label="Phone Number"
        prefix="+62"
        type="tel"
        name="phone_number"
        id="phone_number"
        required
        :error-messages="phoneErrors"
        @input="$v.form.phone.$touch()"
        @blur="$v.form.phone.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        label="Password"
        required
        name="password"
        id="password"
        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_password ? 'text' : 'password'"
        @click:append="show_password = !show_password"
        :error-messages="passwordErrors"
        @input="$v.form.password.$touch()"
        @blur="$v.form.password.$touch()"
      ></v-text-field>
      <br />
      <PrimaryButton
        :is_loading="login_loading"
        :text="primary_button_text"
        :handler="handleLogin"
      />
      <br />
      <SubText
        :text="subtext_text"
        :text_click="subtext_click"
        :destination="subtext_destination"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import Title from "@/components/outside/Title";
import PrimaryButton from "@/components/outside/PrimaryButton";
import SubText from "@/components/outside/SubText";
import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "LoginIndex",
  layout: "outside",
  components: { Title, PrimaryButton, SubText },
  data() {
    return {
      title: "Login",
      show_password: false,
      primary_button_text: "Login",
      subtext_text: "Not Registered? ",
      subtext_click: "Register Here",
      subtext_destination: "/register",
      form: {
        phone: "",
        password: "",
        latlong: "",
        device_token: null,
        device_type: 2,
      },
    };
  },
  validations: {
    form: {
      phone: { required, numeric },
      password: { required },
    },
  },
  computed: {
    login_loading() {
      return this.$store.get("auth/login_loading");
    },
    login_show_alert() {
      return this.$store.get("auth/login_show_alert");
    },
    login_status() {
      return this.$store.get("auth/status");
    },
    login_message() {
      return this.$store.get("auth/message");
    },

    phoneErrors() {
      const errors = [];
      if (!this.$v.form.phone.$dirty) {
        return errors;
      } else if (!this.$v.form.phone.required) {
        errors.push("Phone number cannot be empty");
      } else if (!this.$v.form.phone.numeric) {
        errors.push("Phone number is not valid");
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) {
        return errors;
      } else if (!this.$v.form.password.required) {
        errors.push("Password cannot be empty");
      }
      return errors;
    },
  },
  watch: {
    login_show_alert(val) {
      if (val) {
        this.$notify({
          title: this.login_status === "success" ? "Success" : "Error",
          type: this.login_status,
          text: this.login_message,
        });

        this.$store.set("auth/login_show_alert", false);
      }
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.form.device_token = navigator.userAgent;
        this.form.latlong =
          position.coords.latitude + "," + position.coords.longitude;
      },
      (error) => {
        this.form.device_token = null;
        this.form.latlong = "";
      }
    );
  },
  methods: {
    getCredentials(token) {
      const statusAPI = this.$store.dispatch("auth/getCredentials", token);
      console.log("statusAPI: ", statusAPI);
      if (statusAPI) {
        // console.log("SUKSES");
        this.$router.push("/");
      }
    },
    async handleLogin() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // this.$store.set("register/loading", true);
        let tempFormData = new FormData();
        tempFormData.append("phone", "62" + this.form?.phone);
        tempFormData.append("password", this.form?.password);
        tempFormData.append("latlong", this.form?.latlong);
        tempFormData.append("device_token", this.form?.device_token);
        tempFormData.append("device_type", this.form?.device_type);

        const statusAPI = await this.$store.dispatch(
          "auth/handleLogin",
          tempFormData
        );
        if (statusAPI?.status) {
          // console.log("SUKSES");
          // this.$router.push("/");
          this.getCredentials(statusAPI?.token);
        }
      }
    },
  },
};
</script>
