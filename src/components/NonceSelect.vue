<template>
  <div class="select">
    <span class="lable">NONCE</span>
    <el-select v-model="nonce" placeholder="请选择" @change="changeNonce">
      <el-option
        v-for="item in nonceList"
        :key="item.nonce"
        :label="item.nonce"
        :value="item.nonce"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nonce: 0,
    };
  },
  computed: {
    ...Vuex.mapState(["nonceList"]),
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      // 从缓存中获取，如果缓存中没有则加载
      this.$store
        .dispatch("SetNonceList")
        .then((nonce) => {
          this.nonce = nonce;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeNonce: function (nonce) {
      this.$emit("changeNonce", nonce);
    },
  },
};
</script>

<style lang="scss">
.select {
  position: relative;
  .lable {
    position: absolute;
    z-index: 1;
    background: #0bbcc2;
    padding: 10px 10px;
    color: #fff;
    border-radius: 5px 0 0 5px;
  }
  .el-input--suffix .el-input__inner {
    text-align: center !important;
  }
}
</style>
