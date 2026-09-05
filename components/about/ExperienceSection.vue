<template>
  <div ref="Experience" class="experience">
    <div ref="ExperienceCardArea" class="experience-card-area">
      <div v-for="exp in experienceData" :key="exp.id" ref="ExperienceCardItem" class="experience-card-item">
        <CardExperience
          :role="exp.role"
          :short-role="exp.shortRole"
          :company="exp.company"
          :type="exp.type"
          :period="exp.period"
          :date="exp.date"
          :location="exp.location"
          :skills="exp.skills"
          :description="exp.description"
          :badge="exp.badge"
          :modifier="exp.modifier"
        />
      </div>
    </div>
    <div class="experience-bg">
      <div class="experience-inner">
        <div class="l-container">
          <span class="experience-title-read-area">
            <AppReadTitle :state="isTextSegmentState" :text="['・', 'EXPERIENCE & ROLES']" :modifier="'award-section'" />
          </span>
          <div class="experience-list-wrapper">
            <div ref="ExperienceList" class="experience-list">
              <div v-for="(exp, index) in experienceData" :key="exp.id" ref="ExperienceItem" class="experience-item" :data-id="index">
                <AppBounceLine :state="'expand'" :pc-animation="false" :sp-animation="false" :width="1000" :modifier="'about-award'" />
                <div class="experience-item-left">
                  <p class="experience-period">{{ exp.period }}</p>
                  <span class="experience-type-pill">{{ exp.type }}</span>
                </div>
                <h3 class="experience-role">{{ exp.role }}</h3>
                <div class="experience-company-wrapper">
                  <p class="experience-company">{{ exp.company }}</p>
                </div>
              </div>
              <div class="experience-list-bottom-line">
                <AppBounceLine :state="'expand'" :pc-animation="false" :sp-animation="false" :width="1000" :modifier="'about-award-last'" />
              </div>
            </div>
          </div>
          <ul v-if="experienceSummary" class="experience-total-list">
            <li class="experience-total-item">EXPERIENCE * {{ experienceSummary.years }}</li>
            <li class="experience-total-item">CORE STACK * {{ experienceSummary.focus }}</li>
            <li class="experience-total-item">EDUCATION * {{ experienceSummary.education }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    experienceData: {
      type: Array,
      required: true,
    },
    experienceSummary: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => {
    return {
      isTextSegmentState: 'default',
      count: 0,
    }
  },
  computed: {
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
  },
  mounted() {
    this.experience = this.$refs.Experience
    this.cards = this.$refs.ExperienceCardItem
    this.items = this.$refs.ExperienceItem
    this.itemsHeight = this.items && this.items[0] ? this.items[0].getBoundingClientRect().height : 60
    this.cardHalfWidth = 125
    this.cardHalfHeight = 165
    this.animationFlags = []
    this.isAllResetAnimation = false
    this.mouseX = window.innerWidth / 2
    this.mouseY = 0
    if (this.items) {
      for (let i = 0; i < this.items.length; i++) {
        this.animationFlags.push(false)
      }
    }
    this.observe = this.$refs.Experience

    /* text-animation */
    this.iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isTextSegmentState = 'center'
            this.iObserver.unobserve(this.observe)
          }
        })
      },
      { rootMargin: '0%' }
    )
    this.iObserver.observe(this.observe)

    this.bounds = null
    this.onResize = () => {
      this.calcBoundaries()
    }
    window.addEventListener('resize', this.onResize)
    this.$nextTick(() => {
      this.calcBoundaries()
    })

    if (this.$SITECONFIG.isNoTouch) {
      this.animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.calcBoundaries()
              this.$gsap.ticker.add(this.cardScrollPos)
              this.$gsap.ticker.add(this.cardScrollAnimation)
              window.removeEventListener('mousemove', this.saveMousemove)
              window.addEventListener('mousemove', this.onMousemove)
            } else {
              this.$gsap.ticker.remove(this.cardScrollPos)
              this.$gsap.ticker.remove(this.cardScrollAnimation)
              window.addEventListener('mousemove', this.saveMousemove)
              window.removeEventListener('mousemove', this.onMousemove)
            }
          })
        },
        { rootMargin: '0%' }
      )
      this.animationObserver.observe(this.observe)
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    if (this.iObserver) {
      this.iObserver.unobserve(this.observe)
      this.iObserver = null
    }
    if (this.$SITECONFIG.isNoTouch) {
      this.$gsap.ticker.remove(this.cardScrollPos)
      this.$gsap.ticker.remove(this.cardScrollAnimation)
      window.removeEventListener('mousemove', this.onMousemove)
      window.removeEventListener('mousemove', this.saveMousemove)
      if (this.animationObserver) {
        this.animationObserver.unobserve(this.observe)
        this.animationObserver = null
      }
    }
  },

  methods: {
    calcBoundaries() {
      if (!this.items || !this.$refs.ExperienceList || !this.experience) return
      const list = this.$refs.ExperienceList
      const rect = list.getBoundingClientRect()
      const startPosY = this.experience.offsetTop + list.offsetTop - this.cardHalfHeight
      const startPosX = rect.left - this.cardHalfWidth
      const endPosY = startPosY + rect.height
      const endPosX = startPosX + rect.width

      const itemBounds = []
      for (let i = 0; i < this.items.length; i++) {
        const target = this.items[i]
        const startPosItemY = this.experience.offsetTop + target.offsetTop - this.cardHalfHeight
        const startPosItemX = rect.left - this.cardHalfWidth
        itemBounds.push({
          startPosItemY,
          startPosItemX,
          endPosItemY: startPosItemY + target.offsetHeight,
          endPosItemX: startPosItemX + rect.width,
        })
      }

      this.bounds = {
        startPosY,
        startPosX,
        endPosY,
        endPosX,
        items: itemBounds,
      }
    },
    cardScrollPos() {
      if (this.hambergerMenuState) return
      this.currentY = this.mouseY + this.$asscroll.targetPos

      this.$gsap.to(this.$refs.ExperienceCardArea, {
        duration: 0.4,
        ease: 'none',
        x: this.mouseX,
        y: this.currentY,
      })
    },
    cardScrollAnimation() {
      if (this.hambergerMenuState || !this.items) return
      if (!this.bounds) this.calcBoundaries()
      if (!this.bounds) return

      const { startPosY, startPosX, endPosY, endPosX, items } = this.bounds

      if (this.currentY < startPosY || this.mouseX < startPosX) {
        this.allCardFadeOut()
      } else if (this.currentY >= startPosY && this.currentY < endPosY && this.mouseX >= startPosX && this.mouseX < endPosX) {
        // inside active area
      } else {
        this.allCardFadeOut()
      }

      for (let i = 0; i < this.items.length; i++) {
        const target = this.items[i]
        const itemBound = items[i]
        if (!itemBound) continue

        if (this.currentY < itemBound.startPosItemY || this.mouseX < itemBound.startPosItemX) {
          this.colorFadeOut(target)
          this.cardFadeOut(i)
        } else if (this.currentY >= itemBound.startPosItemY && this.currentY < itemBound.endPosItemY && this.mouseX >= itemBound.startPosItemX && this.mouseX < itemBound.endPosItemX) {
          this.colorFadeIn(target)
          this.cardFadeIn(this.cards[i], i)
        } else {
          this.colorFadeOut(target)
          this.cardFadeOut(i)
        }
      }
    },
    saveMousemove(e) {
      this.mouseY = e.clientY - this.cardHalfHeight
      this.mouseX = e.clientX - this.cardHalfWidth
    },
    onMousemove(e) {
      if (this.hambergerMenuState) return

      this.mouseX = e.clientX - this.cardHalfWidth
      this.mouseY = e.clientY - this.cardHalfHeight
      this.currentY = this.mouseY + this.$asscroll.targetPos

      this.$gsap.to(this.$refs.ExperienceCardArea, {
        duration: 0.4,
        ease: 'none',
        x: this.mouseX,
        y: this.currentY,
      })
    },
    cardFadeIn(target, index) {
      if (this.animationFlags[index]) return
      this.animationFlags[index] = true
      this.hover = true
      this.count++

      this.$gsap.set(target, {
        zIndex: this.count,
      })
      this.$gsap.fromTo(
        target,
        {
          clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)',
        },
        {
          duration: this.$SITECONFIG.halfBaseDuration,
          ease: this.$EASING.transform,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        }
      )
    },
    cardFadeOut(index) {
      if (!this.animationFlags[index]) return
      this.animationFlags[index] = false
      this.hover = false
    },
    allCardFadeOut() {
      if (!this.hover && this.isAllResetAnimation) return
      this.isAllResetAnimation = true

      this.$gsap.to(this.cards, {
        duration: this.$SITECONFIG.halfBaseDuration,
        ease: this.$EASING.transform,
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        onComplete: () => {
          setTimeout(() => {
            this.isAllResetAnimation = false
          }, 100)
        },
      })
    },
    colorFadeIn(target) {
      this.$gsap.to(target, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.colorAndOpacity,
        color: '#ffffff',
      })
      this.$gsap.set(target, {
        zIndex: 2,
      })
    },
    colorFadeOut(target) {
      this.$gsap.to(target, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.colorAndOpacity,
        color: '#828282',
      })
      this.$gsap.set(target, {
        zIndex: 1,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.experience {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.experience-bg {
  position: relative;
  padding: 0 0 vw(600) 0;
  background-color: $darkBlack;
}

.experience-inner {
  padding: 152px 0;

  @include sp() {
    padding: 63px 0;
  }
}

.experience-card-area {
  position: fixed;
  top: 0;
  left: 150px;
  width: 250px;
  height: 330px;
  pointer-events: none;
  z-index: 3;

  @include sp() {
    display: none;
  }
}

.experience-card-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 0, 0% 0, 0% 100%, 0% 100%);
  z-index: 10;
}

.experience-title-read-area {
  display: block;
  margin: 0 0 36px 0;

  @include sp() {
    margin: 0 0 40px 0;
  }
}

.experience-list-wrapper {
  margin: 0 0 40px 0;
}

.experience-list {
  width: vw(1000);

  @include tab-vertical() {
    width: vw(840);
  }

  @include sp() {
    width: 100%;
  }
}

.experience-item {
  display: flex;
  align-items: baseline;
  position: relative;
  padding: 18px 0;
  color: $gray;

  @include sp() {
    display: block;
    padding: 20px 0;
  }
}

.experience-item-left {
  flex-shrink: 0;
  width: vw(238);

  @include tab-vertical() {
    width: vw(218);
  }

  @include sp() {
    display: flex;
    align-items: center;
    gap: 8px;
    width: auto;
    margin: 0 0 8px 0;
  }
}

.experience-period {
  position: relative;
  color: $white;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin: 0 0 4px 0;

  @include tab-vertical() {
    font-size: 11px;
  }

  @include sp() {
    margin: 0;
    font-size: 12px;
  }
}

.experience-type-pill {
  display: inline-block;
  font-size: 9px;
  letter-spacing: 0.05em;
  color: #9ca3af;
  text-transform: uppercase;

  @include sp() {
    font-size: 9.5px;
    padding: 2px 7px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
}

.experience-role {
  flex-shrink: 0;
  width: vw(440);
  font-size: 56px;
  font-family: $sixcaps;
  letter-spacing: 0.02em;
  line-height: 1;

  @include tab-vertical() {
    width: vw(360);
    font-size: 32px;
  }

  @include sp() {
    width: auto;
    margin: 0 0 8px 0;
    font-size: clamp(38px, 10vw, 48px);
    line-height: 1.05;
  }
}

.experience-company-wrapper {
  flex: 1;
}

.experience-company {
  font-size: 13px;
  letter-spacing: 0.03em;
  line-height: 1.35;
  color: $white;

  @include tab-vertical() {
    font-size: 11px;
  }

  @include sp() {
    font-size: 13px;
    margin: 0 0 6px 0;
  }
}

.experience-location {
  font-size: 10px;
  color: $gray;
  letter-spacing: 0.02em;
  margin: 0 0 6px 0;

  @include sp() {
    font-size: 11px;
  }
}

.experience-sp-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 4px 0 0 0;
}

.experience-sp-skill-pill {
  font-size: 9px;
  padding: 2px 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  color: #d1d5db;

  @include sp() {
    font-size: 10px;
    padding: 3px 8px;
  }
}

.experience-list-bottom-line {
  display: flex;
  position: relative;
  width: 100%;
  height: 1px;
  z-index: 1;
}

.experience-total-item {
  color: $gray;
  font-size: 12px;
  letter-spacing: 0.02em;

  @include sp() {
    font-size: 12px;
    line-height: 1.5;
  }

  &:not(:last-of-type) {
    margin: 0 0 4px 0;
  }
}
</style>
