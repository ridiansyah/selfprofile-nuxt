<template>
  <v-dialog v-model="is_open" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit About</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-text-field
            v-model="form.name"
            label="Name"
            required
            :error-messages="nameErrors"
            @input="$v.form.name.$touch()"
            @blur="$v.form.name.$touch()"
          ></v-text-field>
          <v-select
            v-model="form.gender"
            :items="gender"
            item-text="label"
            item-value="value"
            label="Gender"
            :error-messages="genderErrors"
          ></v-select>
          <v-text-field
            type="date"
            v-model="form.birthday"
            label="Birthday"
            required
            :error-messages="birthdayErrors"
            @input="$v.form.birthday.$touch()"
            @blur="$v.form.birthday.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="form.hometown"
            label="Hometown"
            required
            :error-messages="hometownErrors"
            @input="$v.form.hometown.$touch()"
            @blur="$v.form.hometown.$touch()"
          ></v-text-field>
          <v-textarea
            type="textarea"
            v-model="form.bio"
            label="Bio"
            required
            rows="4"
            :error-messages="bioErrors"
            @input="$v.form.bio.$touch()"
            @blur="$v.form.bio.$touch()"
          ></v-textarea>
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
import { required, integer } from "vuelidate/lib/validators";
export default {
  name: "AboutEditor",
  data: () => ({
    loading: false,
    form: {
      name: "",
      gender: 0,
      birthday: null,
      hometown: "",
      bio: "",
    },
    gender: [
      {
        value: 0,
        label: "Male",
      },
      {
        value: 1,
        label: "Female",
      },
    ],
  }),
  props: {
    about_editor_open: { type: Boolean, default: false },
    props_data: { type: Object, default: {} },
  },
  validations: {
    form: {
      name: { required },
      gender: { required, integer },
      birthday: { required },
      hometown: { required },
      bio: { required },
    },
  },
  computed: {
    save_loading() {
      return this.$store.get("profile/about_loading");
    },
    is_open: {
      get() {
        return this.about_editor_open;
      },
      set(value) {
        this.$parent.handleOpenAbout(value);
      },
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) {
        return errors;
      } else if (!this.$v.form.name.required) {
        errors.push("Name cannot be empty");
      }
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.$v.form.gender.$dirty) {
        return errors;
      } else if (!this.$v.form.gender.required) {
        errors.push("Gander cannot be empty");
      } else if (!this.$v.form.gender.integer) {
        errors.push("Gender invalid");
      }
      return errors;
    },
    birthdayErrors() {
      const errors = [];
      if (!this.$v.form.birthday.$dirty) {
        return errors;
      } else if (!this.$v.form.birthday.required) {
        errors.push("Birthday cannot be empty");
      }
      return errors;
    },
    hometownErrors() {
      const errors = [];
      if (!this.$v.form.hometown.$dirty) {
        return errors;
      } else if (!this.$v.form.hometown.required) {
        errors.push("Hometown cannot be empty");
      }
      return errors;
    },
    bioErrors() {
      const errors = [];
      if (!this.$v.form.bio.$dirty) {
        return errors;
      } else if (!this.$v.form.bio.required) {
        errors.push("Bio cannot be empty");
      }
      return errors;
    },
  },
  watch: {
    is_open(val) {
      if (val) {
        this.form = {
          name: this.props_data?.name,
          gender:
            this.props_data?.gender === "male"
              ? 0
              : this.props_data?.gender === "female"
              ? 1
              : null,
          birthday: this.props_data?.birthday,
          hometown: this.props_data?.hometown,
          bio: this.props_data?.bio,
        };
      }
    },
  },
  methods: {
    handleSave() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let tempFormData = new FormData();
        tempFormData.append("name", this.form?.name);
        tempFormData.append("gender", this.form?.gender);
        tempFormData.append("birthday", this.form?.birthday);
        tempFormData.append("hometown", this.form?.hometown);
        tempFormData.append("bio", this.form?.bio);

        const statusAPI = this.$store.dispatch(
          "profile/postProfile",
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
