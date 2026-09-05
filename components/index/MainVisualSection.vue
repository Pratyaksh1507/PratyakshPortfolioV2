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
          <span class="hero-title-wrapper hero-title-wrapper-01">
            <AppBounceLine :state="isTextUnderlineState" :origin="'left'" :width="700" :modifier="'index-hero'" />
            <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'PRATYAKSH KALSI'" />
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-02">
            <AppBounceLine :state="isTextUnderlineState" :start="0.176" :origin="'right'" :width="1080" :modifier="'index-hero'" />
            <AppTextAnimation :state="isTextSegmentState" :start="0.176" :rotate="$BASEROTATE.left" :text="'SOFTWARE DEVELOPER'" />
            <span class="hero-title-wrapper-02-base-area">
              <AppTextAnimation :state="isTextSegmentState" :start="0.264" :rotate="$BASEROTATE.left" :text="'( BASED IN INDIA )'" />
            </span>
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-03">
            <AppBounceLine :state="isTextUnderlineState" :start="0.4" :origin="'left'" :width="700" :modifier="'index-hero'" />
            <AppTextAnimation :state="isTextSegmentState" :start="0.4" :rotate="$BASEROTATE.right" :text="'BUILDING FOR THE WEB'" />
          </span>
          <span class="hero-title-wrapper hero-title-wrapper-04">
            <AppBounceLine :state="isTextUnderlineState" :start="0.42" :width="280" :origin="'right'" :modifier="'index-hero'" />
            <AppTextAnimation :state="isTextSegmentState" :start="0.42" :rotate="$BASEROTATE.left" :text="'& EXPLORING AI'" />
          </span>
        </h1>
        <div ref="HeroCardItem" class="hero-card-item">
          <AppCard
            :component-name="'mv'"
            :name="['・', 'PRATYAKSH KALSI']"
            :title="'PRTYKSH'"
            :subtitle="'[ABOUT ME]'"
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
.hero {
  position: relative;
}

.hero .l-container {
  position: relative;
}

.hero-inner {
  position: relative;
  padding: 92px 0;

  @include tab-vertical() {
    padding: 70px 0;
  }

  @include sp() {
    padding: 40px 0 140px 0;
  }
}

.hero-title {
  position: relative;
  font-size: vw(180);
  font-family: $sixcaps;
  letter-spacing: -0.002em;
  line-height: 0.94;

  @include tab-vertical() {
    font-size: clamp(72px, 11vw, 120px);
  }

  @include sp() {
    font-size: clamp(44px, 13.6vw, 68px);
  }
}

.hero-title-read-area {
  position: absolute;
  top: 8px;
  left: 2px;
  font-family: $helvetica;

  @include tab-vertical() {
    top: 4px;
    left: 2px;
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
  display: table;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 24px unquote("max(240px, #{vw(240)})");

  @include tab-vertical() {
    margin: 0 0 20px unquote("max(190px, #{vw(190)})");
  }

  @include sp() {
    margin: 0 0 18px 0;
  }
}

.hero-title-wrapper-02 {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: vw(1040);
  max-width: 100%;
  margin: 0 0 24px 0;

  @include tab-vertical() {
    width: 100%;
    margin: 0 0 20px 0;
  }

  @include sp() {
    display: block;
    width: 100%;
    margin: 0 0 18px 0;
  }
}

.hero-title-wrapper-03 {
  display: table;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 22px vw(320);

  @include tab-vertical() {
    margin: 0 0 20px vw(160);
  }

  @include sp() {
    margin: 0 0 18px clamp(12px, 4vw, 24px);
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

  @include sp() {
    margin: 0 0 0 clamp(6px, 2vw, 14px);
  }
}

.hero-title-wrapper-02-base-area {
  position: relative;
  padding: 12px 0 0 0;
  font-size: vw(80);
  letter-spacing: 0.0025em;

  @include tab-vertical() {
    font-size: clamp(30px, 5vw, 54px);
    padding-top: 6px;
  }

  @include sp() {
    display: block;
    font-size: clamp(11px, 3.2vw, 14px);
    font-family: $helvetica;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding-top: 4px;
    opacity: 0.85;
  }
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
}

.hero-card-item {
  position: absolute;
  top: 130px;
  left: 60px;
  transform: translateX(-600px) rotate(240deg);
  z-index: 2;

  @include tab-vertical() {
    top: 240px;
    right: 20px;
    left: auto;
  }

  @include sp() {
    top: auto;
    bottom: -100px;
    right: 20px;
    left: auto;
  }
}
</style>
