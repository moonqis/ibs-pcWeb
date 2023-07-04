<template>
  <el-card shadow="never" style="min-height: 70vh">
    <div style="background-color: #fcfcfc">
      <div style="background-color: fcfcfc; height: 50px"></div>

      <div style="min-height: 80vh; margin-inline: 4rem">
        <el-row :gutter="20" style="margin-left: 1.5rem">
          <el-col :span="1"></el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="date1"
              type="date"
              placeholder="开始时间"
              style="margin-top: -5px"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span
              class="text-gray-500"
              style="position: relative; margin-left: 30px"
              >&nbsp;&nbsp;&nbsp;--</span
            >
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="date2"
              placeholder="结束时间"
              style="margin-top: -5px"
            />
          </el-col>

          <el-col :span="7">
            <el-button
              size="large"
              type="primary"
              style="margin-left: 1%; margin-top: -8px"
              @click="SearchDate()"
              >搜索 (search)
            </el-button></el-col
          >
        </el-row>
        <el-card shadow="never" style="min-height: 70vh">
          <el-row :gutter="20" style="margin-left: 1rem">
            <el-col :span="3"> 编号 </el-col>
            <el-col :span="2"> 标题 </el-col>
            <el-col :span="12"> </el-col>
            <el-col :span="4"> 时间 </el-col>
          </el-row>

          <div
            class="demo-collapse"
            style="margin-right: 2rem; margin-left: 2rem"
          >
            <el-collapse
              style=""
              v-model="activeNames"
              @change="handleChange"
              v-for="index in tableData.slice(
                (state.currentPage - 1) * state.PageSize,
                state.currentPage * state.PageSize
              )"
              :key="index.id"
              accordion
            >
              <el-collapse-item
                :title="index.name"
                :name="index.id"
                style="text-align: left"
              >
                <template #title>
                  <span
                    style="
                      font-size: 1rem;
                      text-align: left;
                      margin-left: 1rem;

                      width: 30px;
                    "
                  >
                    {{ index.id }}
                  </span>
                  <h1
                    style="
                      font-size: 1rem;
                      font-weight: 500;
                      text-align: left;
                      margin-left: 2.5rem;
                      width: 70%;
                      max-width: 70%;
                    "
                  >
                    {{ index.title }}
                  </h1>
                  <span
                    style="
                      font-size: 0.9rem;
                      text-align: left;
                      margin-left: 0.5rem;
                    "
                  >
                    {{ index.Date }}
                  </span>
                </template>
                <p
                  style="
                    text-align: left;
                    margin-left: 2rem;
                    margin-top: 1.5rem;
                    font-size: 0.9rem;
                    width: 90%;
                  "
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;{{ index.state }}
                </p>
                <p style="position: relative; margin-left: 70%">
                  {{ index.createDate }}
                </p>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="tabListPage" style="margin-left: 8rem; margin-top: 2rem">
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
          </div>
        </el-card>
      </div>

      <div style="background-color: #fcfcfc; height: 50px"></div>
    </div>
  </el-card>
</template>
  
  <script setup>
import moment from "moment";
import { reactive, ref, onMounted, toRefs, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import { InfoFilled } from "@element-plus/icons-vue";
import Api from "@/api/Api";
const form = reactive({
  date1: "",
  date2: "",
});
const { date1,date2 } = toRefs(form);
const onSubmit = () => {
  console.log("submit!");
};
const activeNames = [];
const handleChange = (val) => {
  console.log(val);
};

const state = reactive({
  // 默认显示第几页
  currentPage: 1,
  // 总条数，根据接口获取数据长度(注意：这里不能为空)
  totalCount: 0,
  // 个数选择器（可修改）
  pageSizes: [10, 15, 20, 40],
  // 默认每页显示的条数（可修改）
  PageSize: 10,
  tableData: [],
  tableData1: [],
});
//标题小于30个字符
const { currentPage, totalCount, pageSize, tableData, tableData1 } = toRefs(state);
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
// const currentDate = ref(new Date());

//获取所有公告
// 编写日期格式化方法
const dateFormat = (row, column) => {
  console.log(row, column);
  const date = row[column.property];
  if (date === undefined) {
    return "";
  }
  // 这里的格式根据需求修改
  return moment(date).format("YYYY-MM-DD");
};

onMounted(() => {
  form.date2 = new Date()
  function sortKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }
  Api.findallnotice()
    .then((data) => {
      // tlist=data
      Object.assign(state.tableData, sortKey(data,'id') );
      Object.assign(state.tableData1, data);

      state.totalCount = state.tableData.length;
      activeNames.push(state.tableData[0].id);
      console.log(activeNames);
    })
    .catch((err) => {
      console.log(err);
    });
});

Date.prototype.Format = function(formatStr) {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        str = str.replace(/yyyy|YYYY/, this.getFullYear());
        str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
        str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
        str = str.replace(/M/g, (this.getMonth() + 1));
        str = str.replace(/w|W/g, Week[this.getDay()]);
        str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
        str = str.replace(/d|D/g, this.getDate());
        str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
        str = str.replace(/h|H/g, this.getHours());
        str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
        str = str.replace(/m/g, this.getMinutes());
        str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
        str = str.replace(/s|S/g, this.getSeconds());
        return str
    }
const sselect = (tableDatas, date1,date2) => {
  return (tableDatas = tableDatas.filter((item) => {
    if (item.createDate != null) return item.createDate >= date1&&item.createDate<=date2;
  }));
};
const SearchDate=()=>{
  console.log(form.date1,form.date2)
  console.log(form.date1.Format("yyyy-MM-dd"))

  state.tableData = sselect(state.tableData1, form.date1.Format("yyyy-MM-dd"),form.date2.Format("yyyy-MM-dd"));
  console.log(state.tableData)
}
</script>

<style scoped>
</style>