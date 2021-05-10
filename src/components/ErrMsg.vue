<template>
    <div class="err-msg">
      <H3 v-if="title">{{title}}</H3>
      <p v-if="msg">{{msg}}</p>
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
        watch: {
        }
    }
</script>

<style lang="less">
.err-msg {
  margin: 1em 2em;
}
</style>

<style>
</style>
