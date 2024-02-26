<template>
  <div>
    <el-popover
      transition="transTop"
      class="relative"
      :visible-arrow="false"
      ref="menuBox"
      placement="right"
      trigger="click"
      popper-class="popoverBox"
    >
      <div class="menuCard">
        <div class="scrollBox">
          <div
            class="menuTitle"
            v-for="(item, index) in searchArray"
            v-show="item.hidden == false"
            :key="index"
          >
            <div class="menuBox">
              <div class="headerTitle">{{ item.meta.title }}</div>
              <div class="menuSon flex_row_l" v-if="item.children">
                <div
                  class="eachMenu flex_col_a pointer"
                  v-for="val in item.children"
                  v-show="val.hidden == false && val.isSearch"
                  :key="val.path"
                  @click="handleMenuClick(item.path + '/' + val.path)"
                >
                  <img
                    style="width: 2.5rem; height: 2.5rem"
                    v-if="val.hidden == false && imageExists(val.meta.title)"
                    :src="
                      require('../../../../assets/menuPng/' +
                        val.meta.title +
                        '.png')
                    "
                  />
                  <div
                    style="width: 2.5rem; height: 2.5rem"
                    v-if="val.hidden == false && !imageExists(val.meta.title)"
                  ></div>
                  {{ val.meta.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 搜索 -->
        <div class="search absolute-top-right-10 flex_row_c">
          <el-input
            style="width: 180px; margin-right: 10px"
            v-model="searchKey"
            placeholder="请输入菜单名称查询"
            clearable
            @clear="clearSearch()"
          />
          <i class="el-icon-search pointer" @click="handleSearch"></i>
        </div>
      </div>
      <svg-icon
        slot="reference"
        style="width: 2rem; height: 2rem"
        class-name="user-icon"
        icon-class="菜单"
    /></el-popover>
  </div>
</template>

<script>
const requireComponent = require.context('@/assets/menuPng', true);
const cardList = requireComponent.keys().map(imgName => {
  const imgUrl = requireComponent(imgName);
  return {
    imgName: imgName.split('/').pop().split('.').shift(),
    imgUrl: imgUrl,
  };
});
export default {
  name: 'menuCard',
  props: {
    menuData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return { searchKey: '', searchArray: [] };
  },
  watch: {
    menuData: {
      handler(newValue) {
        if (newValue) {
          this.searchArray = JSON.parse(JSON.stringify(newValue));
          // this.searchArray.forEach(e => {
          //   e.children.forEach(v => {
          //     v.isSearch = true;
          //   });
          // });
          for (const i in this.searchArray) {
            for (const j in this.searchArray[i].children) {
              this.searchArray[i].children[j].isSearch = true;
            }
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    // 点击菜单跳转
    handleMenuClick(path) {
      this.$router.push(path);
      this.$refs.menuBox.doClose();
    },
    // 查询菜单
    handleSearch() {
      this.searchArray = [];
      let newArray = JSON.parse(JSON.stringify(this.menuData));
      newArray.forEach(e => {
        if (e.meta.title.search(this.searchKey) != -1) {
          e.children.forEach(v => {
            v.isSearch = true;
          });
          this.searchArray.push(e);
        } else {
          e.children.forEach(v => {
            if (v.meta.title.search(this.searchKey) != -1) {
              v.isSearch = true;
              this.searchArray.push(e);
            } else {
              v.isSearch = false;
            }
          });
        }
      });
    },
    // 清除搜索
    clearSearch() {
      this.searchArray = JSON.parse(JSON.stringify(this.menuData));
      this.searchArray.forEach(e => {
        e.children.forEach(v => {
          v.isSearch = true;
        });
      });
    },
    // 检查图片是否存在
    imageExists(title) {
      return cardList.some(item => item.imgName === title);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.menuCard {
  padding: 12px;
  width: 50vw;
  height: 60vh;
  overflow: hidden;
  // @include font_color('fontColor');
  .scrollBox {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  // background: linear-gradient(
  //   to right,
  //   rgb(253, 187, 45),
  //   rgb(178, 31, 31),
  //   rgb(26, 42, 108)
  // );
  background: url('../../../../assets/menuPng/s.png') no-repeat;
  background-size: 100% 100%;
  color: #eaf4fc;
  .menuSon {
    width: 100%;
    height: 80px;
    margin-bottom: 15px;
    padding: 0 10px;
    .eachMenu {
      height: 100%;
      width: 100px;
      border-radius: 15px;
      // box-shadow: 2px 2px 20px #999;
      margin-right: 15px;
      font-family: 'ysbth';
      font-size: 1.1rem;
      &:hover {
        transition: 0.3s;
        transform: scale(1.1);
      }
    }
  }
  .el-icon-search {
    // @include font_color('fontColor');
    font-size: 1.4rem;
    font-weight: bold;
  }
  .headerTitle {
    color: #fff !important;
    text-shadow: 2px 2px 20px #fff;
  }
}
.el-input {
  border-radius: 10px;
  // @include background_color('layout_menu_submenu_item_bg');
  border: 1px solid #fff;
  display: flex;
  align-items: center;
}
::v-deep .el-input__inner {
  border: none;
  color: #fff !important;
  &::placeholder {
    color: #f4f4f4;
  }
}
::v-deep .el-icon-circle-close {
  color: #fff !important;
}
</style>
