<!-- 临时活动考勤 我参与的 -->
<template>
  <div class="classPage">
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper dayTab">
        <mu-flex class="flex-demo" justify-content="center">
          <p @click="jumpPage">
            <span>我创建的</span>
            <em />
          </p>
          <p class="active">
            <span>我参与的</span>
            <em />
          </p>
        </mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper pt1">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="学号">
            <el-input v-model="formData.number" placeholder="请输入学号" />
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="formData.activityName" placeholder="请输入活动名称" />
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="formData.dataDay" type="date" :picker-options="pickerOptions" :clearable="false" placeholder="选择日期" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </mu-flex>
    </mu-container>
    <!-- table部分 -->
    <div class="table mt-2">
      <h2 class="title">
        已建活动
      </h2>
      <el-table :data="list" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="活动名称" prop="activityName" align="center">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="viewInfo(scope.row)">{{ scope.row.activityName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="活动地点" prop="activityPlace" align="center" />
        <el-table-column label="活动时间" prop="time" align="center" />
        <el-table-column label="发起人" prop="name" align="center" />
        <el-table-column label="参与度" prop="attendance" align="center">
          <template slot-scope="scope">
            <div>
              <el-progress :percentage="scope.row.attendance" color="#7894FF" :format="format" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="time" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" class="color1">&bull; 正常</span>
            <span v-if="scope.row.status === 2" class="color2">&bull; 迟到</span>
            <span v-if="scope.row.status === 3" class="color3">&bull; 早退</span>
            <span v-if="scope.row.status === 4" class="color4">&bull; 缺勤</span>
            <span v-if="scope.row.status === 5" class="color5">&bull; 迟到&早退</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 查看活动详情 -->
    <mu-dialog width="800" :open.sync="dialog1">
      <mu-appbar color="#204EFF" :title="dialogTitle">
        <mu-button slot="right" icon @click="closeDialog">
          <mu-icon value="close" />
        </mu-button>
      </mu-appbar>
      <div class="activeDialog">
        <el-progress type="circle" :percentage="25">出勤率</el-progress>
        <el-table :data="list" stripe>
          <el-table-column type="selection" width="55" />
          <el-table-column label="参与人员" prop="name" align="center" />
          <el-table-column label="参与度" prop="attendance" align="center">
            <template slot-scope="scope">
              <div>
                <el-progress :percentage="scope.row.attendance" color="#7894FF" :format="format" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="time" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1" class="color1">&bull; 正常</span>
              <span v-if="scope.row.status === 2" class="color2">&bull; 迟到</span>
              <span v-if="scope.row.status === 3" class="color3">&bull; 早退</span>
              <span v-if="scope.row.status === 4" class="color4">&bull; 缺勤</span>
              <span v-if="scope.row.status === 5" class="color5">&bull; 迟到&早退</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </mu-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog1: false,
      dialogTitle: '活动详情',
      formData: {
        number: '',
        dataDay: '',
        activityName: ''
      },
      list: [
        {
          id: 1,
          activityName: '三年级二班国庆活动',
          activityPlace: '学校操场',
          time: '2020-02-05 13:00',
          name: '李墨雪',
          attendance: 20,
          status: 1
        }, {
          id: 1,
          activityName: '三年级二班国庆活动',
          activityPlace: '学校操场',
          time: '2020-02-05 13:00',
          name: '李墨雪',
          attendance: 20,
          status: 2
        }, {
          id: 1,
          activityName: '三年级二班国庆活动',
          activityPlace: '学校操场',
          time: '2020-02-05 13:00',
          name: '李墨雪',
          attendance: 20,
          status: 3
        }, {
          id: 1,
          activityName: '三年级二班国庆活动',
          activityPlace: '学校操场',
          time: '2020-02-05 13:00',
          name: '李墨雪',
          attendance: 20,
          status: 4
        }
      ],
      formData2: {
        avtiveName: '',
        place: '',
        startDate: '',
        endDate: ''
      },
      placeData: ['学校操场', '班级教室'],
      peopleData: ['李墨雪', '李小狼'],
      rules: {
        avtiveName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        place: [{ required: true, message: '请选择活动地点', trigger: 'change' }],
        people: [{ required: true, message: '请选择人员', trigger: 'change' }]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      multipleSelection: []
    }
  },
  created() {
    this.$store.state.workStatus = 3
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    format(percentage) {
      return percentage === 100 ? '100%' : `${percentage}%`
    },
    // 查询列表
    onSubmit() {
      this.$message.closeAll()
      this.$message({
        type: 'success',
        message: '查询',
        offset: 200
      })
    },
    // 导出按钮
    exportDown() {
      this.$message.closeAll()
      this.$message({
        type: 'success',
        message: '导出成功',
        offset: 200
      })
    },
    // 点击跳转 我参与的
    jumpPage() {
      this.$router.push({
        path: 'myActivity'
      })
    },
    // 关闭弹窗
    closeDialog() {
      this.dialog1 = false
    },
    // 查看活动详情
    viewInfo(obj) {
      this.dialog1 = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/public.scss';
@import '../../styles/work-class';
.classPage {
  .demo-container {
    .dayTab {
      width: 240px;
    }
    .pt1 {
      padding-top: 15px;
    }
  }
}
// 弹窗里面表单
.activeDialog {
  padding: 24px;
  .el-form {
    .el-select,
    .el-date-editor.el-input {
      width: 100%;
    }
  }
}
</style>
