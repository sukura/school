<!-- 体育课 今日课程 详情数据 -->
<template>
  <div class="record">
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper dayTab" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center">
          <!-- <h2>详情数据</h2> -->
          <el-page-header title="" content="考勤" @back="goBack" />
        </mu-flex>
      </mu-flex>
    </mu-container>
    <el-table :data="tableData" stripe height="600">
      <el-table-column label="姓名" prop="name">
        <template slot-scope="{row}">
          <!-- <el-avatar :size="'small'" :src="row.avatar" /> -->
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column label="学号" prop="studentId" />
      <el-table-column label="性别" prop="sex" />
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.status === true" style="color: #204EFF;">已到</span>
          <span v-else style="color: red;">未到</span> -->
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="已到"
            inactive-text="未到"
          />
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
          sex: '男',
          status: false
        }, {
          name: '李墨雪',
          studentId: 20200101,
          sex: '女',
          status: true
        }, {
          name: '李墨雪',
          studentId: 20200101,
          sex: '男',
          status: false
        }, {
          name: '李墨雪',
          studentId: 20200101,
          sex: '男',
          status: true
        }, {
          name: '李墨雪',
          studentId: 20200101,
          sex: '男',
          status: true
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
    this.$store.state.sportStatus = 2
  },
  methods: {
    goBack() {
      this.$router.push({
        path: 'sportslist'
      })
    },
    handleCommand(command) {
      console.log(command)
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
