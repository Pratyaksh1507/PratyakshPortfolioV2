<template>
  <div ref="HeaderLogo" class="header-logo is-top is-op">
    <button class="header-link js-click-target" @click="onClickSameUrlReload">
      <span
        v-for="(item, index) of nameData"
        :key="index"
        ref="HeaderLogoText"
        class="header-logo-text"
        style="transform: translateY(60px)"
        :class="{
          'header-logo-fade-text': item.fade,
          'header-logo-move-text': !item.fade,
        }"
        >{{ item.char }}</span
      >
    </button>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      nameData: [
        { char: 'P', fade: false },
        { char: 'R', fade: true },
        { char: 'A', fade: true },
        { char: 'T', fade: true },
        { char: 'Y', fade: true },
        { char: 'A', fade: true },
        { char: 'K', fade: true },
        { char: 'S', fade: true },
        { char: 'H', fade: true },
        { char: ' ', fade: true },
        { char: 'K', fade: false },
        { char: 'A', fade: true },
        { char: 'L', fade: true },
        { char: 'S', fade: true },
        { char: 'I', fade: true },
      ],
    }
  },
  computed: {
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
    },
    pickupTransitionState() {
      return this.$store.getters['indexPickup/transition']
    },
    imageTransitionState() {
      return this.$store.getters['image-transition/state']
    },
    indexPickupState() {
      return this.$store.getters['indexPickup/state']
    },
  },

  watch: {
    defaultTransitionState: function () {
      if (this.defaultTransitionState) {
        this.$asscroll.off('scroll', this.onScroll)
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$asscroll.on('scroll', this.onScroll)
      }
    },
    imageTransitionState: function () {
      if (this.imageTransitionState) {
        this.$asscroll.off('scroll', this.onScroll)
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$asscroll.on('scroll', this.onScroll)
      }
    },
    pickupTransitionState: function () {
      if (this.pickupTransitionState) {
        this.$asscroll.off('scroll', this.onScroll)
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$asscroll.on('scroll', this.onScroll)
      }
    },
    openningEnd: function () {
      this.$gsap.to(this.$refs.HeaderLogoText, {
        duration: 1.2,
        delay: -0.8,
        ease: this.$EASING.transform,
        stagger: {
          each: 0.04,
        },
        y: 0,
        clearProps: 'transform',
        onComplete: () => {
          this.$refs.HeaderLogo.classList.remove('is-op')
        },
      })
    },
  },

  mounted() {
    this.$asscroll.on('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      // ハンバーガーメニューが開いている時と遷移中は処理を返す
      if (this.hambergerMenuState || this.indexPickupState) return

      if (this.$asscroll.targetPos < 1.0) {
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$refs.HeaderLogo.classList.remove('is-top')
      }
    },

    onClickSameUrlReload(e) {
      e.preventDefault()

      if (this.$route.name === 'index') {
        this.$router.go({ path: this.$router.currentRoute.path, force: true })
      } else {
        this.$preDefaultEvent(true)
        this.$asscroll.disable()
        this.$store.commit('bg-transition/start', '#f0efeb')
        this.$store.commit('mouse/loading')

        setTimeout(() => {
          this.$router.push(`/`)
          this.$store.commit('mouse/loadend')
        }, this.$SITECONFIG.pageTransitionDuration)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.header-logo-text {
  display: inline-block;
  vertical-align: top;
  transition: transform $base-duration $transform-easing, max-width $base-duration $transform-easing, opacity $base-duration $transform-easing;
}

.header-logo.is-op {
  user-select: none;
  pointer-events: none;
}

.is-op .header-logo-text {
  transition-delay: 0s !important;
}

.header-logo-move-text {
  transition-delay: $base-duration * 0.25;
}

.is-top .header-logo-move-text {
  transform: translateX(0);
  transition-delay: 0s;
}

.header-logo-fade-text {
  max-width: 0;
  opacity: 0;
  transform: translateY(-100%);
  overflow: hidden;
  transition-delay: 0s;
}

.is-top .header-logo-fade-text {
  max-width: 1em;
  opacity: 1;
  transform: translateY(0);
  transition-delay: $base-duration * 0.25;
}

.header-logo.is-top {
  transition-delay: 0s;
}

.header-logo {
  position: fixed;
  top: 20px;
  left: 40px;
  z-index: 10;
  overflow: hidden;
  white-space: nowrap;
  transition: width 0.01s linear;
  transition-delay: $base-duration * 0.25;
  cursor: pointer;

  @include sp() {
    top: 14px;
    left: 20px;
  }

  & .header-link {
    display: flex;
    align-items: center;
    color: $black;
    font-size: 50px;
    font-family: $sixcaps;
    letter-spacing: 0.04em;

    @include hover() {
      & .header-logo-move-text {
        transform: translateX(0);
        transition-delay: 0s;
      }

      & .header-logo-fade-text {
        max-width: 1em;
        opacity: 1;
        transform: translateY(0);
        transition-delay: $base-duration * 0.25;
      }
    }
  }
}
</style>
