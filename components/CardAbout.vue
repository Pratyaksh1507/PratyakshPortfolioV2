<template>
  <div class="card-article">
    <AppPageTransitionBg url="/about" color="#000000" class="card-link">
      <span class="card-inner">
        <span class="card-title-wrapper-01">
          <span v-for="(char, index) of name" :key="index" class="card-title-wrapper-01-block" v-text="char"></span>
        </span>
        <span class="card-title-wrapper-02">
          <span v-for="(char, index) of desc" :key="index" class="card-title-wrapper-02-block" v-text="char"></span>
        </span>
        <span class="card-title-wrapper-03">
          <span>{{ title }}</span>
          <span class="card-sub-title">
            <span>{{ subtitle }}</span>
          </span>
        </span>
      </span>
    </AppPageTransitionBg>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    desc: {
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

<style scoped lang="scss">
.card-article {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 22px 16px 14px 16px;
  background-color: #fbf8f3;
  color: $black;
  border-radius: 12px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.14);
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

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
  color: $darkBlack;
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
  color: $darkBlack;
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
  white-space: nowrap;

  @include tab-vertical() {
    font-size: 10px;
    line-height: 1.28;
  }

  @include sp() {
    font-size: clamp(8.5px, 2.4vw, 9.5px);
    line-height: 1.25;
  }
}

.card-title-wrapper-03 {
  position: relative;
  width: 100%;
  color: $darkBlack;
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
