<template>
  <!-- Unreusable Component -->
  <div>
    <CareerEditor :dialog="career_dialog" :props_data="data" />
    <EducationEditor :dialog="education_dialog" :props_data="data" />
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
          <v-btn icon @click="handleDialogCareer(true)">
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
          <v-btn icon @click="handleDialogEducation(true)">
            <v-icon color="grey lighten-1">mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-card-text> </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CareerEditor from "@/components/home/careerAndEducation/CareerEditor";
import EducationEditor from "@/components/home/careerAndEducation/EducationEditor";

export default {
  name: "CareerAndEducationBase",
  components: { CareerEditor, EducationEditor },
  props: {
    data: { type: Object, default: {} },
  },
  data() {
    return {
      career_dialog: false,
      education_dialog: false,
    };
  },
  methods: {
    handleDialogCareer(value) {
      this.career_dialog = value;
    },
    handleDialogEducation(value) {
      this.education_dialog = value;
    },
  },
};
</script>
