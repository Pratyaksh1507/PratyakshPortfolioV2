<template>
  <div class="card-article">
    <div class="card-inner">
      <div class="card-title-wrapper-01">
        <span v-for="(char, index) of name" :key="index" class="card-title-wrapper-01-block" v-text="char"></span>
      </div>
      <ul class="card-title-wrapper-02">
        <li v-for="(char, index) of info" :key="index" class="card-title-wrapper-02-block">
          <a :href="char.link" target="_blank" rel="noopener">{{ char.text }}</a>
        </li>
      </ul>
      <div class="card-title-wrapper-03">
        <a v-if="title.link" :href="title.link" target="_blank" rel="noopener" class="card-title-wrapper-03-link">
          <AppTextAnimation :state="state" :rotate="$BASEROTATE.left" :text="title.text" />
          <span v-if="title.subtext" class="card-sub-title">
            <AppTextAnimation :state="state" :start="0.28" :rotate="$BASEROTATE.left" :text="title.subtext" />
          </span>
        </a>
        <span v-else class="card-title-wrapper-03-link">
          <AppTextAnimation :state="state" :rotate="$BASEROTATE.left" :text="title.text" />
          <span v-if="title.subtext" class="card-sub-title">
            <AppTextAnimation :state="state" :start="0.28" :rotate="$BASEROTATE.left" :text="title.subtext" />
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * name : 名前
     * title : タイトル
     * subtitle : サブタイトル
     * info : 各種SNS
     * state : テキストアニメーションの状態を変更するprops
     */
    name: {
      type: Array,
      required: true,
    },
    title: {
      type: Object,
      required: true,
    },
    info: {
      type: Array,
      required: true,
    },
    state: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
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
  letter-spacing: 0.01em;
  line-height: 1.4;
  white-space: nowrap;

  @include tab-vertical() {
    font-size: 9.5px;
    line-height: 1.35;
  }

  @include sp() {
    font-size: clamp(7.5px, 2.1vw, 9px);
    line-height: 1.3;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }
}

.card-title-wrapper-03 {
  position: relative;
  width: 100%;
  font-size: 96px;
  font-family: $sixcaps;
  line-height: 0.88;
  z-index: 1;
  margin-top: auto;
  overflow: visible;
  white-space: nowrap;

  @include tab-vertical() {
    font-size: 76px;
  }

  @include sp() {
    font-size: 52px;
  }

  & .card-title-wrapper-03-link {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
  }

  & .card-sub-title {
    position: static;
    flex-shrink: 0;
    font-size: 11px;
    font-family: $helvetica;
    letter-spacing: 0.02em;
    margin-bottom: 4px;
    white-space: nowrap;

    @include tab-vertical() {
      font-size: 9.5px;
      margin-bottom: 3px;
    }

    @include sp() {
      font-size: 8.5px;
      margin-bottom: 2px;
    }
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
