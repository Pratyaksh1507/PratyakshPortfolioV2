<template>
  <div class="about">
    <AboutMainVisualSection />
    <AboutIntroSection />
    <AboutExperienceSection :experience-data="getExperienceData" :experience-summary="getExperienceSummary" />
    <AboutSelectProjectSideScrollSection :project-data="getProjectData" />
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'

export default {
  name: 'About',

  head() {
    return {
      title: 'Pratyaksh Kalsi Portfolio | About',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Pratyaksh Kalsi Portfolio | About' },
      ]
    }
  },

  computed: {
    getProjectData() {
      return this.$store.getters.projectData
    },
    getExperienceData() {
      return this.$store.getters.experienceData
    },
    getExperienceSummary() {
      return this.$store.getters.experienceSummary
    },
    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
    },
    imageTransitionState() {
      return this.$store.getters['image-transition/state']
    },
    pickupTransitionState() {
      return this.$store.getters['indexPickup/transition']
    },
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
    },
  },

  watch: {
    openningEnd() {
      setTimeout(() => {
        // Enable smooth scrolling
        if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)
        this.$asscroll.enable({ reset: true })
      }, 1200)
    },
    imageLoaded() {
      if (this.imageLoaded) {
        // Return if opening transition is still firing on initial access
        if (!this.openningEnd) return

        this.$store.commit('mouse/loadend')
        // Enable smooth scrolling
        if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)
        this.$asscroll.enable({ reset: true })
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      // Update ScrollTrigger on RAF for smooth scrolling in About page
      const render = () => {
        this.raf = window.requestAnimationFrame(render)
        this.$ScrollTrigger.update()
      }
      render()

      const images = document.querySelectorAll('.about img')
      const imagesLoaded = ImagesLoaded(images)

      // When all images have completed loading
      imagesLoaded.on('always', () => {
        // Complete transitions
        if (this.defaultTransitionState) this.$store.commit('bg-transition/end')
        if (this.imageTransitionState) this.$store.commit('image-transition/end')
        if (this.pickupTransitionState) this.$store.commit('indexPickup/transition', false)

        this.$store.commit('imageLoaded/loaded')
      })
    })
  },

  beforeDestroy() {
    // Reset RAF and smooth scroll state
    window.cancelAnimationFrame(this.raf)
    this.$preDefaultEvent(false)
    this.$asscroll.disable()
    this.$store.commit('imageLoaded/init')
  },
}
</script>

<style lang="scss" scoped>
.about {
  overflow: hidden;
}
</style>
