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
              食物数据收藏
            </h2>
            <div v-if="list.length > 0">
              <div
                v-for="list in list.slice(
                  (state.currentPage - 1) * state.PageSize,
                  state.currentPage * state.PageSize
                )"
                :key="list.id"
              >
                <el-descriptions
                  :title="'编号&nbsp;' + list.id"
                  direction="vertical"
                  :column="3"
                  :size="size"
                  border
                >
                  <el-descriptions-item label="名称">
                    {{ list.name }}
                  </el-descriptions-item>
                  <el-descriptions-item label="English Name">
                    {{ list.english_name }}
                  </el-descriptions-item>
                  <el-descriptions-item label="描述" width="30%">
                    {{ list.state }}
                  </el-descriptions-item>

                  <el-descriptions-item label="图片" width="30%">
                    <!-- {{ index.result }} -->

                    <img
                      :src="list.picurl"
                      style="width: 100px; height: 100px"
                    />
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">详细</div>
                    </template>
                    <div
                      style="
                        display: flex;
                        margin-top: 5px;
                        align-items: center;
                      "
                    >
                      <div
                        v-if="list.detail_weight1 != ''"
                        style="display: flex; align-items: center; width: 60px"
                      >
                        <div
                          v-if="list.detail_resource1 == '健康'"
                          style="
                            background-color: lightgreen;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource1 == '轻微超量'"
                          style="
                            background-color: darkorange;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource1 == '严重超量'"
                          style="
                            background-color: red;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        {{ list.detail_weight1 }}
                      </div>
                      <div v-else style="height: 12px"></div>
                      <div
                        v-if="list.detail_weight2 != ''"
                        style="display: flex; align-items: center; width: 60px"
                      >
                        <div
                          v-if="list.detail_resource2 == '健康'"
                          style="
                            background-color: lightgreen;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource2 == '轻微超量'"
                          style="
                            background-color: darkorange;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource2 == '严重超量'"
                          style="
                            background-color: red;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        {{ list.detail_weight2 }}
                      </div>
                      <div v-else style="height: 12px"></div>
                      <div
                        v-if="list.detail_weight3 != ''"
                        style="display: flex; align-items: center; width: 60px"
                      >
                        <div
                          v-if="list.detail_resource3 == '健康'"
                          style="
                            background-color: lightgreen;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource3 == '轻微超量'"
                          style="
                            background-color: darkorange;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        <div
                          v-else-if="list.detail_resource3 == '严重超量'"
                          style="
                            background-color: red;
                            width: 12px;
                            height: 12px;
                            border-radius: 6px;
                            margin-right: 10px;
                          "
                        ></div>
                        {{ list.detail_weight3 }}
                      </div>
                      <div v-else style="height: 12px"></div>
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item label="种类">
                    {{ list.sort }}
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </div>
            <div v-else>
              <h3 style="color: #666666; margin-top: 50px">暂无记录</h3>
            </div>

            <div
              class="tabListPage"
              style="margin-left: 8rem; margin-top: 3rem"
            >
              <div v-if="state.totalCount <= 6"></div>
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
            <div style="height: 100px"></div>
          </el-card>
        </el-col>
        <el-col :span="2"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <div></div>
    </div>
    <div class="tabListPage" style="margin-left: 8rem"></div>
  </div>
</template>
      
  <script setup>
import personnav from "@/components/person/personnav.vue";
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from "@element-plus/icons-vue";
import Api from "@/api/Api";
const state = reactive({
  list: [],
  // 默认显示第几页
  currentPage: 1,
  // 总条数，根据接口获取数据长度(注意：这里不能为空)
  totalCount: 200,
  // 个数选择器（可修改）
  pageSizes: [6, 12, 24, 48],
  // 默认每页显示的条数（可修改）
  PageSize: 6,
  user: {},
});
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
onMounted(() => {
  var user = JSON.parse(localStorage.getItem("user"));

  Api.getoneuser(user[0].name)
    .then((data) => {
      Object.assign(state.user, data[0]);
      for (var i = 0; i < data[0].food_collect.split(",").length; i++) {
        if (data[0].food_collect.split(",")[i] != "")
          Api.getonefood(data[0].food_collect.split(",")[i])
            .then((data) => {
              state.list.push(data);
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
      }
      setTimeout(() => {
        state.totalCount = state.list.length;
      },1000);
    })
    .catch((err) => {
      console.log(err);
    });
});
const { list, currentPage, totalCount, pageSizes, PageSize } = toRefs(state);
const size = ref("");
const iconStyle = computed(() => {
  const marginMap = {
    large: "8px",
    default: "6px",
    small: "4px",
  };
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  };
});
const blockMargin = computed(() => {
  const marginMap = {
    large: "32px",
    default: "28px",
    small: "24px",
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  };
});
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
