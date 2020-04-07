<!-- 手环中心 -->
<template>
  <div class="workPage handManage">
    <!-- 手环中心头部 -->
    <div class="header">
      <div class="head-nav">
        <div class="head-after">
          <h2><img src="../../assets/logo.png" alt=""></h2>
          <h3>手环中心</h3>
          <ol class="nav">
            <li :class="$store.state.handStatus === 1 ? 'active' : ''" @click="routerJump(1)">手环管理</li>
            <li :class="$store.state.handStatus === 2 ? 'active' : ''" @click="routerJump(2)">数据中心</li>
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
    this.active = this.$store.state.handStatus
  },
  methods: {
    routerJump(index) {
      this.$store.state.handStatus = index
      if (index === 1) {
        // 手环管理
        this.$router.push({
          path: 'braceletManage'
        })
      } else if (index === 2) {
        this.$store.state.handStatus = 2
        // 数据中心
        this.$router.push({
          path: 'dataCore'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.handManage {
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
