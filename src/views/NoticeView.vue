<template>
    <el-row :gutter="20" style="margin-left: -2.5rem;min-height: 40rem;">
      <el-col :span="3"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="17" ><div class="grid-content ep-bg-purple" /><noticelist></noticelist></el-col>
      <el-col :span="3"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
    <endline></endline>
  </template>
  <script setup>
  import { reactive, ref, onMounted, toRefs, computed } from "vue";
   import endline from "@/components/line/endline.vue";
   import noticelist from "@/components/notice/noticelist.vue";

//   const 
</script>
  
  <style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  </style>