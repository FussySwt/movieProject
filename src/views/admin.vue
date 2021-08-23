<template>
  <el-container>
    <el-header>猫眼管理后台，欢迎：{{ name }}</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1">
          <router-link tag="div" to="/admin/users">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
          </router-link>
          <router-link tag="div" to="/admin/films">
            <el-menu-item index="2">
                <i class="el-icon-document"></i>
                <span slot="title">电影管理</span>
            </el-menu-item>
          </router-link>
          <router-link tag="div" to="/admin/cinemas">
            <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">影院管理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
Vue.use(ElementUI);
export default {
  name: "admin",
  data() {
    return {
      name: ""
    };
  },
  mounted() {
    if (localStorage.getItem("isAdmin")) {
      this.name = localStorage.getItem("name");
    }
  },
  beforeRouteEnter(to, from, next) {
    axios.get("/api2/admin").then((res) => {
      if (res.data.status === 0) {
        next();
      } else {
        next("/center/login");
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  padding-left: 60px;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
