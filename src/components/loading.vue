<template>
    <div class="loading" v-loading="loading"></div>
</template>

<script>

    export default {
        props: [
          'loading',
          'isMore'
        ],
        data() {
            return {
            }
        },
        watch: {
        }
    }
</script>

<style lang="scss">
.err-msg {
  .loading {
    width: 100%;
    height: 1em;
  }
}
</style>
