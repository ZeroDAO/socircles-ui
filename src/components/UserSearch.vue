<template>
  <el-input
    placeholder="username / address"
    v-model="keywords"
    class="user-input"
  >
    <el-button
      slot="append"
      icon="el-icon-search"
      class="bg-primary border-primary"
      @click="doSearch"
    ></el-button>
  </el-input>
</template>

<script>
import tools from "@/util/tools";
import router from "@/router";

export default {
  props: ["tags"],
  data() {
    return {
      keywords: null,
    };
  },
  methods: {
    doSearch() {
      let keywords = this.keywords;
      if (!keywords) {
        this.$message({
          message: "输入地址或用户名",
          type: "warning",
        });
      } else if (!tools.isEthAddress(keywords)) {
        tools
          .getInfoByName([keywords])
          .then((res) => {
            router.push({
              path: "/user/" + res[0].safeAddress,
            });
          })
          .catch((error) => {
            this.$message.error('发生错误!');
            console.log(error);
          });
      } else {
        router.push({
          path: "/user/" + keywords,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.user-input {
  max-width: 600px;
  input {
    border-radius: 20px 0 0 20px;
  }
  .el-input-group__append {
    border-radius: 0 20px 20px 0;
  }
  button {
    border-radius: 0 20px 20px 0;
  }
}
</style>
