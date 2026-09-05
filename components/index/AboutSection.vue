<template>
  <div class="about">
    <div class="about-bg">
      <div class="about-inner">
        <div class="l-container">
          <div class="about-content">
            <h2 ref="AboutTitle" class="about-title">
              <span class="about-title-read-area">
                <AppReadTitle :state="isTextSegmentState" :text="['・', 'ABOUT']" :modifier="'section'" />
              </span>
              <span class="about-title-wrapper about-title-wrapper-01">
                <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'WITH A STRONG BASE IN FRONTEND DEVELOPMENT,'" />
              </span>
              <span class="about-title-wrapper about-title-wrapper-02">
                <AppTextAnimation
                  :state="isTextSegmentState"
                  :start="0.12"
                  :rotate="$BASEROTATE.left"
                  :text="'I FOCUS ON BUILDING MODERN WEB PRODUCTS,'"
                />
              </span>
              <span class="about-title-wrapper about-title-wrapper-03">
                <AppTextAnimation :state="isTextSegmentState" :start="0.24" :rotate="$BASEROTATE.right" :text="'EXPANDING INTO BACKEND ENGINEERING,'" />
              </span>
              <span class="about-title-wrapper about-title-wrapper-04">
                <AppTextAnimation :state="isTextSegmentState" :start="0.36" :rotate="$BASEROTATE.left" :text="'AND EXPLORING AI TO CREATE RELIABLE,'" />
              </span>
              <span class="about-title-wrapper about-title-wrapper-05">
                <AppTextAnimation :state="isTextSegmentState" :start="0.48" :rotate="$BASEROTATE.right" :text="'PRACTICAL DIGITAL EXPERIENCES.'" />
              </span>
              <AppBounceLine :state="isTextUnderlineState" :start="0.6" :width="1000" :origin="'left'" :modifier="'index-about'" />
            </h2>
            <div class="about-card-item">
              <AppCard
                :component-name="'about'"
                :name="['・', 'PRATYAKSH KALSI']"
                :title="'ABOUT'"
                :subtitle="'(STORY & STACK)'"
                :desc="['SOFTWARE DEVELOPER,', 'BUILDING FOR WEB & AI,', 'BASED IN INDIA,', 'CLICK TO READ STORY →']"
                :rotate="8"
                :xspeed="0.01"
                :yspeed="0.12"
                :view-animation="false"
              />
            </div>
          </div>
          <div class="about-read-text">
            <AppReadTitle
              :state="isTextSegmentState"
              :start="0.48"
              :text="[
                'BASED IN INDIA · B.TECH ECE AT NIT SRINAGAR.',
                'BUILDING HIGH-PERFORMANCE WEB APPS & EXPLORING GENAI.',
                'CLICK CARD OR BUTTON BELOW TO EXPLORE FULL PROFILE.',
              ]"
            />
            <div class="about-bio-link-wrap">
              <AppPageTransitionBg url="/about" color="#000000" class="about-bio-link">
                <span>VIEW FULL ABOUT & RESUME</span>
                <span class="about-bio-link-arrow">→</span>
              </AppPageTransitionBg>
            </div>
          </div>
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
  padding: 220px 0 320px 0;

  @include tab-vertical() {
    padding: 160px 0 240px 0;
  }

  @include sp() {
    padding: 100px 0 180px 0;
  }
}

.about-content {
  position: relative;
  width: 100%;
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
    font-size: clamp(34px, 8.8vw, 50px);
    line-height: 1.05;
    padding: 0 20px;
    margin: 0 0 48px 0;
  }
}

.about-title-read-area {
  position: absolute;
  bottom: calc(100% + 16px);
  left: 40px;
  color: $white;

  @include tab-vertical() {
    left: vw(40);
  }

  @include sp() {
    left: 20px;
    bottom: calc(100% + 12px);
  }
}

.about-title-wrapper {
  display: block;
}

.about-title-wrapper-01 {
  text-align: left;
}

.about-card-item {
  position: absolute;
  top: -10px;
  right: 60px;
  transform: rotate(8deg);
  z-index: 100;

  @include tab {
    right: 20px;
    top: 0;
  }

  @include tab-vertical() {
    right: 16px;
  }

  @include sp() {
    position: relative;
    top: 0;
    right: auto;
    margin: 30px auto 60px auto;
    display: flex;
    justify-content: center;
  }
}

.about-read-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
    align-items: flex-start;
    text-align: left;
    padding: 0 20px;
    margin-top: 20px;
    font-size: clamp(11.5px, 3.2vw, 13px);
    line-height: 1.5;
  }
}

.about-bio-link-wrap {
  margin: 22px 0 0 auto;

  @include sp() {
    margin: 20px 0 0 0;
  }
}

.about-bio-link-arrow {
  display: inline-block;
  transition: transform 0.25s ease;
}

.about-bio-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  background-color: $darkBlue;
  color: $white;
  border-radius: 999px;
  font-family: $helvetica;
  font-size: 11px;
  letter-spacing: 0.04em;
  text-decoration: none;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transition: background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

  @include sp() {
    font-size: 12px;
    padding: 11px 20px;
  }

  &:hover {
    background-color: $black;
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);

    .about-bio-link-arrow {
      transform: translateX(4px);
    }
  }
}
</style>
