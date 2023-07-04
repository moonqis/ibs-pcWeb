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
              意见反馈
            </h2>

            <el-form :model="form" label-width="108px" style="margin-top: 5rem">
              <el-form-item label="称呼">
                <el-input
                  v-model="form.name"
                  style="width: 400px"
                  placeholder="XX先生/女士"
                />
              </el-form-item>

              <el-form-item label="联系方式">
                <el-radio-group v-model="form.s">
                  <el-radio label="手机" />
                  <el-radio label="微信" />
                  <el-radio label="QQ" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label=" ">
                <el-input
                  v-model="form.telephone"
                  style="width: 400px"
                  placeholder="请输入相应的联系方式"
                />
              </el-form-item>
            
              <el-form-item label="相关说明">
                <el-input
                  v-model="form.state"
                  :rows="6"
                  type="textarea"
                  style=""
                  placeholder="请输入申请理由及相关信息"

                />
              </el-form-item>
             
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
              </el-form-item>
            </el-form>
            <div style="height: 100px;"></div>

          </el-card></el-col
        >
        <el-col :span="2"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <div></div>
    </div>
  </div>
</template>
      
  <script setup>
import { computed, onMounted, ref } from "vue";
import personnav from "@/components/person/personnav.vue";
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import Api from "@/api/Api";
const users = reactive({});
// do not use same name with ref
const form = reactive({
  name: "",
  state: "",
  telephone: "",
  result:'待审核',
  create_by: "",
  create_date:''
});
onMounted(() => {
  var user = JSON.parse(localStorage.getItem("user"));
  
  Api.getoneuser(user[0].name)
    .then((data) => {
      console.log(data);
      Object.assign(users, data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});
const onSubmit = () => {
  form.create_by=users.name
  form.create_date=new Date()
  Api.createrolecheck(form)
    .then((data) => {
      // tlist=data
      if (data.message == "创建出错") {
        console.log("创建出错");
      } else {
        ElMessage({
          message: "创建成功",
          type: "success",
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

</script>
      

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>