<template>
    <div class="err-msg">
      <H3 v-if="title">{{title}}</H3>
      <p v-if="msg">{{msg}}</p>
      <router-link to="/">
      <el-button type="primary">返回首页</el-button>
      </router-link>
    </div>
</template>

<script>

    export default {
        props: [
          'title',
          'msg'
        ],
        data() {
            return {
            }
        },

    }
</script>

<style lang="scss">
.err-msg {
  margin: 1em 2em;
  text-align: center;
}
</style>