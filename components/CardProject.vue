<template>
  <div class="card-article">
    <component :is="setTagName" :url="setUrl" :index="setIndex" :color="setColor" class="card-link">
      <span class="card-inner">
        <span class="card-title-wrapper-01">
          <span class="card-title-wrapper-01-block"> ・ </span>
          <span class="card-title-wrapper-01-block">
            {{ name }}
          </span>
        </span>
        <span class="card-title-wrapper-02">
          <span class="card-title-wrapper-02-block">{{ desc }}</span>
        </span>
        <span class="card-title-wrapper-03">
          <AppTextAnimation :state="state" :rotate="$BASEROTATE.left" :text="title" />
        </span>
      </span>
    </component>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * type : works/archiveで処理を切り替える
     * index : 案件に固有に振り渡している番号
     * id : 案件ID
     * name : 案件名
     * title : 案件タイトル
     * desc : 案件説明
     * modifier : 見た目を変更するクラス
     * state : テキストアニメーションの状態を変更するprops
     */
    type: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
  },
  computed: {
    setTagName() {
      if (this.type === 'works') {
        return 'AppPageTransitionImage'
      } else if (this.type === 'archive' || this.type === 'resume') {
        return 'AppPageTransitionBg'
      } else {
        return ''
      }
    },
    setUrl() {
      if (this.type === 'works') {
        return `/works/${this.id}`
      } else if (this.type === 'resume') {
        return '/resume'
      } else if (this.type === 'archive') {
        return '/resume'
      } else {
        return ''
      }
    },
    setIndex() {
      if (this.type === 'works') {
        return this.index
      } else {
        return ''
      }
    },
    setColor() {
      if (this.type === 'archive' || this.type === 'resume') {
        return '#000000'
      } else {
        return ''
      }
    },
  },
}
</script>

<style scoped lang="scss">
.card-article {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 22px 16px 14px 16px;
  background-color: $white;
  color: $black;
  border-radius: 12px;
  box-sizing: border-box;

  @include tab-vertical() {
    padding: 18px 14px 12px 14px;
    border-radius: 9px;
  }

  @include sp() {
    padding: 14px 12px 10px 12px;
    border-radius: 8px;
  }
}

.card-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
  width: 100%;
}

.card-link {
  display: block;
  width: 100%;
  height: 100%;
  text-align: left;
  line-height: 1;
}

.card-title-wrapper-01 {
  display: block;
  margin: 0 0 16px 0;
  z-index: 2;

  @include tab-vertical() {
    margin: 0 0 12px 0;
  }

  @include sp() {
    margin: 0 0 8px 0;
  }
}

.card-title-wrapper-01-block {
  display: block;
  font-size: 16px;
  font-family: $helvetica;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: 0.02em;
  white-space: nowrap;

  @include tab-vertical() {
    font-size: 13px;
  }

  @include sp() {
    font-size: 11px;
  }

  &:first-of-type {
    font-size: 28px;
    text-indent: -3px;
    line-height: 0.95;
    margin-bottom: 2px;

    @include tab-vertical() {
      font-size: 22px;
      text-indent: -2px;
    }

    @include sp() {
      display: inline-block;
      margin: 0 0 0 -2px;
      font-size: 16px;
      line-height: 0.9;
      text-indent: 0;
    }
  }
}

.card-title-wrapper-02 {
  flex: 1;
  min-height: 0;
  z-index: 2;
  margin-bottom: 6px;
}

.card-title-wrapper-02-block {
  display: block;
  width: 100%;
  max-width: 100%;
  font-size: 11px;
  font-family: $helvetica;
  letter-spacing: 0.02em;
  line-height: 1.32;

  @include tab-vertical() {
    font-size: 10px;
    line-height: 1.28;
  }

  @include sp() {
    font-size: clamp(9px, 2.5vw, 10px);
    line-height: 1.25;
  }
}

.card-title-wrapper-03 {
  position: relative;
  width: 100%;
  font-size: 96px;
  font-family: $sixcaps;
  line-height: 0.88;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
  overflow: visible;
  white-space: nowrap;

  @include tab-vertical() {
    font-size: 76px;
  }

  @include sp() {
    font-size: 52px;
  }
}

/* stylelint-disable */
.is-windows .card-title-wrapper-01-block {
  &:first-of-type {
    position: relative;
    left: -8px;
  }
}
/* stylelint-enable */
</style>
