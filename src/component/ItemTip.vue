<template>
  <div>
    <div class="relative text-xs">
      {{ title }}
      <div
        class="absolute -right-4 top-0 w-3 h-3 bg-contain bg-center bg-no-repeat"
        :style="{ backgroundImage: 'url(/assets/icons/query.png)' }"
        @mouseenter="setActive(true)"
        @mouseleave="setActive(false)"
      ></div>
      <div :class="active ? 'activClass' : 'inactivClass'" class="bg-cardBg">{{ descrpit }}</div>
    </div>
    <p class="text-sm">{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: "Tip",
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    descrpit: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    setActive(state) {
      console.log("Active state:", state); // 确保状态正确
      this.active = state;
    },
  },
};
</script>

<style scoped>
.activClass {
  position: absolute;
  z-index: 10;
  top: 2rem;
  left: 2rem;
  width: 20rem;
  border-radius: 0.5rem;
  display: block; /* 确保显示 */
}
.inactivClass {
  display: none;
}
</style>