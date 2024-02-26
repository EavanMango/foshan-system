<template>
  <el-dropdown trigger="click" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="language-icon" icon-class="language" />
    </div>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, index) of langOptions"
        :key="index"
        :disabled="lang === item.value"
        :command="item.value"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "LanguageChange",
  data() {
    return {
      langOptions: [
        { label: this.$t("header.zh"), value: "zh" },
        { label: this.$t("header.en"), value: "en" },
      ],
    };
  },
  watch: {
    "$i18n.locale"() {
      this.langOptions = [
        { label: this.$t("header.zh"), value: "zh" },
        { label: this.$t("header.en"), value: "en" },
      ];
    },
  },
  computed: {
    lang() {
      return this.$store.getters.lang;
    },
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$ELEMENT.lang = lang;
      this.$store.dispatch("app/setLanguage", lang);
      this.$message({
        message: this.$t("header.langMessage"),
        type: "success",
        duration: 800,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/css-theme/handle.scss";

.language-icon {
  cursor: pointer;
  font-size: 20px;
  vertical-align: middle;
  @include font_color("primary_titleColor");
}
</style>