<template>
  <div class="dashboard main">
    <el-row :gutter="20" class="apps" v-loading="loading">
      <el-col :xs="24" :sm="12" v-for="item in list" :key="item.algo">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="text-second">{{ item.algo }}</span>
          </div>
          <div class="content">
            <div class="list">
              <div class="metrics">
                <span class="primary">最小值</span>
                <span class="value">{{ item.min }}</span>
              </div>
              <div class="metrics">
                <span class="primary">最大值</span>
                <span class="value">{{ item.max }}</span>
              </div>
              <div class="metrics">
                <span class="primary">平均值</span>
                <span class="value">{{ item.mean }}</span>
              </div>
            </div>
            <div class="chart">
              <chart :seriesData="[item]" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { post } from "@/util/http";
import Chart from "@/components/Chart";

export default {
  data() {
    return {
      list: {},
      loading: false,
    };
  },
  components: {
    chart: Chart,
  },
  created: async function () {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      post("dashboard/list")
        .then((res) => {
          this.list = res;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },
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
