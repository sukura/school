<!-- 我的课程 -- 日统计 -->
<template>
  <div class="classPage">
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper dayTab" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center">
          <p class="active">
            <span>日统计</span>
            <em />
          </p>
          <p @click="jumpPage">
            <span>月统计</span>
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
        <h2 class="title">今日课程</h2>
        <div id="chart1" style="width: 100%; height: 230px;" />
      </div>
      <div class="chart chart-right">
        <h2 class="title">
          今日考勤
          <!-- <el-button type="primary" class="btn" size="small" icon="el-icon-download">导出</el-button> -->
        </h2>
        <div id="chart2" style="width: 100%; height: 230px;" />
      </div>
    </div>
    <!-- table部分 -->
    <div class="table mt-2">
      <h2 class="title">
        考勤详情
        <el-button type="primary" class="btn" icon="el-icon-download" size="small">导出</el-button>
      </h2>
      <el-table :data="list" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="课程" prop="className" align="center">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="classDetail(scope.row)">{{ scope.row.className }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="教室" prop="classRoom" align="center" />
        <el-table-column label="时间" prop="time" align="center" />
        <el-table-column label="人数" prop="number" width="100" align="center" />
        <el-table-column label="早退" prop="leaveEarly" width="100" align="center" />
        <el-table-column label="缺勤" prop="lack" width="100" align="center" />
        <el-table-column label="迟到" prop="late" width="100" align="center" />
        <el-table-column label="迟到&早退" prop="lateAndleave" width="100" align="center" />
        <el-table-column label="出勤率" prop="attendance" width="200" align="center">
          <template slot-scope="scope">
            <div>
              <el-progress :percentage="scope.row.attendance" color="#7894FF" :format="format" />
              <!-- <el-button type="text" @click="classDetail(scope.row.classRoom)"><i class="el-icon-view" /></el-button> -->
            </div>
          </template>
        </el-table-column>
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
            <!--<el-button type="primary" icon="el-icon-download" round class="btn">导出</el-button>-->
          </h2>
          <ul>
            <li>课程名称：{{ courseInfo.className }}</li>
            <li>任课老师：<i class="el-icon-user" /> {{ courseInfo.teacher }}</li>
            <li>上课时间：<i class="el-icon-timer" />{{ courseInfo.time }}</li>
            <li>上课地点：<i class="el-icon-location-outline" /> {{ courseInfo.classRoom }}</li>
          </ul>
        </div>
        <div class="mt-1 dialog-bottom">
          <h2 class="title">
            学生考勤
            <!--<el-button type="primary" round class="btn">全部出勤</el-button>-->
            <el-checkbox v-model="checked" @change="abnormal">查看异常</el-checkbox>
          </h2>
          <ol>
            <li v-for="(item, index) in courseInfo.workData" :key="index" :class="'color' + item.status">
              <div :class="'jiao' + item.status" />
              <el-dropdown @command="handleCommand" @visible-change="showStatus">
                <span class="el-dropdown-link">
                  <mu-button icon :ripple="false">
                    <mu-icon value="more_vert" />
                  </mu-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="1">正常</el-dropdown-item>
                  <el-dropdown-item :command="2">迟到</el-dropdown-item>
                  <el-dropdown-item :command="3">早退</el-dropdown-item>
                  <el-dropdown-item :command="4">缺勤</el-dropdown-item>
                  <el-dropdown-item :command="5">迟到&早退</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <dl>
                <dt><img :src="item.avatar" alt=""></dt>
                <dt>
                  <h3>{{ item.name }}</h3>
                  <h4>{{ item.number }}</h4>
                </dt>
              </dl>
              <p>
                <span>
                  <b>{{ item.time1 }}</b>
                  <em>到课时间</em>
                </span>
                <span>
                  <b>{{ item.time2 }}</b>
                  <em>离开时间</em>
                </span>
              </p>
              <h1 v-if="item.status === 1">正常</h1>
              <h1 v-if="item.status === 2">迟到</h1>
              <h1 v-if="item.status === 3">早退</h1>
              <h1 v-if="item.status === 4">缺勤</h1>
              <h1 v-if="item.status === 5">迟到&早退</h1>
            </li>
          </ol>
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
      dialogTitle: '',
      list: [
        {
          class: '高二(5)班',
          className: '语文',
          teacher: '刘老师',
          classRoom: '2513-1',
          time: '9:00 - 9:45',
          number: 37,
          leaveEarly: 0,
          lack: 1,
          late: 0,
          lateAndleave: 1,
          attendance: 100,
          workData: [
            {
              name: '李墨雪',
              avatar: 'static/img/user.53dd8973.jpg',
              number: '20180304',
              time1: '07:55',
              time2: '08:55',
              status: 1
            }, {
              name: '李墨雪',
              avatar: 'static/img/user.53dd8973.jpg',
              number: '20180304',
              time1: '07:55',
              time2: '08:55',
              status: 2
            }, {
              name: '李墨雪',
              avatar: 'static/img/user.53dd8973.jpg',
              number: '20180304',
              time1: '07:55',
              time2: '08:55',
              status: 3
            }, {
              name: '李墨雪',
              avatar: 'static/img/user.53dd8973.jpg',
              number: '20180304',
              time1: '07:55',
              time2: '08:55',
              status: 4
            }, {
              name: '李墨雪',
              avatar: 'static/img/user.53dd8973.jpg',
              number: '20180304',
              time1: '07:55',
              time2: '08:55',
              status: 5
            }, {
              name: '李墨雪',
              avatar: 'static/img/user.53dd8973.jpg',
              number: '20180304',
              time1: '07:55',
              time2: '08:55',
              status: 1
            }
          ]
        }, {
          class: '高二(5)班',
          className: '数学',
          teacher: '刘老师',
          classRoom: '2513-1',
          time: '10:00 - 10:45',
          number: 37,
          leaveEarly: 0,
          lack: 1,
          late: 0,
          lateAndleave: 1,
          attendance: 20,
          workData: []
        }, {
          class: '高二(5)班',
          className: '英语',
          teacher: '刘老师',
          classRoom: '2513-1',
          time: '11:00 - 11:45',
          number: 37,
          leaveEarly: 0,
          lack: 1,
          late: 0,
          lateAndleave: 1,
          attendance: 80,
          workData: []
        }
      ],
      courseInfo: {},
      workData: {},
      checked: false,
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
    this.dataDay = new Date()
  },
  mounted() {
    this.drawLine()
    this.drawLine2()
    this.getTablelist()
  },
  methods: {
    abnormal() {
      if (this.checked) {
        this.courseInfo.workData = this.workData.filter(temp => {
          return temp['status'] !== 1
        })
      } else {
        this.courseInfo.workData = this.workData
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 跳转 月统计
    jumpPage() {
      this.$router.push({
        path: 'classMonth'
      })
    },
    format(percentage) {
      return percentage === 100 ? '100%' : `${percentage}%`
    },
    // 获取Table数据
    getTablelist() {
      this.$http.post('/tablelist').then(response => {
        if (response.data.code === 200) {
          this.list = response.data.data
        }
      }).catch(() => {})
      // 小姜浪的接口
      // this.$http.post('/course').then(response => {
      //   this.list = response.data.data
      // }).catch(res => {
      //   console.log(res)
      // })
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
    classDetail(row) {
      this.dialogTitle = row.class + ' ' + row.className + '考勤'
      this.courseInfo = row
      this.workData = row.workData
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
