<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          style="margin-left: 5px"
          v-if="logo"
          :src="logo"
          class="sidebar-logo"
        />
        <!-- <h1 v-else class="sidebar-title">{{ title }}</h1> -->
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <!-- <h1 class="sidebar-title">{{ title }}</h1> -->
      </router-link>
    </transition>
  </div>
</template>

<script>
import logoImg from '@/assets/logo.png';

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: this.$t('header.plat'),
      logo: logoImg,
      // logo: '',
    };
  },
  watch: {
    '$i18n.locale'() {
      this.title = this.$t('header.plat');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 3rem;
  line-height: 50px;
  @include background_color('sidebar_logo_container');
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      // width: 23px;
      height: 90%;
      vertical-align: middle;
      margin-right: 5px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      @include font_color('hoverColor');
      font-weight: lighter;
      line-height: 50px;
      font-size: 1.3rem;
      letter-spacing: 2px;
      // font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-family: 'ysbth';
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
