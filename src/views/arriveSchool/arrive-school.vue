<!-- 到校查询 到校查询记录 -->
<template>
  <div class="record">
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper dayTab" justify-content="start">
        <mu-flex class="flex-demo" justify-content="center">
          <h2>到校查询</h2>
        </mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper dayTab2" justify-content="end">
        <mu-flex class="flex-demo" justify-content="center">
          <el-form ref="formData" :model="formData" :inline="true" label-width="80px">
            <el-form-item label="日期">
              <el-date-picker v-model="formData.dataDay" type="date" :picker-options="pickerOptions" :clearable="false" placeholder="选择日期" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查看</el-button>
            </el-form-item>
          </el-form>
        </mu-flex>
      </mu-flex>
    </mu-container>
    <!-- 到校查询主体内容 -->
    <div class="list-cont">
      <div class="list-left">
        <h2>学校年/班级</h2>
        <el-menu default-active="1">
          <el-submenu index="1">
            <template slot="title"><span>高一</span></template>
            <el-menu-item index="1-1">高一 (1) 班</el-menu-item>
            <el-menu-item index="1-2">高一 (2) 班</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><span>高二</span></template>
            <el-menu-item index="2-1">高二 (1) 班</el-menu-item>
            <el-menu-item index="2-2">高二 (2) 班</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <!-- 有数据时显示列表，无数据时添加none类名 -->
      <div class="list-right" :class="isNone ? 'none': ''">
        <dl v-for="(item, index) in tableData" :key="index" :class="'color' + item.status">
          <div :class="'jiao'+ item.status" />
          <dt><img src="../../assets/user.jpg" alt=""></dt>
          <dd>
            <h3>{{ item.name }}</h3>
            <p>{{ item.studentId }}</p>
            <h4 v-if="item.status === 1">正常</h4>
            <h4 v-if="item.status === 2">迟到</h4>
            <h4 v-if="item.status === 3">早退</h4>
            <h4 v-if="item.status === 4">缺勤</h4>
            <h4 v-if="item.status === 5">迟到&早退</h4>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        dataDay: ''
      },
      tableData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      isNone: false
    }
  },
  created() {
    this.$store.state.arriveStatus = 2
  },
  mounted() {
    this.getTablelist()
  },
  methods: {
    getTablelist() {
      if (this.tableData.length > 0) {
        this.isNone = false
      } else {
        this.isNone = true
      }
      this.$http.post('/api/arrive/list').then(response => {
        this.tableData = response.data.data
      }).catch(() => {})
    }
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
      padding-left: 24px;
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
  // 主体内容
  .list-cont {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .list-left {
      width: 200px;
      background: #ffffff;
      min-height: 600px;
      padding: 20px 0;
      box-sizing: border-box;
      text-align: left;
      h2 {
        font-size: 18px;
        color: #43425D;
        padding-left: 20px;
      }
      .el-menu {
        border: none;
        .el-submenu {
          .el-menu-item {
            min-width: 100%;
          }
        }
      }
    }
    .list-right {
      height: 600px;
      overflow: auto;
      width: 924px;
      // display: flex;
      // flex-flow: row wrap;
      dl {
        width: 172px;
        height: 180px;
        background: #ffffff;
        margin: 0 15px 15px 0;
        position: relative;
        float: left;
        dt {
          width: 100%;
          margin-top: 24px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 40px;
            text-align: center;
          }
        }
        dd {
          h3 {
            color: #43425D;
            font-size: 14px;
            font-weight: 500;
            line-height: 25px;
          }
          p {
            color: #909BB0;
            line-height: 20px;
            font-size: 14px;
            font-weight: 400;
            margin: 5px 0 15px 0;
          }
          h4 {
            // color: #10BC6E;
            font-size: 16px;
          }
        }
      }
      dl:nth-child(5n) {
        margin-right: 0;
      }
      .color2 {
        background: rgba(252, 58, 58, 0.06);
      }
      .color3 {
        background: rgba(233, 171, 119, 0.06);
      }
      .color4 {
        background: rgba(255, 188, 0, 0.06);
      }
      .color5 {
        background: rgba(131, 100, 245, 0.06);
      }
      .color6 {
        background: rgba(32, 78, 255, 0.06);
      }
    }
    .none {
      background: #ffffff url(../../assets/bg.png) no-repeat center 200px;
      position: relative;
    }
    .none:after {
      display: block;
      width: 200px;
      height: 30px;
      content: '暂无发现到校记录';
      color: #999;
      position: absolute;
      left: 50%;
      top: 230px;
      transform: translate(-50%, 80px);
    }
  }
}
</style>
