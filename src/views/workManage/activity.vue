<!-- 临时活动考勤 我创建的 -->
<template>
  <div class="classPage">
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper dayTab">
        <mu-flex class="flex-demo" justify-content="center">
          <p class="active">
            <span>我创建的</span>
            <em />
          </p>
          <p @click="jumpPage">
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
        <el-button type="primary" class="btn" icon="el-icon-download" size="small" @click="exportDown">导出</el-button>
        <el-button type="primary" class="btn" icon="el-icon-circle-plus-outline" size="small" @click="foundActive">创建</el-button>
      </h2>
      <el-table :data="list" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="活动名称" prop="activityName" align="center" />
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
        <el-table-column label="详情" prop="time" align="center">
          <template slot-scope="scope">
            <el-button :key="scope.row.id" type="text">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 创建活动弹窗 -->
    <mu-dialog width="460" :open.sync="dialog1">
      <mu-appbar color="#204EFF" :title="dialogTitle">
        <mu-button slot="right" icon @click="closeDialog">
          <mu-icon value="close" />
        </mu-button>
      </mu-appbar>
      <div class="activeDialog">
        <el-form ref="formData2" :rules="rules" :model="formData2" label-width="80px">
          <el-form-item label="活动名称" prop="avtiveName">
            <el-input v-model="formData2.avtiveName" />
          </el-form-item>
          <el-form-item label="活动地点" prop="place">
            <el-select v-model="formData2.place">
              <el-option
                v-for="(item, index) in placeData"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="startDate">
            <el-date-picker v-model="formData2.startDate" type="date" placeholder="选择开始时间" />
          </el-form-item>
          <el-form-item label="结束时间" prop="endDate">
            <el-date-picker v-model="formData2.endDate" type="date" placeholder="选择结束时间" />
          </el-form-item>
          <el-form-item label="人员选择" prop="people">
            <el-select v-model="formData2.people">
              <el-option
                v-for="(item, index) in peopleData"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button type="primary" @click="saveForm('formData2')">保存</el-button>
            <el-button @click="resetForm('formData2')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </mu-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog1: false,
      dialogTitle: '创建活动',
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
          attendance: 20
        }, {
          id: 1,
          activityName: '三年级二班国庆活动',
          activityPlace: '学校操场',
          time: '2020-02-05 13:00',
          name: '李墨雪',
          attendance: 20
        }, {
          id: 1,
          activityName: '三年级二班国庆活动',
          activityPlace: '学校操场',
          time: '2020-02-05 13:00',
          name: '李墨雪',
          attendance: 20
        }, {
          id: 1,
          activityName: '三年级二班国庆活动',
          activityPlace: '学校操场',
          time: '2020-02-05 13:00',
          name: '李墨雪',
          attendance: 20
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
        path: 'myPartake'
      })
    },
    // 点击创建活动
    foundActive() {
      this.dialog1 = true
    },
    // 关闭弹窗
    closeDialog() {
      this.dialog1 = false
    },
    // 点击创建活动 保存按钮
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消 创建活动
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialog1 = false
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
