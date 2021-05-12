<template>
  <div class="user main">
    <err-msg title="未找到该用户" msg="请检查地址是否正确" v-if="err" />
    <div v-else>
      <div class="address">
        <span class="text-second">
          {{ address }}
        </span>
        <a
          :href="'https://circles.garden/profile/' + address"
          target="_blank"
        >
          <img src="../assets/images/circles-logo.svg" />
        </a>
      </div>
      <el-divider></el-divider>

      <div class="repu" v-loading="repuLoading">
        <div class="nonce">
          <nonce-select v-on:changeNonce="newNonce($event)" />
        </div>
        <div class="repu-value">
          <span class="primary">Reputationt</span>
          <span class="text-second">{{ userInfo.reputation }}</span>
        </div>
      </div>
      <el-divider></el-divider>
      <el-row :gutter="20" v-loading="infoLoading">
        <el-col :xs="12" :sm="6" v-for="i in userColumn" :key="i.name">
          <span class="primary">{{ i.name }}</span>
          <span class="daff-normal text-second">{{
            userInfo[i.value].toFixed(2)
          }}</span>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import { post } from "@/util/http";
import tools from "@/util/tools";
import NonceSelect from "@/components/NonceSelect";
import ErrMsg from "@/components/ErrMsg";

export default {
  data() {
    return {
      address: "",
      err: false,
      infoLoading: false,
      repuLoading: false,
      userInfo: {
        articleRank: 0,
        closeness: 0,
        degree: 0,
        weight: 0,
        reputation: 0,
        betweenness: 0,
        pagerank: 0,
        harmonic: 0,
        eigenvector: 0,
      },
      reputation: {},
      nonce: 0,
      userColumn: [
        {
          name: "Reputation",
          value: "reputation",
        },
        {
          name: "ArticleRank",
          value: "articleRank",
        },
        {
          name: "Closeness",
          value: "closeness",
        },
        {
          name: "Aegree",
          value: "degree",
        },
        {
          name: "Betweenness",
          value: "betweenness",
        },
        {
          name: "Pagerank",
          value: "pagerank",
        },
        {
          name: "Harmonic",
          value: "harmonic",
        },
        {
          name: "Aigenvector",
          value: "eigenvector",
        },
      ],
    };
  },
  components: {
    "nonce-select": NonceSelect,
    "err-msg": ErrMsg,
  },
  created: async function () {
    let address = this.$route.params.address;
    if (!tools.isEthAddress(address)) {
      this.err = true;
    }
    this.address = tools.toChecksumAddress(address);
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.infoLoading = true;
      this.repuLoading = true;
      post("user/info", {
        address: this.address,
      })
        .then((res) => {
          this.userInfo = res;
          this.reputation[res.nonce] = res.reputation;
          this.infoLoading = false;
          this.repuLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.infoLoading = false;
          this.repuLoading = false;
        });
    },
    newNonce(nonce) {
      if (this.reputation[nonce]) {
        this.nonce = nonce;
      } else {
        this.repuLoading = true;
        post("user/reputationt", {
          nonce: nonce,
          address: this.address,
        })
          .then((res) => {
            this.reputation[nonce] = res.reputation;
            this.nonce = nonce;
            this.repuLoading = false;
          })
          .catch((err) => {
            this.repuLoading = false;
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss">
.user {
  .address {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;
    img {
      width: 20px;
    }
    span {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .daff-normal {
    font-family: "Daff";
    font-size: 32px;
  }
  .el-col {
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
    padding: 15px;
  }
  .repu {
    .nonce {
      text-align: right;
    }
    .repu-value {
      text-align: center;
      margin: 48px auto 56px auto;
      span:first-child {
        font-size: 16px;
        display: block;
      }
      span:last-child {
        font-size: 56px;
        font-family: "Daff";
      }
    }
  }
}
</style>
