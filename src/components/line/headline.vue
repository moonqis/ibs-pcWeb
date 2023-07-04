<template>
  <el-row :gutter="0" style="width: 22rem">
    <el-col :span="1">
      <div v-if="!user.name">
        <el-avatar
          style="width: 3rem; height: 3rem"
          :src="url"
          fit="cover"
          @click="$router.push('/login')"
        />
      </div>
      <el-dropdown v-else @command="handleCommand">
        <el-avatar
          style="width: 3rem; height: 3rem"
          :src="user.picurl"
          fit="cover"
        />

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              command="个人信息"
              @click="$router.push('/person')"
              >我的账户</el-dropdown-item
            >
            <el-dropdown-item
              command="个人收藏"
              @click="$router.push('/foodcollect')"
              >个人收藏</el-dropdown-item
            >
            <el-dropdown-item
              command="申请记录"
              @click="$router.push('/fooddata')"
              >申请记录</el-dropdown-item
            >
            <el-dropdown-item
              command="帮助中心"
              @click="$router.push('/question')"
              divided
              >帮助中心</el-dropdown-item
            >
            <!-- <div v-if="user[0].role=='管理员'"> -->
            <!-- <el-dropdown-item
              command="系统管理"
              @click="$router.push('/question')"
              divided
              >系统管理</el-dropdown-item
            > -->
            <!-- </div> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown></el-col
    >
    <el-col :span="19" style="margin-top: 1rem; margin-left: 1rem">
      <el-button
        size="large"
        v-for="index in list"
        :key="index"
        type="primary"
        link
        @click="$router.push('/person')"
        style="
          position: relative;
          margin-left: 1.8rem;
          font-size: 1rem;
          width: 43px;
        "
      >
        <div v-if="index.name === '消息'">
          {{ index.name }}
          <div v-if="x === 0"></div>
          <div v-else>
            <div
              style="
                background-color: coral;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                position: absolute;
                margin-left: 30px;
                margin-top: -20px;
              "
            ></div>
          </div>
        </div>
        <div v-else>{{ index.name }}</div>
      </el-button>
    </el-col>
  </el-row>
</template>
  
  <script setup>
import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
import { onMounted, reactive, toRefs } from "vue";
import Api from "@/api/Api";
const state = reactive({
  user: {},
  url: require("@/assets/user.png"),

});
const handleCommand = (command) => {
  // ElMessage(command);
};
const list = [
  {
    name: "资料",
    path: "",
  },
  {
    name: "设置",
    path: "",
  },
  {
    name: "帮助",
    path: "",
  },
];
onMounted(() => {
  // state.user = JSON.parse(localStorage.getItem("user"));
  if (JSON.parse(localStorage.getItem("user"))) {
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

const { user ,url} = toRefs(state);
const x = 1;
</script>
<style>
.el-dropdown-link:focus {
  outline: none;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
}
</style>