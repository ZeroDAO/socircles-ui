<template>
    <el-input
      placeholder="username / address"
      v-model="input3"
      class="user-input"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        class="bg-primary border-primary"
      ></el-button>
    </el-input>
</template>

<script>
export default {
  props: ["tags"],
  data() {
    return {
      input3: ''
    };
  },
};
</script>

<style lang="scss">
  .user-input {
    max-width: 600px;
    margin: 15% auto;
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
