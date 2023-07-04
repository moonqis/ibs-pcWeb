<template>
  <el-table
    :data="tableData"
    v-el-table-infinite-scroll="load"
    :infinite-scroll-disabled="disabled"
    loading="lazy"
    stripe
    style="width: 100%"
    height="40rem"
    size="large"
    empty-text="暂 时 还 没 有 数 据 哦 ， 请 稍 等  ~ &nbsp;&nbsp;&nbsp;                                                                "
  >
    <el-table-column label="ID" width="60" fixed>
      <template #default="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>

    <el-table-column label="图片" width="100">
      <template #default="scope">
        <div class="demo-image__preview">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.picurl"
            fit="cover"
            lazy
          />
        </div>
      </template>
    </el-table-column>

    <el-table-column label="中文名" width="140">
      <template #default="scope">
        <el-popover
          effect="light"
          trigger="hover"
          placement="top"
          width="auto"
          style="text-align: center"
        >
          <template #default>
            <div>
              Chinese Name&nbsp; :&nbsp;&nbsp;&nbsp;{{ scope.row.name }}
            </div>
            <div>
              English Name&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;{{
                scope.row.english_name
              }}
            </div>
          </template>
          <template #reference>
            <el-tag style="font-size: 0.8rem">{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="英文名" width="130">
      <template #default="scope">
        <div style="font-size: 0.7rem">{{ scope.row.english_name }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="sort" label="分类" width="120" />
    <el-table-column label="食用指数" width="300">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <div
            v-if="scope.row.detail_weight1 != ''"
            style="display: flex; align-items: center; width: 60px"
          >
            <div
              v-if="scope.row.detail_resource1 == '健康'"
              style="
                background-color: lightgreen;
                width: 12px;
                height: 12px;
                border-radius: 6px;
                margin-right: 10px;
              "
            />
            <div
              v-else-if="scope.row.detail_resource1 == '轻微超量'"
              style="
                background-color: rgb(255, 170, 0);
                width: 12px;
                height: 12px;
                border-radius: 6px;
                margin-right: 10px;
              "
            />
            <div
              v-else-if="scope.row.detail_resource1 == '严重超量'"
              style="
                background-color: red;
                width: 12px;
                height: 12px;
                border-radius: 6px;
                margin-right: 10px;
              "
            />
            {{ scope.row.detail_weight1 }}&nbsp;g
          </div>
          <div v-else style="height: 12px"></div>
          <div
            v-if="scope.row.detail_weight2 != ''"
            style="display: flex; align-items: center; width: 60px"
          >
            <div
              v-if="scope.row.detail_resource2 == '健康'"
              style="
                background-color: lightgreen;
                width: 12px;
                height: 12px;
                border-radius: 6px;
                margin-right: 10px;
              "
            />
            <div
              v-else-if="scope.row.detail_resource2 == '轻微超量'"
              style="
                background-color: rgb(255, 170, 0);
                width: 12px;
                height: 12px;
                border-radius: 6px;
                margin-right: 10px;
              "
            />
            <div
              v-else-if="scope.row.detail_resource2 == '严重超量'"
              style="
                background-color: red;
                width: 12px;
                height: 12px;
                border-radius: 6px;
                margin-right: 10px;
              "
            />
            {{ scope.row.detail_weight2 }}&nbsp;g
          </div>
          <div v-else style="height: 12px"></div>
          <div
            v-if="scope.row.detail_weight3 != ''"
            style="display: flex; align-items: center; width: 60px"
          >
            <div
              v-if="scope.row.detail_resource3 == '健康'"
              style="
                background-color: lightgreen;
                width: 12px;
                height: 12px;
                border-radius: 6px;
                margin-right: 10px;
              "
            />
            <div
              v-else-if="scope.row.detail_resource3 == '轻微超量'"
              style="
                background-color: rgb(255, 170, 0);
                width: 12px;
                height: 12px;
                border-radius: 6px;
                margin-right: 10px;
              "
            />
            <div
              v-else-if="scope.row.detail_resource3 == '严重超量'"
              style="
                background-color: red;
                width: 12px;
                height: 12px;
                border-radius: 6px;
                margin-right: 10px;
              "
            />
            {{ scope.row.detail_weight3 }}&nbsp;g
          </div>
          <div v-else style="height: 12px"></div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="state" label="描述" width="300" />
    <el-table-column prop="updateDate" label="更新日期" width="120" />
    <el-table-column
      label="&nbsp&nbsp&nbsp&nbsp操作"
      width="200"
      style="text-align: center; display: flex; flex-wrap: wrap"
      fixed="right"
    >
      <template v-slot="scope">
        <el-button
          size="large"
          style="background-color: white; color: black; margin-left: 0.8rem"
          @click="handleEdit(scope.$index, scope.row)"
        >
          详情
        </el-button>
        <el-button
          v-if="user.role != '用户'"
          style="background-color: white; color: black; margin-left: 0.8rem"
          @click="handleDelete(scope.row)"
        >
          反馈
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogFormVisible" title="食物数据预览">
    <el-scrollbar height="400px">
      <el-form :model="onefood">
        <el-row class="row-bg" :gutter="0">
          <el-col :span="10" style="margin-left: 1rem">
            <el-upload
              v-if="user.role == '管理员'"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
            >
              <img :src="onefood.picurl" class="avatar" title="编辑图片" />
            </el-upload>
            <img v-else :src="onefood.picurl" class="avatar" />
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
              <p>名称 : &nbsp;&nbsp;{{ onefood.name }}</p>
              <p>English Name : &nbsp;&nbsp;{{ onefood.english_name }}</p>
              <p>食物种类 : &nbsp;&nbsp;{{ onefood.sort }}</p>
            </div>
          </el-col>
          <el-col :span="20" style="margin-left: 1rem">
            <div
              v-for="index in onefood.detailsss"
              :key="index.weight"
              style=""
            >
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
        <!-- <el-button @click="dialogFormVisible = false">取消</el-button> -->
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false
            // ruleForm = {};
          "
        >
          确认
        </el-button>
      </span>
    </template></el-dialog
  >
  <el-dialog v-model="dialogFormVisible1" title="食物数据反馈">
    <div
      style="
        line-height: 30px;
        font-size: 17px;
        text-align: left;
        width: 400px;
        position: relative;
        margin-left: 20%;
      "
    >
      <p>名称 : &nbsp;&nbsp;{{ sortForm.name }}</p>
      <p>English Name : &nbsp;&nbsp;{{ sortForm.english_name }}</p>
      <p>问题描述 :</p>
      <el-input
        v-model="state"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6 }"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">Cancel</el-button>
        <el-button type="primary" @click="feedback1(sortForm)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script>
import { Timer } from "@element-plus/icons-vue";
import {
  reactive,
  ref,
  onMounted,
  toRefs,
  computed,
  defineComponent,
  watch,
} from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import endline from "@/components/line/endline.vue";
import Api from "@/api/Api";
import store from "@/store";
import { ElLoading } from "element-plus";
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  props: ["Text"],

  setup() {
    const router = useRouter();

    let loading = ref(true);
    const getfood = () => {
      setTimeout(() => {
        console.log(state.tableData);
      }, 100);
    };

    const state = reactive({
      page: 1,
      value: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,

      onefood: {},
      detailsort: [
        "葡萄糖",
        "果糖",
        "半乳糖",
        "葡萄糖谷糖",
        "葡萄糖聚合物",
        "低聚糖",
      ],
      tableData: [],
      input1: "",
      sortForm: [],
      state: "",
      user: {},
      tableDatas: [],
    });
    const format = new FormData();
    const beforeAvatarUpload = (rawFile) => {
      format.append("avatar", rawFile);
      console.log(rawFile);
      setTimeout(() => {
        console.log(format.get("id"), format.get("avatar"));

        axios
          .post("http://localhost:3000/api/foodlist/uploadpic", format)
          .then((data) => {
            state.onefood.picurl = URL.createObjectURL(rawFile);
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
      }, 500);
      return false;
    };
    const handleAvatarSuccess = (response, uploadFile) => {
      console.log(uploadFile.raw);
      state.onefood.picurl = URL.createObjectURL(uploadFile.raw);
    };

    const handleEdit = (index, row) => {
      console.log(index, row);
      state.onefood = row;
      state.onefood["detailsss"] = [
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
      ];
      setTimeout(() => {
        state.onefood.detailsss[0].detail =
          state.onefood.detail_detail1.split(",");
        state.onefood.detailsss[0].weight = state.onefood.detail_weight1;
        state.onefood.detailsss[0].resource = state.onefood.detail_resource1;
        state.onefood.detailsss[1].detail =
          state.onefood.detail_detail2.split(",");
        state.onefood.detailsss[1].weight = state.onefood.detail_weight2;
        state.onefood.detailsss[1].resource = state.onefood.detail_resource2;
        state.onefood.detailsss[2].detail =
          state.onefood.detail_detail3.split(",");
        state.onefood.detailsss[2].weight = state.onefood.detail_weight3;
        state.onefood.detailsss[2].resource = state.onefood.detail_resource3;
        console.log(state.onefood);
        state.dialogFormVisible = true;
        format.append("id", state.onefood.id);
      }, 50);
    };
    let feed = {};

    const handleDelete = (row) => {
      state.sortForm = row;
      state.dialogFormVisible1 = true;
      feed.name = row.name;
      feed.english_name = row.english_name;
      feed.food_id = row.id;
      feed.author_id = state.user.id;
      feed.author = state.user.name;
    };
    const feedback1 = (list) => {
      feed.state = state.state;
      feed.create_date = new Date();

      console.log(feed);
      Api.createfoodfeed(feed)
        .then((data) => {
          if (data) {
            ElMessage({
              message: "提交成功",
              type: "success",
            });
            state.dialogFormVisible1 = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const activeNames = ref(["1"]);
    const handleChange = (val) => {
      console.log(val);
    };
    // const input1 = ref("");
    const input2 = ref("");
    const input3 = ref("");
    const total = ref(0);

    //初始加载数据
    onMounted(() => {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        setTimeout(() => {
          loading.close();
        }, 500);

        console.log("类别： " + localStorage.getItem("Tablesort"));

        Api.getonesort(localStorage.getItem("Tablesort"))
          .then((data) => {
            Object.assign(state.tableData, data.rows);
            Object.assign(state.tableDatas, data.rows);
            total.value = state.tableDatas.length;
            console.log(state.tableData);
            state.tableData.length = 30;
            state.tableDatas.splice(0, 30);
            // setTimeout(function () {
            //   loading.close();
            // }, 0);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 50);
      if (JSON.parse(localStorage.getItem("user"))) {
        var user = JSON.parse(localStorage.getItem("user"));
        Api.getoneuser(user[0].name)
          .then((data) => {
            Object.assign(state.user, data[0]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    const disabled = ref(false);
    const page = ref(30);
    const load = () => {
      setTimeout(() => {
        if (disabled.value) return;
        if (page.value <= total.value) {
          state.tableData.push(...state.tableDatas.splice(0, 20));
          page.value = page.value + 20;
        }
        if (page.value === total.value) {
          disabled.value = true;
        }
      }, 1);
    };

    return {
      handleEdit,
      ...toRefs(state),
      loading,
      activeNames,
      // input1,
      // tableData,
      Search,
      handleChange,
      getfood,
      handleDelete,
      feedback1,
      beforeAvatarUpload,
      disabled,
      load,
      handleAvatarSuccess,
    };
  },
};
</script>

<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
body {
  margin: 0;
}

.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>

<style>
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>