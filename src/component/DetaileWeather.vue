<template>
    <div class="w-full h-full">
      <div class="flex justify-between h-4/5">
        <div style="max-width: 1000px">
          <div class="h-1/4 p-4">
            <h2>当前天气</h2>
            <p>{{ nowTime }}</p>
          </div>
          <div class="flex justify-around h-1/2 p-4">
            <div class="h-36 w-36 bg-contain bg-center" :style="{ backgroundImage: `url(${weatherIcon})` }"></div>
            <div class="w-1/5 pt-10 text-center text-6xl">
              {{ data.temp }}°C
            </div>
            <div class="ml-4 pl-10 pt-5">
              <h2 class="text-2xl">{{ data.cap }}</h2>
              <p class="pt-3">体感温度：{{ data.feels }}°C</p>
            </div>
          </div>
        </div>
        <div class="w-5/12 flex justify-center items-center relative">
          <div class="w-5/6 h-5/6 rounded-lg bg-cover bg-no-repeat" :style="{ backgroundImage: `url(/assets/image/${place}.png)` }"></div>
        </div>
      </div>
      <div class="flex h-1/5 justify-between p-4">
        <ItemTip
          v-for="item in data.items"
          :key="item.key"
          :title="item.name"
          :value="item.value + item.unit"
          :descrpit="item.descrpit"
        />
      </div>
    </div>
  </template>
  
  <script>
  import ItemTip from "./ItemTip.vue";
  import { getWeatherIcon } from "../utils/Config";
  
  export default {
    name: "DetailWeather",
    components: {
      ItemTip,
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
      nowTime: {
        type: String,
        required: true,
      },
      place: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        weatherIcon: "",
      };
    },
    watch: {
      "data.cap": {
        immediate: true,
        handler(newVal) {
          this.weatherIcon = getWeatherIcon(newVal);
        },
      },
    },
    methods: {},
  };
  </script>