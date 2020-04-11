<!-- 用户信息 -->
<template>
  <div class="userInfo">
    <ul>
      <li>
        <img src="../assets/icon3.png" @click="homePage">
      </li>
      <li>
        <img src="../assets/icon2.png">
      </li>
      <!-- <li>
        <img src="../assets/icon1.png">
      </li> -->
      <li>
        <mu-menu placement="bottom-end" open-on-hover>
          <mu-avatar size="24">
            <img src="../assets/user.jpg">
          </mu-avatar>
          <mu-list slot="content">
            <mu-list-item button>
              <mu-list-item-title>李沐雪</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
              <mu-list-item-title>修改个人信息</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
              <mu-list-item-title>修改密码</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button @click="loginOut">
              <mu-list-item-title>退出</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    // 跳转到主页
    homePage() {
      this.$router.push({
        path: '/home'
      })
    },
    // 退出
    loginOut() {
      this.$message({
        type: 'success',
        message: '退出成功',
        offset: 200
      })
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.userInfo {
  ul {
    line-height: 56px;
    width: 180px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      color: #fff;
      img {
        height: 24px;
        width: 24px;
        margin-top: 15px;
        display: block;
        cursor: pointer;
      }
      .mu-icon {
        margin-top: 8px;
      }
      .mu-menu {
        height: 56px;
        .mu-avatar {
          margin-top: 15px;
          img {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
