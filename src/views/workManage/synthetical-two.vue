<!-- 考勤 综合查询 节次查询 -->
<template>
  <div class="classPage">
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper dayTab" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center">
          <p @click="jumpPage">
            <span>人次查询</span>
            <em />
          </p>
          <p class="active">
            <span>节次查询</span>
            <em />
          </p>
        </mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper dayTab2" justify-content="end">
        <mu-flex class="flex-demo" justify-content="center">
          <el-date-picker v-model="dataDay" type="date" :picker-options="pickerOptions" :clearable="false" placeholder="选择日期" />
          <!-- <mu-date-input v-model="dataDay" icon="today" no-display /> -->
        </mu-flex>
      </mu-flex>
    </mu-container>
    <!-- 图表部分 -->
    <div class="char-box">
      <div class="chart chart-left">
        <h2 class="title">考勤出勤率</h2>
        <div id="chart1" style="width: 100%; height: 230px;" />
      </div>
      <div class="chart chart-right">
        <h2 class="title">
          考勤人次
          <!-- <el-button type="primary" class="btn" size="small" icon="el-icon-download">导出</el-button> -->
        </h2>
        <div id="chart2" style="width: 100%; height: 230px;" />
      </div>
    </div>
    <!-- table部分 -->
    <div class="table mt-2">
      <h2 class="title">
        综合查询
        <!-- <el-button type="primary" class="btn" icon="el-icon-download" size="small">导出</el-button> -->
      </h2>
      <el-table :data="list" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="节次" prop="className" align="center">
          <template slot-scope="scope">
            <div>
              <el-link type="primary" :underline="false" @click="classDetail(scope.row.className)">{{ scope.row.className }}</el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="日期" prop="time" align="center" />
        <el-table-column label="时间" prop="time" align="center" />
        <el-table-column label="正常" prop="number" min-width="100" align="center" />
        <el-table-column label="迟到" prop="late" min-width="100" align="center" />
        <el-table-column label="早退" prop="leaveEarly" min-width="100" align="center" />
        <el-table-column label="缺勤" prop="lack" min-width="100" align="center" />
        <el-table-column label="迟到&早退" prop="lateAndleave" min-width="100" align="center" />
      </el-table>
    </div>
    <!-- 考勤详情弹窗 -->
    <mu-dialog width="862" transition="slide-top" :open.sync="dialog1">
      <mu-appbar color="#204EFF" :title="dialogTitle">
        <mu-button slot="right" icon @click="closeDialog">
          <mu-icon value="close" />
        </mu-button>
      </mu-appbar>
      <div style="padding: 5px; background: #F0F0F7;">
        <div class="dialog-top">
          <h2 class="title">
            课程信息
            <el-button type="primary" icon="el-icon-download" round class="btn">导出</el-button>
          </h2>
          <ul>
            <li>课程名称：语文</li>
            <li>任课老师：<i class="el-icon-user" /> 张老师</li>
            <li>上课时间：<i class="el-icon-timer" /> 8:00 - 9:00</li>
            <li>上课地点：<i class="el-icon-location-outline" /> 2013</li>
          </ul>
        </div>
        <div class="mt-1 dialog-bottom">
          <h2 class="title">
            学生考勤
            <el-button type="primary" round class="btn">全部出勤</el-button>
            <el-checkbox v-model="checked">查看异常</el-checkbox>
          </h2>
          <el-table :data="classList" stripe style="width: 100%;">
            <el-table-column label="姓名" prop="teacher" align="center" />
            <el-table-column label="学号" prop="number" align="center" />
            <el-table-column label="课程" prop="className" align="center" />
            <el-table-column label="到课时间" prop="time1" align="center" />
            <el-table-column label="离开时间" prop="time3" align="center" />
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <div>
                  <span v-if="scope.row.status === 1" class="color1">&bull; 正常</span>
                  <span v-if="scope.row.status === 2" class="color2">&bull; 缺勤</span>
                  <span v-if="scope.row.status === 3" class="color3">&bull; 迟到</span>
                  <span v-if="scope.row.status === 4" class="color4">&bull; 早退</span>
                  <span v-if="scope.row.status === 5" class="color5">&bull; 迟到&早退</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </mu-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataDay: '',
      dialogTitle: '李莫雪 (5月异常考勤)',
      list: [
        {
          className: '第一节',
          classRoom: '2513-1',
          time: '8:00 - 9:00',
          number: 37,
          leaveEarly: 0,
          lack: 1,
          late: 0,
          lateAndleave: 1,
          attendance: 100
        }, {
          className: '第二节',
          classRoom: '2513-1',
          time: '8:00 - 9:00',
          number: 37,
          leaveEarly: 0,
          lack: 1,
          late: 0,
          lateAndleave: 1,
          attendance: 20
        }, {
          className: '第三节',
          classRoom: '2513-1',
          time: '8:00 - 9:00',
          number: 37,
          leaveEarly: 0,
          lack: 1,
          late: 0,
          lateAndleave: 1,
          attendance: 80
        }
      ],
      // 考勤统计
      workData: [
        {
          number: 30,
          title: '正常',
          color: 'color1'
        }, {
          number: 1,
          title: '缺勤',
          color: 'color2'
        }, {
          number: 0,
          title: '迟到',
          color: 'color3'
        }, {
          number: 0,
          title: '早退',
          color: 'color4'
        }, {
          number: 0,
          title: '迟到&早退',
          color: 'color5'
        }, {
          number: 0,
          title: '请假次数',
          color: 'color6'
        }
      ],
      // 课程异常 status 1 正常 2 缺勤 3 迟到 4 早退 5 迟到and早退
      classList: [
        {
          className: '语文',
          teacher: '张老师',
          time: '2019-12-01',
          time1: '8:40',
          time2: '8:00',
          time3: '9:00',
          number: '20190101',
          status: 4
        }, {
          className: '语文',
          teacher: '张老师',
          time: '2019-12-01',
          time1: '8:40',
          time2: '8:00',
          time3: '9:00',
          number: '20190101',
          status: 1
        }, {
          className: '语文',
          teacher: '张老师',
          time: '2019-12-01',
          time1: '8:40',
          time2: '8:00',
          time3: '9:00',
          number: '20190101',
          status: 2
        }, {
          className: '语文',
          teacher: '张老师',
          time: '2019-12-01',
          time1: '8:40',
          time2: '8:00',
          time3: '9:00',
          number: '20190101',
          status: 3
        }, {
          className: '语文',
          teacher: '张老师',
          time: '2019-12-01',
          time1: '8:40',
          time2: '8:00',
          time3: '9:00',
          number: '20190101',
          status: 5
        }
      ],
      checked: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      multipleSelection: [],
      dialog1: false,
      active: 1
    }
  },
  created() {
    this.$store.state.workStatus = 4
    this.dataDay = new Date()
  },
  mounted() {
    this.drawLine()
    this.drawLine2()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 跳转 人次查询
    jumpPage() {
      this.$router.push({
        path: 'syntheticalOne'
      })
    },
    format(percentage) {
      return percentage === 100 ? '100%' : `${percentage}%`
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.querySelector('#chart1'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        legend: {
          orient: 'vertical',
          right: 40,
          top: 50,
          bottom: 20,
          data: ['正常', '早退', '迟到', '缺勤', '迟到&早退'],
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle'
        },
        series: [{
          name: '考勤详情',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 30, name: '正常' },
            { value: 2, name: '早退' },
            { value: 2, name: '迟到' },
            { value: 1, name: '缺勤' },
            { value: 5, name: '迟到&早退' }
          ]
        }],
        color: ['#3FC376', '#FFBC00', '#E9AB77', '#FC3A3A', '#8364F5']
      })
    },
    drawLine2() {
      const myChart = this.$echarts.init(document.querySelector('#chart2'))
      myChart.setOption({
        tooltip: {},
        legend: {
          orient: 'vertical',
          right: 80,
          top: 50,
          bottom: 20,
          data: ['正常', '早退', '迟到', '缺勤', '迟到&早退'],
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle'
        },
        series: [{
          name: '考勤人次',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 30, name: '正常' },
            { value: 2, name: '早退' },
            { value: 2, name: '迟到' },
            { value: 1, name: '缺勤' },
            { value: 5, name: '迟到&早退' }
          ]
        }],
        color: ['#3FC376', '#FFBC00', '#E9AB77', '#FC3A3A', '#8364F5']
      })
    },
    // 查看课程详情
    classDetail() {
      this.dialog1 = true
    },
    closeDialog() {
      this.dialog1 = false
    },
    // 修改各个学生的考勤
    handleCommand(command) {
      this.active = command
      console.log(command)
    },
    showStatus(obj) {
      // obj.status = this.command
      console.log(obj)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/public.scss';
@import '../../styles/work-class';
</style>
