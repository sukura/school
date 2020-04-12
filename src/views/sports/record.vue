<!-- 体育课 今日课程 -->
<template>
  <div class="record">
    <mu-container class="is-stripe fixedHead">
      <mu-container class="demo-container border-bottom">
        <mu-flex class="flex-wrapper dayTab" justify-content="start">
          <mu-flex class="flex-demo" justify-content="center">
            <h2>今日课程</h2>
          </mu-flex>
        </mu-flex>
        <mu-flex class="flex-wrapper dayTab2" justify-content="end">
          <mu-flex class="flex-demo" justify-content="center">
            <el-button type="primary" @click="classHandle(1)">创建课程</el-button>
            <el-button type="primary" @click="classHandle(2)">专业课程</el-button>
          </mu-flex>
        </mu-flex>
      </mu-container>
      <mu-row gutter class="header-row">
        <mu-col span="3">
          <h3><em>28</em>节</h3>
          今日课程
        </mu-col>
        <mu-col span="3">
          <h3><em>28</em>节</h3>
          今日课程
        </mu-col>
        <mu-col span="3">
          <h3><em>28</em>节</h3>
          今日课程
        </mu-col>
        <mu-col span="3">
          <h3><em>28</em>节</h3>
          今日课程
        </mu-col>
      </mu-row>
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
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/public.scss';
.record {
  padding-top: 160px;
  width: 1140px;
  .header-row {
    padding: 14px 0;
    background-color: #fff;
    .col {
      color: #989696;
      h3 {
        margin-bottom: 10px;
        em {
          font-size: 20px;
          margin-right: 4px;
          color: #43425D;
          font-weight: bold;
        }
      }
    }
  }
  .demo-container {
    background: #ffffff;
    height: 56px;
    line-height: 56px;
    display: flex;
    justify-content: space-between;
    &.border-bottom {
      border-bottom: 1px #e4e0e0 solid;
    }
    h2 {
      font-size: 18px;
      color: #43425D;
      font-weight:500;
      padding-left: 14px;
    }
    .dayTab2 {
      margin-top: 12px;
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
