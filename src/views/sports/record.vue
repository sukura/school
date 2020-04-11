<!-- 体育课 今日课程 -->
<template>
  <div class="record">
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper dayTab" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center">
          <h2>今日课程</h2>
        </mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper dayTab2" justify-content="end">
        <mu-flex class="flex-demo" justify-content="center">
          <el-form ref="formData" :model="formData" :inline="true" label-width="80px">
            <el-form-item label="日期">
              <el-date-picker v-model="formData.dataDay" type="date" :picker-options="pickerOptions" :clearable="false" placeholder="选择日期" />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="formData.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="formData.nodeConfig" placeholder="请输入学号" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDataList">查看</el-button>
              <el-button type="primary">导出</el-button>
            </el-form-item>
          </el-form>
        </mu-flex>
      </mu-flex>
    </mu-container>
    <el-table :data="tableData" stripe height="600">
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="学号" prop="nodeConfig" />
      <el-table-column label="时间" prop="time" />
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status === true" class="arrive">&bull; 进校</span>
          <span v-if="scope.row.status === false" class="leave">&bull; 离校</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        dataDay: '',
        name: '',
        nodeConfig: ''
      },
      tableData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
    this.$store.state.arriveStatus = 1
  },
  mounted() {
    // this.getTablelist()
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.$http.post('/api/sports/attendance/Page', {
        curPage: 1,
        pageSize: 10,
        ...this.formData
      }).then(({data}) => {
        this.tableData = data.list
        console.log(data)
      }).catch((err) => {
        console.log(err)
      });
    },    
    // getTablelist() {
    //   this.$http.post('/api/school/record/list').then(response => {
    //     this.tableData = response.data.data
    //   }).catch(() => {})
    // }
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
    h2 {
      font-size: 18px;
      color: #43425D;
      font-weight:500;
      padding-left: 24px;
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
    .leave {
      color: #909BB0;
    }
    .arrive {
      color: #204EFF;
    }
  }
}
</style>
