<template>
  <div class="home">
    <div>
      <el-radio-group v-model="searchType" :border="true">
        <el-radio-button label="user">
          <i class="iconfont icon-ren"></i>
        </el-radio-button>
        <el-radio-button label="rel">
          <i class="iconfont icon-shuangxiang"></i>
        </el-radio-button>
      </el-radio-group>
    </div>
    <UserSearch v-if="searchType == 'user'"></UserSearch>
    <div v-else class="rel-input">
      <el-input
        v-model="input"
        placeholder="From Address / Username"
      ></el-input>
      <i class="iconfont icon-ttd-copy-copy rel-icon"></i>
      <el-input v-model="input" placeholder="To Address / Username"></el-input>
      <el-button type="primary" round>找关系</el-button>
      <div class="rel-res">
        <el-card shadow="hover" class="border-primary primary">0x42cEDde51198D1773590311E2A340DC06B24cB37</el-card>
        <i class="iconfont icon-ttd-copy-copy rel-icon"></i>
        <el-card shadow="hover" class="border-primary primary">0x42cEDde51198D1773590311E2A340DC06B24cB37</el-card>
      </div>
    </div>
  </div>
</template>

<script>
// import localstorage from "@/util/localstorage";
import UserSearch from "@/components/UserSearch";
const createKeccakHash = require("keccak");

let polarData = [];

export default {
  data() {
    return {
      searchType: "user",
    };
  },
  components: {
    UserSearch: UserSearch,
  },
  created: async function () {
  },
  methods: {

  },
};
</script>
<style lang="scss">
.home {
  max-width: 1024px;
  margin: 0 auto;
  text-align: center;
  height: 100%;
  .rel-input {
    max-width: 600px;
    margin: 10% auto;
    .el-input {
      margin: 10px auto;
    }
    input {
      border-radius: 20px;
    }
    .el-button {
      margin-top: 20px;
    }
    .el-card {
      border-radius: 20px;
      .el-card__body {
        padding: 10px;
        font-size: 12px;
      }
      margin: 5px;
    }
    .rel-res {
      margin: 30px auto;
    }
  }
}
.el-main {
  width: 100%;
  overflow: initial;
}

.el-radio-group {
  margin: 0 auto;
  border-radius: 100px;
  overflow: hidden;
}

.el-radio-button__inner {
  border: none;
}

.el-radio-button:first-child .el-radio-button__inner {
  border: none;
}
</style>
