<template>
  <div>
    <div v-if="isdisplay">
      <el-affix :offset="0">
        <div style="height: 0.9rem; width: 100%; background-color: white"></div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <span
            style="
              padding-top: 0.5rem;
              margin-inline: 1rem;
              font-family: Helvetica;
              font-size: 1.5rem;
              font-weight: 700;
            "
            @click="Gotoshouye"
          >
            IBS食物管理系统
          </span>
          <!-- <h4 style="margin-inline: 1rem; font-family: Helvetica; margin-bottom: 20px;font-size: 1.5rem"
      @click="Gotoshouye">IBS食物管理系统</h4> -->
          <el-menu-item index="/">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouye1"></use>
            </svg>
            首页
          </el-menu-item>
          <el-menu-item index="/food">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mifan"></use>
            </svg>
            食物
          </el-menu-item>

          <!-- <el-menu-item index="/learn"
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gongzuotai"></use></svg
        >学习</el-menu-item
      > -->
          <el-menu-item index="/notice"
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Diary_icon"></use></svg
            >公告</el-menu-item
          >
          <!-- <el-menu-item index="5"> -->
          <el-popover
            placement="bottom"
            trigger="click"
            width="300px"
            propper-style="height:300px"
            content="this is content, this is content, this is content"
          >
            <template #reference>
              <el-button
                text
                style="position: relative; width: 120px; height: 56px"
                ><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xiazai"></use></svg
                >下载客户端 &nbsp;
              </el-button>
            </template>

            <h2 style="margin-left: 80px">请扫码下载</h2>
            <img src="https:mingxlab-1258665547.cos.ap-shanghai.myqcloud.com/ibs-food/app1.jpg" style="width: 280px" />
          </el-popover>
          <!-- </el-menu-item> -->
          <!-- <el-menu-item index="/test"> 测试</el-menu-item> -->
          <div style="position: absolute; right: 6rem">
            <headline></headline>
          </div>
        </el-menu>
      </el-affix>
    </div>
  </div>
  <router-view />
</template>

<script setup>
import { reactive, ref, onMounted, toRefs, computed, watch } from "vue";
import { useRouter } from "vue-router";
import headline from "@/components/line/headline.vue";
import store from "./store";
import Api from "./api/Api";

const router = useRouter();

let activeIndex = ref("/");
const activeIndex2 = ref("1");
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
  router.push(key);
};
const Gotoshouye = (key) => {
  // console.log(key)
  router.push("/");
};
onMounted(() => {
  activeIndex = store.state.apptitle;
  if (localStorage.getItem("user")) {
    var user = JSON.parse(localStorage.getItem("user"));
    Api.getoneuser(user[0].name)
      .then((data) => {
        Object.assign(state.user, data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

const state = reactive({
  isdisplay: true,
  user: {},
});

const { isdisplay, user } = toRefs(state);

watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    //要执行的方法
    console.log(toPath, "toPath");
    if (toPath == "/login" || toPath == "/sign") {
      state.isdisplay = false;
    } else {
      state.isdisplay = true;
    }
  },
  { immediate: true, deep: true }
);
</script>

<style lang="less">
.icon {
  width: 2rem;
  height: 1.5rem;
}
.el-menu-item {
  min-width: 6.6rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
