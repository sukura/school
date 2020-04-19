<!-- 体育课 今日课程 -->
<template>
  <div class="record">
    <mu-container class="demo-container is-stripe fixedHead border-bottom">
      <!-- <mu-container class="demo-container border-bottom"> -->
      <mu-flex class="flex-wrapper dayTab" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center">
          <h2>今日课程</h2>
        </mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper dayTab2" justify-content="end">
        <mu-flex class="flex-demo" justify-content="center">
          <el-button type="primary" @click="classHandle(1)">创建课程</el-button>
          <!-- <el-button type="primary" @click="classHandle(2)">专业课程</el-button> -->
        </mu-flex>
      </mu-flex>
    </mu-container>
    <mu-row gutter class="header-row">
      <mu-col span="3">
        <h3><em>28</em>节</h3>
        今日课程
      </mu-col>
      <mu-col span="3">
        <h3><em>8</em>节</h3>
        正在上课
      </mu-col>
      <mu-col span="3">
        <h3><em>10</em>节</h3>
        未上课程
      </mu-col>
      <mu-col span="3">
        <h3><em>10</em>节</h3>
        已上课程
      </mu-col>
    </mu-row>
    <el-table v-loading="dataListLoading" :data="dataList" stripe height="500" @selection-change="dataListSelectionChangeHandle">
      <el-table-column label="班级" prop="className" />
      <el-table-column label="上课时间" prop="time" />
      <el-table-column label="上课地点" prop="adress" />
      <el-table-column label="上课人数" prop="studentNumber" />
      <el-table-column label="任课老师" prop="teacherName" />
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1">正在上课</el-tag>
          <el-tag v-if="scope.row.status === 2" type="success">未上课程</el-tag>
          <el-tag v-if="scope.row.status === 3" type="info">已上课程</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="viewInfo(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="total"
      layout="sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle"
    />
  </div>
</template>
<script>
import mixinViewModule from '@/mixins/view-module'
export default {
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sports/day/page',
        getDataListIsPage: true
      },
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
    this.$store.state.sportStatus = 1
  },
  mounted() {
  },
  methods: {
    viewInfo(obj) {
      this.$message({
        type: 'success',
        message: '查看详情',
        offset: 200
      })
      console.log(obj)
    },
    classHandle() {
      this.$message({
        type: 'success',
        message: '创建课程',
        offset: 200
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
  .header-row {
    padding: 14px 0;
    background-color: #fff;
    margin: 0 0 10px 0;
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
