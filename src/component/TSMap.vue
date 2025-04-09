<template>
  <div class="bg-cardBg rounded-2xl h-full" ref="chartRef"></div>
</template>

<script>
import * as echarts from "echarts";
import { placeMap } from "../utils/Config";

export default {
  name: "TSMap",
  props: {
    place: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      myChart: null,
      nodes: [
        { name: "岱庙", x: 45, y: 90 },
        { name: "红门", x: 40, y: 80 },
        { name: "中天门", x: 50, y: 70 },
        { name: "五松亭", x: 60, y: 60 },
        { name: "南天门", x: 45, y: 50 },
        { name: "月望峰", x: 30, y: 45 },
        { name: "天街", x: 55, y: 50 },
        { name: "碧霞祠", x: 65, y: 37 },
        { name: "玉皇顶", x: 53, y: 27 },
      ],
      linksmap: [
        { source: "岱庙", target: "红门" },
        { source: "红门", target: "中天门" },
        { source: "中天门", target: "五松亭" },
        { source: "中天门", target: "月望峰" },
        { source: "五松亭", target: "南天门" },
        { source: "月望峰", target: "南天门" },
        { source: "南天门", target: "天街" },
        { source: "天街", target: "碧霞祠" },
        { source: "碧霞祠", target: "玉皇顶" },
      ],
    };
  },
  watch: {
    place: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.initChart();
        });
      },
    },
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
  methods: {
    initChart() {
      if (this.myChart) {
        this.myChart.dispose();
      }
      if (!this.$refs.chartRef) {
        console.error("Chart container not found");
        return;
      }
      this.myChart = echarts.init(this.$refs.chartRef);

      const data = this.nodes.map((node) => ({
        name: node.name,
        x: node.x,
        y: node.y,
        itemStyle: node.name === placeMap[this.place]
          ? {
              color: "rgb(28,229,132)",
              borderColor: "#fff",
              borderWidth: 1,
            }
          : {
              color: "rgb(137,179,202)",
              borderColor: "#fff",
              borderWidth: 1,
            },
      }));

      const links = this.linksmap.map((link) => ({
        source: link.source,
        target: link.target,
        lineStyle: link.source === "中天门" && link.target === "月望峰"
          ? {
              color: "rgb(250,27,6)",
              width: 1,
              curveness: 0,
            }
          : {
              color: "rgb(98,137,169)",
              width: 1,
              curveness: 0.2,
            },
      }));

      const option = {
        title: {
          text: "景区简图",
          textStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#333333",
            fontStyle: "normal",
            fontFamily: "Arial, sans-serif",
          },
          padding: [10, 10, 10, 10],
          left: "left",
          top: "top",
        },
        tooltip: {
          trigger: "item",
          formatter: (e) => {
            return e.name;
          },
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 20,
            roam: false,
            label: {
              show: true,
              position: "top",
              color: "#000",
              fontSize: 12,
            },
            data,
            links,
          },
        ],
      };

      this.myChart.setOption(option);
    },
    resizeChart() {
      if (this.myChart) {
        this.myChart.resize();
      }
    },
  },
};
</script>