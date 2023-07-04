<template>
  <div
    style="width: 80%; margin-left: 7%; margin-bottom: 100px"
    v-loading.fullscreen.lock="fullscreenLoading"
  >
    <el-row :gutter="20">
      <el-col :span="3">
        <el-affix :offset="73">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <span style="margin-left: 1px">食物列表</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span style="margin-left: 1px">食物查询</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span style="margin-left: 1px">食物种类</span>
            </el-menu-item>
            <el-menu-item v-if="state.user.role != '用户'" index="4">
              <span style="margin-left: 1px">数据申报</span>
            </el-menu-item>
          </el-menu>
        </el-affix>
      </el-col>
      <el-col :span="21" style="min-height: 40rem; max-height: 50rem">
        <div v-if="state.page === 1">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <div>
              <el-input
                v-model="input1"
                size="large"
                placeholder="  请输入 中文名 / English name"
                :suffix-icon="Search"
                style="width: 60%; margin-left: -15%"
              />
              <el-button size="large" style="margin-left: 1%" @click="Search11"
                >搜索 (search)
              </el-button>
            </div>
            <el-divider content-position="left"></el-divider>
            <el-tab-pane label="全部" name="all" lazy
              ><foodlist Text="全部"></foodlist
            ></el-tab-pane>

            <el-tab-pane label="调味品" name="调味品" lazy
              ><foodlist></foodlist
            ></el-tab-pane>
            <el-tab-pane label="豆类,坚果" name="豆类,坚果" lazy
              ><foodlist Text="豆类,坚果"></foodlist
            ></el-tab-pane>
            <el-tab-pane label="碳水" name="碳水" lazy
              ><foodlist></foodlist
            ></el-tab-pane>
            <el-tab-pane label="蛋白质" name="蛋白质" lazy
              ><foodlist></foodlist
            ></el-tab-pane>
            <el-tab-pane label="乳制品" name="乳制品" lazy
              ><foodlist></foodlist
            ></el-tab-pane>
            <el-tab-pane label="膳食剂" name="膳食剂" lazy
              ><foodlist></foodlist
            ></el-tab-pane>
            <el-tab-pane label="蔬菜" name="蔬菜" lazy
              ><foodlist></foodlist
            ></el-tab-pane>
            <el-tab-pane label="水果" name="水果" lazy
              ><foodlist></foodlist
            ></el-tab-pane>
            <el-tab-pane label="糖类" name="糖类" lazy
              ><foodlist></foodlist
            ></el-tab-pane>
            <el-tab-pane label="小吃" name="小吃" lazy
              ><foodlist></foodlist
            ></el-tab-pane>
            <el-tab-pane label="饮料" name="饮料" lazy
              ><foodlist></foodlist
            ></el-tab-pane>
            <el-tab-pane label="油脂" name="油脂" lazy
              ><foodlist></foodlist
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div v-if="state.page == 2"><foodsearch></foodsearch></div>
        <div v-if="state.page == 3">
          <el-table :data="foodsort" stripe>
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="name" label="名称" width="180" />
            <el-table-column prop="number" label="数量" width="180" />
            <el-table-column prop="state" label="描述" width="350" />
            <el-table-column label="Operations">
              <template #default="scope">
                <el-button size="default" @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else-if="state.page == 4 && state.user.role != '用户'">
          <foodchange></foodchange>
        </div>
      </el-col>
    </el-row>
  </div>

  <el-dialog v-model="dialogFormVisible1" title="食物种类编辑">
    <el-form :model="sortForm" label-width="120px" style="margin-left: 12%">
      <el-form-item label="名称">
        <el-input v-model="sortForm.name" style="width: 300px" />
      </el-form-item>
      <el-form-item label="English Name">
        <el-input v-model="sortForm.english_name" style="width: 300px" />
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="sortForm.number" disabled style="width: 300px" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="sortForm.state"
          type="textarea"
          style="width: 300px"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">Cancel</el-button>
        <el-button type="primary" @click="updatesort(sortForm)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
  <endline></endline>
</template>

<script setup>
import { reactive, ref, onMounted, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import foodlist from "@/components/food/foodlist.vue";
import foodchange from "@/components/food/foodchange.vue";
import foodsearch from "@/components/food/foodsearch.vue";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";

import endline from "@/components/line/endline.vue";
// import foodsort from "@/components/food/foodsort.vue";
// import { provide } from 'vue'
import store from "@/store/index.js";
import Api from "@/api/Api";

const state = reactive({
  page: 1,
  value: "",
  sort: [
    {
      name: "米饭",
    },
    {
      name: "米饭",
    },
    {
      name: "米饭",
    },
  ],
  input1: "",
  user: {},
  sortForm: {},
  dialogFormVisible1: false,
});
let activeIndex = ref("1");
const activeName = ref(localStorage.getItem("Tablesort"));
let x = 0;
const handleClick = (tab, event) => {
  console.log("标签页", tab.props.label);
  if (tab.props.label === "全部") {
    localStorage.removeItem("Tablesort");

    localStorage.setItem("Tablesort", "all");

  } else {
    localStorage.removeItem("Tablesort");

    localStorage.setItem("Tablesort", tab.props.label);
    console.log(localStorage);
  }
};
// provide('leixing', tab.props.label)
//provide传递test001的参数，值是987654321到子孙节点

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
  switch (key) {
    case "1":
      state.page = 1;
      break;
    case "2":
      state.page = 2;
      break;
    case "3":
      state.page = 3;
      break;
    case "4":
      state.page = 4;
      break;
  }

  console.log(state.page);
};
const foodsort = [];
const food = [];
const fullscreenLoading = ref(false);
const Search11 = () => {
  activeIndex.value = "2";
  store.state.search = state.input1;
  // x = 1;
  // console.log(x);
  state.page = 2;
};

onMounted(() => {
  // setTimeout(() => {
  //   fullscreenLoading.value = false
  // }, 2000)
  Api.findallfood()
    .then((data) => {
      // tlist=data
      Object.assign(foodsort, data);
      Object.assign(store.state.foodsort, data);

      console.log(foodsort);
    })
    .catch((err) => {
      console.log(err);
    });

  // store.state.apptitle = "/food";
  // console.log("导航：" + store.state.apptitle);
  Api.getonesort("all")
    .then((data) => {
      Object.assign(food, data.rows);
      // console.log(state.tableData);
    })
    .catch((err) => {
      console.log(err);
    });

  if (localStorage.getItem("user")) {
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
const handleEdit = (row) => {
  state.sortForm = row;
  state.dialogFormVisible1 = true;
};
const updatesort = (sortForm) => {
  console.log(sortForm);

  Api.updatesort(sortForm)
    .then((data) => {
      console.log(data);
      state.dialogFormVisible1 = false;
      ElMessage({
        message: "修改成功",
        type: "success",
      });
      setTimeout(() => {
        location.reload();
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    });
};
const { input1, page, value, sort, user, sortForm, dialogFormVisible1 } =
  toRefs(state);
</script>

<style>
.el-tab-pane {
  text-align: center;
  font-weight: 400;
}
</style>