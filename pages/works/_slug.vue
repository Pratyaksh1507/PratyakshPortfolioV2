<template>
  <div class="works">
    <!-- ページによって色を変更する -->
    <div
      class="works-bg"
      :style="`
      background-color:${currentProject.siteColor.bodyContentsColor};
      color:${currentProject.siteColor.allTextColor};
      stroke:${currentProject.siteColor.mvTextColor};
      `"
    >
      <WorksMainVisualSection :current-project="currentProject" />
      <WorksProjectVideoSection :current-project="currentProject" />
      <WorksProjectContentsSection :current-project="currentProject" />
      <WorksNextProjectSection :current-project="currentProject" :next-project="nextProject" />
    </div>
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'

export default {
  name: 'Works',

  head() {
    return {
      title: `Pratyaksh Kalsi Portfolio | ${this.currentProject.title.full}`,
      meta: [
        { hid: 'og:title', property: 'og:title', content: `Pratyaksh Kalsi Portfolio | ${this.currentProject.title.full}` },
      ]
    }
  },

  computed: {
    /**
     * 現在のプロジェクトを取得
     */
    currentProject() {
      const projectResponse = this.$store.getters.projectData
      const index = projectResponse.findIndex((content) => content.id === this.$router.history.current.params.slug)
      const currentProject = projectResponse[index]
      currentProject.index = index + 1

      return currentProject
    },

    /**
     * 次のプロジェクトを取得
     */
    nextProject() {
      const projectResponse = this.$store.getters.projectData
      const index = projectResponse.findIndex((content) => content.id === this.$router.history.current.params.slug)
      let nextProject = null

      if (index === projectResponse.length - 1) {
        nextProject = projectResponse[0]
      } else {
        nextProject = projectResponse[index + 1]
      }

      return nextProject
    },

    indexPickupIsAnimation() {
      return this.$store.getters['indexPickup/sceneAnimationState']
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
        if (!this.openningEnd) return // Return if opening transition is still active

        // Enable smooth scrolling
        if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)
        this.$asscroll.enable({ reset: true })
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      const images = document.querySelectorAll('.works img')
      const imagesLoaded = ImagesLoaded(images)

      // When all project images finish loading
      imagesLoaded.on('always', () => {
        setTimeout(() => {
          // Complete page transitions
          if (this.defaultTransitionState) this.$store.commit('bg-transition/end')
          if (this.imageTransitionState) this.$store.commit('image-transition/end')
          if (this.pickupTransitionState) this.$store.commit('indexPickup/transition', false)
          this.$store.commit('mouse/loadend')

          this.$store.commit('imageLoaded/loaded')
        }, 100) // Delay by 100ms for smooth momentum scroll registration

        setTimeout(() => {
          if (this.indexPickupIsAnimation) this.$store.commit('indexPickup/sceneAnimationState', false)
        }, 1200) // Cleanup particle scene after transition delay
      })
    })
  },

  beforeDestroy() {
    // Reset scroll and scene state
    this.$preDefaultEvent(false)
    this.$asscroll.disable()
    this.$store.commit('indexPickup/setScene', 'init')
    this.$store.commit('imageLoaded/init')
  },
}
</script>

<style lang="scss" scoped>
.works {
  overflow: hidden;
}
</style>
