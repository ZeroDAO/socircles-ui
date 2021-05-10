<template>
  <div class="nonce main">
    <div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in nonceList"
          :key="item.value"
          :label="'Nonce ' + item.value"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-row :gutter="20" class="records">
      <el-col :span="6">
        <div class="cont">
          <div v-for="i in 8" :key="i">
            <div class="table">
              <span class="primary">种子分数</span>
              <span>1000</span>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </el-col>
      <el-col :span="18" class="chart">
        <v-chart :options="polar" :autoresize="true" />
      </el-col>
    </el-row>
    <el-divider class="seed-lable primary">Hall of Fame</el-divider>
    <el-row :gutter="20" class="seeds">
      <el-col :xs="24" :sm="12" :md="8" v-for="o in 20" :key="o">
        <el-card>
          <img src="../assets/images/user.jpg" />
          <div class="info">
            <span>Martin</span>
            <span class="text-second"
              >0x42cEDde51198D1773590311E2A340DC06B24cB37</span
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

// import localstorage from "@/util/localstorage";

export default {
  data() {
    return {
      polar: {
        xAxis: {},
        yAxis: {},
        color: ["#0BBCC2"],
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
      nonceList: [
        {
          value: "123",
        },
        {
          value: "43",
        },
        {
          value: "23",
        },
        {
          value: "2",
        },
        {
          value: "1",
        },
      ],
      value: "123",
    };
  },
  components: {},
  created: async function () {},
  methods: {},
};
</script>

<style lang="scss">
.nonce {
  width: 100%;
  .records {
    width: 100%;
    .chart {
      height: 400px;
    }
    .el-col:first-child {
      display: flex;
      height: 400px;

      .cont {
        display: flex;
        flex-flow: column;
        justify-content: center;
        width: 100%;
      }
      .el-divider--horizontal {
        margin: 10px auto;
      }
      .table {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        span {
          line-height: 16px;
          margin-right: 10px;
        }
      }
    }
  }
  .seed-lable {
    margin: 45px auto;
    .el-divider__text {
      font-size: 30px;
      font-weight: bold;
    }
  }
  .seeds {
    .el-card__body {
      padding: 0;
      display: flex;
    }
    img {
      width: 100px;
      margin: 0;
    }
    .info {
      display: flex;
      flex-flow: column;
      justify-content: center;
      span {
        margin: 10px;
      }
      span:first-child {
        font-size: 22px;
        font-weight: bold;
      }
      span:last-child {
        font-size: 12px;
        word-break: break-all;
      }
    }
    .el-col {
      margin-top: 15px;
    }
  }
}
</style>
