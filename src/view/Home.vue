<template>
  <div :style="{
              width: '90%',
              height: '90%'
            }"
    >
    <div class="border-b-2 border-solid text-2xl p-4 font-bold border-gray-400" style="height: 10%">泰山气象系统</div>
    <div class="flex justify-around items-center rounded-md flex-wrap bg-cardBg" style="height: 85%; margin-top: 2%">
      <div class="h-5/6 rounded-2xl bg-cardBg w-6/12">
        <div class="h-5/6 w-full rounded-t-2xl bg-cover" :style="{ backgroundImage: `url(/assets/image/LB_${bgIndex}.png)` }"></div>
        <h1 class="m-1 text-lg font-bold">泰山</h1>
        <div class="m-2">
          泰山位于山东泰安，为五岳之首，主峰玉皇顶海拔1532.7米。地质复杂，以断裂构造，为主是山东丘陵最高山脉。泰山是帝王封禅之地，文化底蕴深厚，有日出、云海等自然景观，是世界文化与自然双重遗产。
        </div>
      </div>
      <div class="flex flex-wrap justify-around bg-cardBg rounded-2xl h-5/6 w-5/12">
        <div class="w-5/12 h-1/2">
          <div class="w-full h-1/2 flex items-center">
            <div class="w-24 h-24 bg-cover" :style="{ backgroundImage: `url(${weatherIcon})` }"></div>
            <div class="w-1/2 h-24 text-2xl font-bold text-center p-5">{{ main.wetaher }}</div>
          </div>
          <div class="w-full h-1/2 flex border-solid border-r-2 border-gray-400">
            <div class="w-1/4 h-full bg-contain bg-no-repeat">温度：</div>
            <div class="w-7/12 h-full text-center text-7xl">{{ main.tmepC }}</div>
            <div class="w-1/6 h-full">
              <sup>o</sup>c
            </div>
          </div>
        </div>
        <div class="w-5/12 h-1/2">
          <div class="w-full h-1/2 flex items-center">
            <div class="w-24 h-24 bg-contain" :style="{ backgroundImage: `url(${Icons.weather.humidity})` }"></div>
            <div class="w-1/2 h-24 text-2xl font-bold text-center p-5">湿度</div>
          </div>
          <div class="w-full h-1/2 flex">
            <div class="w-1/4 mr-5 h-4/6 bg-center bg-contain bg-no-repeat" :style="{ backgroundImage: `url(${Icons.other.arrowRight})` }"></div>
            <div class="w-1/2 h-full text-center text-7xl">{{ main.humidity }}</div>
            <div class="w-1/6 h-full">%</div>
          </div>
        </div>
        <div class="flex justify-around items-center flex-wrap w-10/12 mt-2 h-1/2 border-solid border-t-2 border-gray-400">
          <div v-for="(item, index) in itemList" :key="index" class="w-1/4 m-2 rounded-xl h-1/4 bg-cardBg">
            <div class="flex h-1/3">
              <div class="m-1">{{ item.name }}</div>
              <div class="w-6 m-1 h-6 bg-cover" :style="{ backgroundImage: `url(${item.icon})` }"></div>
            </div>
            <div class="m-1 font-bold mt-3 ml-3">{{ item.value + item.unit }}</div>
          </div>
        </div>
      </div>
      <div class="w-5/6 flex justify-around items-center">
        <HomeItem
          v-for="(item, index) in places"
          :key="index"
          :name="item.name"
          :weather="item.weather"
          :img="item.img"
        ></HomeItem>
      </div>
    </div>
  </div>
</template>

<script>
import HomeItem from "../component/HomeItem.vue";
import { Icons, urlMap, getWeatherIcon } from "../utils/Config";
import api from "../api";
import {ws} from "../api";

export default {
  name: "Home",
  components: {
    HomeItem,
  },
  data() {
    return {
      Icons,
      main: {
        wetaher: "...",
        tmepC: "...",
        humidity: "...",
      },
      itemList: [
        {
          name: "风向",
          icon: Icons.weather.window,
          value: "...",
          unit: "",
        },
        {
          name: "风力",
          icon: Icons.weather.windowPo,
          unit: "",
          value: "...",
        },
        {
          name: "风速",
          icon: Icons.weather.windowSp,
          value: "...",
          unit: "km/h",
        },
        {
          name: "气压",
          icon: Icons.weather.atmPre,
          unit: "hPa",
          value: "...",
        },
        {
          name: "PM2.5",
          icon: Icons.weather.air,
          value: "...",
          unit: "ug/m3",
        },
        {
          name: "能见度",
          icon: Icons.weather.visibilty,
          unit: "km",
          value: "...",
        },
      ],
      weatherIcon: "",
      fieldMap: {
        "风向": "pvdrWindDir",
        "风力": "pvdrWindSpd",
        "风速": "windSpd",
        "气压": "baro",
        "PM2.5": "aqi",
        "能见度": "vis",
      },
      places: [
        {
          name: "玉皇顶",
          weather: "晴天",
          img: "/assets/image/YD.png",
        },
        {
          name: "南天门",
          weather: "晴天",
          img: "/assets/image/NTM.png",
        },
        {
          name: "五松亭",
          weather: "晴天",
          img: "/assets/image/WST.png",
        },
        {
          name: "中天门",
          weather: "晴天",
          img: "/assets/image/ZTM.png",
        },
        {
          name: "红门",
          weather: "晴天",
          img: "/assets/image/HM.png",
        },
      ],
      bgIndex: 1,
      webs: null,
      timer: null,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.handleBgIndex();
    }, 5000);

    api.get("/weathers/forecast?location=NTM_URL").then((res) => {
      const data = res.data.current;
      this.main = {
        wetaher: data.cap,
        tmepC: data.feels,
        humidity: data.temp,
      };
      this.weatherIcon = getWeatherIcon(data.cap);
      this.updateItemList(data);
      this.webs = ws("NTM_URL");
      this.webs.onmessage = (e) => {
        let data = JSON.parse(e.data);
        data = data.current;
        this.main = {
          wetaher: data.cap,
          tmepC: data.feels,
          humidity: data.rh,
        };
        this.weatherIcon = getWeatherIcon(data.cap);
        this.updateItemList(data);
      };
    });

    const promises = this.places.map((item) => {
      return api.get(`/weathers/location/${urlMap[item.name]}_URL`).then((res) => {
        return {
          ...item,
          weather: res.data,
        };
      });
    });

    Promise.all(promises).then((res) => {
      this.places = res;
    });
  },
  beforeDestroy() {
    if (this.webs) {
      this.webs.close();
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    handleBgIndex() {
      let nextIndex = this.bgIndex + 1;
      if (nextIndex > 5) {
        this.bgIndex = 1;
        return;
      }
      this.bgIndex = nextIndex;
    },
    updateItemList(data) {
      this.itemList = this.itemList.map((item) => {
        const field = this.fieldMap[item.name];
        return {
          ...item,
          value: data[field],
        };
      });
    },
  },
};
</script>

<style scoped>
.bg-cardBg {
  background-color: #f0f0f0; /* 示例背景色 */
}
</style>