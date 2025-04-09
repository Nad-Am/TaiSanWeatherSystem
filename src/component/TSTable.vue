<template>
    <div style="width: 100%; height: 100%;">
      <div ref="chartRef" class="w-full h-full"></div>
      <div
        @click="fortrun"
        class="absolute z-10 top-1/3 left-5 cursor-pointer text-white text-3xl"
      >
        {{ left }}
      </div>
      <div
        @click="backtrun"
        class="absolute z-10 top-1/3 right-5 cursor-pointer text-white text-3xl"
      >
        >
      </div>
    </div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  
  export default {
    name: "DetailChart",
    props: {
      place: {
        type: String,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
      forestCount: {
        type: Number,
        required: true,
      },
      handleIndex: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        chartInstance: null,
        indexRef: 0,
        left:'<'
      };
    },
    watch: {
      place: {
        immediate: true,
        handler() {
          this.initChart();
        },
      },
      data: {
        immediate: true,
        handler() {
          this.initChart();
        },
      },
    },
    mounted() {
      this.initChart();
      window.addEventListener("resize", this.resizeChart);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.resizeChart);
      if (this.chartInstance) {
        this.chartInstance.dispose();
      }
    },
    methods: {
      initChart() {
        console.log(this.chartInstance,this.$refs.chartRef);
        if (this.chartInstance) {
          this.chartInstance.dispose();
        }
        this.chartInstance = echarts.init(this.$refs.chartRef);
  
        const now = new Date().getHours();
  
        const option = {
          title: {
            text: `24H预测`,
          },
          tooltip: {
            trigger: "axis",
            formatter: function (params) {
              let result = `${params[0].axisValue}<br/>`;
              params.forEach(function (param) {
                result += `${param.seriesName}: ${param.value} ${
                  param.seriesIndex === 0 ? "°C" : param.seriesIndex === 1 ? "%" : "%"
                }<br/>`;
              });
              return result;
            },
          },
          legend: {
            data: ["温度", "湿度", "降水概率"],
            selectedMode: false,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: new Array(this.forestCount)
              .fill(0)
              .map((_, index) => {
                const hour = (now + index + this.indexRef * this.forestCount) % 24;
                return `${hour}:00`;
              }),
            axisLine: {
              lineStyle: {
                color: "#000000",
              },
            },
            axisTick: {
              show: true,
              alignWithLabel: true,
            },
            axisLabel: {
              show: true,
            },
          },
          yAxis: [
            {
              type: "value",
              name: "°C",
              position: "left",
              max: Math.max(...this.data[0]) + 2,
              min: Math.min(...this.data[0]) - 3,
              scale: false,
              axisTick: {
                show: true,
              },
              axisLabel: {
                formatter: function (value) {
                  return value + "°C";
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgb(0,0,0)",
                },
              },
              splitLine: {
                show: false,
              },
            },
            {
              type: "value",
              position: "right",
              name: "%",
              max: Math.max(...this.data[1]) + 10,
              min: Math.min(...this.data[1]),
              axisTick: {
                show: true,
                alignWithLabel: true,
              },
              axisLabel: {
                formatter: "{value}",
              },
              axisLine: {
                show: false,
              },
              splitLine: {
                show: false,
              },
            },
            {
              type: "value",
              name: "",
              position: "right",
              max: Math.max(...this.data[2]) + 10,
              min: Math.min(...this.data[2]),
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              splitLine: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: "温度",
              type: "line",
              yAxisIndex: 0,
              data: this.data[0],
              itemStyle: {
                color: "#ff0000",
              },
              symbolSize: 0,
              smooth: true,
            },
            {
              name: "湿度",
              type: "line",
              yAxisIndex: 1,
              data: this.data[1],
              itemStyle: {
                color: "#00ff00",
              },
              symbolSize: 0,
              smooth: true,
            },
            {
              name: "降水概率",
              type: "line",
              yAxisIndex: 2,
              data: this.data[2],
              itemStyle: {
                color: "#0000ff",
              },
              symbolSize: 0,
              smooth: true,
            },
          ],
        };
  
        this.chartInstance.setOption(option);
      },
      resizeChart() {
        if (this.chartInstance) {
          this.chartInstance.resize();
        }
      },
      fortrun() {
        if (this.indexRef === 0) return;
        this.indexRef = this.indexRef - 1;
        this.handleIndex(this.indexRef);
      },
      backtrun() {
        if (this.indexRef === 24 / this.forestCount - 1) return;
        this.indexRef = this.indexRef + 1;
        this.handleIndex(this.indexRef);
      },
    },
  };
  </script>