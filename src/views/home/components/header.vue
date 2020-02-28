<!-- 头部 -->
<template>
  <div class="header">
    <div class="head-nav">
      <h2><img src="../../../assets/logo.png" alt=""></h2>
      <user-info />
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

    }
  }
}
</script>
<style lang="scss" scoped>
</style>
