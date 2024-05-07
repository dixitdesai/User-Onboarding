<template>
  <v-tour name="myTour" :steps="steps" :callbacks="myCallbacks"></v-tour>
</template>

<script>
import { mapWritableState, mapState } from "pinia";
import { useTourStore } from "@/store.js";

export default {
  data() {
    return {
      steps: [
        {
          target: "#foo",
          header: {
            title: `Welcome ${localStorage.getItem("username")}!`,
          },
          content: `Here is your profile`,
        },
        {
          target: "#bar",
          header: {
            title: "Image Demonstration",
          },
          content: `<img src='https://cdn.dribbble.com/users/603800/screenshots/4569474/dribbble-code.gif' alt='Code gif'"/>`,
        },
        {
          target: "#skip",
          header: {
            title: "Skip if you are aware..",
          },
          content:
            "There is a skip button, Making leaving onboarding process easier!",
          params: {
            placement: "bottom", // Any valid Popper.js placement.
          },
        },
        {
          target: "#last",
          header: {
            title: "Let's Conclude",
          },
          content: "Notice... It is the final step in the onboarding process!!",
          params: {
            placement: "top",
          },
        },
      ],
      myCallbacks: {
        onPreviousStep: this.previousStepCallback,
        onNextStep: this.nextStepCallback,
        onFinish: this.finishTour,
        onSkip: this.skipTour,
        onStop: this.stopTour,
      },
    };
  },
  mounted() {
    this.$tours["myTour"].start();
  },
  computed: {
    ...mapWritableState(useTourStore, ["showTour"]),
  },
  methods: {
    previousStepCallback(currentStep) {
      console.log(`User went back from step: ${currentStep}`);
    },
    nextStepCallback(currentStep) {
      console.log(`User went to step: ${currentStep + 1}`);
    },
    finishTour() {
      console.log("Tour Completed");
      this.showTour = false;
      localStorage.setItem("showTour", false);
    },
    skipTour() {
      console.log("User skipped the tour!");
      this.finishTour();
    },
    stopTour() {
      console.log("User stopped the tour!");
    },
  },
};
</script>
