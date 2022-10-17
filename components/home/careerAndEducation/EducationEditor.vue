<template>
  <v-dialog v-model="is_open" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Education</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-text-field
            v-model="form.school_name"
            label="School Name"
            required
            :error-messages="schoolNameErrors"
            @input="$v.form.school_name.$touch()"
            @blur="$v.form.school_name.$touch()"
          ></v-text-field>
          <v-text-field
            type="date"
            v-model="form.graduation_time"
            label="Graduation Time"
            required
            :error-messages="graduationTimeErrors"
            @input="$v.form.graduation_time.$touch()"
            @blur="$v.form.graduation_time.$touch()"
          ></v-text-field>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="is_open = false">
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="handleSave"
          :loading="save_loading"
          :disabled="save_loading"
        >
          Save
          <template v-slot:loader>
            <span>Loading...</span>
          </template></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "EducationEditor",
  data: () => ({
    loading: false,
    form: {
      school_name: "",
      graduation_time: null,
    },
  }),
  props: {
    dialog: { type: Boolean, default: false },
    props_data: { type: Object, default: {} },
  },
  validations: {
    form: {
      school_name: { required },
      graduation_time: { required },
    },
  },
  computed: {
    save_loading() {
      return this.$store.get("profile/career_loading");
    },
    is_open: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$parent.handleDialogEducation(value);
      },
    },
    schoolNameErrors() {
      const errors = [];
      if (!this.$v.form.school_name.$dirty) {
        return errors;
      } else if (!this.$v.form.school_name.required) {
        errors.push("School Name cannot be empty");
      }
      return errors;
    },
    graduationTimeErrors() {
      const errors = [];
      if (!this.$v.form.graduation_time.$dirty) {
        return errors;
      } else if (!this.$v.form.graduation_time.required) {
        errors.push("Graduation Time cannot be empty");
      }
      return errors;
    },
  },
  watch: {
    is_open(val) {
      if (val) {
        this.form = {
          school_name: this.props_data?.education?.school_name,
          graduation_time: this.props_data?.education?.graduation_time,
        };
      }
    },
  },
  methods: {
    handleSave() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let tempFormData = new FormData();
        tempFormData.append("school_name", this.form?.school_name);
        tempFormData.append("graduation_time", this.form?.graduation_time);

        const statusAPI = this.$store.dispatch(
          "profile/postEducation",
          tempFormData
        );
        if (statusAPI) {
          this.is_open = false;
        }
      }
    },
  },
};
</script>
