<template>
  <div style="background-color: #fafafa">
    <div style="height: 1px"></div>
    <div style="margin: 25px">
      <el-row :gutter="20">
        <el-col :span="2"><div class="grid-content ep-bg-purple" /></el-col>

        <el-col :span="5">
          <div style="display: flex">
            <personnav></personnav>
          </div>
        </el-col>
        <el-col :span="14"
          ><el-card
            style="
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
              min-height: 800px;
              height: auto;
            "
          >
            <h2 style="position: relative; text-align: left; margin-left: 3rem">
              个人资料
            </h2>

            <div style="margin: 20px" />
            <el-form
              label-width="100px"
              :model="user"
              style="max-width: 400px; margin-left: 10%; margin-top: 5rem"
              size="large"
            >
              <el-form-item label="头像" style="align-items: center">
                <el-avatar
                  :src="user.picurl"
                  style="width: 100px; height: 100px; margin-left: 100px"
                  fit="cover"
                />
              
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="user.name" disabled />
              </el-form-item>
              <el-form-item label="英文名">
                <el-input v-model="user.english_name" disabled />
              </el-form-item>
              <el-form-item label="角色">
                <el-input v-model="user.role" disabled />
              </el-form-item>
              <el-form-item label="性别">
                <el-input v-model="user.sex" disabled />
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="user.address" disabled />
              </el-form-item>
              <el-form-item>
                <!-- <el-button
                  size="large"
                  style="
                    background-color: white;
                    color: black;
                    margin-left: 4rem;
                    width: 100px;
                  "
                  @click="handleEdit(scope.$index, scope.row)"
                >
                  编辑信息
                </el-button> -->
                <el-button
                  style="margin-left: 7rem"
                  type="danger"
                  @click="ISlogin()"
                >
                  退出登录
                </el-button>
              </el-form-item>
            </el-form>
            <div style="height: 100px"></div>
          </el-card>
        </el-col>
        <el-col :span="2"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <div></div>
    </div>
 
  </div>
</template>
    
<script setup>
import Api from "@/api/Api";
import personnav from "@/components/person/personnav.vue";
import router from "@/router";

import { onMounted, reactive, ref, toRefs } from "vue";
const state = reactive({
  user: {},
});
const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
let dialogFormVisible = ref("flase");
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
const ISlogin = () => {
  localStorage.removeItem("user");
  router.push("/");
  location.reload();
};
</script>


<style lang="less" scoped>
.el-form {
  .el-input {
    margin-left: 50px;
  }
}
</style>
    