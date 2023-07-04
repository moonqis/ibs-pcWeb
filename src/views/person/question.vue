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
              min-height: 1000px;
              height: auto;
            "
          >
            <h2 style="position: relative; text-align: left; margin-left: 3rem">
              常见问题
            </h2>
            <div
              class="demo-collapse"
              style="margin-top: 5rem; margin-inline: 40px"
            >
              <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                  <template #title>
                    感谢使用<el-icon class="header-icon">
                      <info-filled />
                    </el-icon>
                  </template>
                  <div>
                    感谢使用IBS食物管理系统，这里是一些说明信息
                  </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template #title>
                    搭建初衷<el-icon class="header-icon">
                      <info-filled />
                    </el-icon>
                  </template>
                  <div>
                    软件为用户【IBS（肠易激综合征）患者】整理提供了大量食物的FODMAP指数，旨在为用户可以有一个更好的饮食指标
      
                  </div>
                </el-collapse-item>
                <el-collapse-item name="3">
                  <template #title>
                    数据来源<el-icon class="header-icon">
                      <info-filled />
                    </el-icon>
                  </template>
                  <div>
                    本系统数据信息均来自均来自已公开发布的国内外论文（期刊文章、连续出版物、专著、论文集等）与莫纳什大学公开的FODMAP食物相关数据，并根据一定条件进行筛选整理
    
                  </div>
                </el-collapse-item>
                <el-collapse-item name="4">
                  <template #title>
                    问题反馈<el-icon class="header-icon">
                      <info-filled />
                    </el-icon>
                  </template>
                  <div>
                    用户可以在“我要反馈”中提交相关的建议或者意见（如：对交互性的建议；食物数据的准确性等），我们会尽快处理
    
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div style="height: 100px;"></div>

          </el-card></el-col
        >
        <el-col :span="2"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <div></div>
    </div>
  </div>
</template>
      
  <script setup>
import { InfoFilled } from "@element-plus/icons-vue";
import personnav from "@/components/person/personnav.vue";
import { ref } from "vue";

const activeNames = ref(["1", "2", "3", "4"]);
</script>
      