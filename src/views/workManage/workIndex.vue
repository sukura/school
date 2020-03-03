<!-- 考勤管理 -->
<template>
  <div class="workPage">
    <!-- 考勤管理头部 -->
    <div class="header">
      <div class="head-nav">
        <h2><img src="../../assets/logo.png" alt=""></h2>
        <h3>考勤管理</h3>
        <ol class="nav">
          <li :class="$store.state.workStatus === 1 ? 'active' : ''" @click="routerJump(1)">我的课程</li>
          <li :class="$store.state.workStatus === 2 ? 'active' : ''" @click="routerJump(2)">我的班级</li>
          <li :class="$store.state.workStatus === 3 ? 'active' : ''" @click="routerJump(3)">临时活动考勤</li>
          <li :class="$store.state.workStatus === 4 ? 'active' : ''" @click="routerJump(4)">综合查询</li>
          <li :class="$store.state.workStatus === 5 ? 'active' : ''" @click="routerJump(5)">考勤统计</li>
        </ol>
        <user-info />
      </div>
    </div>
    <!-- 考勤管理下面部分 -->
    <div class="work-cont">
      <router-view />
    </div>
  </div>
</template>

<script>
import UserInfo from '@/components/user-info'
export default {
  components: {
    UserInfo
  },
  data() {
    return {
      active: 1
    }
  },
  created() {
    this.active = this.$store.state.workStatus
  },
  methods: {
    routerJump(index) {
      this.$store.state.workStatus = index
      if (index === 1) {
        // 我的课程
        this.$router.push({
          path: 'classDay'
        })
      } else if (index === 2) {
        this.$store.state.workStatus = 2
        // 我的班级
        this.$router.push({
          path: 'myclassDay'
        })
      } else if (index === 3) {
        this.$store.state.workStatus = 3
        // 临时活动考勤
        this.$router.push({
          path: 'myActivity'
        })
      } else if (index === 4) {
        this.$store.state.workStatus = 4
        // 综合查询
        this.$router.push({
          path: 'syntheticalOne'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.workPage {
  width: 100%;
  padding-top: 56px;
  box-sizing: border-box;
  .work-cont {
    width: 80%;
    min-width: 1104px;
    margin: 16px auto 0;
  }
}
</style>
