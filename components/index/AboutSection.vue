<template>
  <div class="about">
    <div class="about-bg">
      <div class="about-inner">
        <div class="l-container">
          <h2 ref="AboutTitle" class="about-title">
            <span class="about-title-read-area">
              <AppReadTitle :state="isTextSegmentState" :text="['・', 'ABOUT']" :sp-animation="false" :modifier="'section'" />
            </span>
            <span class="pc-only">
              <span class="about-title-wrapper about-title-wrapper-01">
                <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'WITH A STRONG BASE IN FRONTEND DEVELOPMENT,'" :sp-animation="false" />
              </span>
              <span class="about-title-wrapper about-title-wrapper-02">
                <AppTextAnimation
                  :state="isTextSegmentState"
                  :start="0.12"
                  :rotate="$BASEROTATE.left"
                  :text="'I FOCUS ON BUILDING MODERN WEB PRODUCTS,'"
                  :sp-animation="false"
                />
              </span>
              <span class="about-title-wrapper about-title-wrapper-03">
                <AppTextAnimation :state="isTextSegmentState" :start="0.24" :rotate="$BASEROTATE.right" :text="'EXPANDING INTO BACKEND ENGINEERING,'" :sp-animation="false" />
              </span>
              <span class="about-title-wrapper about-title-wrapper-04">
                <AppTextAnimation :state="isTextSegmentState" :start="0.36" :rotate="$BASEROTATE.left" :text="'AND EXPLORING AI TO CREATE RELIABLE,'" :sp-animation="false" />
              </span>
              <span class="about-title-wrapper about-title-wrapper-05">
                <AppTextAnimation :state="isTextSegmentState" :start="0.48" :rotate="$BASEROTATE.right" :text="'PRACTICAL DIGITAL EXPERIENCES.'" :sp-animation="false" />
              </span>
            </span>
            <span class="sp-only">
              <span class="about-title-wrapper-sp about-title-wrapper-01-sp">WITH A STRONG BASE IN</span>FRONTEND DEVELOPMENT,<br />I FOCUS ON BUILDING MODERN<br />WEB PRODUCTS, EXPANDING<br />INTO BACKEND ENGINEERING,<br />& EXPLORING AI TO CREATE<br />RELIABLE, PRACTICAL<br />DIGITAL EXPERIENCES.
            </span>
            <span class="pc-only">
              <AppBounceLine :state="isTextUnderlineState" :start="0.6" :width="1000" :origin="'left'" :sp-animation="false" :modifier="'index-about'" />
            </span>
            <span class="sp-only">
              <span class="about-text-underline"></span>
            </span>
          </h2>
          <p class="about-read-text">
            <span class="pc-only">
              <AppReadTitle
                :state="isTextSegmentState"
                :start="0.48"
                :text="[
                  'STARTED IN SOFTWARE DEVELOPMENT THROUGH FRONTEND ENGINEERING AND MODERN WEB FRAMEWORKS,',
                  'NOW GROWING INTO BACKEND ARCHITECTURE AND EXPLORING GENERATIVE AI',
                  'TO BUILD PRACTICAL, USEFUL DIGITAL PRODUCTS.',
                ]"
                :sp-animation="false"
              />
            </span>
            <span class="sp-only"
              >STARTED IN SOFTWARE DEVELOPMENT THROUGH FRONTEND ENGINEERING AND MODERN WEB FRAMEWORKS, NOW GROWING INTO BACKEND ARCHITECTURE AND EXPLORING GENERATIVE AI TO BUILD PRACTICAL, USEFUL DIGITAL PRODUCTS.</span
            >
          </p>
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
    }
  },
  mounted() {
    /* text-animation */
    this.observe = this.$refs.AboutTitle
    this.iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isTextSegmentState = 'center'
            this.isTextUnderlineState = 'extend'
            this.iObserver.unobserve(this.observe)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserver.observe(this.observe)
  },

  beforeDestroy() {
    this.iObserver.unobserve(this.observe)
    this.iObserver = null
  },
}
</script>

<style scoped lang="scss">
.about-bg {
  position: relative;

  @include sp() {
    overflow: hidden;
  }
}

.about-inner {
  padding: 333px 0 568px 0;

  @include tab-vertical() {
    padding: 213px 0 448px 0;
  }

  @include sp() {
    padding: 118px 0 340px;
  }
}

.about-title {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 0 85px 0;
  padding: 0 40px;
  color: $darkBlue;
  font-size: vw(68);
  font-family: $sixcaps;
  text-transform: uppercase;
  line-height: 0.964;

  @include tab {
    font-size: vw(62);
    line-height: 1;
  }

  @include tab-vertical() {
    font-size: vw(54);
  }

  @include sp() {
    width: 100%;
    margin: 0 0 54px 0;
    padding: 0;
    font-size: vw_sp(84);
    white-space: normal;
    line-height: 1.06;
  }
}

.about-title-read-area {
  position: absolute;
  top: -4px;
  left: 42px;
  color: $white;

  @include tab-vertical() {
    left: vw(46);
  }

  @include sp() {
    left: 9px;
  }
}

.about-title-wrapper {
  display: block;
}

.about-title-wrapper-01 {
  text-align: right;
}

.about-title-wrapper-01-sp {
  display: block;
  text-align: right;
}

.about-read-text {
  width: 100%;
  max-width: 100%;
  color: $darkBlue;
  padding: 0 40px;
  font-size: 12px;
  text-align: right;
  letter-spacing: 0.02em;

  @include tab {
    padding: 0 40px;
  }

  @include tab-vertical() {
    padding: 0 40px;
  }

  @include sp() {
    width: calc(270px + #{vw_sp(20)});
    margin: 0 0 0 auto;
    padding: 0 vw_sp(20);
    font-size: 10px;
    line-height: 1.3;
  }
}

.about-text-underline {
  position: absolute;
  bottom: -34px;
  right: vw_sp(20);
  background-color: $darkBlue;
  width: calc(100% - #{vw_sp(40)});
  height: 1px;
}
</style>
