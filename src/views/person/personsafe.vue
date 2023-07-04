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
              z-index: 999;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
              min-height: 800px;
              height: auto;
            "
          >
            <h2 style="position: relative; text-align: left; margin-left: 3rem">
              安全设置
            </h2>
            <div style="align-items: center; margin-top: 5rem">
              <el-row>
                <el-col :span="4">
                  <el-avatar
                    shape="square"
                    :size="80"
                    fit="contain"
                    :src="url"
                  />
                </el-col>
                <el-col :span="7">
                  <p
                    style="
                      font-size: 18px;
                      font-weight: 500;
                      margin-top: 8px;
                      float: left;
                    "
                  >
                    登录密码&nbsp;&nbsp;&nbsp;&nbsp;**********
                  </p>
                  <p
                    style="
                      font-size: 16px;
                      font-weight: 400;
                      float: left;
                      margin-top: -5px;
                      color: #777;
                    "
                  >
                    请及时/定时更换登录密码
                  </p>
                </el-col>
                <el-col :span="4"></el-col>

                <el-col :span="8">
                  <el-button
                    @click="dialogFormVisible = true"
                    round
                    style="
                      margin-top: 1.4rem;
                      width: 136px;
                      height: 40px;
                      line-height: 40px;
                      text-align: center;
                      font-size: 16px;
                      border-radius: 20px;
                      border: solid 1px rgba(40, 116, 219, 0.4);
                    "
                    ><span>修改密码</span></el-button
                  >
                </el-col>
              </el-row>
            </div>
            <div style="height: 100px;"></div>

          </el-card></el-col
        >
        <el-col :span="2"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <div></div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input
            v-model="input1"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input
            v-model="input2"
            type="password"
            placeholder="请输入密码"
            show-password
          /> </el-form-item
        ><el-form-item label="再次输入" :label-width="formLabelWidth">
          <el-input
            v-model="input3"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="Update()"> 确认修改 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
      
  <script setup>
import Api from "@/api/Api";
import personnav from "@/components/person/personnav.vue";
import { reactive, toRefs, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

const state = reactive({
  url: require("@/assets/密码锁.png"),
  input1: "",
  input2: "",
  input3: "",
  form: {

  },
});
const dialogFormVisible = ref(false);

const formLabelWidth = "140px";

const Update = () => {
  console.log(input1.value);

  if (input1.value == state.form.password) {
    if (input2.value === input3.value) {
      state.form.password = input2.value;
      Api.updateuser(state.form)
        .then((data) => {
          console.log(data);
          ElMessage({
            message: "更新成功",
            type: "success",
          });
          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      ElMessage({
        message: "新密码不一致",
        type: "warning",
      });
    }
  } else {
    ElMessage({
      message: "原密码错误",
      type: "warning",
    });
  }
};

onMounted(() => {
  var user = JSON.parse(localStorage.getItem("user"));
  
  Api.getoneuser(user[0].name)
    .then((data) => {
      console.log(data);
      Object.assign(state.form, data);
    })
    .catch((err) => {
      console.log(err);
    });
});
const { url, input1, input2, input3, form } = toRefs(state);
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>      