<template>
  <div class="user main">
    <div class="address">
      <span class="text-second">
        0x42cEDde51198D1773590311E2A340DC06B24cB37
      </span>
      <router-link to="/">
        <img src="../assets/images/circles-logo.svg" />
      </router-link>
    </div>
    <el-divider></el-divider>

    <div class="repu">
      <div class="nonce">
        <span>Nonce</span>
        <el-select v-model="value" placeholder="请选择" size="mini">
          <el-option
            v-for="item in nonceList"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button size="mini" type="primary" plain>更多详情</el-button>
      </div>
      <div class="repu-value">
        <span class="primary">Reputationt</span>
        <span class="text-second">12.88</span>
      </div>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="6" v-for="o in 8" :key="o">
        <span class="primary">PageRank</span>
        <span class="daff-normal text-second">0.354</span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>

<script>

export default {
  data() {
    return {
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
      value: "1",
    };
  },
  components: {},
  created: async function () {},
  methods: {},
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
    .el-select {
      width: 80px;
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
