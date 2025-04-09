<template>
    <div
      @click="handleTo('/detaile', 'NTM')"
      class="w-1/6 h-14 flex bg-cardBg2 rounded-2xl"
      style="max-width: 200px"
    >
      <div
        class="pt-7 rounded-xl pb-7 w-1/2 bg-cover"
        :style="{ backgroundImage: `url(${img})` }"
      ></div>
      <div class="pb-7 w-1/2">
        <div class="font-bold pl-2">{{ name }}</div>
        <div class="pl-4 pt-1">{{ weather }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomeItem",
    props: {
      img: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      weather: {
        type: String,
        required: true,
      },
    },
    methods: {
      handleTo(path, place) {
        // 使用 Vue Router 进行导航
        this.$router.push({
          path: path,
          query: {
            place: place,
          },
        }).catch((error) => {
          // 忽略 NavigationDuplicated 错误
          if (error.name !== "NavigationDuplicated") {
            throw error;
          }
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* 添加你的样式 */
  </style>