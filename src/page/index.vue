<template>
  <div class="index">
    <el-container>
      <el-header class="win">
        <router-link to="/">
          <img src="../assets/images/logo-b.svg" />
        </router-link>
        <ul class="nav hidden-xs-only">
          <router-link to="/" :class="menuSele == '/' ? 'primary bottom-line' : 'primary-a'"
            >首页</router-link
          >
          <router-link
            to="/dashboard"
            :class="menuSele == '/dashboard' ? 'primary bottom-line' : 'primary-a'"
            >仪表盘</router-link
          >
          <router-link
            to="/nonce"
            :class="menuSele == '/nonce' ? 'primary bottom-line' : 'primary-a'"
            >名人堂</router-link
          >
          <a href="https://www.0P0.org" target="_blank" class="primary-a"
            ><i class="iconfont icon-zerodao"></i
          ></a>
        </ul>
        <div v-if="menuSele != '/'" class="search hidden-xs-only">
          <UserSearch />
        </div>

        <span
          @click="drawer = true"
          class="hidden-sm-and-up iconfont menu primary"
        >
          <i class="iconfont icon-menu-two"></i>
        </span>
      </el-header>
      <el-drawer
        size="60%"
        custom-class="drawer"
        title="导航"
        :visible.sync="drawer"
        :with-header="false"
      >
        <div @click="drawer = false">
          <router-link to="/" class="iconfont">&#xe608;&nbsp;首页</router-link>
        </div>
        <div @click="drawer = false">
          <el-divider></el-divider>
        </div>
        <div @click="drawer = false">
          <router-link to="/dashboard" class="iconfont"
            >&#xe60b;&nbsp;仪表盘</router-link
          >
        </div>
        <el-divider></el-divider>
        <div @click="drawer = false">
          <router-link to="/nonce" class="iconfont"
            >&#xe603;&nbsp;名人堂</router-link
          >
        </div>
        <el-divider></el-divider>
        <a href="https://www.0P0.org" target="_blank" class="iconfont"
          >&#xe60a;&nbsp;ZeroºDAO</a
        >
      </el-drawer>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer height="100">
        <span class="iconfont">&#xe611;SoCircles</span>
        <div>
          <a
            href="https://space.bilibili.com/26392317/"
            target="_blank"
            class="contact"
          >
            <i class="iconfont icon-bzhan"></i>
          </a>
          <a href="https://github.com/ZeroDAO" target="_blank" class="contact">
            <i class="iconfont icon-huaban88"></i>
          </a>
          <a href="https://www.huxiu.com/member/2759527.html" target="_blank" class="contact">
            <i class="iconfont icon-huxiu"></i>
          </a>
                    <a href="https://www.zhihu.com/column/c_1297328527558426624" target="_blank" class="contact">
            <i class="iconfont icon-zhihu"></i>
          </a>
          <a href="https://www.0P0.org" target="_blank" class="contact">
            <i class="iconfont icon-zerodao"></i>
          </a>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import UserSearch from "@/components/UserSearch";

export default {
  name: "HomeIndex",
  data() {
    return {
      menuSele: "/",
      drawer: false,
    };
  },
  computed: {
    userInfo() {},
  },
  components: {
    UserSearch: UserSearch,
  },
  watch: {
    $route(to, from) {
      this.menuSele = this.$route.path;
    },
  },
  created: async function () {
    this.menuSele = this.$route.path;
  },
  mounted: async function () {},
  methods: {
    menu: async function (index) {
      this.$router.push({
        path: index,
      });
    },
  },
};
</script>
<style lang="scss">
@font-face {
  font-family: "Daff";
  src: url("data:font/truetype;charset=utf-8;base64,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")
    format("truetype");
  font-weight: normal;
  font-style: normal;
}

.el-footer {
  height: 100px;
  margin-top: -20px;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .contact {
    font-size: 1.8em;
    color: #666;
    margin-left: 1em;
  }
  .contact:hover {
    font-size: 2em;
    color: rgb(48, 137, 253);
  }
}

.loading {
  margin-top: 10px;
  width: 100%;
  height: 2em;
}

.drawer {
  .el-drawer__body {
    padding: 1em;
  }
  a {
    color: #fff;
    display: block;
    margin-top: 1em;
    font-size: 1.2em;
    line-height: 3em;
  }
}

.index-c {
  color: #fff;
}

.el-header {
  display: flex;
  z-index: 99;
  align-items: center;
  img {
    width: 180px;
  }
  .menu {
    font-size: 2em;
    margin-right: 0;
    margin-left: auto;
  }
  .nav {
    text-align: left;
    display: block;
    padding-left: 20px;
    width: 100%;
    a {
      display: inline;
      line-height: 60px;
      float: left;
      padding: 0 1em;
      overflow: hidden;
    }
    ul {
      list-style: none;
    }
  }
  input {
    border-radius: 40px;
  }
  .search {
    margin-left: auto;
    max-width: 600px;
    width: 90%;
  }
}

.main {
  width: 100%;
  max-width: 1200px;
  margin: 10px auto;
}

.index {
  height: 100%;
}

.el-container.is-vertical {
  min-height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafafa;
}

.flex-n {
  width: 98%;
  max-width: 720px;
  border-radius: 0.6em;
  padding: 1em;
}

.el-card,
.el-message {
  border-radius: 10px;
}

.wrighter {
  flex-direction: column;
  display: flex;
}

.wrighter P {
  margin: 0 0 0 0.5em;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content-progress {
  display: flex;
}

.bottom-button {
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 6em;
}
.send-email {
  text-align: right;
}

.remind {
  font-size: 0.8em;
}

#app,
body,
html {
  height: 100%;
  margin: 0;
}

a {
  text-decoration: none;
}
</style>
