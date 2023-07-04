<template>
  <div class="login">
    <div class="form">
      <div style="position: absolute; left: 16rem; top: 1.9rem">
        <h1 style="color: aliceblue">登陆</h1>
      </div>
      <div style="position: absolute; left: 3rem; top: 9.1rem">
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
              >登陆</el-button
            >
          </el-form-item>
          <el-form-item>
            <div style="margin-top: 0.9rem; margin-left: 5rem">
              <el-button
                type="primary"
                text
                style="color: aqua; margin-left: 5rem"
                :link="true"
                @click="$router.push('/sign')"
                >注册账号</el-button
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
import JsEncrypt from "jsencrypt";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      user: {
        name: "",
        password: "",
      },
      getuser: {},
      formLabelWidth: "110px",
    });
    let en = new JsEncrypt();
    const submit = () => {
      console.log(store.state.key1);
      en.setPublicKey(store.state.key1);
      setTimeout(() => {
        Api.login({
          name: state.user.name,
          password: en.encrypt(state.user.password),
        }).then((data) => {
          if (data == "密码错误") {
            ElMessage({
              message: "密码错误",
              type: "warning",
            });
          } else if (data == "账号不存在或登录错误" || data == "账号不存在") {
            ElMessage({
              message: "账号不存在",
              type: "warning",
            });
          } else if (data[0].id > 0) {
            console.log(data);

            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(data));

            console.log(localStorage);
            router.push("/");
            store.state.isLogin = true;
            ElMessage({
              message: "登陆成功",
              type: "success",
            });
          }
        });
      }, 20);

  
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
