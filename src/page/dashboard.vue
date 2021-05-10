<template>
  <div class="dashboard main">
    <el-row :gutter="20" class="apps">
      <el-col :xs="24" :sm="12" v-for="o in 8" :key="o">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="text-second">Reputationt</span>
          </div>
          <div class="content">
            <div class="list">
              <div class="metrics" v-for="o in 3" :key="o">
                <span class="primary">内容</span>
                <span class="value">1233{{ o }}</span>
              </div>
            </div>
            <div class="chart">
              <v-chart width="100%" :options="polar" :autoresize="true" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      polar: {
        xAxis: {},
        yAxis: {},
        color: ['#0BBCC2'],
        series: [
          {
            symbolSize: 30,
            data: [
              [0, 0],
              [50, 2.45844],
              [75, 41.2198],
              [90, 112.5],
              [95, 141.59],
              [99, 600],
              [99.9, 800],
              [100, 1000],
            ],
            type: "scatter",
          },
        ],
      },
    };
  },
  components: {},
  created: async function () {},
  methods: {},
};
</script>

<style lang="scss">
.dashboard {
  width: 100%;
  .el-col {
    margin-top: 15px;
  }
  .clearfix {
    span {
      font-size: 28px;
      font-weight: bold;
    }
  }
  .content {
    .list {
      display: flex;
      justify-content: space-between;
    }
    .metrics {
      line-height: 12px;
      font-size: 13px;
    }
    .chart {
      height: 400px;
    }
    .el-divider--horizontal {
      margin: 10px auto;
    }
  }
}
</style>
