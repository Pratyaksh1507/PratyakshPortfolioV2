<template>
  <div :class="[bodyClass,isAndroid, isWindows, isSafari]">
    <BaseOpenning />
    <BaseMouse />
    <BaseLoading />
    <BaseHeader />
    <BaseHambergerMenu />
    <!--transition-->
    <div class="transition">
      <div
        ref="LayoutsNormalTransitionBg"
        class="layouts-normal-transition-img-wrapper"
      >
        <span
          v-for="data in getProjectData"
          :key="data.id"
          ref="LayoutsNormalTransitionImg"
          class="layouts-normal-transition-img"
        >
          <picture>
            <source
              :srcset="`${data.heroImg.sp.url}`"
              type="image/webp"
              media="(max-width: 767px)"
            />
            <img
              :src="`${data.heroImg.pc.url}`"
              :width="`${data.heroImg.pc.width}`"
              :height="`${data.heroImg.pc.height}`"
              :alt="`${data.id}`"
            />
          </picture>
        </span>
        <span
          ref="LayoutsNormalTransitionColorBg"
          class="layouts-normal-transition-color-bg"
        ></span>
      </div>
    </div>
    <!--canvas-->
    <div ref="CanvasFix" class="canvas-fix">
      <div ref="CanvasFixContents" class="canavs-fix-contents">
        <!--particle-->
        <div class="particle"><canvas ref="Particle"></canvas></div>
      </div>
    </div>
    <!--asscroll-->
    <div ref="AsscrollContainer" class="asscroll-container">
      <div class="asscroll">
        <div ref="AsscrollContents" class="asscroll-contents">
          <nuxt />
        </div>
      </div>
    </div>
    <!--ハンバーガーメニューを閉じるための空dom-->
    <div
      ref="AsscrollContainerCover"
      class="asscroll-container-cover"
      @click="hambergerMenuOnClose"
    >
    </div>
  </div>
</template>

<script>
import Particle from '../components/canvas/index/pickup/particle'
import { preEvent } from '../assets/js/preEvent'

