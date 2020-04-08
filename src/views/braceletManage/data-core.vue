<!-- 数据中心页 -->
<template>
  <div class="dataCore">
    <el-row class="coreTop">
      <el-col :span="8">
        <h2>备用手环</h2>
        <dl>
          <dt><i class="el-icon-switch-button" /></dt>
          <dd><b>322</b>只</dd>
        </dl>
        <p class="info">
          <span><i />黑色：122只</span>
          <span><i class="fen" />粉色：182只</span>
          <span><i class="lan" />蓝色：20只</span>
        </p>
      </el-col>
      <el-col :span="8" style="margin: 0 24px;">
        <h2>
          <span>故障手环</span>
          <el-button type="primary" icon="el-icon-refresh-right" round plain size="mini">重置</el-button>
        </h2>
        <dl>
          <dt><i class="el-icon-warning-outline" /></dt>
          <dd><b>22</b>只</dd>
        </dl>
        <p class="info">
          <span>在保：2只</span>
          <span>过保：20只</span>
          <el-tooltip content="400-100-1111" placement="bottom" effect="light">
            <span style="color: #7894FF; cursor: pointer;">返修电话</span>
          </el-tooltip>
        </p>
      </el-col>
      <el-col :span="8">
        <h2>
          <span>丢失手环</span>
          <el-date-picker v-model="month1" type="month" placeholder="选择月" />
        </h2>
        <dl>
          <dt><i class="el-icon-question" /></dt>
          <dd><b>15</b>只</dd>
        </dl>
        <p class="info" style="justify-content: space-around;">
          <span><i />黑色：5只</span>
          <span><i class="fen" />粉色：10只</span>
        </p>
      </el-col>
    </el-row>
    <el-row class="coreTop coreBottom">
      <el-col :span="8">
        <h2>使用中手环</h2>
        <dl>
          <dt><i class="el-icon-success" /></dt>
          <dd><b>1899</b>只</dd>
        </dl>
        <p class="info">
          <span>男生：1300只</span>
          <span>女生：500只</span>
          <span>教师：99只</span>
        </p>
      </el-col>
      <el-col :span="16">
        <h2>
          <span>更换手环</span>
          <el-date-picker v-model="month1" type="month" placeholder="选择月" />
        </h2>
        <div class="chart">
          <div id="chart1" style="width: 250px; height: 250px;" />
          <div id="chart2" style="width: 400px; height: 250px;" />
        </div>
        <p class="info">
          <span>男生：1220只</span>
          <span>女生：450只</span>
          <span>教师：20只</span>
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      month1: ''
    }
  },
  created() {
    this.$store.state.handStatus = 2
  },
  mounted() {
    this.drawLine('#chart1')
    this.drawLine2('#chart2')
  },
  methods: {
    drawLine(id) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.querySelector(id))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        legend: {
          orient: 'vertical',
          right: 40,
          top: 50,
          bottom: 20,
          data: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle',
          show: false,
        },
        series: [{
          // name: '考勤详情',
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
              show: true
            }
          },
          data: [
            { value: 200, name: '一年级' },
            { value: 230, name: '二年级' },
            { value: 260, name: '三年级' },
            { value: 300, name: '四年级' },
            { value: 200, name: '五年级' },
            { value: 210, name: '六年级' }
          ]
        }],
        color: ['#3FC376', '#FFBC00', '#E9AB77', '#FC3A3A', '#8364F5', '#43425D']
      })
    },
    drawLine2(id) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.querySelector(id))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        legend: {
          orient: 'vertical',
          right: 0,
          top: 50,
          bottom: 20,
          data: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle'
        },
        series: [{
          // name: '考勤详情',
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
              show: true
            }
          },
          data: [
            { value: 200, name: '一年级' },
            { value: 230, name: '二年级' },
            { value: 260, name: '三年级' },
            { value: 300, name: '四年级' },
            { value: 200, name: '五年级' },
            { value: 210, name: '六年级' }
          ]
        }],
        color: ['#3FC376', '#FFBC00', '#E9AB77', '#FC3A3A', '#8364F5', '#43425D']
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dataCore {
  h2 {
    color: #43425D;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    height: 32px;
    line-height: 32px;
    .el-button {
      float: right;
    }
    .el-date-editor.el-input {
      width: 120px;
      float: right;
      .el-input__inner {
        border-radius: 30px;
      }
    }
  }
  .coreTop {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 24px;
    .el-col-8 {
      background: #fff;
      width: 370px;
      height: auto;
      padding: 24px;
      box-sizing: border-box;
      dl {
        margin: 30px 0;
        dt {
          i {
            font-size: 50px;
          }
        }
        .el-icon-switch-button {
          color: #204EFF;
        }
        .el-icon-warning-outline {
          color: #FF5959;
        }
        .el-icon-question {
          color: #FF6600;
        }
        .el-icon-success {
          color: #7894FF;
          font-size: 80px;
        }
        dd {
          color: #999;
          b {
            font-size: 32px;
            color: #43425D;
            padding-right: 5px;
            vertical-align: middle;
          }
        }
      }
      .info {
        display: flex;
        justify-content: space-between;
        span {
          display: inline-block;
          color: #999;
          font-size: 12px;
          i {
            width: 5px;
            height: 5px;
            background: #43425D;
            border-radius: 5px;
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
          }
          i.fen {
            background: #FF5EFA;
          }
          i.lan {
            background: #0099FF;
          }
        }
      }
    }
  }
  .coreBottom {
    height: 370px;
    .el-col-8 {
      dl {
        margin: 40px 0;
        dd {
          margin: 20px 0 80px;
        }
      }
    }
    .el-col-16 {
      margin-left: 24px;
      background: #fff;
      padding: 24px;
      box-sizing: border-box;
      .info {
        display: flex;
        justify-content: space-around;
        span {
          color: #43425D;
          font-size: 16px;
          font-weight: bold;
        }
      }
      .chart {
        height: 270px;
        display: flex;
        justify-content: flex-start;
      }
    }
  }
}
</style>
