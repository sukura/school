<!-- 体育课 今日课程 详情数据 -->
<template>
  <div class="record">
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper dayTab" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center">
          <!-- <h2>详情数据</h2> -->
          <el-page-header title="" content="详情数据" @back="goBack" />
        </mu-flex>
      </mu-flex>
    </mu-container>
    <el-table v-loading="dataListLoading" :data="tableData" stripe height="600" @selection-change="dataListSelectionChangeHandle">
      <el-table-column label="姓名" prop="name">
        <template slot-scope="{row}">
          <!-- <el-avatar :size="'small'" :src="row.avatar" /> -->
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column label="学号" prop="studentId" />
      <el-table-column label="实时心率" prop="heartRate" />
      <el-table-column label="最大心率百分比" prop="bigheart">
        <template slot-scope="scope">
          <span style="color: red;">{{ scope.row.bigheart }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平均心率" prop="heartRate2">
        <template slot-scope="scope">
          <span style="color: #204EFF;">{{ scope.row.heartRate2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运动量" prop="stepNum">
        <template slot-scope="scope">
          {{ scope.row.stepNum }} 步
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      background
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="total"
      layout="sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle"
    /> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      tableData: [
        {
          name: '李墨雪',
          studentId: 20200101,
          heartRate: '182bmp',
          bigheart: '90%',
          heartRate2: '77bmp',
          stepNum: 31897
        }, {
          name: '李墨雪',
          studentId: 20200101,
          heartRate: '182bmp',
          bigheart: '90%',
          heartRate2: '77bmp',
          stepNum: 31897
        }, {
          name: '李墨雪',
          studentId: 20200101,
          heartRate: '182bmp',
          bigheart: '90%',
          heartRate2: '77bmp',
          stepNum: 31897
        }, {
          name: '李墨雪',
          studentId: 20200101,
          heartRate: '182bmp',
          bigheart: '90%',
          heartRate2: '77bmp',
          stepNum: 31897
        }, {
          name: '李墨雪',
          studentId: 20200101,
          heartRate: '182bmp',
          bigheart: '90%',
          heartRate2: '77bmp',
          stepNum: 31897
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
    this.$store.state.sportStatus = 1
  },
  methods: {
    goBack() {
      this.$router.push({
        path: 'sportsDay'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/public.scss';
.record {
  padding-top: 65px;
  width: 1140px;
  .demo-container {
    background: #ffffff;
    height: 56px;
    line-height: 56px;
    display: flex;
    justify-content: space-between;
    .el-page-header {
      padding: 15px;
    }
    h2 {
      font-size: 18px;
      color: #43425D;
      font-weight:500;
      padding-left: 14px;
    }
    .dayTab2 {
      .el-form {
        .el-form-item {
          margin-bottom: 0;
          .el-input,
          .el-button {
            margin-top: 12px;
          }
        }
      }
    }
  }
  .el-table {
    margin: 20px 0;
    .leave {
      color: #909BB0;
    }
    .el-avatar--small {
      vertical-align: bottom;
      margin-right: 4px;
    }
    .arrive {
      color: #204EFF;
    }
  }
}
</style>
