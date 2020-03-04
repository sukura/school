<!-- 主页 -->
<template>
  <div class="home">
    <!-- 头部 -->
    <header-top />
    <div class="home-cont">
      <ul>
        <li v-for="(item, index) in navData" :key="index">
          <img :src="item.imgUrl" alt="" @click="jumpPage(index)">
          <p @click="jumpPage(index)">{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import HeaderTop from './components/header'
export default {
  components: {
    HeaderTop
  },
  data() {
    return {
      navData: [
        {
          title: '考勤管理',
          imgUrl: require('../../assets/home1.png')
        }, {
          title: '到校查询',
          imgUrl: require('../../assets/home6.png')
        }, {
          title: '体育达标',
          imgUrl: require('../../assets/home3.png')
        }, {
          title: '体质监测',
          imgUrl: require('../../assets/home5.png')
        }
      ]
    }
  },
  methods: {
    jumpPage(index) {
      if (index === 0) {
        // 考勤管理
        this.$router.push({
          path: '/workManage'
        })
      } else if (index === 1) {
        // 到校查询
        this.$router.push({
          path: '/arriveSchool'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  right: 0;
  background: url(../../assets/img/bg.png) no-repeat left center;
  background-size: 100% 100%;
  .home-cont {
    min-width: 1104px;
    width: 80%;
    margin: 0 auto;
    ul {
      margin-top: 90px;
      display: flex;
      justify-content: space-around;
      li {
        margin: 0 25px;
        img {
          display: inline-block;
          width: 114px;
          height: 114px;
          cursor: pointer;
        }
        p {
          text-align: center;
          color: #ffffff;
          font-size: 24px;
          margin-top: 24px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
