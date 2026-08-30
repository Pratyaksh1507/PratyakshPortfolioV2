<template>
  <button @click="onClick"><slot></slot></button>
</template>

<script>
export default {
  props: {
    /**
     * url : 遷移先
     * color : 背景色
     */
    url: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#ffffff',
    },
  },

  methods: {
    onClick(e) {
      e.preventDefault()

      // 同一URLは処理を返す
      const targetUrl = this.url.startsWith('/') ? this.url : `/${this.url}`
      if (targetUrl === '/' && this.$route.name === 'index') return
      if (targetUrl === '/about' && this.$route.name === 'about') return
      if (targetUrl === '/resume' && this.$route.name === 'resume') return
      if (targetUrl === '/archive' && (this.$route.name === 'archive' || this.$route.name === 'resume')) return

      this.$preDefaultEvent(true)
      this.$asscroll.disable()
      this.$store.commit('bg-transition/start', this.color)
      this.$store.commit('mouse/loading')

      setTimeout(() => {
        this.$router.push(targetUrl)
      }, this.$SITECONFIG.pageTransitionDuration)
    },
  },
}
</script>
