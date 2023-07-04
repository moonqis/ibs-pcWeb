<template>
  <el-card shadow="always" style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05)">
    <div style="height: auto">
      <el-avatar
        :src="user.picurl"
        style="width: 100px; height: 100px; margin-top: 30px"
        fit="cover"
      />
      <p style="font-size: 19px">{{ user.make_name }}</p>
      <h5>{{ user.role }}</h5>
    </div>
    <el-menu
      :default-active="$route.path"
      :default-openeds="Index"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      style="width: 250px; border: 0px solid #aaaaaa"
      @select="handleSelect"
    >
      <div v-if="user.role == '管理员'">
        <el-sub-menu index="0">
          <template #title>
            <el-icon><setting /></el-icon>
            <span style="font-size: 20px">系统管理</span>
          </template>
          <el-menu-item index="/userlist">用户管理</el-menu-item>
          <el-menu-item index="/foodcheck">食物新增审核</el-menu-item>
          <el-menu-item index="/foodfeed">食物数据反馈</el-menu-item>
          <el-menu-item index="/sortcheck">食物种类审核</el-menu-item>
          <el-menu-item index="/feedlist">用户反馈</el-menu-item>
          <el-menu-item index="/addnotice">公告发布</el-menu-item>
          <el-menu-item index="/userrole">角色申请</el-menu-item>
        </el-sub-menu>
      </div>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><User /></el-icon>
          <span style="font-size: 20px">我的账户</span>
        </template>
        <el-menu-item index="/person">个人资料</el-menu-item>
        <el-menu-item index="/personsafe">安全设置</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span style="font-size: 20px">个人收藏</span>
        </template>
        <el-menu-item index="/foodcollect">食物收藏</el-menu-item>
        <!-- <el-menu-item index="/coursecollect">课程收藏</el-menu-item> -->
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><document /></el-icon>
          <span style="font-size: 20px">申请记录</span>
        </template>
        <el-menu-item index="/fooddata">食物数据</el-menu-item>
        <el-menu-item index="/sortdata">种类数据</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <el-icon><location /></el-icon>
          <span style="font-size: 20px">帮助中心</span>
        </template>
        <el-menu-item index="/question">常见问题</el-menu-item>
        <el-menu-item index="/feedback">意见反馈</el-menu-item>
        <!-- <el-menu-item index="/state">详细说明</el-menu-item> -->
      </el-sub-menu>
      <div v-if="user.role=='用户'">
        <el-sub-menu index="5">
          <template #title>
            <el-icon><User /></el-icon>
            <span style="font-size: 20px">角色申请</span>
          </template>
          <el-menu-item index="/getrole">申请成为营养师</el-menu-item>
        </el-sub-menu>
      </div>
      <div style="height: 180px"></div>
    </el-menu>
  </el-card>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  User,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import store from "@/store";
import { onMounted, reactive, toRefs } from "vue";
import Api from "@/api/Api";
let Index = reactive(store.state.personIndex);
const state = reactive({
  user: {},
});
const router = useRouter();
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
  store.state.personIndex.push(...keyPath);
  Index = store.state.personIndex.filter(
    (item, index) => store.state.personIndex.indexOf(item) === index
  );

  console.log(Index);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
  var new_arr = [];
  for (let i = 0, len = Index.length; i < len; i++) {
    if (Index[i] != key) {
      new_arr.push(Index[i]);
    }
  }
  setTimeout(() => {
    Index = new_arr;
    store.state.personIndex = new_arr;
    console.log(Index);
  }, 0);
};
const handleSelect = (key, keyPath) => {
  router.push(key);

  console.log(Index);
};
onMounted(() => {
  var user = JSON.parse(localStorage.getItem("user"));
  Api.getoneuser(user[0].name)
    .then((data) => {
      Object.assign(state.user, data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});
const { user } = toRefs(state);
</script>