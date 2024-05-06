<template>
  <v-tour name="myTour" :steps="steps"></v-tour>
</template>

<script>
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
            title: "Image Demonstration"
          },
          content: `<img src='https://cdn.dribbble.com/users/603800/screenshots/4569474/dribbble-code.gif' alt='Code gif'"/>`,
        },
        {
          target: '#skip',
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
          target: '#last',
          header: {
            title: "Let's Conclude"
          },
          content:
            "Notice... It is the final step in the onboarding process!!",
          params: {
            placement: "top",
          },
        },
      ],
    };
  },
  mounted() {
    this.$tours["myTour"].start();
  },
};
</script>
