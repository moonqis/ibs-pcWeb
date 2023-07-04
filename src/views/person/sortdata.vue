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
              食物种类申请记录
            </h2>
            <div v-if="list.length > 0">
              <div v-for="index in list" :key="index.id">
                <el-descriptions
                  :title="'编号&nbsp;' +  index.id"
                  direction="vertical"
                  :column="3"
                  :size="size"
                  border
                >
                  <el-descriptions-item label="名称">
                    {{ index.name }}
                  </el-descriptions-item>
                  <el-descriptions-item label="English Name">
                    {{ index.english_name }}
                  </el-descriptions-item>
                  <el-descriptions-item label="状态">
                    {{ index.index }}
                  </el-descriptions-item>

                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">描述</div>
                    </template>
                    {{ index.state }}
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </div>
            <div v-else><h3 style="color: #666666;margin-top: 50px;">暂无记录</h3></div>
            <div style="height: 100px;"></div>

          </el-card>
        </el-col>
        <el-col :span="2"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <div></div>
    </div>
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
});
onMounted(() => {
  var user = JSON.parse(localStorage.getItem("user"));
  
  Api.findonesortcheck(user[0].name)
    .then((data) => {
      console.log(data);
      Object.assign(state.list, data.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});
const { list } = toRefs(state);

const size = ref("default");
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

// return{
//   ...toRefs(state)
// }
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
      