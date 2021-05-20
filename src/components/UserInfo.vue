<template>
  <div :class="type == 'small' ? 'small' : 'normal'">
    <el-card shadow="hover" @click.native="toUser(address)">
      <img
        :src="
          avatar
            ? 'https://circles-ubi.s3.amazonaws.com/uploads/avatars/' + avatar
            : nullImage
        "
      />
      <div class="info">
        <span class="hover-primary">{{ username }}</span>
        <span class="text-second">{{ address }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>

import router from "@/router";
import tools from "@/util/tools";

export default {
  props: ["avatar", "username", "address", "type"],
  data() {
    return {
      nullImage: require("../assets/images/null.svg"),
    };
  },
  methods: {
    toUser(address) {
      console.log(address);
      router.push({
        path: "/user/" + tools.toChecksumAddress(address),
      });
    },
  },
};
</script>

<style lang="scss">
.small,
.normal {
  .el-card__body {
    padding: 0;
    display: flex;
  }

  .info {
    display: flex;
    flex-flow: column;
    justify-content: center;
    span:first-child {
      font-weight: bold;
    }
    span:last-child {
      font-size: 12px;
      word-break: break-all;
    }
  }
  .el-col {
    margin-top: 15px;
  }
}
.small {
  img {
    width: 60px;
    height: 60px;
    margin: 0;
  }
  span {
    margin: 3px 10px;
  }
  span:first-child {
    font-size: 16px;
  }
}
.normal {
  img {
    width: 100px;
    height: 100px;
    margin: 0;
  }
  span {
    margin: 10px;
  }
  span:first-child {
    font-size: 22px;
    font-weight: bold;
  }
}
</style>