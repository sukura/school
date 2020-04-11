<!-- 用户中心 -->
<template>
  <div class="workPage arriveSchool">
    <!-- 用户中心头部 -->
    <div class="header">
      <div class="head-nav">
        <div class="head-after">
          <h2><img src="../../assets/logo.png" alt=""></h2>
          <h3>用户中心</h3>
          <ol class="nav">
            <li :class="$store.state.userStatus === 1 ? 'active' : ''" @click="routerJump(1)">学生管理</li>
            <li :class="$store.state.userStatus === 2 ? 'active' : ''" @click="routerJump(2)">教师管理</li>
            <li :class="$store.state.userStatus === 3 ? 'active' : ''" @click="routerJump(2)">角色管理</li>
          </ol>
        </div>
        <user-info />
      </div>
    </div>
    <!-- 到校查询下面部分 -->
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
    this.active = this.$store.state.userStatus
  },
  methods: {
    routerJump(index) {
      this.$store.state.userStatus = index
      if (index === 1) {
        // 学生管理
        this.$router.push({
          path: 'studentManage'
        })
      } else if (index === 2) {
        this.$store.state.arriveStatus = 2
        // 教师管理
        this.$router.push({
          path: 'teacherManage'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.arriveSchool {
  width: 100%;
  padding-top: 56px;
  box-sizing: border-box;
  .header {
    .head-nav {
      .head-after {
        display: flex;
        .nav {
          margin-left: 10px;
        }
      }
    }
  }
  .work-cont {
    width: 80%;
    min-width: 1104px;
    margin: 16px auto 0;
  }
}
</style>
