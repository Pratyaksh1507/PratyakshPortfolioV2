<template>
  <div ref="Hero" class="hero">
    <div class="hero-inner">
      <div class="l-container">
        <h1 ref="HeroTitle" class="hero-title">
          <span class="hero-title-read-area">
            <AppReadTitle :state="isTextSegmentState" :text="['・', 'TECHNOLOGIES', 'HTML / CSS / JAVASCRIPT', 'REACT / NEXT.JS / TYPESCRIPT / NODE', 'AI / GENERATIVE AI']" :modifier="'section'" />
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-01">
            <AppBounceLine :state="isTextUnderlineState" :origin="'left'" :width="470" :modifier="'about-hero'" />
            <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'HELLO, WORLD'" />
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-02">
            <AppBounceLine :state="isTextUnderlineState" :start="0.176" :origin="'right'" :width="820" :modifier="'about-hero'" />
            <AppTextAnimation :state="isTextSegmentState" :start="0.176" :rotate="$BASEROTATE.left" :text="'PRATYAKSH'" />
            <AppTextAnimation :state="isTextSegmentState" :start="0.4" :rotate="$BASEROTATE.left" :text="'KALSI'" />
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-03">
            <AppBounceLine :state="isTextUnderlineState" :start="0.42" :origin="'left'" :width="900" :modifier="'about-hero'" />
            <AppTextAnimation :state="isTextSegmentState" :start="0.42" :rotate="$BASEROTATE.right" :text="'IS  SOFTWARE'" />
            <AppTextAnimation :state="isTextSegmentState" :start="0.6" :rotate="$BASEROTATE.right" :text="'DEVELOPER'" />
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-04">
            <AppBounceLine :state="isTextUnderlineState" :start="0.7" :origin="'right'" :width="1040" :modifier="'about-hero'" />
            <AppTextAnimation :state="isTextSegmentState" :start="0.7" :rotate="$BASEROTATE.right" :text="'BUILDING FOR THE WEB'" />
            <AppTextAnimation :state="isTextSegmentState" :start="0.82" :rotate="$BASEROTATE.left" :text="'& EXPLORING AI'" />
          </span>
        </h1>
        <div class="hero-card-item">
          <AppCard
            :component-name="'company'"
            :name="['・', 'PRATYAKSH KALSI']"
            :title="'PRTYKSH'"
            :subtitle="'(PORTFOLIO)'"
            :link="'https://pratyakshkalsi.com'"
            :desc="['SOFTWARE DEVELOPER,', 'BUILDING FOR WEB & AI,', 'BASED IN INDIA,', 'OPEN TO COLLABORATION,', '& OPPORTUNITIES.']"
            :rotate="8"
            :xspeed="0.01"
            :yspeed="0.14"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      delay: [0, 0.176, 0.4, 0.42, 0.6, 0.7],
      isTextSegmentState: 'init',
      isTextUnderlineState: 'init',
    }
  },

  computed: {
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
    },
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
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
    this.$nextTick(() => {
      this.observe = this.$refs.Hero
      this.iObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.mvItemViewIn()
            }
          })
        },
        {
          rootMargin: '0%',
        }
      )
      this.iObserver.observe(this.observe)
    })
  },

  beforeDestroy() {
    if (this.iObserver && this.observe) {
      this.iObserver.unobserve(this.observe)
      this.iObserver = null
    }
  },

  methods: {
    mvItemViewIn() {
      this.isTextSegmentState = 'center'
      this.isTextUnderlineState = 'extend'
    },
  },
}
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  background-color: $skinColor;
  z-index: 1;
}

.hero .l-container {
  position: relative;
}

.hero-inner {
  padding: 92px 0 333px;

  @include tab-vertical() {
    padding: 80px 0 240px;
  }

  @include sp() {
    padding: 40px 0 180px;
  }
}

.hero-title {
  position: relative;
  color: $black;
  font-size: vw(180);
  font-family: $sixcaps;
  letter-spacing: -0.002em;
  line-height: 0.94;

  @include tab-vertical() {
    font-size: clamp(72px, 11vw, 120px);
  }

  @include sp() {
    font-size: clamp(42px, 13.5vw, 68px);
  }
}

.hero-title-read-area {
  position: absolute;
  top: 6px;
  left: 40px;

  @include tab-vertical() {
    left: 20px;
    top: 4px;
  }

  @include sp() {
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 24px;
    display: block;
  }
}

.hero-title-wrapper {
  display: block;
  position: relative;
}

.hero-title-wrapper-01 {
  width: vw(450);
  max-width: 100%;
  margin: 0 0 24px vw(310);

  @include tab-vertical() {
    width: vw(394);
    margin: 0 0 20px vw(240);
  }

  @include sp() {
    width: fit-content;
    margin: 0 0 18px 0;
  }
}

.hero-title-wrapper-02 {
  display: flex;
  justify-content: space-between;
  width: vw(987);
  max-width: 100%;
  margin: 0 0 24px vw(46);
  padding: 0 26px 0 34px;

  @include tab-vertical() {
    width: 100%;
    margin: 0 0 20px 0;
    padding: 0 10px;
  }

  @include sp() {
    width: 100%;
    margin: 0 0 18px 0;
    padding: 0;
  }
}

.hero-title-wrapper-03 {
  display: flex;
  justify-content: space-between;
  width: vw(860);
  max-width: 100%;
  margin: 0 0 24px vw(112);

  @include tab-vertical() {
    width: 100%;
    margin: 0 0 20px 0;
  }

  @include sp() {
    width: 100%;
    margin: 0 0 18px 0;
  }
}

.hero-title-wrapper-04 {
  display: flex;
  justify-content: space-between;
  width: vw(1040);
  max-width: 100%;

  @include tab-vertical() {
    width: 100%;
  }

  @include sp() {
    width: 100%;
  }
}

.hero-text-underline {
  position: absolute;
  top: -7px;
  left: 0;
  background-color: $black;
  width: 100%;
  height: 1px;
}

.hero-card-item {
  position: absolute;
  top: 110.8%;
  left: 33%;
  transform: rotate(-10deg);
  z-index: 101;

  @include tab-vertical() {
    top: 105%;
    left: 28%;
  }

  @include sp() {
    top: 90%;
    bottom: auto;
    right: 15px;
    left: auto;
    transform: rotate(-6deg);
  }
}
</style>
