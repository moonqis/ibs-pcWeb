<template>
  <div style="margin-top: 5vh">
    <el-input
      v-model="input1"
      size="large"
      placeholder="  请输入 中文名 / English name"
      :suffix-icon="Search"
      style="width: 60%; margin-left: -15%"
    />
    <el-button size="large" style="margin-left: 1%" @click="Searchd"
      >搜索 (search)
    </el-button>
  </div>

  <el-table
    :data="tableData"
    v-el-table-infinite-scroll="load"
    :infinite-scroll-disabled="disabled"
    stripe
    style="width: 100%"
    height="40.1rem"
    loading="lazy"
    size="large"
    empty-text="没 有 相 关 数 据 哦 ，请 重 新 搜 索 &nbsp; ~ &nbsp;&nbsp;                                                                "
    v-loading.fullscreen.lock="fullscreenLoading"
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
          />
          <!-- :preview-src-list="scope.row.piclist"
          :zoom-rate="1.2"
          :initial-index="80" -->
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

    <el-table-column prop="update_date" label="更新日期" width="120" />

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
        <!-- <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            > -->
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
              v-for="(index, item) in onefood.detailsss"
              :key="item"
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
        <el-button v-if="user.role == '管理员'" @click="openupdate()"
          >编辑</el-button
        >
        <el-button type="primary" @click="dialogFormVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

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
        <el-button type="primary" @click="feedback(sortForm)"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="updtedialogFormVisible" title="编辑">
    <el-form
      :model="onefood"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="食物名称" prop="name">
        <el-input v-model="onefood.name" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="英文名" prop="english_name">
        <el-input
          v-model="onefood.english_name"
          style="width: 400px"
        ></el-input>
      </el-form-item>
      <el-form-item label="食物种类" prop="sort">
        <el-select v-model="onefood.sort" placeholder="请选择食物种类">
          <!-- <div v-for="index in tablesort" :key="index.id">
              <el-option :label="index.name" :value="index.name"></el-option>
            </div> -->
        </el-select>
      </el-form-item>
      <el-form-item label="食用量">
        <el-col :span="6">
          <el-form-item prop="weight">
            <el-input v-model="onefood.detailsss[0].weight"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">
          <span class="text-gray-500">|</span>
        </el-col>
        <el-col :span="16">
          <el-form-item prop="resource">
            <el-radio-group v-model="onefood.detailsss[0].resource">
              <el-radio label="健康"></el-radio>
              <el-radio label="轻微超量"></el-radio>
              <el-radio label="严重超量"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="超量元素" prop="type">
        <el-checkbox-group v-model="onefood.detailsss[0].detail">
          <el-checkbox label="葡萄糖" name="type1"></el-checkbox>
          <el-checkbox label="果糖" name="type2"></el-checkbox>
          <el-checkbox label="半乳糖" name="type3"></el-checkbox>
          <el-checkbox label="葡萄糖谷糖" name="type4"></el-checkbox>
          <el-checkbox label="葡萄糖聚合物" name="type5"></el-checkbox>
          <el-checkbox label="低聚糖" name="type6"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="食用量">
        <el-col :span="6">
          <el-form-item prop="weight">
            <el-input v-model="onefood.detailsss[1].weight"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">
          <span class="text-gray-500">|</span>
        </el-col>
        <el-col :span="16">
          <el-form-item prop="resource">
            <el-radio-group v-model="onefood.detailsss[1].resource">
              <el-radio label="健康"></el-radio>
              <el-radio label="轻微超量"></el-radio>
              <el-radio label="严重超量"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="超量元素" prop="type">
        <el-checkbox-group v-model="onefood.detailsss[1].detail">
          <el-checkbox label="葡萄糖" name="type1"></el-checkbox>
          <el-checkbox label="果糖" name="type2"></el-checkbox>
          <el-checkbox label="半乳糖" name="type3"></el-checkbox>
          <el-checkbox label="葡萄糖谷糖" name="type4"></el-checkbox>
          <el-checkbox label="葡萄糖聚合物" name="type5"></el-checkbox>
          <el-checkbox label="低聚糖" name="type6"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="食用量">
        <el-col :span="6">
          <el-form-item prop="weight">
            <el-input v-model="onefood.detailsss[2].weight"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">
          <span class="text-gray-500">|</span>
        </el-col>
        <el-col :span="16">
          <el-form-item prop="resource">
            <el-radio-group v-model="onefood.detailsss[2].resource">
              <el-radio label="健康"></el-radio>
              <el-radio label="轻微超量"></el-radio>
              <el-radio label="严重超量"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="超量元素" prop="type">
        <el-checkbox-group v-model="onefood.detailsss[2].detail">
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
          v-model="onefood.state"
          style="width: 500px"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updtedialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updatefood(onefood)">
          确认修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
  <script>
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
import { ElMessage } from "element-plus";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();

    let loading = ref(true);
    const fullscreenLoading = ref(false);
    const getfood = () => {
      setTimeout(() => {
        console.log(state.tableData);
      }, 100);
    };
    //双向绑定数据
    const state = reactive({
      page: 1,
      value: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      updtedialogFormVisible: false,

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
      tableDatas: [],
      tableDatass: [],
      input1: "",
      sortForm: {},
      state: "",
      user: {},
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
      },
    });

    //查看
    const handleEdit = (index, row) => {
      console.log();
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
      //detail数据转换
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
    //反馈
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
    const feedback = (list) => {
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

    //模糊查询-----------------搜索
    const Searchs = (tableDatas, input) => {
      return (tableDatas = tableDatas.filter((item) => {
        if (item.name && item.english_name) {
          return (
            item.name.indexOf(input) >= 0 ||
            item.english_name.indexOf(input) >= 0
          );
        }
      }));
    };
    const Searchd = () => {
      if (state.input1 != "") {
        state.tableDatass.length = 0;
        state.tableData = Searchs(state.tableDatas, state.input1);
      }
    };

    //编辑
    const openupdate = () => {
      console.log(state.onefood);
      state.updtedialogFormVisible = true;
    };
    const updatefood = (list) => {
      console.log(list);
      list.detail_weight1 = list.detailsss[0].weight;
      list.detail_weight2 = list.detailsss[1].weight;
      list.detail_weight3 = list.detailsss[2].weight;
      list.detail_resource1 = list.detailsss[0].resource;
      list.detail_resource2 = list.detailsss[1].resource;
      list.detail_resource3 = list.detailsss[2].resource;
      list.detail_detail1 = list.detailsss[0].detail.join(",");
      list.detail_detail2 = list.detailsss[1].detail.join(",");
      list.detail_detail3 = list.detailsss[2].detail.join(",");

      setTimeout(() => {
        const endform = {};
        Object.assign(endform, list);
        endform.detail = JSON.stringify(list.detailsss);
        endform.updateBy = state.user.name;
        delete endform.detailsss;

        setTimeout(() => {
          console.log(endform);

          Api.updatefood(endform)
            .then((data) => {
              // tlist=data
              console.log(data);
              if (data.message == "更新成功") {
                ElMessage(`提交成功`);
                state.updtedialogFormVisible = false;
              } else {
                ElMessage(`出错了`);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 20);
      }, 20);
    };
    const total = ref(0);

    onMounted(() => {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 1000);
      state.input1 = store.state.search;
      Api.getonesort("all")
        .then((data) => {
          if (store.state.search == "" || store.state.search == null) {
            Object.assign(state.tableData, data.rows);
            state.tableData.length = 30;
          } else {
            Object.assign(
              state.tableDatass,
              Searchs(data.rows, store.state.search)
            );
            total.value = state.tableDatass.length;
            if (total.value > 20) {
              state.tableData.push(...state.tableDatass.splice(0, 20));
            } else {
              state.tableData = state.tableDatass;
            }
          }

          Object.assign(state.tableDatas, data.rows);
        })
        .catch((err) => {
          console.log(err);
        });
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
          state.tableData.push(...state.tableDatass.splice(0, 20));
          page.value = page.value + 20;
        }
        if (page.value === total.value) {
          disabled.value = true;
        }
      }, 4);
    };

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

    return {
      handleEdit,
      ...toRefs(state),
      loading,
      activeNames,
      Search,
      fullscreenLoading,
      handleChange,
      getfood,
      handleDelete,
      Searchd,
      feedback,
      openupdate,
      updatefood,
      disabled,
      load,
      beforeAvatarUpload,
      handleAvatarSuccess,
    };
  },
  date() {
    return {};
  },
  methods: {
    // 当input值为空时，data数据显示全部
    watchInput() {
      if (this.inputTxt === "") {
        this.dataList =
          this.$utils.getItem("approveListByPosId").approveInfoList;
      }
    },
    // 模糊查询
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
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
  