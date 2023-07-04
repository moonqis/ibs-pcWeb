<template>
<div class="demo-input-size">
    <el-input
      v-model="input1"
      class="w-50 m-2"
      size="large"
      placeholder="  请输入 课程名 / 作者"
      :suffix-icon="Search"
      style=" width: 60%; margin-left: -15%;margin-top: 2rem;"
    />
    <el-button
      size="large"
      type="primary"
      style="margin-left: 1%;margin-top: 2rem;"
      >搜索 (search)
    </el-button>
  </div>
  <el-row :gutter="20" style="width: 100%;margin-top: 1rem;">
    <!-- min-height: 25rem; -->
    <el-col
      v-for="index in tableData.slice(
        (state.currentPage - 1) * state.PageSize,
        state.currentPage * state.PageSize
      )"
      :key="index"
      :span="8"
      style="margin-top: 25px;"
    >
      <el-card :body-style="{ padding: '0px' }">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px">
          <span>学习视频</span>
          <div class="bottom">
            <time class="time">{{ currentDate }}</time>
            <!-- <p>{{ index.name }}</p> -->
            <!-- <el-button text class="button"></el-button> -->
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <div class="tabListPage" style="margin-left: 8rem;">
    <el-pagination
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
</template>


<script setup>
import { reactive, ref, onMounted, toRefs, computed } from "vue";
import { Search } from "@element-plus/icons-vue";

const state = reactive({
  // 默认显示第几页
  currentPage: 1,
  // 总条数，根据接口获取数据长度(注意：这里不能为空)
  totalCount: 200,
  // 个数选择器（可修改）
  pageSizes: [6, 12, 24, 48],
  // 默认每页显示的条数（可修改）
  PageSize: 6,
});
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

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
const currentDate = ref(new Date());
const input1 = ref("");

</script>


<style>
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