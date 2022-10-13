<template>
  <v-card class="w-card mx-auto">
    <Title :title="title" />
    <v-card-text>
      <br />
      <v-otp-input
        dark
        length="4"
        type="number"
        name="otp_input"
        id="otp_input"
        v-model="form.otp"
        :error-messages="otpErrors"
        @input="$v.form.otp.$touch()"
        @blur="$v.form.otp.$touch()"
      ></v-otp-input>
      <br />
      <PrimaryButton
        :is_loading="otp_loading"
        :text="primary_button_text"
        :handler="handleVerif"
      />
      <br />
      <p v-if="otp_resend_loading">Resending OTP...</p>
      <p v-else class="w-text-button" @click="handleResendOTP">Resend OTP</p>
    </v-card-text>
  </v-card>
</template>

<script>
import Title from "@/components/outside/Title";
import PrimaryButton from "@/components/outside/PrimaryButton";
import {
  required,
  numeric,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "RegisterOTP",
  layout: "outside",
  components: { Title, PrimaryButton },
  data() {
    return {
      title: "OTP Confirmation",
      primary_button_text: "Verification",
      form: {
        otp: "",
      },
    };
  },
  validations: {
    form: {
      otp: {
        required,
        numeric,
        minLength: minLength(4),
        maxLength: maxLength(4),
      },
    },
  },
  computed: {
    user_data() {
      return JSON.parse(this.$cookiz.get("selfprofile_userdata"));
    },
    otp_loading() {
      return this.$store.get("otp/loading");
    },
    otp_show_alert() {
      return this.$store.get("otp/show_alert");
    },
    otp_status() {
      return this.$store.get("otp/status");
    },
    otp_message() {
      return this.$store.get("otp/message");
    },
    otp_resend_show_alert() {
      return this.$store.get("otp/resend_show_alert");
    },
    otp_resend_loading() {
      return this.$store.get("otp/resend_loading");
    },
    otp_resend_status() {
      return this.$store.get("otp/resend_status");
    },
    otp_resend_message() {
      return this.$store.get("otp/resend_message");
    },

    otpErrors() {
      const errors = [];
      if (!this.$v.form.otp.$dirty) {
        return errors;
      } else if (!this.$v.form.otp.required) {
        errors.push("OTP cannot be empty");
      } else if (!this.$v.form.otp.numeric) {
        errors.push("OTP is only numeric");
      } else if (!this.$v.form.otp.minLength || !this.$v.form.otp.maxLength) {
        errors.push("OTP must be 4 character");
      }
      return errors;
    },
  },
  watch: {
    otp_resend_show_alert(val) {
      if (val) {
        this.$notify({
          title: this.otp_resend_status === "success" ? "Success" : "Error",
          type: this.otp_resend_status,
          text: this.otp_resend_message,
        });

        this.$store.set("otp/resend_show_alert", false);
      }
    },
    otp_show_alert(val) {
      if (val) {
        this.$notify({
          title: this.otp_tatus === "success" ? "Success" : "Error",
          type: this.otp_status,
          text: this.otp_message,
        });

        this.$store.set("otp/show_alert", false);
      }
    },
  },
  methods: {
    async handleResendOTP() {
      let tempFormData = new FormData();
      tempFormData.append("phone", this.user_data?.phone);

      await this.$store.dispatch("otp/resendOTP", tempFormData);
    },
    async handleVerif() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let tempFormData = new FormData();
        tempFormData.append("user_id", this.user_data?.id);
        tempFormData.append("otp_code", this.form.otp);

        const statusAPI = await this.$store.dispatch(
          "otp/verificationOTP",
          tempFormData
        );
        if (statusAPI) {
          console.log("SUKSES");
          this.$router.push("/");
        }
      }
    },
  },
};
</script>
