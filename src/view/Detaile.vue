<template>
  <div class="relative bg-cardBg flex flex-wrap justify-around items-center"
      :style="{
              width: '90%',
              height: '90%'
            }"
  >
    <!-- 右侧导航栏 -->
    <div class="absolute flex w-20 top-24 -right-24 bg-cardBg3 h-4/6 flex-col">
      <div class="w-16 h-16 -top-20 bg-cover absolute" :style="{ backgroundImage: 'url(/assets/icons/taiSan/TS_1.png)' }"></div>
      <div
        v-for="(item, index) in navList"
        :key="index"
        :class="item.path === place ? activClass : inactivClass"
        @click="handleTurn(item.path)"
      >
        <div
          class="w-4/5 h-2/3 bg-contain bg-no-repeat bg-center"
          :style="{ backgroundImage: `url(${Icons['taiSan'][item.path]})` }"
        ></div>
        <div class="pb-1">{{ item.name }}</div>
      </div>
    </div>

    <!-- 左侧内容 -->
    <div class="w-7/12 bg-cardBg2 rounded-xl" style="height: 45%">
      <DetaileWeather :data="weather" :place="place" :nowTime="nowTime" />
    </div>
    <div class="w-4/12" style="height: 45%">
      <TSMap :place="place" />
    </div>
    <div class="w-7/12 relative" style="height: 45%;">
      <TSTable
        :place="place"
        :data="table"
        :forestCount="forestCount"
        :handleIndex="handleIndex"
      />
    </div>
    <div class="w-4/12 flex flex-col items-center justify-center bg-cardBg2 rounded-xl" style="height: 40%">
      <div class="flex w-11/12 h-1/3 pb-2 border-solid border-b-2">
        <div class="w-1/2 h-full p-2 border-r-2 border-solid">
          <div class="h-1/3">索道：</div>
          <div class="h-2/3 p-2">{{ Ropewaymessage[ropeway] }}</div>
        </div>
        <div class="w-1/2 h-full p-2">
          <div class="h-1/3" style="border-bottom: 2px solid">日出/落：</div>
          <div class="h-2/3 p-2">
            今日日出大概在{{ sunriseTime }}左右
            <div></div>
            今日日落大概在{{ sunsetTime }}左右
          </div>
        </div>
      </div>
      <div class="h-1/3 w-full">
        <div class="w-full h-1/2 m-2 p-4">
          <h2>穿衣：</h2>
          <div class="p-1">{{ tipMessage.clothes }}</div>
        </div>
        <div class="w-full h-1/2 m-2 p-4">
          <h2>预测：</h2>
          <div class="flex w-full justify-around">
            <div v-for="(item, index) in tipMessage.pre" :key="index" class="pt-1">
              {{ item.name }}:<span class="m-1">{{ item.value ? '可能' : '无' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetaileWeather from "../component/DetaileWeather.vue";
import TSMap from "../component/TSMap.vue";
import TSTable from "../component/TSTable.vue";
import { Icons, navList } from "../utils/Config";
import api from "../api";

export default {
  name: "Detail",
  components: {
    DetaileWeather,
    TSMap,
    TSTable,
  },
  data() {
    return {
      forestCount: 6,
      place: this.$route.query.place,
      activClass:
        "bg-cardBg2 mb-1 flex flex-wrap text-xs font-bold justify-center bg-contain bg-no-repeat bg-center cursor-pointer h-14 hover:bg-cardBg3",
      inactivClass:
        "bg-cardBg mb-1 flex flex-wrap text-xs font-bold justify-center bg-contain bg-no-repeat bg-center cursor-pointer h-14 hover:bg-cardBg3",
      Icons,
      navList,
      detailInfo: {
        current: null,
        forecast: null,
      },
      nowTime: new Date().getHours().toString().padStart(2, "0") + ":" + new Date().getMinutes().toString().padStart(2, "0"),
      weather: {
        cap: "...",
        temp: "...",
        feels: "...",
        items: [
          {
            name: "风速",
            key: "pvdrWindSpd",
            value: "...",
            unit: "",
            descrpit: "风级表示空气流动的速度，通常分为：无风（0级，0km/h，空气静止）、软风（1级，1-5km/h，几乎无感）、轻风（2级，6-11km/h，树叶轻摇）、微风（3级，12-19km/h，树叶摇动）、和风（4级，20-28km/h，影响活动）、强风（5级，29-38km/h，影响建筑）。",
          },
          {
            name: "湿度",
            key: "rh",
            value: "...",
            unit: "%",
            descrpit: "湿度表示空气中水蒸气的含量，通常分为低湿度（0-40%）、中湿度（41-60%）和高湿度（61-100%）。湿度对人体舒适度有直接影响，低湿度可能导致干燥，高湿度可能导致闷热。",
          },
          {
            name: "能见度",
            key: "vis",
            value: "...",
            unit: "km",
            descrpit: "能见度表示在天气条件下，人眼能够清晰看到的最远距离，通常分为较差（0-5km）、中等（5-20km）和极好（>20km）。能见度对驾驶安全和户外活动有重要影响，是衡量空气质量的重要指标。",
          },
          {
            name: "气压",
            key: "baro",
            value: "...",
            unit: "hPa",
            descrpit: "气压表示大气压力，通常分为低气压（<1000hPa）、标准气压（1000-1020hPa）和高气压（>1020hPa）。气压变化常用于预测天气变化，低气压通常伴随阴雨天气，高气压通常伴随晴朗天气。",
          },
          {
            name: "紫外线",
            key: "uv",
            value: "...",
            unit: "",
            descrpit: "紫外线指数表示紫外线辐射强度，通常分为低（0-2）、中等（3-5）和高（6-11+）。紫外线对人体皮肤和眼睛有直接影响，低紫外线可以放心外出，高紫外线需采取防护措施。",
          },
          {
            name: "大风预警",
            key: "evaluateWindLevel",
            value: "...",
            unit: "",
            descrpit: "大风预警分等级，NoWarning无风险，WindWarning注意安全，Gale减少外出，StrongGale防风避高空。",
          },
        ],
      },
      windowLeveMap: {
        NoWarning: "无风险",
        WindWarning: "风警告",
        Gale: "大风",
        StrongGale: "强风",
      },
      tipMessage: {
        clothes: "...",
        sun: ["...", "..."],
        pre: [
          { name: "雾凇", ksy: "rime", value: false },
          { name: "云海", ksy: "seaOfClouds", value: false },
          { name: "冰雹", ksy: "freezingRain", value: false },
          { name: "雷暴", ksy: "blizzard", value: false },
          { name: "结冰", ksy: "isFreezing", value: false },
          { name: "暴雪", ksy: "freezingRain", value: false },
        ],
      },
      windowDes: {
        name: "大风",
        ksy: "evaluateWindLevel",
        value: false,
      },
      Ropewaymessage: [
        "索道已关闭。将于每天上午8点开放，下午4点关闭。",
        "由于天气原因索道已经关闭。",
        "索道开放中。每天营业时间为上午8点到下午4点。",
      ],
      ropeway: 0,
      table: Array.from({ length: 3 }, () => Array(6).fill(0)),
      tableIndex: 0,
      wsRef: null,
    };
  },
  computed: {
    sunriseTime() {
      if (this.tipMessage.sun[0]) {
        return new Date(this.tipMessage.sun[0]).getHours().toString().padStart(2, "0") + ":" + new Date(this.tipMessage.sun[0]).getMinutes().toString().padStart(2, "0");
      }
      return "";
    },
    sunsetTime() {
      if (this.tipMessage.sun[1]) {
        return new Date(this.tipMessage.sun[1]).getHours().toString().padStart(2, "0") + ":" + new Date(this.tipMessage.sun[1]).getMinutes().toString().padStart(2, "0");
      }
      return "";
    },
  },
  watch: {
    place: {
      immediate: true,
      handler(newVal) {
        this.fetchData(newVal);
      },
    },
  },
  methods: {
    handleTurn(newPlace) {
      if(newPlace === this.place) return;
      this.place = newPlace;
      this.$router.push(`/detaile?place=${newPlace}`);
    },
    handleIndex(index) {
      if (index < 0 || index > 24 / this.forestCount - 1) return;

      this.tableIndex = index;
      const forecast = this.detailInfo.forecast;
      const newTabl = Array.from({ length: 3 }).map((item, index) => {
        return new Array(this.forestCount).fill(0).map((_, inerIndex) => {
          const iner = inerIndex + this.tableIndex;
          if (index === 0) return forecast[iner].temp;
          if (index === 1) return forecast[iner].rh;
          if (index === 2) return forecast[iner].cloudCover;
        });
      });
      this.table = newTabl;
    },
    handleRopeway(blizzard) {
      if (new Date().getHours() < 8 || new Date().getHours() > 16) {
        this.ropeway = 0;
        return;
      }

      if (blizzard || this.windowDes.value !== "NoWarning") {
        this.ropeway = 1;
        return;
      }

      this.ropeway = 2;
    },
    fetchData(place) {
      this.tableIndex = 0;
      api.get(`/weathers/forecast?location=${place}_URL`).then((res) => {
        this.detailInfo = res.data;
        const current = res.data.current;
        const forecast = res.data.forecast;
        const newItems = this.weather.items.map((item) => {
          if (item.key === "evaluateWindLevel") {
            return {
              ...item,
              value: this.windowLeveMap[current[item.key]],
            };
          }
          return {
            ...item,
            value: current[item.key],
          };
        });
        const newWeather = {
          cap: current.cap,
          temp: current.temp,
          feels: current.feels,
          items: newItems,
        };
        this.weather = newWeather;

        const newtipPre = this.tipMessage.pre.map((item) => {
          return {
            ...item,
            value: current[item.ksy],
          };
        });
        const newTipMessage = {
          clothes: current.comment,
          sun: [forecast[0].sunrise, forecast[0].sunset],
          pre: newtipPre,
        };
        this.tipMessage = newTipMessage;
        this.handleRopeway(newtipPre[3].value);

        const newTabl = Array.from({ length: 3 }).map((item, index) => {
          return new Array(this.forestCount).fill(0).map((_, inerIndex) => {
            const iner = inerIndex + this.tableIndex;
            if (index === 0) return forecast[iner].temp;
            if (index === 1) return forecast[iner].rh;
            if (index === 2) return forecast[iner].precip;
          });
        });
        this.table = newTabl;

        this.wsRef = new WebSocket(`ws://${place}_URL`);
        this.wsRef.onmessage = (respon) => {
          const res = JSON.parse(respon.data);
          console.log(res);
          this.detailInfo = res;
          const current = res.current;
          const forecast = res.forecast;
          this.windowDes = {
            name: "大风",
            ksy: "evaluateWindLevel",
            value: current.evaluateWindLevel,
          };
          const newItems = this.weather.items.map((item) => {
            if (item.key === "evaluateWindLevel") {
              return {
                ...item,
                value: this.windowLeveMap[current[item.key]],
              };
            }
            return {
              ...item,
              value: current[item.key],
            };
          });
          const newWeather = {
            cap: current.cap,
            temp: current.temp,
            feels: current.feels,
            items: newItems,
          };
          this.weather = newWeather;

          const newtipPre = this.tipMessage.pre.map((item) => {
            return {
              ...item,
              value: current[item.ksy],
            };
          });
          const newTipMessage = {
            clothes: current.comment,
            sun: [forecast[0].sunrise, forecast[0].sunset],
            pre: newtipPre,
          };

          this.handleRopeway(newtipPre[3].value);

          const newTabl = Array.from({ length: 3 }).map((item, index) => {
            return new Array(this.forestCount).fill(0).map((_, inerIndex) => {
              const iner = inerIndex + this.tableIndex;
              if (index === 0) return forecast[iner].temp;
              if (index === 1) return forecast[iner].rh;
              if (index === 2) return forecast[iner].precip;
            });
          });

          const oldString = [...this.table[0], ...this.table[1], ...this.table[2]].join("");
          const newString = [...newTabl[0], ...newTabl[1], ...newTabl[2]].join("");
          if (oldString !== newString) {
            this.table = newTabl;
          }

          this.tipMessage = newTipMessage;
          this.nowTime = new Date().getHours().toString().padStart(2, "0") + ":" + new Date().getMinutes().toString().padStart(2, "0");
        };
      });
    },
  },
  beforeDestroy() {
    if (this.wsRef) {
      this.wsRef.close();
    }
  },
};
</script>