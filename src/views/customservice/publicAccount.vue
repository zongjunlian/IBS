<template>
  <div>
    <iframe id="loginfram" v-show="false" :src="`http://xtny.techcon-ecloud.com/api/login/userLogin?loginName=${this.$store.state.userName}`" scrolling=auto></iframe>
    <iframe :src="`http://xtny.techcon-ecloud.com/page/main?loginName=${this.$store.state.userName}`" id="xtny" scrolling=auto></iframe>
  </div>
</template>

<script>
export default {
  created () {
    console.log('this.$store.state.userName', this.$store.state.userName);
  },

  mounted () {
    function changeMobsfIframe() {
      const mobsf = document.getElementById('xtny')
      const deviceWidth = document.body.clientWidth
      const deviceHeight = document.body.clientHeight
      mobsf.style.width = (Number(deviceWidth) - 230) + 'px'
      mobsf.style.height = (Number(deviceHeight) - 200) + 'px'
    }

    changeMobsfIframe()

    window.onresize = function() {
      changeMobsfIframe()
    }
  }
}
</script>
