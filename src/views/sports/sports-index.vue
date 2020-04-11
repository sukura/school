<!-- 今日课程 -->
<template>
  <div class="workPage arriveSchool">
    <!-- 今日课程头部 -->
    <div class="header">
      <div class="head-nav">
        <div class="head-after">
          <h2><img src="../../assets/logo.png" alt=""></h2>
          <h3>体育课</h3>
          <ol class="nav">
            <li :class="$store.state.arriveStatus === 1 ? 'active' : ''" @click="routerJump(1)">今日课程</li>
            <li :class="$store.state.arriveStatus === 2 ? 'active' : ''" @click="routerJump(2)">历史课程</li>
          </ol>
        </div>
        <user-info />
      </div>
    </div>
    <!-- 今日课程下面部分 -->
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
    this.getAttendance()
  },
  methods: {
    routerJump(index) {
      this.$store.state.arriveStatus = index
      if (index === 1) {
        // 今日课程
        this.$router.push({
          path: 'sportsDay'
        })
      } else if (index === 2) {
        this.$store.state.arriveStatus = 2
        // 历史课程
        this.$router.push({
          path: 'sportslist'
        })
      }
    },
    getAttendance() {
      this.$http.post('/api/sports/attendance/Page', {
        curPage: 1,
        pageSize: 10
      }).then(({ data }) => {
        this.tableData = data.list
        console.log(data)
      }).catch((err) => {
        console.log(err)
      })
    }
    // /sports/attendance/Page
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
