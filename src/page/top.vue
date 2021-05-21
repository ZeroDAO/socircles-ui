<template>
  <div class="top main">
    <el-card class="top-card">
      <p class="primary"><i class="iconfont icon-paihang"></i>TOP20</p>
      <el-select v-model="algo" placeholder="请选择" @change="changeAlgo">
        <el-option
          v-for="item in algos"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-card>
    <div v-loading="topLoading">
      <el-row :gutter="10" class="users">
        <el-col :xs="24" :sm="12" :lg="8" v-for="top in topList" :key="top.id">
          <user-info
            :avatar="top.avatar"
            :username="top.username"
            :address="top.address"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { post } from "@/util/http";
import UserInfo from "@/components/UserInfo";

export default {
  data() {
    return {
      topLoading: false,
      topList: [],
      nonce: null,
      algos: [
        {
          label: "Betweenness Centrality",
          value: "betweenness",
        },
        {
          label: "Reputation",
          value: "reputation",
        },
        {
          label: "PageRank",
          value: "pagerank",
        },
        {
          label: "ArticleRank",
          value: "articleRank",
        },
        {
          label: "Degree Centrality",
          value: "degree",
        },
        {
          label: "Harmonic Centrality",
          value: "harmonic",
        },
        {
          label: "Eigenvector Centrality",
          value: "eigenvector",
        },
        {
          label: "Closeness Centrality",
          value: "closeness",
        },
      ],
      algo: "betweenness",
    };
  },
  components: {
    "user-info": UserInfo,
  },
  created: async function () {
    this.load();
  },
  methods: {
    load(algo = "betweenness") {
      this.topLoading = true;
      post("seed/top", {
        algo,
      })
        .then((res) => {
          this.topList = res;
          console.log(res);
          this.topLoading = false;
        })
        .catch((err) => {
          this.topLoading = false;
          this.$message.error("获取数据错误");
          console.log(err);
        });
    },
    changeAlgo(algo) {
      this.algo = algo;
      this.load(algo);
    },
  },
};
</script>

<style lang="scss">
.top {
  width: 100%;
  .top-card {
    margin: 20px auto;
    .el-card__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 22px;
        i {
          font-size: 30px;
          margin-right: 20px;
        }
      }
    }
  }
  .el-col {
    margin-top: 15px;
  }
}
</style>
