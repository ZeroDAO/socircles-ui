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
      <el-input v-model="from" placeholder="From Address / Username"></el-input>
      <i class="iconfont icon-ttd-copy-copy rel-icon"></i>
      <el-input v-model="to" placeholder="To Address / Username"></el-input>
      <el-button type="primary" round @click="doSearch">找关系</el-button>
      <div class="rel-res" v-if="showRes && hasRel" v-loading="loading">
        <el-card shadow="hover" class="bg-primary" @click.native="toUser(from)">{{ from }}</el-card>
        <i class="iconfont icon-ttd-copy-copy rel-icon"></i>
        <div v-for="item in path" :key="item">
          <el-card shadow="hover" class="border-primary primary" @click.native="toUser(item)">{{
            item
          }}</el-card>
          <i class="iconfont icon-ttd-copy-copy rel-icon"></i>
        </div>
        <el-card shadow="hover" class="bg-primary" @click.native="toUser(to)">{{ to }}</el-card>
      </div>
      <p v-if="showRes && !hasRel">用户不存在或未找到8度以内关系</p>
    </div>
  </div>
</template>

<script>
// import localstorage from "@/util/localstorage";
import UserSearch from "@/components/UserSearch";
import tools from "@/util/tools";
import { post } from "@/util/http";
import router from "@/router";

let polarData = [];

export default {
  data() {
    return {
      searchType: "user",
      from: "",
      to: "",
      path: [],
      hasRel: false,
      showRes: false,
      loading: false,
    };
  },
  components: {
    UserSearch: UserSearch,
  },
  created: async function () {},
  methods: {
    toUser(address) {
      router.push({
        path: "/user/" + tools.toChecksumAddress(address),
      });
    },
    doSearch() {
      this.path = [];

      let from = this.from;
      let to = this.to;

      if (!from || !to) {
        this.$message({
          message: "输入地址或用户名",
          type: "warning",
        });
        return;
      }

      this.showRes = true;
      this.hasRel = true;
      this.loading = true;

      let nameArr = [from, to].filter((user) => !tools.isEthAddress(user));

      if (nameArr.length > 0) {
        tools
          .getInfoByName(nameArr)
          .then((res) => {
            res.forEach((e) => {
              if (e.username == from) {
                from = e.safeAddress;
              }
              if (e.username == to) {
                to = e.safeAddress;
              }
            });
          })
          .catch((error) => {
            this.$message.error("获取地址发生错误");
            this.showRes = false;
            this.loading = false;
            console.log(error);
          });
      }

      if (from == to) {
        this.$message("目标用户与来源用户不可相同");
      }

      post("user/path", {
        source: from,
        target: to,
      })
        .then((res) => {
          if (!res) {
            this.hasRel = false;
          } else {
            res.shift();
            this.path = res;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.$message.error("意外错误");
          console.log(error);
          this.loading = false;
          this.showRes = false;
        });
    },
  },
};
</script>
<style lang="scss">
.home {
  max-width: 1024px;
  margin: 0 auto;
  text-align: center;
  height: 100%;
  .user-input {
    margin: 20% auto;
  }
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
