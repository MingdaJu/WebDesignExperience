<template lang="pug">
    <div class="auth">

    </div>
</template>

<script>
export default {
  data () {
    return { 
      }
  },
  methods: {
    
  },
  created () {
    this.$http.get(`/api/authMail?code=${this.code}&time=${this.time}`)
      .then(res => {
        if(res.body.success) {
          this.$message.error(res.body.msg)
        }
        else {
          this.$message.error(res.body.msg)
        }
      })
  }
}
</script>

<style lang="less" scoped>

</style>

