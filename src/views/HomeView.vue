<template>
  <div class="home">
    <el-card
      shadow="never"
      style="margin-block: 1rem; width: 97%; margin-left: 1rem"
    >
      <!-- <p style="font-size: 1.8rem">欢迎使用IBS食物管理系统</p> -->
      <el-carousel :interval="4000" type="card" height="350px">
        <el-carousel-item v-for="item in indeximg" :key="item">
          <img :src="item.pic" style="height: 350px; width: 100%" />
          <!-- <h3 text="3xl" justify="center">{{ item.no }}</h3> -->
        </el-carousel-item>
      </el-carousel>
    </el-card>

    <!-- 左侧栏 -->
    <el-row :gutter="0">
      <el-col :span="15">
        <div class="home-left">
          <h1
            style="font-size: 1.2rem; margin-bottom: -10px; padding-right: 75%"
          >
            数据统计：
          </h1>

          <div
            class="conlist"
            v-for="index in state.leibie1"
            :key="index"
            style="width: 15rem"
          >
            <el-card
              :body-style="{ padding: '1px' }"
              shadow="hover"
              @click="GotoFoodview(index.name)"
            >
              <el-row :gutter="0">
                <el-col :span="19">
                  <el-progress
                    :width="85"
                    :stroke-width="6"
                    type="circle"
                    :percentage="100"
                    style="position: absolute; left: 0.8rem; top: 1.3rem"
                    ><h2 style="font-size: 25px">{{ index.number }}</h2>
                  </el-progress>
                  <!-- <svg class="icon1" aria-hidden="true">
                    <use xlink:href="#icon-shouye1"></use>
                  </svg> --> </el-col
                ><el-col :span="5"
                  ><div class="grid-content ep-bg-purple" />

                  <h4 class="leibie">{{ index.name }}</h4>
                </el-col>
              </el-row>
            </el-card>
          </div>
          <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        </div>
      </el-col>

      <!-- 右侧栏 -->
      <el-col :span="9">
        <div class="home-right">
          <!-- 公告 -->
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>公告</span>
                <el-button class="button" text @click="$router.push('/notice')">查看更多</el-button>
              </div>
            </template>
            <div
              v-for="o in notice"
              :key="o.id"
              class="text item"
              style="font-size: 1rem; text-align: left"
            >
              <el-row :gutter="0" @click="Golearn(o)">
                <el-col
                  :span="15"
                  style="
                  
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  {{ o.title }}
                </el-col>
                <el-col :span="6" />
                <el-col :span="3">
                  <el-icon><ArrowRightBold/></el-icon>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <h1 style="font-size: 1.2rem; margin-top: 5rem; padding-right: 85%">
      健康学习：
    </h1>

    <div class="learn">
      <el-row :gutter="0">
        <el-col :span="2"></el-col>
        <el-col :span="20">
          <div class="block text-center" m="t-4">
            <el-carousel
              trigger="click"
              height="28rem"
              style="margin-top: 3rem"
              :interval="4000"
            >
              <el-carousel-item v-for="item in imgIndex2" :key="item">
                <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                <img :src="item.pic" style="height: 28.5rem; width: 100%" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <endline></endline>
</template>

<script setup>
import { reactive, ref, onMounted, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import endline from "@/components/line/endline.vue";
import Api from "../api/Api";
import store from "@/store";
import { Search,ArrowRightBold } from "@element-plus/icons-vue";

const router = useRouter();

// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
const state = reactive({
  leibie1: [
    {
      name: "米饭",
      icon: "iconfont  icon-mifan",
      number: 100,
    },
    {
      name: "饮料",
      icon: "iconfont  icon-pijiu",
      number: 100,
    },
    {
      name: "水果",
      icon: "iconfont  icon-pingguo",
      number: 100,
    },
    {
      name: "肉类",
      icon: "icon-mifan",
      number: 100,
    },
    {
      name: "蔬菜",
      icon: "icon-mifan",
      number: 100,
    },
  ],
  index: 7,
  value: "",
  notice: [],
});
const indeximg = [
  { pic: require("@/assets/img/首页1.jpg"), no: 1 },
  { pic: require("@/assets/img/首页2.jpg"), no: 2 },
  { pic: require("@/assets/img/首页3.jpg"), no: 3 },
  { pic: require("@/assets/img/首页4.jpg"), no: 4 },
  { pic: require("@/assets/img/首页5.jpg"), no: 5 },
  { pic: require("@/assets/img/首页6.jpg"), no: 5 },
  // {pic: '@/assets/logo.png',no:5},
];
const imgIndex2 = [
  { pic: require("@/assets/img/学习1.jpg"), no: 1 },
  { pic: require("@/assets/img/学习2.jpg"), no: 2 },
  { pic: require("@/assets/img/学习3.jpg"), no: 3 },
];
const foodlist = [];

const GotoFoodview = (key) => {
  store.state.Tablesort = key;
  // store.state.activename=key;
  localStorage.removeItem("Tablesort");

localStorage.setItem("Tablesort", key);
  // console.log(store.state.Tablesort);
  router.push("/food");
  // router.push('/food')
};
const Golearn = (key) => {
  console.log(key);
};
onMounted(() => {
  Api.findallfood()
    .then((data) => {
      // tlist=data
      Object.assign(state.leibie1, data);
      // Object.assign(store.state.foodsort, data);
      // console.log(store.state.foodsort);
    })
    .catch((err) => {
      console.log(err);
    });

  Api.findallnotice()
    .then((data) => {
      // tlist=data
      Object.assign(state.notice, data);
      setTimeout(() => {
        if (state.notice.length > 9) state.notice.length = 9;
      }, 30);
    })
    .catch((err) => {
      console.log(err);
    });
});
// export default {
//   name: "HomeView",
//   components: {
//     HelloWorld,
//   },
// };

const { notice } = toRefs(state);
</script>

<style>
.home {
  max-width: 99%;
}
.home-left {
  max-width: 94%;
  padding-left: 5%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.conlist {
  width: 60%;
  margin-bottom: -15px;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-top: 2rem;
}
.leibie {
  font-size: 1.3rem;
  position: absolute;
  left: 50%;
  top: 50%;
}
.learn {
  margin-top: 2rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 88%;
  height: 35rem;
  margin-left: 5%;
}
.el-carousel {
  margin: 1rem;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.home-left .el-card {
  height: 8rem;
}
.home-left .el-row {
  position: relative;
  margin-bottom: -15px;
}
.home-right {
  max-width: 98%;
  padding-right: 1%;
  margin-top: 5rem;
}
.home-right .el-card {
  position: relative;
  margin-top: -15px;
  margin-left: -25px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.icon1 {
  width: 4.5rem;
  position: absolute;
  left: 15%;
  top: -25%;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
