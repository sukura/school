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
    <!-- 创建课程 -->
    <mu-dialog width="460" :open.sync="dialog">
      <mu-appbar color="#204EFF" title="创建课程">
        <mu-button slot="right" icon @click="dialog = false">
          <mu-icon value="close" />
        </mu-button>
      </mu-appbar>
      <div class="dialogList">
        <h3><i class="el-icon-warning" /> 请至少提前一个小时创建课程</h3>
        <el-form ref="formData" :model="formData" label-width="80px">
          <el-form-item label="上课学生" prop="student">
            <el-select v-model="formData.student" placeholder="请选择上课学生">
              <el-option label="三年级一班" value="三年级一班" />
              <el-option label="三年级二班" value="三年级二班" />
            </el-select>
          </el-form-item>
          <el-form-item label="上课日期">
            <el-date-picker
              v-model="formData.date"
              type="date"
              placeholder="请选择上课日期"
            />
          </el-form-item>
          <el-form-item label="上课地点">
            <el-select v-model="formData.address" placeholder="请选择上课地点">
              <el-option label="三年级一班" value="三年级一班" />
            </el-select>
          </el-form-item>
          <el-form-item label="上课时间">
            <el-time-select
              v-model="formData.startTime"
              placeholder="起始时间"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              style="width: 118px;"
            />
            <el-time-select
              v-model="formData.endTime"
              placeholder="结束时间"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: formData.startTime
              }"
              style="width: 118px;"
            />
          </el-form-item>
          <el-form-item label="上课名称">
            <el-input v-model="formData.className" placeholder="请输入上课名称" />
          </el-form-item>
          <el-form-item label="任课老师">
            <el-select v-model="formData.time" placeholder="请选择任课老师">
              <el-option label="张老师" value="张老师" />
            </el-select>
          </el-form-item>
          <el-form-item label="课程内容">
            <el-input v-model="formData.className" placeholder="请输入课程内容" />
            <p>
              <el-tag v-for="(item, index) in tagsData" :key="index" :type="item.status ? '':'info'" effect="dark" @click="changeTag(item)">{{ item.value }}</el-tag>
            </p>
          </el-form-item>
          <el-form-item label="课程名称">
            <el-input v-model="formData.className" placeholder="请输入课程名称" />
            <p>
              <el-tag v-for="(item, index) in tagsData2" :key="index" :type="item.status ? '':'info'" effect="dark" @click="changeTag(item)">{{ item.value }}</el-tag>
            </p>
          </el-form-item>
          <el-form-item style="text-align: right;padding-right: 25px;">
            <el-button @click="dialog = false">取消</el-button>
            <el-button type="primary" @click="dialog = false">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </mu-dialog>
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
      dialog: false,
      formData: {
        startTime: '',
        endTime: ''
      },
      tableData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      tagsData: [
        {
          value: '心肺耐力',
          status: false
        }, {
          value: '灵敏度',
          status: false
        }, {
          value: '爆发力',
          status: false
        }, {
          value: '速度',
          status: false
        }
      ],
      tagsData2: [
        {
          value: '跑步',
          status: false
        }, {
          value: '篮球',
          status: false
        }, {
          value: '乒乓球',
          status: false
        }, {
          value: '跳马',
          status: false
        }
      ]
    }
  },
  created() {
    this.$store.state.sportStatus = 1
  },
  mounted() {
  },
  methods: {
    viewInfo(obj) {
      // this.$message({
      //   type: 'success',
      //   message: '查看详情',
      //   offset: 200
      // })
      this.$router.push({
        path: 'sportsDayDetail'
      })
    },
    classHandle() {
      this.dialog = true
    },
    changeTag(obj) {
      obj.status = !obj.status
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
    margin-bottom: 20px;
    .leave {
      color: #909BB0;
    }
    .arrive {
      color: #204EFF;
    }
  }
}
.dialogList {
  background: #fff;
  padding-left: 40px;
  h3 {
    color: red;
    padding: 0 0 20px 20px;
  }
  .el-form {
    background: #fff;
    .el-select,
    .el-input {
      width: 240px;
    }
    p {
      .el-tag {
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
