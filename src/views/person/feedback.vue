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
              <el-form-item label="标题">
                <el-input
                  v-model="form.title"
                  style="width: 400px"
                  placeholder="请输入标题"
                />
              </el-form-item>
              <el-form-item label="类型">
                <el-select
                  v-model="form.type"
                  placeholder="请选择反馈类型"
                  style="width: 160px"
                >
                  <el-option label="建议" value="建议" />
                  <el-option label="意见" value="意见" />
                </el-select>
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
                  placeholder="请输入相应的联系方式（选填）"
                />
              </el-form-item>
              <el-form-item label="称呼">
                <el-input
                  v-model="form.name"
                  style="width: 400px"
                  placeholder="XX先生/女士"
                />
              </el-form-item>
              <el-form-item label="问题描述">
                <el-input
                  v-model="form.state"
                  :rows="6"
                  type="textarea"
                  style=""
                />
              </el-form-item>
              <!-- <el-form-item>
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-form-item> -->
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>重置</el-button>
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
import { computed, ref } from "vue";
import personnav from "@/components/person/personnav.vue";
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import Api from "@/api/Api";

// do not use same name with ref
const form = reactive({
  name: "",
  type: "",
  title: "",
  state: "",
  telephone: "",
  s: "",
  create_date:''
});

const onSubmit = () => {
  form.create_date=new Date()
  Api.createfeed(form)
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

const imageUrl = ref("");

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
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