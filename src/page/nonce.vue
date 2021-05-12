<template>
  <div class="nonce main">
    <el-card class="chare-card" v-loading="headLoading">
      <nonce-select v-on:changeNonce="newNonce($event)" />
      <el-row :gutter="20" class="records">
        <el-col xs:="24" :sm="6">
          <div class="cont">
            <div v-for="i in sysInfoColumn" :key="i.value">
              <div class="table">
                <span class="primary">{{ i.name }}</span>
                <span>{{ sysInfo[i.value] }}</span>
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
    <el-divider class="seed-lable primary">Hall of Fame</el-divider>
    <el-row :gutter="10" class="seeds" v-loading="listLoading">
      <el-col
        :xs="24"
        :sm="12"
        :lg="6"
        v-for="seed in seedsList"
        :key="seed.id"
      >
        <el-card shadow="hover" @click.native="toUser(seed.address)">
          <img
            :src="
            seed.avatar ?
            'https://circles-ubi.s3.amazonaws.com/uploads/avatars/' + seed.avatar : 
            nullImage"
          />
          <div class="info">
            <span class="hover-primary">{{ seed.username }}</span>
            <span class="text-second">{{ seed.address }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { post } from "@/util/http";
import Chart from "@/components/Chart";
import NonceSelect from "@/components/NonceSelect";
import router from "@/router";
import tools from "@/util/tools";

export default {
  data() {
    return {
      nullImage: require('../assets/images/null.svg'),
      sysInfoColumn: [
        {
          name: "种子数量",
          value: "seed_count",
        },
        {
          name: "种子权重",
          value: "seed_score",
        },
        {
          name: "种子算法",
          value: "seed_algo",
        },
        {
          name: "用户数量",
          value: "user_count",
        },
        {
          name: "关系数量",
          value: "trust_count",
        },
        {
          name: "最小除数",
          value: "min_divisor",
        },
        {
          name: "阻尼系数",
          value: "damping_factor",
        },
        {
          name: "平均值",
          value: "average",
        },
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
      hasSeriesData: false,
      seriesData: [],
      listLoading: false,
      headLoading: false,
    };
  },
  components: {
    chart: Chart,
    "nonce-select": NonceSelect,
  },
  created: async function () {
    this.load();
  },
  methods: {
    toUser(address) {
      console.log(address);
      router.push({
        path: "/user/" + tools.toChecksumAddress(address),
      });
    },
    load(nonce = "") {
      this.listLoading = true;
      this.headLoading = true;
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
          this.headLoading = false;
        })
        .catch((err) => {
          this.listLoading = false;
          this.headLoading = false;
          this.$message.error("获取数据错误");
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
