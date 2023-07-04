<template>
  <el-upload
    class="avatar-uploader"
    action="#"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :http-request="upload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import axios from "axios";
const format = new FormData();

const imageUrl = ref("");
const upload=(res)=>{
  format.append("avatar", res.file);
  console.log(format.get('avatar'))

  if (res.file) {
    axios
          .post("http://localhost:3000/api/imguploadCOS", format)
          .then((data) => {
            console.log(data);
            
          });
  }
}
const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};

const beforeAvatarUpload = (rawFile) => {
  console.log(rawFile)
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
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
// const upload = (res) => {
//   const COS = require("cos-js-sdk-v5");
//   // 填写自己腾讯云cos中的key和id (密钥)
//   const cos = new COS({
//     SecretId: "AKIDc1C9qGQM5ZLF4nU2MQM4bxAEE0XrDWwD", // 身份识别ID
//     SecretKey: "CXgXCfwy2woaGuOhq0wcO0aCjHgqkNp4", // 身份秘钥
//   });
//   if (res.file) {
//     // 执行上传操作
//     cos.putObject(
//       {
//         Bucket: "mingxlab-1258665547" /* 存储桶 */,
//         Region: "ap-shanghai" /* 存储桶所在地域，必须字段 */,
//         Key: res.file.name /* 文件名 */,
//         StorageClass: "STANDARD", // 上传模式, 标准模式
//         Body: res.file, // 上传文件对象
//         onProgress: (progressData) => {
//           // 上传进度
//           console.log(JSON.stringify(progressData));
//         },
//       },
//       (err, data) => {
//         console.log(err || data);
//         // console.log(data)
//         // 上传成功之后
//         // if (data.statusCode === 200) {
//         //   this.imageUrl = `https:${data.Location}`;
//         // }
//       }
//     );
//   }
// };
