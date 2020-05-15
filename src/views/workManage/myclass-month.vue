<!-- 我的班级 -- 月统计 -->
<template>
  <div class="classPage">
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper dayTab" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center">
          <p @click="jumpPage">
            <span>日统计</span>
            <em />
          </p>
          <p class="active">
            <span>月统计</span>
            <em />
          </p>
        </mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper dayTab2" justify-content="end">
        <mu-flex class="flex-demo" justify-content="center">
          <el-date-picker v-model="dataDay" type="month" :picker-options="pickerOptions" :clearable="false" placeholder="选择日期" />
          <!-- <mu-date-input v-model="dataDay" icon="today" no-display /> -->
        </mu-flex>
      </mu-flex>
    </mu-container>
    <!-- 图表部分 -->
    <div class="char-box">
      <div class="chart chart-left">
        <h2 class="title">本月课程</h2>
        <div id="chart1" style="width: 100%; height: 230px;" />
      </div>
      <div class="chart chart-right">
        <h2 class="title">
          本月考勤
          <el-button type="primary" class="btn" size="small" icon="el-icon-download">导出</el-button>
        </h2>
        <div id="chart2" style="width: 100%; height: 230px;" />
      </div>
    </div>
    <!-- table部分 -->
    <div class="table mt-2">
      <h2 class="title">
        考勤异常
        <!-- <el-button type="primary" class="btn" icon="el-icon-download" size="small">导出</el-button> -->
      </h2>
      <el-table :data="tableList" stripe style="width: 100%;">
        <el-table-column label="姓名" prop="name" align="center" />
        <el-table-column label="学号" prop="number" align="center" />
        <el-table-column label="正常" prop="normalNumber" align="center" />
        <el-table-column label="缺勤" prop="lack" width="100" align="center" />
        <el-table-column label="迟到" prop="late" width="100" align="center" />
        <el-table-column label="早退" prop="leaveEarly" width="100" align="center" />
        <el-table-column label="迟到&早退" prop="lateAndleave" width="100" align="center" />
        <el-table-column label="请假次数" prop="leave" width="100" align="center" />
        <el-table-column label="详情" width="200" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="classDetail(scope.row.number)">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 考勤异常 详情弹窗 -->
    <mu-dialog width="862" transition="slide-top" :open.sync="dialog1">
      <mu-appbar color="#204EFF" :title="dialogTitle">
        <mu-button slot="right" icon @click="closeDialog">
          <mu-icon value="close" />
        </mu-button>
      </mu-appbar>
      <div style="padding: 5px; background: #F0F0F7;">
        <div class="dialog-top">
          <h2 class="title">考勤统计</h2>
          <ul>
            <li v-for="(item, index) in workData" :key="index">
              <b>{{ item.number }}</b>
              <span><em :class="item.color">&bull;</em> {{ item.title }}</span>
            </li>
          </ul>
        </div>
        <div class="mt-1" style="padding-bottom: 20px;background: #fff;">
          <h2 class="title">课程异常</h2>
          <el-table :data="classList" stripe style="width: 100%;">
            <el-table-column label="课程" prop="className" align="center" />
            <el-table-column label="任课老师" prop="teacher" align="center" />
            <el-table-column label="日期" prop="time" align="center" />
            <el-table-column label="上课时间" prop="time1" align="center" />
            <el-table-column label="到课时间" prop="time2" align="center" />
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
      dialogTitle: '李墨雪(5月考勤异常)',
      tableList: [
        {
          name: '李墨雪',
          number: 37,
          normalNumber: 1420,
          leaveEarly: 0,
          lack: 1,
          late: 0,
          lateAndleave: 1,
          leave: 0
        }, {
          name: '李墨雪',
          number: 37,
          normalNumber: 1420,
          leaveEarly: 0,
          lack: 1,
          late: 0,
          lateAndleave: 1,
          leave: 0
        }, {
          name: 'Sakura',
          number: 37,
          normalNumber: 1420,
          leaveEarly: 0,
          lack: 1,
          late: 0,
          lateAndleave: 1,
          leave: 0
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
          status: 4
        }, {
          className: '语文',
          teacher: '张老师',
          time: '2019-12-01',
          time1: '8:40',
          time2: '8:00',
          time3: '9:00',
          status: 1
        }, {
          className: '语文',
          teacher: '张老师',
          time: '2019-12-01',
          time1: '8:40',
          time2: '8:00',
          time3: '9:00',
          status: 2
        }, {
          className: '语文',
          teacher: '张老师',
          time: '2019-12-01',
          time1: '8:40',
          time2: '8:00',
          time3: '9:00',
          status: 3
        }, {
          className: '语文',
          teacher: '张老师',
          time: '2019-12-01',
          time1: '8:40',
          time2: '8:00',
          time3: '9:00',
          status: 5
        }
      ],
      multipleSelection: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      dialog1: false
    }
  },
  created() {
    this.$store.state.workStatus = 2
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
    // 跳转日统计
    jumpPage() {
      this.$router.push({
        path: 'myclassDay'
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
        grid: {
          width: 'auto'
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true
          },
          data: ['05-01', '05-05', '05-10', '05-15', '05-20', '05-25', '05-30']
        },
        yAxis: {
          type: 'value',
          max: 100,
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true
          },
          nameTextStyle: {
            color: '#ccc'
          }
        },
        series: [{
          data: [30, 40, 50, 80, 70, 100, 100],
          type: 'bar',
          barWidth: 24
        }],
        color: ['#7894FF']
      })
    },
    // 查看课程详情
    classDetail() {
      this.dialog1 = true
    },
    // 关闭弹窗
    closeDialog() {
      this.dialog1 = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/public.scss';
@import '../../styles/work-class';
</style>
