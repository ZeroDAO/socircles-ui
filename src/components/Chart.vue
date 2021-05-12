<template>
  <div class="chart">
    <v-chart width="100%" :options="polar" :autoresize="true" />
  </div>
</template>

<script>
export default {
  props: ["seriesData", "isRatio", "symbolSize", "isLegend"],
  data() {
    return {
      polar: {
        xAxis: {},
        yAxis: {},
        color: [
          "#0BBCC2",
          "#4CA3FB",
          "#AE82FB",
          "#DA52DF",
          "#F8786A",
          "#F8BF6A",
          "#B4E64D",
          "#26E31F",
        ],
        series: [
          {
            symbolSize: 10,
            data: [],
            type: "scatter",
          },
        ],
      },
    };
  },
  created: async function () {
    let series = [];
    let legendData = [];
    this.seriesData.forEach((e) => {
      let list = [];
      list.push([0, this.getRatio(e.min, e.max)]);
      list.push([50, this.getRatio(e.p50, e.max)]);
      list.push([75, this.getRatio(e.p75, e.max)]);
      list.push([90, this.getRatio(e.p90, e.max)]);
      list.push([95, this.getRatio(e.p95, e.max)]);
      list.push([99, this.getRatio(e.p99, e.max)]);
      list.push([99.9, this.getRatio(e.p999, e.max)]);
      list.push([100, this.getRatio(e.max, e.max)]);
      series.push({
        symbolSize: this.symbolSize || 30,
        data: list,
        type: "scatter",
        name: e.algo,
        emphasis: {
          focus: "series",
        },
        markLine: {
          lineStyle: {
            type: "solid",
          },
          data: [
            { type: "average", name: "Average" },
            { xAxis: this.getRatio(e.mean, e.max) },
          ],
        },
      });
    });
    if (this.isLegend) {
      this.polar.legend = {
        textStyle: {
          fontSize: 10,
        },
      };
    }
    this.polar.series = series;
  },
  methods: {
    getRatio(data, max) {
      return this.isRatio ? (data * 1000) / max : data;
    },
  },
};
</script>

<style lang="scss">
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
