<template>
  <el-tabs
    class="demo-tabs"
    style="width: 80%; margin: 2rem"
    type="border-card"
  >
    <!-- 食物数据添加 -->
    <!-- 至少输入名字/英文名/种类/一个详细信息 -->
    <el-tab-pane label="食物数据新增"
      ><el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="食物名称" prop="name">
          <el-input v-model="ruleForm.name" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="english_name">
          <el-input
            v-model="ruleForm.english_name"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="食物种类" prop="sort">
          <el-select v-model="ruleForm.sort" placeholder="请选择食物种类">
            <div v-for="index in tablesort" :key="index.id">
              <el-option :label="index.name" :value="index.name"></el-option>
            </div>
          </el-select>
        </el-form-item>

        <el-form-item label="食用量">
          <el-col :span="5">
            <el-form-item prop="weight">
              <el-input v-model="ruleForm.detail[0].weight"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="1">
            <span class="text-gray-500">g</span>
          </el-col>
          <el-col class="text-center" :span="2">
            <span class="text-gray-500">|</span>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="resource">
              <el-radio-group v-model="ruleForm.detail[0].resource">
                <el-radio label="健康"></el-radio>
                <el-radio label="轻微超量"></el-radio>
                <el-radio label="严重超量"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="超量元素" prop="type">
          <el-checkbox-group v-model="ruleForm.detail[0].detail">
            <el-checkbox label="葡萄糖" name="type1"></el-checkbox>
            <el-checkbox label="果糖" name="type2"></el-checkbox>
            <el-checkbox label="半乳糖" name="type3"></el-checkbox>
            <el-checkbox label="葡萄糖谷糖" name="type4"></el-checkbox>
            <el-checkbox label="葡萄糖聚合物" name="type5"></el-checkbox>
            <el-checkbox label="低聚糖" name="type6"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="食用量">
          <el-col :span="5">
            <el-form-item prop="weight">
              <el-input v-model="ruleForm.detail[1].weight"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="1">
            <span class="text-gray-500">g</span>
          </el-col>
          <el-col class="text-center" :span="2">
            <span class="text-gray-500">|</span>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="resource">
              <el-radio-group v-model="ruleForm.detail[1].resource">
                <el-radio label="健康"></el-radio>
                <el-radio label="轻微超量"></el-radio>
                <el-radio label="严重超量"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="超量元素" prop="type">
          <el-checkbox-group v-model="ruleForm.detail[1].detail">
            <el-checkbox label="葡萄糖" name="type1"></el-checkbox>
            <el-checkbox label="果糖" name="type2"></el-checkbox>
            <el-checkbox label="半乳糖" name="type3"></el-checkbox>
            <el-checkbox label="葡萄糖谷糖" name="type4"></el-checkbox>
            <el-checkbox label="葡萄糖聚合物" name="type5"></el-checkbox>
            <el-checkbox label="低聚糖" name="type6"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="食用量">
          <el-col :span="5">
            <el-form-item prop="weight">
              <el-input v-model="ruleForm.detail[2].weight"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="1">
            <span class="text-gray-500">g</span>
          </el-col>
          <el-col class="text-center" :span="2">
            <span class="text-gray-500">|</span>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="resource">
              <el-radio-group v-model="ruleForm.detail[2].resource">
                <el-radio label="健康"></el-radio>
                <el-radio label="轻微超量"></el-radio>
                <el-radio label="严重超量"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="超量元素" prop="type">
          <el-checkbox-group v-model="ruleForm.detail[2].detail">
            <el-checkbox label="葡萄糖" name="type1"></el-checkbox>
            <el-checkbox label="果糖" name="type2"></el-checkbox>
            <el-checkbox label="半乳糖" name="type3"></el-checkbox>
            <el-checkbox label="葡萄糖谷糖" name="type4"></el-checkbox>
            <el-checkbox label="葡萄糖聚合物" name="type5"></el-checkbox>
            <el-checkbox label="低聚糖" name="type6"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="描述" prop="state">
          <el-input
            type="textarea"
            v-model="ruleForm.state"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="OpenDialog1(ruleForm)"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form></el-tab-pane
    >
    <!-- 食物种类添加 -->
    <el-tab-pane label="食物种类反馈">
      <el-form
        :model="sortForm"
        :rules="rules"
        ref="sortForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="种类名称" prop="name">
          <el-input v-model="sortForm.name" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="english_name">
          <el-input
            v-model="sortForm.english_name"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="相关描述" prop="state">
          <el-input type="textarea" v-model="sortForm.state"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="OpenDialog2(sortForm)"
            >立即创建</el-button
          >
          <el-button @click="resetForm('sortForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

  <!-- 食物数据预览弹窗 -->
  <!-- 食物图片上传 -->
  <!-- 添加食物数据检查 -->
  <el-dialog v-model="dialogFormVisible" title="食物添加预览">
    <el-scrollbar height="400px">
      <el-form :model="ruleForm">
        <el-row class="row-bg" :gutter="0">
          <el-col :span="10" style="margin-left: 1rem">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="upload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <svg v-else class="avatar-uploader-icon" aria-hidden="true">
                <use xlink:href="#icon-jiahao_o"></use>
              </svg>
            </el-upload>
          </el-col>
          <el-col :span="6">
            <div
              style="
                line-height: 30px;
                font-size: 17px;
                text-align: left;
                width: 340px;
              "
            >
              <p>名称 : &nbsp;&nbsp;{{ ruleForm.name }}</p>
              <p>English Name : &nbsp;&nbsp;{{ ruleForm.english_name }}</p>
              <p>食物种类 : &nbsp;&nbsp;{{ ruleForm.sort }}</p>
            </div>
          </el-col>
          <el-col :span="20" style="margin-left: 1rem">
            <div v-for="index in ruleForm.detail" :key="index.weight" style="">
              <div v-if="index.weight === null || index.weight === ''"></div>
              <div v-else style="width: 700px; margin-top: 1rem">
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item :name="index.name">
                    <template #title>
                      <div v-if="index.resource === '健康'">
                        <div
                          style="
                            background-color: lightgreen;
                            width: 20px;
                            height: 20px;
                            border-radius: 10px;
                            margin-left: 20px;
                          "
                        ></div>
                      </div>
                      <div v-else-if="index.resource === '轻微超量'">
                        <div
                          style="
                            background-color: darkorange;
                            width: 20px;
                            height: 20px;
                            border-radius: 10px;
                            margin-left: 20px;
                          "
                        ></div>
                      </div>
                      <div v-if="index.resource === '严重超量'">
                        <div
                          style="
                            background-color: red;
                            width: 20px;
                            height: 20px;
                            border-radius: 10px;
                            margin-left: 20px;
                          "
                        ></div>
                      </div>
                      <div style="font-size: 16px; margin-left: 20px">
                        食用量 : &nbsp;&nbsp;
                      </div>
                      <div style="font-size: 18px; margin-left: 0px">
                        {{ index.weight }}&nbsp;g
                      </div>
                      <div
                        style="
                          font-size: 16px;
                          font-weight: 400;
                          margin-left: 40px;
                        "
                      >
                        {{ index.resource }}
                      </div>
                    </template>

                    <div
                      style="
                        display: flex;
                        font-size: 18px;
                        margin-top: 1.5srem;
                        width: 600px;
                        flex-wrap: wrap;
                        margin-left: 30px;
                      "
                    >
                      <!-- 判断获取到的详细数据并进行计算展示 -->
                      <div
                        v-for="index1 in detailsort"
                        :key="index1"
                        style="width: 200px; margin-top: 1rem"
                      >
                        <div v-if="index.detail.includes(index1)">
                          <div
                            style="
                              background-color: red;
                              width: 24px;
                              height: 24px;
                              border-radius: 12px;
                              margin-bottom: -25px;
                              margin-left: 20px;
                            "
                          ></div>
                          <div style="width: 130px; margin-left: 30px; font-size:15px;">
                            {{ index1 }}
                          </div>
                        </div>
                        <div v-else>
                          <div
                            style="
                              background-color: lightgreen;
                              width: 24px;
                              height: 24px;
                              border-radius: 12px;
                              margin-bottom: -25px;
                              margin-left: 20px;
                            "
                          ></div>
                          <div style="width: 130px; margin-left: 30px; font-size:15px;">
                            {{ index1 }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            submitForm(ruleForm)
            // ruleForm = {};
          "
        >
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 食物种类预览弹窗 -->
  <!-- 添加食物种类检查 -->
  <el-dialog v-model="dialogFormVisible1" title="食物种类添加">
    <div
      style="
        line-height: 30px;
        font-size: 17px;
        text-align: left;
        width: 340px;
        position: relative;
        margin-left: 20%;
      "
    >
      <p>种类名称 : &nbsp;&nbsp;{{ sortForm.name }}</p>
      <p>English Name : &nbsp;&nbsp;{{ sortForm.english_name }}</p>
      <p>详细描述 : &nbsp;&nbsp;{{ sortForm.state }}</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">Cancel</el-button>
        <el-button type="primary" @click="submitsortForm(sortForm)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { reactive, ref, onMounted, toRefs, computed } from "vue";
import Api from "@/api/Api";
import store from "@/store";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import detail from "./detail.vue";
import axios from 'axios';
export default {
  components: { detail },
  setup() {
    // const router = useRouter();
    const state = reactive({
      tablesort: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
    });
    const activeNames = ref(["1"]);
    const handleChange = (val) => {
      console.log(val);
    };
    const user = JSON.parse(localStorage.getItem("user"));

    onMounted(() => {
      Api.findallfood()
        .then((data) => {
          // tlist=data
          Object.assign(state.tablesort, data);
          console.log(state.tablesort);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const imageUrl = ref("");
    const endform = {};
    let picurl = "https://mingxlab-1258665547.cos.ap-shanghai.myqcloud.com/ibs-food/index1.jpg";
    const handleAvatarSuccess = (response, uploadFile) => {
      imageUrl.value = URL.createObjectURL(uploadFile.raw);
      picurl = response.data.img_url;
      console.log(picurl, response, uploadFile);
    };

    const beforeAvatarUpload = (rawFile) => {
      if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
        ElMessage.error("Avatar picture must be JPG/PNG format!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("Avatar picture size can not exceed 2MB!");
        return false;
      }
      return true;
    };
    //提交前确认
    const OpenDialog1 = (ruleForm) => {
      // console.log(ruleForm.detail)
      if (
        ruleForm.name == "" ||
        ruleForm.english_name == "" ||
        ruleForm.sort == ""
      ) {
        ElMessage(`请填写相关信息`);
      } else if (
        ruleForm.detail[0].weight == null ||
        ruleForm.detail[0].resource == ""
      ) {
        ElMessage(`请至少完整填写第一个食用详情`);
      } else if (
        (ruleForm.detail[1].weight != null &&
          ruleForm.detail[1].resource == "") ||
        (ruleForm.detail[1].weight == null &&
          ruleForm.detail[1].resource != "") ||
        (ruleForm.detail[1].weight == "" && ruleForm.detail[1].resource != "")
      ) {
        ElMessage(`请完整填写对应食用详情`);
      } else if (
        (ruleForm.detail[2].weight != null &&
          ruleForm.detail[2].resource == "") ||
        (ruleForm.detail[2].weight == null &&
          ruleForm.detail[2].resource != "") ||
        (ruleForm.detail[2].weight == "" && ruleForm.detail[2].resource != "")
      ) {
        ElMessage(`请完整填写对应食用详情`);
      } else {
        state.dialogFormVisible = true;
      }
    };
    //提交
    const submitForm = (ruleForm) => {
      ruleForm.detail_weight1 = ruleForm.detail[0].weight;
      ruleForm.detail_weight2 = ruleForm.detail[1].weight;
      ruleForm.detail_weight3 = ruleForm.detail[2].weight;
      ruleForm.detail_resource1 = ruleForm.detail[0].resource;
      ruleForm.detail_resource2 = ruleForm.detail[1].resource;
      ruleForm.detail_resource3 = ruleForm.detail[2].resource;
      ruleForm.detail_detail1 = ruleForm.detail[0].detail.join(",");
      ruleForm.detail_detail2 = ruleForm.detail[1].detail.join(",");
      ruleForm.detail_detail3 = ruleForm.detail[2].detail.join(",");

      setTimeout(() => {
        Object.assign(endform, ruleForm);
        endform.detail1 = JSON.stringify(ruleForm.detail);
        delete endform.detail;
        endform.imgurl = picurl;
        endform.result = "待审核";
        endform.create_by = user[0].name;

        console.log(endform);

        setTimeout(() => {
          console.log(endform);

          Api.createfoodcheck(endform)
            .then((data) => {
              // tlist=data

              if (data.message == "创建出错") {
                console.log("创建出错");
              } else {
                ElMessage(`提交成功`);
                state.dialogFormVisible = false;

                location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 0);
      }, 0);
    };
    const OpenDialog2 = (sortForm) => {
      if (sortForm.name == "" || sortForm.name == null) {
        ElMessage(`请填写种类名称`);
      } else if (sortForm.english_name == "" || sortForm.english_name == null) {
        ElMessage(`请填写英文名称`);
      } else {
        state.dialogFormVisible1 = true;
      }
    };
    const submitsortForm = (sortForm) => {
      let endsortform = sortForm;
      endsortform.create_by = user[0].name;
      console.log(endsortform);

      setTimeout(() => {
        Api.createsortcheck(endsortform)
          .then((data) => {
            // tlist=data
            if (data.message == "创建出错") {
              console.log("创建出错");
            } else {
              ElMessage(`提交成功`);
              state.dialogFormVisible1 = false;

              location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 0);
    };
    const format = new FormData();

    const upload = (res) => {
      format.append("avatar", res.file);
      console.log(format.get("avatar"));

      if (res.file) {
        axios
          .post("http://localhost:3000/api/imguploadCOS", format)
          .then((data) => {
            console.log(data.data);
            picurl=data.data.data.img_url
            imageUrl.value=data.data.data.img_url
          });
      }
    };
    return {
      ...toRefs(state),
      imageUrl,
      handleAvatarSuccess,
      beforeAvatarUpload,
      activeNames,
      handleChange,
      OpenDialog1,
      OpenDialog2,
      submitForm,
      submitsortForm,
      upload,
    };
  },
  data() {
    return {
      ruleForm: {
        name: "",
        english_name: "",
        sort: "",
        detail_weight1: "",
        detail_weight2: "",
        detail_weight3: "",
        detail_resource1: "",
        detail_resource2: "",
        detail_resource3: "",
        detail_detail1: "",
        detail_detail2: "",
        detail_detail3: "",

        detail: [
          {
            name: "1",
            weight: null,
            resource: "",
            detail: [],
          },
          {
            name: "2",
            weight: null,
            resource: "",
            detail: [],
          },
          {
            name: "3",
            weight: null,
            resource: "",
            detail: [],
          },
        ],
        state: "",
        imgurl: "",
        author: "",
        create_date: "",
        create_by: "",
      },
      sortForm: {
        name: "",
        english_name: "",
        index: "待审核",
        state: "",
        create_by: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入食物名称", trigger: "blur" },
          // { min: 1, max: 30, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        english_name: [
          { required: true, message: "请输入英文名称", trigger: "blur" },
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
        sort: [
          { required: true, message: "请选择食物种类", trigger: "change" },
        ],
        // state: [{ required: true, message: "请填写相关描述", trigger: "blur" }],
      },
      detailsort: [
        "葡萄糖",
        "果糖",
        "半乳糖",
        "葡萄糖谷糖",
        "葡萄糖聚合物",
        "低聚糖",
      ],
    };
  },

  methods: {
    //创建新审核
    onMounted() {},
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
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
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  width: 200px;
  height: 185px;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  /* font-size: 28px; */
  color: #8c939d;
  width: 138px;
  height: 150px;
  text-align: center;
  /* margin-inline: -200px; */
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>