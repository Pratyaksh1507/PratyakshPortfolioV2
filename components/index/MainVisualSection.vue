<template>
  <div ref="Hero" class="hero">
    <div ref="HeroBgCircle01" class="hero-bg-circle-01"></div>
    <div ref="HeroBgCircle02" class="hero-bg-circle-02"></div>
    <div class="hero-inner">
      <div class="l-container">
        <h1 class="hero-title">
          <span class="hero-title-read-area">
            <AppReadTitle :state="isTextSegmentState" :text="['・', 'AUTHOR : PRATYAKSH KALSI', 'ROLE : SOFTWARE DEVELOPER', 'FOCUS : WEB & AI']" :modifier="'section'" />
          </span>
          <span class="pc-only">
            <span class="hero-title-wrapper hero-title-wrapper-01">
              <AppBounceLine :state="isTextUnderlineState" :origin="'left'" :sp-animation="false" :width="1220" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'PORTFOLIO OF PRATYAKSH KALSI'" :sp-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02">
              <AppBounceLine :state="isTextUnderlineState" :start="0.176" :origin="'right'" :width="1080" :sp-animation="false" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.176" :rotate="$BASEROTATE.left" :text="'SOFTWARE DEVELOPER'" :sp-animation="false" />
              <span class="hero-title-wrapper-02-base-area">
                <AppTextAnimation :state="isTextSegmentState" :start="0.264" :rotate="$BASEROTATE.left" :text="'( BASED IN INDIA )'" :sp-animation="false" />
              </span>
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-03">
              <AppBounceLine :state="isTextUnderlineState" :start="0.4" :origin="'left'" :width="700" :sp-animation="false" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.4" :rotate="$BASEROTATE.right" :text="'BUILDING FOR THE WEB'" :sp-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-04">
              <AppBounceLine :state="isTextUnderlineState" :start="0.42" :width="280" :origin="'right'" :sp-animation="false" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.42" :rotate="$BASEROTATE.left" :text="'& EXPLORING AI'" :sp-animation="false" />
            </span>
          </span>
          <span class="sp-only">
            <span class="hero-title-wrapper hero-title-wrapper-01-sp">
              <AppBounceLine :state="isTextUnderlineState" :origin="'left'" :pc-animation="false" :width="450" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'PORTFOLIO OF'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-02-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.176" :origin="'left'" :pc-animation="false" :width="650" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.176" :rotate="$BASEROTATE.left" :text="'PRATYAKSH KALSI'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-03-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.28" :origin="'left'" :pc-animation="false" :width="750" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.28" :rotate="$BASEROTATE.right" :text="'SOFTWARE DEVELOPER'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-04-sp">
              <AppTextAnimation :state="isTextSegmentState" :start="0.38" :rotate="$BASEROTATE.left" :text="'( BASED IN INDIA )'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-05-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.52" :origin="'left'" :pc-animation="false" :width="780" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.52" :rotate="$BASEROTATE.right" :text="'BUILDING FOR THE WEB'" :pc-animation="false" />
            </span>
            <span class="hero-title-wrapper hero-title-wrapper-06-sp">
              <AppBounceLine :state="isTextUnderlineState" :start="0.64" :origin="'left'" :pc-animation="false" :width="580" :modifier="'index-hero'" />
              <AppTextAnimation :state="isTextSegmentState" :start="0.64" :rotate="$BASEROTATE.left" :text="'& EXPLORING AI'" :pc-animation="false" />
            </span>
          </span>
        </h1>
        <div ref="HeroCardItem" class="hero-card-item">
          <AppCard
            :component-name="'mv'"
            :name="['・', 'PRATYAKSH KALSI']"
            :title="'PRTYKSH'"
            :subtitle="'(ABOUT ME)'"
            :desc="['YOU CAN CLICK AND,', 'SHOW ABOUT ME.', 'BY THE WAY,', 'YOU CAN THROW', 'THIS CARD AWAY']"
            :rotate="8"
            :xspeed="0.01"
            :yspeed="0.14"
            :drag-animation="isMvCardDrag"
            :view-animation="false"
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
      isTextSegmentState: 'default',
      isTextUnderlineState: 'default',
      isMvCardDrag: false,
    }
  },

  computed: {
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
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
    this.deviceRatio = this.$checkDevice.isIpad ? 8.0 : 4.0
  },

  beforeDestroy() {
    this.iObserver.unobserve(this.observe)
    this.iObserver = null
    this.$gsap.ticker.remove(this.bgCircleScaleChangeScroll)
  },

  methods: {
    mvItemViewIn() {
      this.isTextSegmentState = 'center'
      this.isTextUnderlineState = 'extend'
      this.$gsap.to(this.$refs.HeroBgCircle01, {
        duration: this.$SITECONFIG.baseDuration,
        delay: 0.2,
        ease: this.$EASING.transform,
        scale: 1,
      })

      // カードアニメーション
      this.$gsap.to(this.$refs.HeroCardItem, {
        duration: this.$SITECONFIG.fullDuration,
        ease: this.$EASING.transform,
        x: 0,
        rotate: 0,
        onComplete: () => {
          // 処理が終わったらドラッグを有効にする
          this.isMvCardDrag = true
        },
      })

      this.observe = this.$refs.Hero
      this.iObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // サークルアニメーション②
              this.$gsap.ticker.add(this.bgCircleScaleChangeScroll)
            } else {
              this.$gsap.ticker.remove(this.bgCircleScaleChangeScroll)
            }
          })
        },
        {
          rootMargin: '0%',
        }
      )
      this.iObserver.observe(this.observe)
    },

    bgCircleScaleChangeScroll() {
      if (this.hambergerMenuState) return

      this.$gsap.to(this.$refs.HeroBgCircle02, {
        duration: this.$SITECONFIG.baseDuration / 3.0,
        ease: 'none',
        scale: (this.$asscroll.currentPos / this.$refs.Hero.clientHeight) * this.deviceRatio + 1.0,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.hero-inner {
  padding: 92px 0;

  @include sp() {
    padding: 106px 0;
  }
}

.hero-title {
  position: relative;
  font-size: vw(180);
  font-family: $sixcaps;
  letter-spacing: -0.002em;

  @include tab-vertical() {
    font-size: vw(140);
  }

  @include sp() {
    font-size: vw_sp(125);
    line-height: 0.94;
  }
}

.hero-title-read-area {
  position: absolute;
  top: 8px;
  left: 2px;
  font-family: $helvetica;

  @include sp() {
    position: relative;
    top: 0;
    left: 0;
    margin: 0 0 28px 0;
    font-size: 10px;
  }
}

.hero-title-read-block-sp {
  display: block;

  &:nth-of-type(1) {
    display: inline-block;
    margin: 0 0 0 -4px;
    font-size: 32px;
  }
}

.hero-title-wrapper {
  display: block;
  position: relative;

  @include sp() {
    margin: 0 0 16px 0;
    white-space: nowrap;
  }
}

.hero-title-wrapper-01 {
  display: table;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 24px vw(220);

  @include tab-vertical() {
    margin: 0 0 24px vw(180);
  }
}

.hero-title-wrapper-02 {
  display: flex;
  justify-content: space-between;
  width: vw(1040);
  max-width: 100%;
  margin: 0 0 24px 0;
}

.hero-title-wrapper-03 {
  display: table;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 22px vw(320);

  @include tab-vertical() {
    margin: 0 0 22px vw(160);
  }
}

.hero-title-wrapper-04 {
  display: table;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 0 vw(160);

  @include tab-vertical() {
    margin: 0 0 0 vw(80);
  }
}

.hero-title-wrapper-01-sp,
.hero-title-wrapper-02-sp,
.hero-title-wrapper-03-sp,
.hero-title-wrapper-05-sp,
.hero-title-wrapper-06-sp {
  display: table;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 vw_sp(20) 0;
}

.hero-title-wrapper-04-sp {
  position: relative;
  margin: 0 0 vw_sp(32) vw_sp(4);
  font-size: 13px;
  letter-spacing: 0.04em;
}

.hero-title-wrapper-02-base-area {
  position: relative;
  padding: 12px 0 0 0;
  font-size: vw(80);
  letter-spacing: 0.0025em;
}

.hero-text-underline {
  position: absolute;
  top: -7px;
  left: 0;
  background-color: $white;
  width: 100%;
  height: 1px;
}

.hero-bg-circle-01 {
  position: absolute;
  top: vw(-184);
  right: vw(-90);
  width: vw(820);
  height: vw(820);
  background-color: $yellow;
  border-radius: 50%;
  pointer-events: none;
  transform: scale(0);

  @include sp() {
    top: vw_sp(-184);
    right: auto;
    left: 9px;
    width: vw_sp(1046);
    height: vw_sp(1046);
  }
}

.hero-bg-circle-02 {
  position: absolute;
  top: 0;
  left: vw(-216);
  width: vw(1034);
  height: vw(1034);
  background-color: $lightBlue;
  border-radius: 50%;
  pointer-events: none;
  transform: scale(0);

  @include sp() {
    top: vw_sp(650);
    left: vw_sp(-610);
    width: vw_sp(1345);
    height: vw_sp(1345);
  }
}

.hero-card-item {
  position: absolute;
  top: 18%;
  left: 9%;
  transform: translateX(-600px) rotate(240deg);
  z-index: 2;

  @include sp() {
    top: 28%;
    right: 6%;
    left: auto;
    transform: translateX(400px) rotate(180deg);
  }
}
</style>
