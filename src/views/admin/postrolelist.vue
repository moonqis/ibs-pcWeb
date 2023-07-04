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
        <el-col :span="14">
          <el-card
            style="
              z-index: 999;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
              min-height: 800px;
              height: auto;
            "
          >
            <h2 style="position: relative; text-align: left; margin-left: 3rem">
              食物种类审核
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
            >
              <el-table-column label="ID" width="60" fixed>
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <span>{{ scope.row.id }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="申请人" width="160">
                <template #default="scope">
                  <el-popover
                    effect="light"
                    trigger="hover"
                    placement="top"
                    width="auto"
                  >
                    <template #default>
                      <div>账号: {{ scope.row.createBy }}</div>
                      <div>称呼: {{ scope.row.name }}</div>
                    </template>
                    <template #reference>
                      <el-tag>{{ scope.row.createBy }}</el-tag>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="联系方式" width="200">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <span>{{ scope.row.telephone }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="申请时间" width="130">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <span>{{ scope.row.createDate }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button @click="handleEdit(scope.$index, scope.row)"
                    >查看</el-button
                  >
                  <el-button
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
              <div v-if="state.totalCount <= 15"></div>

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
    <el-dialog v-model="updateDialog" title="申请信息">
      <el-form :model="course" label-width="120px">
        <el-form-item label="申请人">
          <el-input v-model="course.createBy" disabled />
        </el-form-item>
        <el-form-item label="称呼" disabled>
          <el-input v-model="course.name" disabled />
        </el-form-item>
        <el-form-item label="联系方式" disabled>
          <el-input v-model="course.telephone" disabled />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="course.state" type="textarea" disabled />
        </el-form-item>
        <el-form-item label="申请时间" disabled>
          <el-input v-model="course.createDate" disabled />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="course.result" disabled />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateDialog = false">取消</el-button>
          <el-button type="primary" @click="updateTutorial">确认通过</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="deleteDialog" title="确认驳回？">
      <el-form :model="course" label-width="120px">
        <el-form-item label="申请人">
          <el-input v-model="course.createBy" disabled />
        </el-form-item>
        <el-form-item label="称呼" disabled>
          <el-input v-model="course.name" disabled />
        </el-form-item>
        <el-form-item label="联系方式" disabled>
          <el-input v-model="course.telephone" disabled />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="course.result" disabled />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialog = false">取消</el-button>
          <el-button type="primary" @click="deleteTutorial">确认</el-button>
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
    name: "",
    password: "",
  },
  tableData: [],
  tableDatas: [],
  user: {},
  course: {},
});
const dialogFormVisible = ref(false);
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
onMounted(() => {
  Api.findallrolecheck()
    .then((data) => {
      // tlist=data
      Object.assign(state.tableData, sselect(data, "待审核"));
      Object.assign(state.tableDatas, data);
      console.log(state.tableData);
      state.totalCount = state.tableData.length;
    })
    .catch((err) => {
      console.log(err);
    });
  var user = JSON.parse(localStorage.getItem("user"));

  Api.getoneuser(user[0].name)
    .then((data) => {
      console.log(data);
      Object.assign(state.user, data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

const { url, input1, input2, input3, form, tableData, course } = toRefs(state);

const handleEdit = (index, row) => {
  updateDialog.value = true;
  Object.assign(state.course, row);
  console.log(state.course);
  state.course.result = "通过";
  state.user.role = "营养师";
};

const handleDelete = (index, row) => {
  console.log(index, row);
  Object.assign(state.course, row);

  deleteDialog.value = true;
  state.course.result = "驳回";
};

const updateTutorial = () => {
  Api.updaterolecheck(state.course)
    .then((data) => {
      // tlist=data
      if (data.message == "更新成功") {
        Api.updateuser(state.user)
        .then((data) => {
          console.log(data);
          ElMessage({
            message: "更新成功",
            type: "success",
          });
          updateDialog.value = false;
          setTimeout(() => {
            location.reload();
          }, 1000);
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
};

const deleteTutorial = () => {
  Api.updaterolecheck(state.course)
    .then((data) => {
      // tlist=data
      if ((data.message = "更新成功")) {
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
  width: 300px;
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
</style>   