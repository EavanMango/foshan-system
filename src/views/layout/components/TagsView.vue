<template>
  <div class="tags-view-container">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        :style="activeStyle(tag)"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ generateTitle(tag.title) }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <!-- <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li> -->
      <li @click="closeOthersTags">关闭其他</li>
      <!--      <li v-if="!isFirstView()" @click="closeLeftTags"><i class="el-icon-back"></i> 关闭左侧</li>-->
      <!--      <li v-if="!isLastView()" @click="closeRightTags"><i class="el-icon-right"></i> 关闭右侧</li>-->
      <li @click="closeAllTags(selectedTag)">全部关闭</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane';
import path from 'path';
import { generateTitle } from '@/utils/i18n';

export default {
  components: { ScrollPane },
  data() {
    return {
      /** 右键菜单的显示与隐藏 */
      visible: false,
      /** 右键菜单对应的位置 */
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
    routes() {
      return this.$store.state.permission.routes;
    },
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
    /** 监听右键菜单 */
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu); // 触发closeMenu事件隐藏菜单
      } else {
        document.body.removeEventListener('click', this.closeMenu); // 删除监听
      }
    },
  },
  mounted() {
    this.initTags();
    this.addTags();
  },
  methods: {
    /** 通过判断路由一致返回布尔值添加class，添加高亮效果 */
    isActive(route) {
      return route.path === this.$route.path;
    },
    activeStyle(tag) {
      if (!this.isActive(tag)) return {};
      return {
        'background-color': this.theme,
        'border-color': this.theme,
      };
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    isFirstView() {
      try {
        return (
          this.selectedTag.fullPath === this.visitedViews[1].fullPath ||
          this.selectedTag.fullPath === '/index'
        );
      } catch (err) {
        return false;
      }
    },
    isLastView() {
      try {
        return (
          this.selectedTag.fullPath ===
          this.visitedViews[this.visitedViews.length - 1].fullPath
        );
      } catch (err) {
        return false;
      }
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag);
        }
      }
    },
    /** 当前点击的菜单 && 当前导航路由 */
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route);
      }
      return false;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route);
            }
            break;
          }
        }
      });
    },
    /** 刷新 */
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath,
          });
        });
      });
    },
    /** 关闭当前 */
    closeSelectedTag(view) {
      this.$store
        .dispatch('tagsView/delView', view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view);
          }
        });
    },
    closeRightTags() {
      this.$store
        .dispatch('tagsView/delRightTags', this.selectedTag)
        .then(visitedViews => {
          if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
            this.toLastView(visitedViews);
          }
        });
    },
    closeLeftTags() {
      this.$store
        .dispatch('tagsView/delLeftTags', this.selectedTag)
        .then(visitedViews => {
          if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
            this.toLastView(visitedViews);
          }
        });
    },
    /** 关闭其他 */
    closeOthersTags() {
      this.$router.push(this.selectedTag).catch(() => {});
      this.$store
        .dispatch('tagsView/delOthersViews', this.selectedTag)
        .then(() => {
          this.moveToCurrentTag();
        });
    },
    /** 右键菜单关闭所有选项，触发vuex中的方法，把当前路由当参数传过去用于判断 */
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === this.$route.path)) {
          return;
        }
        this.toLastView(visitedViews, view);
      });
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        this.$router.push('/');
      }
    },
    /** 右键事件，显示右键菜单，并固定好位置 */
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left;
      const offsetWidth = this.$el.offsetWidth;
      const maxLeft = offsetWidth - menuMinWidth;
      const left = e.clientX - offsetLeft + 15; // 右键菜单距离左边的距离
      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }
      this.top = e.clientY; // 右键菜单距离上面的位置
      this.visible = true;
      this.selectedTag = tag;
    },
    /** 隐藏右键菜单 */
    closeMenu() {
      this.visible = false;
    },
    handleScroll() {
      this.closeMenu();
    },
    generateTitle,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';
.tags-view-container {
  padding-top: 0.3rem;
  height: 2rem;
  width: 100%;
  @include background_color('right_container');
  @include font_color('right_header_font');
  // border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;

  .tags-view-wrapper {
    height: 100%;
    overflow: hidden;
    .tags-view-item {
      display: inline-block;
      border-radius: 7px;
      position: relative;
      cursor: pointer;
      height: 1.6rem;
      line-height: 1.6rem;
      border: 1px solid;
      @include border_color('tabRadioColor_bg');
      @include background_color('layout_border');
      @include font_color('brightColor');
      padding: 0 0.5rem;
      font-size: 0.75rem;
      margin-left: 5px;
      &:first-of-type {
        margin-left: 0.6rem;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        @include background_color('tabRadioColor');
        @include border_color('tabRadioColor');
        @include font_color('hoverColor');

        // &::before {
        //   content: '';
        //   background: #fff;
        //   display: inline-block;
        //   width: 8px;
        //   height: 8px;
        //   border-radius: 50%;
        //   position: relative;
        //   margin-right: 2px;
        //   // margin-top: calc(0.8rem - 4rem);
        //   margin-top: calc(0.8rem - 4rem);
        // }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
// 重置 el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
