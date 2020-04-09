<!-- 到校查询 进出记录 -->
<template>
  <div class="record">
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper dayTab" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center">
          <h2>进出记录</h2>
        </mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper dayTab2" justify-content="end">
        <mu-flex class="flex-demo" justify-content="center">
          <el-form ref="formData" :model="formData" :inline="true" label-width="80px" @keyup.enter.native="queryDataList()">
            <el-form-item label="日期">
              <el-date-picker v-model="formData.dataDay" type="date" :picker-options="pickerOptions" :clearable="false" placeholder="选择日期" />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="formData.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="formData.studentId" placeholder="请输入学号" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryDataList()">查看</el-button>
              <el-button type="primary" @click="export2Excel(exportTable, '进出记录列表')">导出</el-button>
            </el-form-item>
          </el-form>
        </mu-flex>
      </mu-flex>
    </mu-container>
    <el-table v-loading="dataListLoading" :data="dataList" stripe height="600" @selection-change="dataListSelectionChangeHandle">
      <el-table-column label="姓名" prop="name">
        <template slot-scope="{row}">
          <el-avatar :size="'small'" :src="row.avatar" />
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column label="学号" prop="studentId" />
      <el-table-column label="时间" prop="createTime" />
      <el-table-column label="状态">
        <template slot-scope="{row}">
          <span v-if="Boolean(row.status)" class="arrive">&bull; 进校</span>
          <span v-else class="leave">&bull; 离校</span>
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
        getDataListURL: '/api/school/arriverecord/page',
        getDataListIsPage: true
      },
      formData: {
        dataDay: '',
        name: '',
        studentId: ''
      },
      exportTable: {
        name: '姓名',
        status: '状态',
        studentId: '学号',
        createTime: '时间'
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
    this.$store.state.arriveStatus = 1
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
