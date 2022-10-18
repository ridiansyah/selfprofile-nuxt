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
      <v-select
        v-model="form.country"
        :items="countries_data"
        :loading="countries_loading"
        :disabled="countries_loading"
        item-text="name"
        item-value="iso2"
        name="country"
        id="country"
        label="Country"
        return-object
        :error-messages="countryErrors"
      ></v-select>
      <br />
      <PrimaryButton
        :is_loading="register_loading"
        :text="primary_button_text"
        :handler="handleRegister"
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
  name: "RegisterIndex",
  layout: "outside",
  components: { Title, PrimaryButton, SubText },
  data() {
    return {
      title: "Registration",
      show_password: false,
      primary_button_text: "Register",
      subtext_text: "Already Register? ",
      subtext_click: "Login Here",
      subtext_destination: "/login",
      form: {
        phone: "",
        password: "",
        country: {
          name: "",
          latlong: "",
        },
        device_token: null,
        device_type: 2,
      },
    };
  },
  validations: {
    form: {
      phone: { required, numeric },
      password: { required },
      country: {
        name: required,
        latlong: required,
      },
    },
  },
  computed: {
    countries_data() {
      return this.$store.get("countries/selector_data");
    },
    countries_loading() {
      return this.$store.get("countries/loading");
    },
    countries_show_alert() {
      return this.$store.get("countries/show_alert");
    },
    countries_status() {
      return this.$store.get("countries/status");
    },
    countries_message() {
      return this.$store.get("countries/message");
    },

    register_loading() {
      return this.$store.get("auth/register_loading");
    },
    register_show_alert() {
      return this.$store.get("auth/register_show_alert");
    },
    register_status() {
      return this.$store.get("auth/status");
    },
    register_message() {
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
    countryErrors() {
      const errors = [];
      if (
        !this.$v.form.country.name.$dirty &&
        !this.$v.form.country.latlong.$dirty
      ) {
        return errors;
      } else if (
        !this.$v.form.country.name.required ||
        !this.$v.form.country.latlong.required
      ) {
        errors.push("Country cannot be empty");
      }
      return errors;
    },
  },
  watch: {
    countries_show_alert(val) {
      if (val) {
        this.$notify({
          title: this.countries_status === "success" ? "Success" : "Error",
          type: this.countries_status,
          text: this.countries_message,
        });

        this.$store.set("countries/show_alert", false);
      }
    },
    register_show_alert(val) {
      if (val) {
        this.$notify({
          title: this.register_status === "success" ? "Success" : "Error",
          type: this.register_status,
          text: this.register_message,
        });

        this.$store.set("auth/register_show_alert", false);
      }
    },
  },
  mounted() {
    this.getCountry();
  },
  methods: {
    getCountry() {
      this.$store.dispatch("countries/getCountry");
    },
    async handleRegister() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // this.$store.set("auth/register_loading", true);
        let tempFormData = new FormData();
        tempFormData.append("phone", "62" + this.form?.phone);
        tempFormData.append("password", this.form?.password);
        tempFormData.append("country", this.form?.country?.name);
        tempFormData.append("latlong", this.form?.country?.latlong);
        tempFormData.append("device_token", this.form?.device_token);
        tempFormData.append("device_type", this.form?.device_type);

        const createSuccess = await this.$store.dispatch(
          "auth/createRegister",
          tempFormData
        );
        if (createSuccess) {
          console.log("SUKSES");
          this.$router.push("/register/otp");
        }
      }
    },
  },
};
</script>
