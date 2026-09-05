<template>
  <div ref="Contact" class="contact">
    <AppCircleBg :state="isCircleBgState" :modifier="'index-contact'" />
    <div class="contact-bg">
      <div class="contact-inner">
        <div class="l-container">
          <h2 class="contact-title">
            <span class="contact-title-read-area">
              <AppReadTitle :state="isTextSegmentState" :text="['・', 'SAY HI']" :modifier="'section'" />
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-01">
              <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'I AM A SOFTWARE DEVELOPER'" />
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-02">
              <AppTextAnimation :state="isTextSegmentState" :start="0.12" :rotate="$BASEROTATE.left" :text="'FOCUSED ON BUILDING USEFUL'" />
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-03">
              <AppTextAnimation :state="isTextSegmentState" :start="0.24" :rotate="$BASEROTATE.right" :text="'DIGITAL EXPERIENCES'" />
            </span>
            <span class="contact-title-wrapper contact-title-wrapper-04">
              <AppTextAnimation :state="isTextSegmentState" :start="0.36" :rotate="$BASEROTATE.left" :text="'BASED IN INDIA.'" />
            </span>
          </h2>
          <div class="contact-info-area">
            <div class="contact-info-index-area">
              <span class="contact-info-index">
                <AppReadTitle :state="isTextSegmentState" :start="0.48" :text="['・', 'INDEX']" :modifier="'contact-section'" />
              </span>
              <ul class="contact-info-list">
                <li v-for="(data, index) in projectData" :key="data.id" class="contact-info-item js-click-target">
                  <AppPageTransitionImage :url="`works/${data.id}`" :index="index">
                    <AppTextAnimation :state="isTextSegmentState" :start="0.48 + index * 0.12" :rotate="$BASEROTATE.right" :text="data.title.full" />
                  </AppPageTransitionImage>
                </li>
                <li class="contact-info-item js-click-target">
                  <AppPageTransitionBg :url="`resume`" color="#000000">
                    <AppTextAnimation :state="isTextSegmentState" :start="0.48 + projectData.length * 0.12" :rotate="$BASEROTATE.right" :text="'RESUME'" />
                  </AppPageTransitionBg>
                </li>
              </ul>
            </div>
            <div class="contact-info-name-area">
              <span class="contact-name">
                <AppTextAnimation :state="isTextSegmentState" :start="0.48" :rotate="$BASEROTATE.right" :text="'PRATYAKSH KALSI'" />
              </span>
            </div>
          </div>
          <div class="contact-card-item-02">
            <AppCard
              :component-name="'contact'"
              :name="['・', 'CODED BY', '(PRATYAKSH KALSI)']"
              :info="[
                {
                  link: contactData[0].list01.link,
                  text: contactData[0].list01.text,
                },
                {
                  link: contactData[0].list02.link,
                  text: contactData[0].list02.text,
                },
                {
                  link: contactData[0].list03.link,
                  text: contactData[0].list03.text,
                },
              ]"
              :title="{
                text: contactData[0].mainTitle.title,
                link: contactData[0].mainTitle.link,
                subtext: contactData[0].mainTitle.subtitle,
              }"
              :rotate="8"
              :xspeed="0.051"
              :yspeed="0.1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projectData: {
      type: Array,
      required: true,
    },
    contactData: {
      type: Array,
      required: true,
    },
  },

  data: () => {
    return {
      isTextSegmentState: '',
      isCircleBgState: '',
    }
  },

  mounted() {
    /* text-animation */
    this.observe = this.$refs.Contact
    this.iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isTextSegmentState = 'center'
            this.isCircleBgState = 'extend'
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
.contact {
  position: relative;
}

.contact-bg {
  padding: 450px 0 0 0;

  @include tab() {
    padding: 335px 0 0 0;
  }

  @include sp() {
    padding: 180px 0 60px 0;
  }
}

.contact-title {
  position: relative;
  margin: 0 0 140px 0;
  color: $darkPink;
  font-size: vw(180);
  font-family: $sixcaps;

  @include tab() {
    font-size: vw(170);
  }

  @include tab-vertical() {
    font-size: vw(150);
  }

  @include sp() {
    font-size: clamp(48px, 13.5vw, 76px);
    line-height: 1.05;
    margin: 0 0 60px 0;
  }
}

.contact-title-read-area {
  position: absolute;
  top: 8px;
  left: 2px;
  color: $white;

  @include sp() {
    position: static;
    display: block;
    margin-bottom: 16px;
  }
}

.contact-title-wrapper {
  display: block;
}

.contact-title-wrapper-01 {
  padding: 0 0 0 290px;

  @include tab {
    padding: 0 0 0 vw(290);
  }

  @include sp() {
    padding: 0;
  }
}

.contact-title-wrapper-02 {
  padding: 0 0 0 33px;

  @include sp() {
    padding: 0;
  }
}

.contact-title-wrapper-04 {
  padding: 0 0 0 40px;

  @include sp() {
    padding: 0;
  }
}

.contact-info-area {
  display: flex;
  align-items: flex-start;

  @include sp() {
    display: block;
  }
}

.contact-info-index-area {
  flex-shrink: 0;
  margin: vw(32) vw(32) 0 0;

  @include tab-vertical() {
    margin: vw(16) vw(20) 0 0;
  }

  @include sp() {
    margin: 0 0 32px 0;
  }
}

.contact-info-index {
  display: block;
  margin: 0 0 56px 0;

  @include tab-vertical() {
    margin: 0 0 20px 0;
  }

  @include sp() {
    margin: 0 0 16px 0;
  }
}

.contact-info-list {
  font-size: 12px;
  line-height: 1.6;

  @include sp() {
    font-size: clamp(12px, 3.4vw, 13.5px);
    line-height: 1.7;
  }
}

.contact-info-item {
  display: block;
}

.contact-info-name-area {
  position: relative;
  flex-shrink: 1;
  min-width: 0;
}

.contact-name {
  margin: -26px 0 0 0;
  color: $darkPink;
  font-size: vw(330);
  font-family: $sixcaps;
  letter-spacing: -0.02em;
  white-space: nowrap;

  @include tab() {
    font-size: vw(300);
  }

  @include tab-vertical() {
    font-size: vw(260);
  }

  @include sp() {
    margin: 10px 0 0 0;
    font-size: clamp(52px, 16vw, 84px);
    white-space: normal;
    line-height: 0.98;
  }
}

.contact-card-item-02 {
  position: absolute;
  top: 60%;
  right: 38%;
  transform: rotate(10deg);
  width: 0;
  height: 0;

  @include sp() {
    display: none;
  }
}
</style>
