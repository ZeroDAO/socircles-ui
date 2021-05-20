<template>
  <div class="nonce main">
    <el-card class="chare-card" v-loading="headLoading">
      <nonce-select v-on:changeNonce="newNonce($event)" />
      <el-row :gutter="20" class="records">
        <el-col xs:="24" :sm="6">
          <div class="cont">
            <div v-for="i in sysInfoColumn" :key="i">
              <div class="table">
                <span class="primary">{{ $t("page." + i) }}</span>
                <span>{{ sysInfo[i] }}</span>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
        </el-col>
        <el-col xs:="24" :sm="18" class="chart">
          <chart
            v-if="hasSeriesData"
            :seriesData="seriesData"
            :isRatio="true"
            :symbolSize="20"
            :isLegend="true"
          />
        </el-col>
      </el-row>
    </el-card>
    <el-divider class="seed-lable primary">名人堂</el-divider>
    <div v-loading="fameLoading">
      <p v-if="fameList.length == 0" class="pame-hid">未指定名人堂</p>
      <el-row v-else :gutter="10" class="fame">
        <el-col
        :xs="24"
        :sm="12"
        :lg="8"
        v-for="fame in fameList"
        :key="fame.id"
      >
          <user-info :avatar="fame.avatar" :username="fame.username" :address="fame.address" />
        </el-col>
      </el-row>
    </div>
    <el-divider class="seed-lable primary">Seeds</el-divider>
    <el-row :gutter="10" class="seeds" v-loading="listLoading">
      <el-col
        :xs="12"
        :sm="8"
        :lg="6"
        v-for="seed in seedsList"
        :key="seed.id"
      >
        <user-info
          :avatar="seed.avatar"
          :username="seed.username"
          :address="seed.address"
          type="small"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { post } from "@/util/http";
import Chart from "@/components/Chart";
import NonceSelect from "@/components/NonceSelect";
import UserInfo from "@/components/UserInfo";

export default {
  data() {
    return {
      sysInfoColumn: [
        "seed_count",
        "seed_score",
        "seed_algo",
        "user_count",
        "trust_count",
        "min_divisor",
        "damping_factor",
        "average",
      ],
      sysInfo: {
        damping_factor: 0,
        min_divisor: 0,
        nonce: 0,
        seed_algo: "betweenness",
        seed_count: 0,
        seed_score: 0,
        trust_count: 0,
        user_count: 0,
        average: 0,
      },
      seedsList: [],
      fameList: [],
      hasSeriesData: false,
      seriesData: [],
      listLoading: false,
      headLoading: false,
      fameLoading: false,
    };
  },
  components: {
    chart: Chart,
    "nonce-select": NonceSelect,
    "user-info": UserInfo,
  },
  created: async function () {
    this.load();
    console.log('nonce');
  },
  methods: {
    load(nonce = "") {
      this.listLoading = true;
      this.headLoading = true;
      this.fameLoading = true;
      post("sys/info", {
        nonce,
      })
        .then((res) => {
          this.value = res.nonce;
          this.sysInfo = res;
          nonce = res.nonce;
          return post("seed/list", {
            nonce: res.nonce,
          });
        })
        .then((res) => {
          this.seedsList = res;
          this.listLoading = false;
          return post("dashboard/list", {
            nonce: nonce,
          });
        })
        .then((res) => {
          this.seriesData = res;
          if (!!res) {
            res.forEach((e) => {
              if (e.algo == "reputation") {
                this.sysInfo.average = e.mean;
              }
            });
          }
          this.hasSeriesData = true;
          return post("seed/fame", {
            nonce: nonce,
          });
        })
        .then((res) => {
          this.fameList = res;
          this.fameLoading = false;
          this.headLoading = false;
        })
        .catch((err) => {
          this.listLoading = false;
          this.headLoading = false;
          this.fameLoading = false;
          this.$message.error(err);
          console.log(err);
        });
    },
    newNonce(nonce) {
      this.hasSeriesData = false;
      this.nonce = nonce;
      this.load(nonce);
    },
  },
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
  .pame-hid {
    text-align: center;
  }
  .chare-card {
    margin-bottom: 80px;
  }

  .seed-lable {
    margin: 45px auto;
    .el-divider__text {
      font-size: 30px;
      font-weight: bold;
    }
  }
  .seeds,
  .fame {
    .el-col {
      margin-top: 15px;
    }
  }
}
</style>
