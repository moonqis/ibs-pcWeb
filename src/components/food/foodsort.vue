<template>
  <el-table :data="tableData" border style="width: 100%; margin: 2rem">
    <el-table-column prop="id" label="ID" width="180" />

    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="number" label="数量" width="180" />

    <el-table-column prop="address" label="描述" width="400" />
    <!-- <el-table-column prop="date" label="更新时间" /> -->
  </el-table>
</template>
  
  <script setup>
import { reactive, ref, onMounted, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import endline from "@/components/line/endline.vue";
import Api from "@/api/Api";
import store from "@/store";

const router = useRouter();
const tableData = [
  {
    id: 1,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

onMounted(() => {
  Api.findallfood()
    .then((data) => {
      // tlist=data
      Object.assign(tableData, data);
      console.log(tableData);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>