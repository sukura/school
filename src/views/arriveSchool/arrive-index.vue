<!-- 到校查询 -->
<template>
  <div class="workPage arriveSchool">
    <!-- 到校查询头部 -->
    <div class="header">
      <div class="head-nav">
        <div class="head-after">
          <h2><img src="../../assets/logo.png" alt=""></h2>
          <h3>到校查询</h3>
          <ol class="nav">
            <li :class="$store.state.arriveStatus === 1 ? 'active' : ''" @click="routerJump(1)">进出记录</li>
            <li :class="$store.state.arriveStatus === 2 ? 'active' : ''" @click="routerJump(2)">到校查询</li>
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
    this.active = this.$store.state.arriveStatus
  },
  methods: {
    routerJump(index) {
      this.$store.state.arriveStatus = index
      if (index === 1) {
        // 进出记录
        this.$router.push({
          path: 'record'
        })
      } else if (index === 2) {
        this.$store.state.arriveStatus = 2
        // 到校查询
        this.$router.push({
          path: 'myclassDay'
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
