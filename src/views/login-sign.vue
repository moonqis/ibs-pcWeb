<template>
  <div class="login">
    <div class="form">
      <div style="position: absolute; left: 14rem; top: 1rem">
        <h1 style="color: aliceblue">账号注册</h1>
      </div>
      <div style="position: absolute; left: 3rem; top: 8rem">
        <el-form :model="user">
          <el-form-item :label-width="formLabelWidth">
            <template #label>
              <div style="color: white; font-size: 16px">账号</div>
            </template>
            <el-input
              v-model="user.name"
              placeholder="请输入账号"
              style="width: 20rem"
              maxlength="20"
            />
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <template #label>
              <div style="color: white; font-size: 16px">密码</div>
            </template>
            <el-input
              v-model="user.password"
              type="password"
              placeholder="请输入密码"
              show-password
              style="width: 20rem"
              maxlength="20"
            />
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <template #label>
              <div style="color: white; font-size: 16px">再次输入</div>
            </template>
            <el-input
              v-model="user.password1"
              type="password"
              placeholder="请输入密码"
              show-password
              style="width: 20rem"
              maxlength="20"
            />
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-button
              color="deepskyblue"
              plain
              @click="submit"
              style="
                width: 100px;
                height: 40px;
                position: relative;
                left: 5rem;
                top: 1rem;
              "
              >注册</el-button
            >
          </el-form-item>
          <el-form-item>
            <div style="margin-top: 0.9rem; margin-left: 5rem">
              <el-button
                type="primary"
                text
                style="color: aqua; margin-left: 5rem"
                :link="true"
                @click="$router.push('/login')"
                >账号登陆</el-button
              >
              &nbsp;&nbsp;|
              <el-button type="primary" text style="color: aqua" :link="true"
                >忘记密码</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
  <script>
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  toRefs,
  computed,
  h,
} from "vue";
import { useRouter } from "vue-router";
import store from "@/store/index.js";
import Api from "@/api/Api";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      user: {
        name: "",
        password: "",
        password1: "",
        picurl:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        role:'用户',
        food_collect:'',
        sex:'',
        address:'',
        tel:'',
        state:'',
        create_date:''
      },
      formLabelWidth: "110px",
    });
    const submit = () => {
      if (state.user.name && state.user.password && state.user.password) {
        if (state.user.password == state.user.password1) {
          Api.getoneuser(state.user.name)
            .then((data) => {
              console.log(data);
              if (data.length > 0) {
                ElMessage({
                  message: "账号已存在",
                  type: "warning",
                });
              } else {
                console.log('create')
                state.user.create_date=new Date()
                Api.createuser(state.user)
                  .then((data) => {
                    ElMessage({
                      message: "注册成功",
                      type: "success",
                    });
                    router.push("/login");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          ElMessage({
            message: "密码输入不一致",
            type: "warning",
          });
        }
      } else {
        ElMessage({
          message: "请输入账号密码",
          type: "warning",
        });
      }
    };
    return {
      ...toRefs(state),
      submit,
    };
  },
});
</script>
  
<style>
.login {
  background: url("@/assets/beijin.jpg") no-repeat;
  background-position: center;
  height: 105vh;
  width: 105%;
  margin-left: -5%;
  margin-top: -5vh;

  background-size: cover;
  position: fixed;
}

.form {
  width: 40rem;
  height: 25rem;
  z-index: 5;
  position: absolute;
  left: 30rem;
  top: 12rem;
  background: rgba(23, 22, 26, 0.564);
}
</style>
  