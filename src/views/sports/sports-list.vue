<!-- 体育课 历史课程 -->
<template>
  <div class="record">
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper dayTab2" justify-content="end">
        <mu-flex class="flex-demo" justify-content="center">
          <el-form ref="formData" :model="formData" :inline="true" label-width="70px">
            <el-form-item label="课程名称">
              <el-input v-model="formData.name" placeholder="请输入课程名称" />
            </el-form-item>
            <el-form-item label="任课老师">
              <el-input v-model="formData.teacher" placeholder="请输入任课老师" />
            </el-form-item>
            <el-form-item label="课程类型">
              <el-input v-model="formData.type" placeholder="请输入课程类型" />
            </el-form-item>
            <el-form-item label="课程内容">
              <el-input v-model="formData.contet" placeholder="请输入课程内容" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查看</el-button>
            </el-form-item>
          </el-form>
        </mu-flex>
      </mu-flex>
    </mu-container>
    <!-- table部分 -->
    <div class="table">
      <h2 class="title">
        课程列表
        <el-button type="primary" @click="export2Excel(exportTable, '历史课程列表')">导出</el-button>
        <el-date-picker v-model="formData.dataDay" class="picker" type="date" :picker-options="pickerOptions" :clearable="false" placeholder="选择日期" />
      </h2>
      <el-table v-loading="dataListLoading" :data="dataList" stripe height="500" @selection-change="dataListSelectionChangeHandle">
        <el-table-column label="上课时间" prop="rank" align="center" />
        <el-table-column label="课程名称" prop="name" align="center" />
        <el-table-column label="任课老师" prop="teacher" align="center" />
        <el-table-column label="上课人数" prop="number" align="center" />
        <el-table-column label="课程类型" prop="type" align="center" />
        <el-table-column label="课程内容" prop="content" align="center" />
        <el-table-column label="操作" prop="attendance" align="center">
          <template slot-scope="{row}">
            <div>
              <el-button type="text" @click="viewInfo(row.id)">详情</el-button>
              <!-- <el-button type="text" @click="pkHandle(row.id)">PK</el-button> -->
            </div>
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
  </div>
</template>
<script>
// 状态 0 已绑定 1 备用 2 故障 3 丢失
import mixinViewModule from '@/mixins/view-module'
export default {
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sports/history/page',
        getDataListIsPage: true
      },
      formData: {
        name: '',
        teacher: '',
        type: '',
        contet: '',
        dataDay: ''
      },
      exportTable: {
        rank: '上课时间',
        name: '课程名称',
        teacher: '任课老师',
        number: '上课人数',
        type: '课程类型',
        content: '课程内容'
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      tableData: []
    }
  },
  created() {
    this.$store.state.sportStatus = 2
  },
  methods: {
    // 查看记录
    viewInfo(obj) {
      this.$message({
        type: 'success',
        message: '查看详情',
        offset: 200
      })
    },
    pkHandle(row) {
      this.$message({
        type: 'success',
        message: 'pk信息',
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
  .fixedHead {
    background: #fff;
    /deep/ .el-form {
      .el-form-item:not(:last-child) {
        .el-form-item__content {
          width: 180px;
        }
      }
    }
  }
  .table {
    margin-top: 30px;
    .title {
      .picker {
        float: right;
        margin-right: 10px;
      }
    }
    .el-table {
      margin-bottom: 20px;
    }
  }
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
    .leave {
      color: #909BB0;
    }
    .arrive {
      color: #204EFF;
    }
  }
}
// 查看详情里面的弹窗
.dialogList {
  background: #F0F0F7;
  padding-top: 20px;
  position: relative;
  .search {
    padding: 0 24px 20px;
    .el-input {
      border-radius: 30px;
    }
  }
  h2 {
    font-size: 16px;
    color: #43425D;
    height: 48px;
    line-height: 48px;
    padding-left: 20px;
    box-sizing: border-box;
    font-weight: bold;
    border-bottom: 1px solid #e9e9e9;
    background: #fff;
  }
  dl {
    background: #fff;
    display: flex;
    justify-content: flex-start;
    padding: 24px;
    dt {
      width: 96px;
      height: 96px;
      img {
        width: 96px;
        height: 96px;
        border-radius: 96px;
      }
    }
    dd {
      margin-left: 30px;
      p {
        font-size: 14px;
        line-height: 25px;
        span {
          text-align: right;
          display: inline-block;
          width: 90px;
        }
      }
    }
  }
  .info {
    font-size: 12px;
    color: #999;
    background: #fff;
    padding-left: 24px;
  }
  .footer {
    text-align: right;
    background: #fff;
    padding: 20px;
  }
  .ruku {
    background: #fff;
    padding: 24px;
  }
  .status {
    width: 0;
    height: 0;
    border-bottom: 40px solid #3FC376;
    border-left: 40px solid transparent;
    position: absolute;
    z-index: 10;
    right: 0;
    bottom: 0;
  }
  .status:after {
    content: '已绑';
    display: block;
    width: 40px;
    font-size: 10px;
    height: 40px;
    position: absolute;
    left: -20px;
    bottom: -50px;
    color: #fff;
    transform: rotate(-45deg)
  }
}
</style>