export default {
  data: () => {
    return {
      isAndroid: '',
      isWindows: '',
      isSafari: '',
    }
  },

  computed: {
    pickupData() {
      return this.$store.getters.pickupData
    },
    getProjectData() {
      return this.$store.getters.projectData
    },
    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
    },
    defaultTransitionColor() {
      return this.$store.getters['bg-transition/color']
    },
    imageTransitionState() {
      return this.$store.getters['image-transition/state']
    },
    imageTransitionIndex() {
      return this.$store.getters['image-transition/index']
    },
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
    indexPickupState() {
      return this.$store.getters['indexPickup/state']
    },
    indexPickupIsAnimation() {
      return this.$store.getters['indexPickup/sceneAnimationState']
    },
    pickupCurrentNumber() {
      return this.$store.getters['indexPickup/currnetNumber']
    },
    pickupTransitionState() {
      return this.$store.getters['indexPickup/transition']
    },
    indexPickupScene() {
      return this.$store.getters['indexPickup/scene']
    },
    indexPickupPos() {
      return this.$store.getters['indexPickup/pos']
    },
    bodyClass() {
      return this.$store.getters['body-class/state']
    },
  },
  watch: {
    /**
     * 背景色が変わる遷移
     */
    defaultTransitionState: function () {
      // アニメーション開始
      if (this.defaultTransitionState) {
        this.$gsap.set(this.$refs.LayoutsNormalTransitionColorBg, {
          backgroundColor: this.defaultTransitionColor,
          opacity: 1,
        })
        this.onTransitionStart()
      }
      // アニメーション終わり
      else {
        this.onTransitionEnd()
        this.$gsap.to(this.$refs.LayoutsNormalTransitionColorBg, {
          duration: this.$SITECONFIG.baseDuration * 0.2,
          opacity: 0,
        })
      }
    },

    /**
     * 画像が広がる遷移
     */
    imageTransitionState: function () {
      // アニメーション開始
      if (this.imageTransitionState) {
        this.$gsap.set(
          this.$refs.LayoutsNormalTransitionImg[this.imageTransitionIndex],
          {
            opacity: 1,
          }
        )
        this.onTransitionStart()
      }
      // アニメーション終わり
      else {
        this.onTransitionEnd()
        setTimeout(() => {
          this.$gsap.set(
            this.$refs.LayoutsNormalTransitionImg[this.imageTransitionIndex],
            {
              opacity: 0,
            }
          )
        }, this.$SITECONFIG.baseDuration)
      }
    },

    /**
     * ハンバーガーメニューが開いた時のスクロール制限
     */
    hambergerMenuState: function () {
      if (this.hambergerMenuState) {
        if (this.$SITECONFIG.isTouch) {
          // スマホの時
          this.$backfaceScroll(false)
        } else {
          // PCの時
          this.savePos = this.$asscroll.currentPos
          this.$asscroll.disable({ inputOnly: true })
          window.addEventListener('wheel', preEvent, { passive: false })
          window.addEventListener('scroll', preEvent, { passive: false })
        }
        this.$gsap.set(this.$refs.AsscrollContainerCover, {
          pointerEvents: 'auto',
        })
      } else {
        if (this.$SITECONFIG.isTouch) {
          // スマホの時
          this.$backfaceScroll(true)
        } else {
          // PCの時
          this.$asscroll.enable({ reset: false, newPos: this.savePos })
          window.removeEventListener('wheel', preEvent, { passive: false })
          window.removeEventListener('scroll', preEvent, { passive: false })
        }
        this.$gsap.set(this.$refs.AsscrollContainerCover, {
          pointerEvents: 'none',
        })
      }
    },

    /**
     * ピックアップセクションに侵入した時
     */
    indexPickupState: function () {
      // current
      if (this.indexPickupState) {
        this.$gsap.to(this.$refs.CanvasFix, {
          duration: this.$SITECONFIG.baseDuration,
          ease: this.$EASING.transform,
          opacity: 1,
          visibility: 'visible',
        })
      }
      // no current
      else {
        this.$gsap.to(this.$refs.CanvasFix, {
          duration: this.$SITECONFIG.baseDuration,
          ease: this.$EASING.transform,
          opacity: 0,
          visibility: 'hidden',
        })
      }
    },

    /**
     * ピックアップのアニメーションが終了しているか判定する
     */
    indexPickupIsAnimation: function () {
      // current
      if (this.indexPickupIsAnimation) {
        setTimeout(() => {
          this.$gsap.ticker.add(this.pRaf)
        }, 50)
      }
      // no current
      else {
        if (this.particle) this.particle.delete()

        setTimeout(() => {
          this.$gsap.ticker.remove(this.pRaf)
        }, 50)
      }
    },

    /**
     * ピックアップのシーン管理
     */
    indexPickupScene: function () {
      switch (this.indexPickupScene) {
        case 'next01':
          this.particle.setSceneFirst(1)
          break
        case 'next02':
          this.particle.setScene(2)
          break
        case 'next03':
          this.particle.setScene(3)
          break
        case 'next04':
          this.particle.setSceneEnd(3)
          break
        case 'prev00':
          this.particle.setSceneEnd(1)
          break
        case 'prev01':
          this.particle.setScene(1)
          break
        case 'prev02':
          this.particle.setScene(2)
          break
        case 'prev03':
          this.particle.setSceneFirst(3)
          break
      }
    },
  },
  mounted() {
    // checkdevice
    if (this.$checkDevice.isAndroid) {
      this.isAndroid = 'is-android'
    }
    if (this.$checkDevice.isWindows) {
      this.isWindows = 'is-windows'
    }
    if (this.$checkDevice.isSafari) {
      this.isSafari = 'is-safari'
    }

    // particle
    const color = [
      {
        dark: this.pickupData[0].pickup.color01,
        light: this.pickupData[0].pickup.color02,
      },
      {
        dark: this.pickupData[1].pickup.color01,
        light: this.pickupData[1].pickup.color02,
      },
      {
        dark: this.pickupData[2].pickup.color01,
        light: this.pickupData[2].pickup.color02,
      },
    ]
    this.particle = new Particle(this.$SITECONFIG, this.$refs.Particle, color)
    this.particle.init()

    this.pResize = () => {
      this.particle.onResize()
    }

    window.addEventListener('resize', this.pResize)

    this.pRaf = () => {
      this.particle._drawParticles()
    }

    // pickupに侵入する時にかくつかないようにRAFを1秒間まわしておく
    this.$gsap.ticker.add(this.pRaf)
    setTimeout(() => {
      this.$gsap.ticker.remove(this.pRaf)
    }, 1000)

    // ページ遷移のために要素を配列にまとめて取得しておく
    this.container = this.$gsap.utils.toArray([
      this.$refs.CanvasFix,
      this.$refs.AsscrollContainer,
    ])
    this.contents = this.$gsap.utils.toArray([
      this.$refs.CanvasFixContents,
      this.$refs.AsscrollContents,
    ])

    // PC/SPでclippathの値を変える
    this.curveDeviceRatio = this.$SITECONFIG.isPc ? '70%' : '130%'
  },
  methods: {
    /**
     * ハンバーガーメニューを閉じる
     */
    hambergerMenuOnClose() {
      this.$store.commit('hambergerMenu/close')
    },
    /**
     * transition start animation
     */
    onTransitionStart() {
      if (this.$SITECONFIG.isNoTouch) {
        this.$gsap.set(this.container, {
          overflow: 'hidden',
        })
        this.scaleAnimation01 = this.$gsap.to(this.container, {
          duration: this.$SITECONFIG.baseDuration,
          ease: this.$EASING.transform,
          scaleX: 0.97,
          borderRadius: '14px',
        })
        this.scaleAnimation02 = this.$gsap.to(this.container, {
          duration: this.$SITECONFIG.baseDuration * 0.92,
          ease: this.$EASING.transform,
          scaleY: 0.94,
        })
        this.pageTranslateAnimation = this.$gsap.to(this.contents, {
          duration: this.$SITECONFIG.baseDuration * 0.92,
          ease: this.$EASING.transform,
          y: -500,
        })
      }
      this.bgAnimation = this.$gsap.to(this.$refs.LayoutsNormalTransitionBg, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.transform,
        clipPath: `ellipse(${this.curveDeviceRatio} 100% at 50% 50%)`,
      })
    },
    /**
     * transition end setting
     */
    onTransitionEnd() {
      if (this.indexPickupIsAnimation) this.$store.commit('indexPickup/sceneAnimationState', false)
      if (this.scaleAnimation01) this.scaleAnimation01.kill()
      if (this.scaleAnimation02) this.scaleAnimation02.kill()
      if (this.pageTranslateAnimation) this.pageTranslateAnimation.kill()
      if (this.bgAnimation) this.bgAnimation.kill()

      if (this.$SITECONFIG.isNoTouch) {
        this.$gsap.set(this.container, {
          scale: 1.0,
          borderRadius: '0px',
          overflow: 'visible',
        })
        this.$gsap.set(this.contents, {
          y: 0,
          clearProps: 'y', // fixedが効かなくなるのでstyleをremoveしておく
        })
      }
      this.$gsap.set(this.$refs.LayoutsNormalTransitionBg, {
        clipPath: `ellipse(${this.curveDeviceRatio} 100% at 50% 200%)`,
      })
    },
  },
}
</script>

<style scoped lang="scss">
:root {
  --viewportWidth: 100vw;
  --viewportHeight: 100vh;
}

// asscroll

.asscroll-container-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.asscroll{
  position: relative;
  width: 100%;
  height: 100%;
}

.asscroll-container {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.asscroll-contents {
  background-color: $skinColor;
}

.layouts-translate {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

// transition
.transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 4;
  overflow: hidden;
}

.layouts-normal-transition-img-wrapper {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: ellipse(70% 100% at 50% 200%);
  backface-visibility: hidden;
  transform: translateZ(0);
  z-index: 10;

  @include sp() {
    clip-path: ellipse(130% 100% at 50% 200%);
  }
}

.layouts-normal-transition-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
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

.layouts-normal-transition-color-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

// canvas

.canvas-fix {
  // display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
}

.particle {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  & canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
