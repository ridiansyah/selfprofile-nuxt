<template>
  <v-dialog v-model="is_open" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Career</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-text-field
            v-model="form.company_name"
            label="Company Name"
            required
            :error-messages="companyNameErrors"
            @input="$v.form.company_name.$touch()"
            @blur="$v.form.company_name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="form.position"
            label="Position"
            required
            :error-messages="positionErrors"
            @input="$v.form.position.$touch()"
            @blur="$v.form.position.$touch()"
          ></v-text-field>
          <v-text-field
            type="date"
            v-model="form.starting_from"
            label="Starting from"
            required
            :error-messages="startingFromErrors"
            @input="$v.form.starting_from.$touch()"
            @blur="$v.form.starting_from.$touch()"
          ></v-text-field>
          <v-text-field
            type="date"
            v-model="form.ending_in"
            label="Ending in"
            required
            :error-messages="endingInErrors"
            @input="$v.form.ending_in.$touch()"
            @blur="$v.form.ending_in.$touch()"
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
  name: "CareerEditor",
  data: () => ({
    loading: false,
    form: {
      company_name: "",
      position: "",
      starting_from: null,
      ending_in: null,
    },
  }),
  props: {
    dialog: { type: Boolean, default: false },
    props_data: { type: Object, default: {} },
  },
  validations: {
    form: {
      company_name: { required },
      position: { required },
      starting_from: { required },
      ending_in: { required },
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
        this.$parent.handleDialogCareer(value);
      },
    },
    companyNameErrors() {
      const errors = [];
      if (!this.$v.form.company_name.$dirty) {
        return errors;
      } else if (!this.$v.form.company_name.required) {
        errors.push("Company Name cannot be empty");
      }
      return errors;
    },
    positionErrors() {
      const errors = [];
      if (!this.$v.form.position.$dirty) {
        return errors;
      } else if (!this.$v.form.position.required) {
        errors.push("Position cannot be empty");
      }
      return errors;
    },
    startingFromErrors() {
      const errors = [];
      if (!this.$v.form.starting_from.$dirty) {
        return errors;
      } else if (!this.$v.form.starting_from.required) {
        errors.push("Starting from cannot be empty");
      }
      return errors;
    },
    endingInErrors() {
      const errors = [];
      if (!this.$v.form.ending_in.$dirty) {
        return errors;
      } else if (!this.$v.form.ending_in.required) {
        errors.push("Ending in cannot be empty");
      }
      return errors;
    },
  },
  watch: {
    is_open(val) {
      if (val) {
        this.form = {
          company_name: this.props_data?.career?.company_name,
          position: "",
          starting_from: this.props_data?.career?.starting_from,
          ending_in: this.props_data?.career?.ending_in,
        };
      }
    },
  },
  methods: {
    handleSave() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let tempFormData = new FormData();
        tempFormData.append("company_name", this.form?.company_name);
        tempFormData.append("position", this.form?.position);
        tempFormData.append("starting_from", this.form?.starting_from);
        tempFormData.append("ending_in", this.form?.ending_in);

        const statusAPI = this.$store.dispatch(
          "profile/postCareer",
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
