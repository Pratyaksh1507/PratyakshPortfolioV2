<template>
  <div class="card-article">
    <span class="card-shadow" :style="`box-shadow: 0 30px 60px 0 ${shadowColor};`"></span>
    <a :href="externalLink" target="_blank" rel="noopener" class="card-link">
      <span class="card-inner">
        <span class="card-title-wrapper-01">
          <span class="card-title-wrapper-01-block"> ・ </span>
          <span class="card-title-wrapper-01-block"> LIVE </span>
        </span>
        <span class="card-title-wrapper-02"> <span class="card-title-wrapper-02-block">YOU CAN SEE PROJECT NAME IS LIVE. AND IF YOU SEE IT, COME BACK HERE</span></span>
        <span class="card-title-wrapper-03">
          <AppTextAnimation :state="state" :rotate="$BASEROTATE.left" :text="'VISIT SITE'" />
        </span>
      </span>
    </a>
  </div>
</template>

<script>
export default {
  /**
   * shadowColor : 影の色
   * externalLink : 外部リンク
   * state : テキストアニメーションの状態を変更するprops
   */
  props: {
    shadowColor: {
      type: String,
      default: '',
    },
    externalLink: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
.card-article {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 12px 13px;
  background-color: $white;
  border-radius: 7px;
  box-sizing: border-box;
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
  margin: 0 0 8px 0;
  z-index: 2;
}

.card-title-wrapper-01-block {
  display: block;
  font-size: 12px;
  font-family: $helvetica;
  line-height: 1.2;
  white-space: nowrap;

  &:first-of-type {
    font-size: 32px;
    text-indent: -4px;
    line-height: 0.7;
    margin-bottom: 2px;
  }
}

.card-title-wrapper-02 {
  flex: 1;
  min-height: 0;
  z-index: 2;
}

.card-title-wrapper-02-block {
  display: block;
  width: 100%;
  font-size: 9px;
  font-family: $helvetica;
  letter-spacing: 0.02em;
  line-height: 1.25;
}

.card-title-wrapper-03 {
  position: relative;
  width: 100%;
  font-size: 42px;
  font-family: $sixcaps;
  line-height: 0.88;
  margin-top: auto;
  z-index: 1;
  overflow: visible;
  white-space: nowrap;
}

.card-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 30px 60px 0 #101237;
  border-radius: 12px;
  opacity: 0.3;
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
