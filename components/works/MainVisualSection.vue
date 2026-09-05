<template>
  <div ref="Hero" class="hero">
    <div ref="HeroBg" class="hero-bg">
      <div ref="HeroImg" class="hero-img">
        <picture>
          <img :src="`${currentProject.heroImg.pc.url}`" :width="`${currentProject.heroImg.pc.width}`" :height="`${currentProject.heroImg.pc.height}`" :alt="currentProject.id" />
        </picture>
      </div>
      <div class="hero-title" :style="`color:${currentProject.siteColor.mvTextColor};`">
        <h1 class="hero-title-read">
          <span class="hero-title-read-area">
            <AppReadTitle :state="isTextSegmentState" :text="['・', `WORKS 0${currentProject.index}`]" :modifier="'works-section'" />
          </span>
          <span class="hero-title-wrapper-block">
            <span v-for="index of Object.keys(currentProject.detailsMainTextPc).length - 1" :key="index" class="hero-title-wrapper" :class="`hero-title-wrapper-0${index}`">
              <AppTextAnimation
                :state="isTextSegmentState"
                :start="index * 0.12"
                :rotate="index % 2 != 0 ? $BASEROTATE.left : $BASEROTATE.right"
                :text="`${currentProject.detailsMainTextPc['text0' + index]}`"
              />
            </span>
          </span>
          <span class="hero-title-line">
            <AppBounceLine :state="isTextUnderlineState" :start="0.72" :color="currentProject.siteColor.mvTextColor" :origin="'left'" :width="700" :modifier="'works'" />
          </span>
        </h1>
        <p class="hero-desc">
          <span v-for="index of Object.keys(currentProject.detailsMainDescPc).length - 1" :key="index" class="hero-desc-wrapper" :class="`hero-desc-wrapper-0${index}`">
            <AppTextAnimation
              :state="isTextSegmentState"
              :start="index * 0.12 + 0.84"
              :rotate="index % 2 != 0 ? $BASEROTATE.left : $BASEROTATE.right"
              :text="`${currentProject.detailsMainDescPc['text0' + index]}`"
            />
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentProject: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      isTextSegmentState: 'default',
      isTextUnderlineState: 'default',
    }
  },

  computed: {
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
    },
  },

  watch: {
    openningEnd: function () {
      setTimeout(() => {
        this.mvItemViewIn()
      }, 1000)
    },
    imageLoaded: function () {
      if (this.imageLoaded) {
        if (!this.openningEnd) return
        this.mvItemViewIn()
      }
    },
  },

  mounted() {
    // MVが見えている時だけ高さをリサイズする
    if (this.$SITECONFIG.isMobile) {
      this.setHeight()
      this.observe = this.$refs.HeroBg
      this.iObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              window.addEventListener('resize', this.setHeight)
            } else {
              window.removeEventListener('resize', this.setHeight)
            }
          })
        },
        {
          rootMargin: '0%',
        }
      )
      this.iObserver.observe(this.observe)
    }
  },

  beforeDestroy() {
    // リセット
    if (this.$SITECONFIG.isMobile) {
      this.iObserver.unobserve(this.observe)
      this.iObserver = null
      window.removeEventListener('resize', this.setHeight)
    }
  },

  methods: {
    setHeight() {
      this.$gsap.set(this.$refs.HeroBg, {
        height: window.innerHeight,
      })
    },
    mvItemViewIn() {
      this.isTextSegmentState = 'center'
      this.isTextUnderlineState = 'extend'
    },
  },
}
</script>

<style lang="scss" scoped>
:root {
  --viewportWidth: 100vw;
  --viewportHeight: 100vh;
}

.hero-bg {
  position: relative;
  height: var(--viewportHeight, 100vh);

  @include sp() {
    height: var(--viewportHeight, 100vh);
  }
}

.hero-inner {
  padding: 93px 0 0;
}

.hero-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.45) 55%, rgba(0, 0, 0, 0.25) 100%);
    pointer-events: none;
  }

  & picture,
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;

    @include tab-vertical() {
      object-position: right;
    }

    @include sp() {
      object-position: center;
    }
  }
}

.hero-title {
  position: absolute;
  top: calc(50.2% + #{vmin(86)});
  left: 80px;
  transform: translate3d(0, -50%, 0);
  width: vmin(792);
  font-size: vmin(128);
  font-family: $sixcaps;
  line-height: 1.04;
}

.hero-title-read {
  position: relative;
}

.hero-title-wrapper-block {
  display: block;
  margin: 0 0 37px 0;
}

.hero-title-wrapper-01 {
  text-align: right;
}

.hero-title-read-area {
  position: absolute;
  top: 0;
  left: 0;
}

.hero-title-line {
  display: block;
  position: absolute;
  width: 100%;
  height: vmin(230);
  margin: 0 0 36px 0;
}

.hero-desc {
  font-size: 12px;
  font-family: $helvetica;
}
</style>
