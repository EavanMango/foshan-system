<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon-class="search"
      @click.stop="click"
    />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      :placeholder="$t('placeholder.search')"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="option in options"
        :key="option.item.path"
        :value="option.item"
        :label="generateTitle(option.item.title.join(' > '))"
      />
    </el-select>
  </div>
</template>

<script>
import Fuse from "fuse.js/dist/fuse.min.js";
import path from "path";
import { generateTitle } from "@/utils/i18n";

export default {
  name: "HeaderSearch",
  data() {
    return {
      search: "",
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined,
    };
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes;
    },
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes);
    },
    searchPool(list) {
      this.initFuse(list);
    },
    show(value) {
      if (value) {
        document.body.addEventListener("click", this.close);
      } else {
        document.body.removeEventListener("click", this.close);
      }
    },
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes);
  },
  methods: {
    click() {
      this.show = !this.show;
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus();
      }
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur();
      this.options = [];
      this.show = false;
    },
    change(val) {
      const path = val.path;
      if (this.ishttp(val.path)) {
        // http(s):// 路径新窗口打开
        const pindex = path.indexOf("http");
        window.open(path.substr(pindex, path.length), "_blank");
      } else {
        this.$router.push(val.path);
      }
      this.search = "";
      this.options = [];
      this.$nextTick(() => {
        this.show = false;
      });
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true, // 是否按分数对结果列表排序
        threshold: 0.4, // 匹配算法阈值，阈值：0.0 需要完全匹配， 1.0 将匹配任何内容
        location: 0, // 确定文本中预期找到的模式的大致位置
        distance: 100,
        maxPatternLength: 32, // 模式的最大长度
        minMatchCharLength: 1, // 模式的最小字符长度
        keys: [
          {
            name: "title", // 搜索标题
            weight: 0.7,
          },
          {
            name: "path", // 搜索路径
            weight: 0.3,
          },
        ],
      });
    },
    // 筛选出可以在侧边栏中显示的路线  生成标题
    generateRoutes(routes, basePath = "/", prefixTitle = []) {
      let res = [];
      for (const router of routes) {
        // 跳过隐藏路由器
        if (router.hidden) {
          continue;
        }

        const data = {
          path: !this.ishttp(router.path)
            ? path.resolve(basePath, router.path)
            : router.path,
          title: [...prefixTitle],
        };

        if (router.meta && router.meta.title) {
          // data.title = [...data.title, router.meta.title]
          data.title = [this.generateTitle(router.meta.title)];

          if (router.redirect !== "noRedirect") {
            // 只推送有标题的路线
            // 特殊情况：需要排除父路由器而不重定向
            res.push(data);
          }
        }

        // 递归子路由
        if (router.children) {
          const tempRoutes = this.generateRoutes(
            router.children,
            data.path,
            this.generateTitle(data.title[0])
          );
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes];
          }
        }
      }
      return res;
    },
    querySearch(query) {
      if (query !== "") {
        this.options = this.fuse.search(this.generateTitle(query));
      } else {
        this.options = [];
      }
    },
    ishttp(url) {
      return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
    },
    generateTitle,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/css-theme/handle.scss";

.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
    @include font_color("primary_titleColor");
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
