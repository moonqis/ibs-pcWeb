<template>
  <div style="margin-top: 2rem">
    <el-form :model="form1" label-width="8rem">
      <el-form-item label="课程名称" style="width:60%">
        <el-input v-model="form1.name" />
      </el-form-item>
      <el-form-item label="视频封面" prop="pic">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <svg v-else class="upload-icon" aria-hidden="true">
            <use xlink:href="#icon-jiahao_o"></use>
          </svg>
          <!-- <i  class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload></el-form-item
      >
      <el-form-item label="课程视频" prop="video">
        <el-upload
          class="upload-demo"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
          style="width: 50%;"
        >
          <svg class="upload-icon2" aria-hidden="true">
            <use xlink:href="#icon-shangchuan"></use>
          </svg>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="课程标签">
        <el-select v-model="form1.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>

      <el-form-item label="是否公开">
        <el-switch v-model="form1.delivery" />
      </el-form-item>
      <el-form-item label="课程介绍" prop="desc">
          <el-input type="textarea" v-model="form1.desc"></el-input>
        </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { reactive, ref, onMounted, toRefs, computed } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

export default {
  setup() {
    const form1 = reactive({
      name: "",
      region: "",
      delivery: false,
      desc:""
    });

    const onSubmit = () => {
      console.log("submit!");
    };
    return {
      form1,
      onSubmit,
    };
  },

  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.upload-icon {
  color: #8c939d;
  width: 158px;
  height: 158px;
  text-align: center;
}
.upload-icon2 {
  color: #8c939d;
  width: 108px;
  height: 108px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
