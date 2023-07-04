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
              公告发布
            </h2>

            <div style="margin: 20px" />
            <el-form
              label-width="100px"
              :model="user"
              style="max-width: 500px; margin-left: 10%; margin-top: 5rem"
              size="large"
            >
              <el-form-item label="主题">
                <el-input
                  v-model="notice.title"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                />
              </el-form-item>
              <el-form-item label="内容">
                <el-input
                  v-model="notice.state"
                  type="textarea"
                  :autosize="{ minRows: 10, maxRows: 15 }"
                />
              </el-form-item>
              <el-form-item label="时间">
                <el-date-picker
                  v-model="notice.Date"
                  type="date"
                  placeholder="Pick a day"
                  :disabled-date="disabledDate"
                  :shortcuts="shortcuts"
                  size="default"
                  value-format="YYYY-MM-DD"

                />
              </el-form-item>
              <el-form-item>
                <el-button
                  style="margin-left: 7rem"
                  @click="dialogFormVisible = true"
                >
                  发布
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
    <el-dialog v-model="dialogFormVisible" title="确认发布？">
      <el-form
        label-width="100px"
        :model="notice"
        style="max-width: 500px; margin-left: 10%"
        size="large"
      >
        <el-form-item label="主题">
          <el-input v-model="notice.title" type="textarea" disabled />
        </el-form-item>

        <el-form-item label="时间">
          <el-input v-model="notice.Date" type="textarea" disabled />
        </el-form-item>
        <el-form-item> </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addnotice(notice)"> 确认发布 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
      
  <script setup>
import Api from "@/api/Api";
import personnav from "@/components/person/personnav.vue";
import router from "@/router";

import { onMounted, reactive, ref, toRefs } from "vue";
const state = reactive({
  user: {},
  notice: {
    title: "",
    state: "",
    author: "",
    Date: "",
  },
});
const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
const addnotice = (data) => {
  data.create_date=new Date()
  Api.createnotice(data)
    .then((data) => {
        state.notice={}
        dialogFormVisible.value=false

    })
    .catch((err) => {
      console.log(err);
    });
};
let dialogFormVisible = ref(false);
onMounted(() => {
  var user = JSON.parse(localStorage.getItem("user"));
  state.notice.author = user[0].name;
});
const { user, notice } = toRefs(state);

const value2 = ref("");

const shortcuts = [
  {
    text: "Today",
    value: new Date(),
  },
  {
    text: "Yesterday",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: "A week ago",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];

const disabledDate = (time) => {
  return time.getTime() > Date.now();
};
</script>
  
  
  <style lang="less" scoped>
.el-form {
  .el-input {
    margin-left: 50px;
  }
}
</style>
      