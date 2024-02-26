<template>
  <!-- <el-dropdown trigger="click" @command="handleSetTheme"> -->
  <div style="transform: scale(1.3)" @click="changeThemeColor">
    <svg-icon class-name="theme-icon" icon-class="theme" />
  </div>
  <!-- <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, index) of themeOptions"
        :key="index"
        :disabled="theme === item.value"
        :command="item.value"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown> -->
</template>

<script>
export default {
  name: 'ThemeSelect',
  data() {
    return {
      themeOptions: [
        // { label: this.$t("header.light"), value: "theme-light" },
        { label: this.$t('header.dark'), value: 'theme-blue' },
        { label: this.$t('header.boldDark'), value: 'theme-boldDark' },
      ],
    };
  },
  watch: {
    '$i18n.locale'() {
      this.themeOptions = [
        // { label: this.$t("header.light"), value: "theme-light" },
        { label: this.$t('header.dark'), value: 'theme-blue' },
        { label: this.$t('header.boldDark'), value: 'theme-boldDark' },
      ];
    },
  },
  computed: {
    theme() {
      return this.$store.getters.theme;
    },
  },
  created() {
    this.setSessionItem(
      'themeColor',
      this.$store.getters.theme == 'theme-blue' ? 'blue' : 'black'
    );
  },
  mounted() {
    this.initTheme();
  },
  methods: {
    initTheme() {
      let themeIndex = this.$store.getters.theme;
      themeIndex === 'theme-light'
        ? window.document.documentElement.setAttribute(
            'theme-name',
            'theme-light'
          )
        : themeIndex === 'theme-blue'
        ? window.document.documentElement.setAttribute(
            'theme-name',
            'theme-blue'
          )
        : window.document.documentElement.setAttribute(
            'theme-name',
            'theme-boldDark'
          );
    },
    handleSetTheme(theme) {
      theme === 'theme-light'
        ? window.document.documentElement.setAttribute(
            'theme-name',
            'theme-light'
          )
        : theme === 'theme-blue'
        ? window.document.documentElement.setAttribute(
            'theme-name',
            'theme-blue'
          )
        : window.document.documentElement.setAttribute(
            'theme-name',
            'theme-boldDark'
          );
      this.$ELEMENT.theme = theme;
      this.$store.dispatch('app/setTheme', theme);
      this.setSessionItem(
        'themeColor',
        theme == 'theme-blue' ? 'blue' : 'black'
      );
      this.$message({
        message: this.$t('header.themeMessage'),
        type: 'success',
        duration: 800,
      });
    },
    changeThemeColor() {
      let theme =
        sessionStorage.getItem('themeColor') == 'blue'
          ? 'theme-boldDark'
          : 'theme-blue';
      theme === 'theme-light'
        ? window.document.documentElement.setAttribute(
            'theme-name',
            'theme-light'
          )
        : theme === 'theme-blue'
        ? window.document.documentElement.setAttribute(
            'theme-name',
            'theme-blue'
          )
        : window.document.documentElement.setAttribute(
            'theme-name',
            'theme-boldDark'
          );
      this.$ELEMENT.theme = theme;
      this.$store.dispatch('app/setTheme', theme);
      this.setSessionItem(
        'themeColor',
        theme == 'theme-blue' ? 'blue' : 'black'
      );
      let message =
        theme == 'theme-blue' ? '浅色主题切换成功' : '深色主题切换成功';
      this.$message({
        message: message,
        type: 'success',
        duration: 800,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.theme-icon {
  cursor: pointer;
  font-size: 26px;
  vertical-align: middle;

  @include font_color('primary_titleColor');
  position: relative;
  top: -1.5px;
}
</style>
