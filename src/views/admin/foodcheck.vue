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
              食物数据审核
            </h2>

            <el-select
              v-model="value"
              filterable
              placeholder="Select"
              @change="change"
              style="position: relative; left: 20%; margin-bottom: 30px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-table
              :data="
                tableData.slice(
                  (state.currentPage - 1) * state.PageSize,
                  state.currentPage * state.PageSize
                )
              "
              style="width: 100%"
              loading="lazy"
              :default-sort="{ prop: 'id' }"
            >
              <el-table-column label="ID" prop="id" width="80" sortable fixed>
              </el-table-column>
              <el-table-column label="名称" width="120">
                <template #default="scope">
                  <el-popover
                    effect="light"
                    trigger="hover"
                    placement="top"
                    width="auto"
                  >
                    <template #default>
                      <div>名称: {{ scope.row.name }}</div>
                      <div>English Name: {{ scope.row.english_name }}</div>
                    </template>
                    <template #reference>
                      <el-tag>{{ scope.row.name }}</el-tag>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="详细" width="250">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <div v-for="list in scope.row.detail1" :key="list.weight">
                      <div
                        v-if="list.weight != ''"
                        style="display: flex; align-items: center; width: 60px"
                      >
                        <div
                          v-if="list.resource == '健康'"
                          style="
                            background-color: lightgreen;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.resource == '轻微超量'"
                          style="
                            background-color: rgb(255, 170, 0);
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.resource == '严重超量'"
                          style="
                            background-color: red;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        {{ list.weight }}
                      </div>
                      <div v-else style="height: 12px"></div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="状态" width="110">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <span>{{ scope.row.result }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button @click="handleEdit(scope.$index, scope.row)"
                    >查看</el-button
                  >
                  <el-button
                    v-if="
                      scope.row.result != '通过' && scope.row.result != '驳回'
                    "
                    type="danger"
                    size="small"
                    @click="handleDelete(scope.$index, scope.row)"
                    >驳回</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div style="height: 50px"></div>
            <div class="tabListPage" style="margin-left: 8rem">
              <div v-if="state.totalCount <= 10"></div>

              <el-pagination
                v-else
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="state.currentPage"
                :page-sizes="state.pageSizes"
                :page-size="state.PageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="state.totalCount"
              >
              </el-pagination>
              <div style="height: 100px"></div>
            </div> </el-card
        ></el-col>
        <el-col :span="2"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <div></div>
    </div>

    <el-dialog v-model="deleteDialog" title="确认驳回？">
      <el-form :model="course" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="course.name" disabled />
        </el-form-item>
        <el-form-item label="English Name">
          <el-input v-model="course.english_name" disabled />
        </el-form-item>
        <el-form-item label="种类">
          <el-input v-model="course.sort" disabled />
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="course.state" type="textarea" disabled />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialog = false">取消</el-button>
          <el-button type="primary" @click="deleteTutorial">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="updateDialog" title="食物数据预览">
      <el-scrollbar height="400px">
        <el-form :model="course">
          <el-row class="row-bg" :gutter="0">
            <el-col :span="10" style="margin-left: 1rem">
              <img
                :src="course.picurl"
                class="avatar"
                style="margin-left: 3rem"
              />
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
                <p>名称 : &nbsp;&nbsp;{{ course.name }}</p>
                <p>English Name : &nbsp;&nbsp;{{ course.english_name }}</p>
                <p>食物种类 : &nbsp;&nbsp;{{ course.sort }}</p>
              </div>
            </el-col>
            <el-col :span="20" style="margin-left: 1rem">
              <div v-for="index in course.detail1" :key="index.weight" style="">
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
                            <div style="width: 130px; margin-left: 30px">
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
                            <div style="width: 130px; margin-left: 30px">
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
          <el-button @click="updateDialog = false">取消</el-button>
          <el-button
            v-if="course.result != '通过'"
            type="primary"
            @click="updateTutorial"
            >确认通过</el-button
          >
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
let updateDialog = ref(false);
let deleteDialog = ref(false);
const state = reactive({
  // 默认显示第几页
  currentPage: 1,
  // 总条数，根据接口获取数据长度(注意：这里不能为空)
  totalCount: 1,
  // 个数选择器（可修改）
  pageSizes: [15, 30, 60, 100],
  // 默认每页显示的条数（可修改）
  PageSize: 30,
  input1: "",
  input2: "",
  input3: "",
  form: {
    id: 1,
    name: "2",
    password: "3",
  },
  tableData: [],
  tableDatas: [],

  course: {},
  detailsort: [
    "葡萄糖",
    "果糖",
    "半乳糖",
    "葡萄糖谷糖",
    "葡萄糖聚合物",
    "低聚糖",
  ],
});
const dialogFormVisible = ref(false);
const sortlist = [];
onMounted(() => {
  Api.findallfoodcheck()
    .then((data) => {
      // tlist=data
      Object.assign(state.tableData, sselect(data, "待审核"));
      Object.assign(state.tableDatas, data);
      for (let i = 0; i < state.tableData.length; i++) {
        state.tableData[i].detail1 = JSON.parse(state.tableData[i].detail);
        state.tableDatas[i].detail1 = JSON.parse(state.tableDatas[i].detail);
      }
      for (let i = 0; i < state.tableDatas.length; i++) {
        state.tableDatas[i].detail1 = JSON.parse(state.tableDatas[i].detail);
      }
      setTimeout(() => {
        console.log(state.tableData);
      }, 20);

      state.totalCount = state.tableData.length;
    })
    .catch((err) => {
      console.log(err);
    });
  Api.findallfood()
    .then((data) => {
      Object.assign(sortlist, data);
      console.log(sortlist);
    })
    .catch((err) => {
      console.log(err);
    });
});

const {
  url,
  input1,
  input2,
  input3,
  form,
  tableData,
  tableDatas,
  course,
  detailsort,
} = toRefs(state);

const activeNames = ref(["1"]);
const sselect = (tableDatas, name) => {
  return (tableDatas = tableDatas.filter((item) => {
    if (item.result != null) return item.result === name;
  }));
};
const change = (val) => {
  if (val == "全部") {
    state.tableData = state.tableDatas;
  } else {
    state.tableData = sselect(state.tableDatas, val);
    console.log(state.tableDatas, val);
  }
  setTimeout(() => {
    state.totalCount = state.tableData.length;
  }, 20);
};
const value = ref("待审核");
const options = [
  {
    value: "全部",
    label: "全部",
  },
  {
    value: "待审核",
    label: "待审核",
  },
  {
    value: "通过",
    label: "通过",
  },
  {
    value: "驳回",
    label: "驳回",
  },
];

const handleChange = (val) => {
  console.log(val);
};

const handleEdit = (index, row) => {
  Object.assign(state.course, row);
  console.log(state.course);

  setTimeout(() => {
    state.course.detail1[0].detail = state.course.detail_detail1.split(",");
    state.course.detail1[1].detail = state.course.detail_detail2.split(",");
    state.course.detail1[2].detail = state.course.detail_detail3.split(",");
    updateDialog.value = true;
  }, 20);
};

const handleDelete = (index, row) => {
  console.log(index, row);
  Object.assign(state.course, row);

  deleteDialog.value = true;
  state.course.result = "驳回";
};

const updateTutorial = () => {
  let sort1 = {};
  state.course.result = "通过";
  for (var i = 0; i < sortlist.length; i++) {
    if (sortlist[i].name == state.course.sort) {
      sort1 = sortlist[i];
      setTimeout(()=>{
        sort1.number++;

      },5)

    }
  }
  delete state.course.detail1;
  Api.createfoodlist(state.course)
    .then((data) => {
      // tlist=data
      if (data.message == "创建出错") {
        console.log("更新失败");
      } else {
        Api.updatefoodcheck(state.course)
          .then((data) => {
            // tlist=data
            if (data.message == "更新成功") {
              console.log('1')
              Api.updatesort(sort1)
                .then((data) => {
                  // tlist=data
                  if (data) {
                    updateDialog.value = false;
                    // location.reload();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log("更新失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteTutorial = () => {
  delete state.course.detail1;
  Api.updatefoodcheck(state.course)
    .then((data) => {
      // tlist=data
      if ((data.message = "更新成功")) {
        console.log(state.course);
        deleteDialog.value = false;
        location.reload();
        console.log("重置成功");
      } else {
        console.log("更新失败");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleSizeChange = (val) => {
  // 改变每页显示的条数
  state.PageSize = val;
  // 注意：在改变每页显示的条数时，要将页码显示到第一页
  state.currentPage = 1;
};
// 显示第几页
const handleCurrentChange = (val) => {
  // 改变默认的页数
  state.currentPage = val;
};
</script>
  
  <style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 200px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
  height: 16rem;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>   