<script setup>
import "v-onboarding/dist/style.css";
import {
  VOnboardingWrapper,
  VOnboardingStep,
  useVOnboarding,
} from "v-onboarding";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTourStore } from "@/store.js";
const { showTour } = storeToRefs(useTourStore());

const steps = [
  {
    attachTo: { element: "#foo" },
    content: {
      title: `Welcome ${localStorage.getItem("username")}!!`,
      description: {
        type: "text",
        text: "Here is your profile...",
      }
    },
  },
  {
    attachTo: { element: "#bar" },
    content: {
      title: "Image Demonstration",
      description: {
        type: "image",
        text: "https://cdn.dribbble.com/users/603800/screenshots/4569474/dribbble-code.gif",
      },
    },
  },
  {
    attachTo: { element: "#libraries" },
    content: {
      title: "Alter Library",
      description: {
        type: "text",
        text: "Select your desired onboarding method..",
      },
    },
  },
  {
    attachTo: { element: "#startTour" },
    content: {
      title: "Initiate Tour!",
      description: {
        type: "text",
        text: "Don't worry you can start tour again, if you miss anything",
      },
    },
  },
  {
    attachTo: { element: "#skip" },
    content: {
      title: "Skip if you are aware..",
      description: {
        type: "text",
        text: "There is a skip button, Making leaving onboarding process easier!",
      },
    },
  },
  {
    attachTo: { element: "#last" },
    content: {
      title: "Let's Conclude",
      description: {
        type: "text",
        text: "Notice... It is the final step in the onboarding process!!",
      },
    },
    on: {
      beforeStep: (options) => {
        console.log(
          "The logic written here will run before displaying the step",
          options
        );
      },
      afterStep: (options) => {
        console.log(
          "The logic written here will run before hiding the step",
          options
        );
      },
    },
  },
];

const finishOnboarding = () => {
  showTour.value = false;
  localStorage.setItem("showTour", false);
  document.body.style.pointerEvents = "auto";
};

const wrapper = ref(null);
const { start, goToStep, finish } = useVOnboarding(wrapper);

onMounted(() => {
  start();
});
</script>

<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps">
    <template #default="{ previous, next, step, exit, isFirst, isLast, index }">
      <VOnboardingStep style="z-index: 100">
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:p-5">
            <div class="flex flex-col gap-5">
              <div v-if="step.content">
                <div class="flex justify-between gap-5">
                  <h3
                    v-if="step.content.title"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    {{ step.content.title }}
                  </h3>
                  <span
                    class="bottom-full text-end pt-1 mr-2 text-gray-600 font-medium text-xs"
                  >
                    {{ `${index + 1}/${steps.length}` }}
                  </span>
                </div>

                <div
                  v-if="step.content.description"
                  class="mt-2 max-w-xl text-sm text-gray-500"
                >
                  <template v-if="step.content.description.type === 'image'">
                    <img class="w-96" :src="step.content.description.text" />
                  </template>
                  <template v-else>
                    {{ step.content.description.text }}
                  </template>
                </div>
              </div>
              <div
                class="mt-5 space-x-4 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center sm:justify-end relative"
              >
                <template v-if="index == 4">
                  <button
                    @click="finishOnboarding"
                    type="button"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 font-medium text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:text-sm"
                  >
                    Skip
                  </button>
                </template>
                <template v-if="!isFirst">
                  <button
                    @click="previous"
                    type="button"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 font-medium text-yellow-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm"
                  >
                    Previous
                  </button>
                </template>
                <button
                  v-if="!isLast"
                  @click="next"
                  type="button"
                  class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                >
                  Next
                </button>
                <button
                  v-else
                  @click="finishOnboarding"
                  type="button"
                  class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </VOnboardingStep>
    </template>
  </VOnboardingWrapper>
</template>

<style scoped>
[data-v-onboarding-wrapper] [data-popper-arrow]::before {
  content: "";
  background: var(--v-onboarding-step-arrow-background, white);
  top: 0;
  left: 0;
  transition: transform 0.2s ease-out, visibility 0.2s ease-out;
  visibility: visible;
  transform: translateX(0px) rotate(45deg);
  transform-origin: center;
  width: var(--v-onboarding-step-arrow-size, 10px);
  height: var(--v-onboarding-step-arrow-size, 10px);
  position: absolute;
  z-index: -1;
}

[data-v-onboarding-wrapper]
  [data-popper-placement^="top"]
  > [data-popper-arrow] {
  bottom: 5px;
}

[data-v-onboarding-wrapper]
  [data-popper-placement^="right"]
  > [data-popper-arrow] {
  left: -4px;
}

[data-v-onboarding-wrapper]
  [data-popper-placement^="bottom"]
  > [data-popper-arrow] {
  top: -4px;
}

[data-v-onboarding-wrapper]
  [data-popper-placement^="left"]
  > [data-popper-arrow] {
  right: -4px;
}
</style>
