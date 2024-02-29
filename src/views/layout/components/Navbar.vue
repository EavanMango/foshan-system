<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu flex_row_c">
      <template>
        <el-tooltip
          content="天气"
          effect="dark"
          placement="bottom"
          class="margin-right-20"
        >
          <WeatherItem></WeatherItem>
        </el-tooltip>
        <!-- <el-tooltip
          content="大屏"
          effect="dark"
          placement="bottom"
          class="margin-right-10"
        >
          <i
            class="el-icon-s-platform pointer"
            style="color: #fff; font-size: 1.3rem"
            @click="jumpScreen"
          ></i>
        </el-tooltip> -->
        <!-- <el-tooltip
          content="告警"
          effect="dark"
          placement="bottom"
          class="margin-right-20"
        >
          <el-badge :value="forbidNum">
            <div class="nav-btn-error" @click="handleWarn">
              <svg
                t="1695178919716"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4024"
                fill="#fff"
              >
                <path
                  d="M64 896h896v64H64zM128 832h768v64H128zM512.07 128H512c-176 0-320 144-320 320v352h160V480h64v320h416V447.93C832 272 688 128 512.07 128z"
                  p-id="4025"
                ></path>
              </svg>
            </div>
          </el-badge>
        </el-tooltip> -->
        <!-- <el-tooltip content="上级指令" effect="dark" placement="bottom">
          <div
            class="nav-btn-error"
            @click="$router.push('/superior-instruction/control-event')"
          >
            <svg
              t="1702863540390"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4491"
              fill="#fff"
            >
              <path
                d="M256 64a32.09 32.09 0 0 0-32 32v832a32 32 0 0 0 64 0V96a32.09 32.09 0 0 0-32-32z m32 64l512 288-512 288"
                p-id="4492"
              ></path>
            </svg>
          </div>
        </el-tooltip> -->
        <el-tooltip
          :content="this.$t('header.menuSearch')"
          effect="dark"
          placement="bottom"
        >
          <search id="header-search" class="right-menu-item hover-effect" />
        </el-tooltip>

        <!-- <el-tooltip
          :content="this.$t('header.playSound')"
          effect="dark"
          placement="bottom"
        >
          <play-sound id="play-sound" class="right-menu-item hover-effect" />
        </el-tooltip> -->

        <!-- <el-tooltip
          :content="this.$t('header.refresh')"
          effect="dark"
          placement="bottom"
        >
          <reload-page id="reload-page" class="right-menu-item hover-effect" />
        </el-tooltip> -->

        <el-tooltip
          :content="this.$t('header.fullscreen')"
          effect="dark"
          placement="bottom"
        >
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>

        <!-- <el-tooltip :content="this.$t('header.languageChange')" effect="dark" placement="bottom">
          <language-change class="right-menu-item hover-effect"/>
        </el-tooltip> -->

        <el-tooltip
          v-show="false"
          :content="this.$t('header.themeChange')"
          effect="dark"
          placement="bottom"
        >
          <theme-select class="right-menu-item hover-effect"></theme-select>
        </el-tooltip>
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <span class="el-dropdown-link">
          <svg-icon class-name="user-icon" icon-class="headerUser" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="handleLogout">{{ $t('header.layoutLogin') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { UserUtil } from '@/utils/user-utils';
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import Screenfull from '@/components/Screenfull';
import ThemeSelect from '@/components/ThemeSelect';
import Search from '@/components/HeaderSearch';
import PlaySound from '@/components/PlaySound';
import ReloadPage from '@/components/ReloadPage';
import LanguageChange from '@/components/LanguageChange';
import axios from 'axios';
import WeatherItem from './WeatherItem.vue';
import API from '@/api/event-record/offlineList';

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    ThemeSelect,
    Search,
    PlaySound,
    ReloadPage,
    LanguageChange,
    WeatherItem,
  },
  data() {
    return {
      objCount: {},
      forbidNum: '',
    };
  },
  computed: {
    ...mapGetters(['sidebar']),
  },
  mounted() {
    API.getOutLineEquipNum().then(res => {
      this.forbidNum = res.data;
    });
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    handleLogout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.handleDeleteToken();
          UserUtil.logout();
          this.$router.push('/login');
          this.$store.dispatch('tagsView/delAllViews', '');
        })
        .catch(() => {});
    },
    handleDeleteToken() {
      axios
        .delete(process.env.VUE_APP_SERVER_PERMISSION + '/logout', {
          headers: {
            Authorization: UserUtil.getToken(),
          },
        })
        .then(res => {});
    },
    handleWarn() {
      if (this.$route.path.includes('/offline-list')) return;
      this.$router.push('/event-record/offline-list');
    },
    jumpScreen() {
      window.open('http://192.168.0.130:8888/las/#/');
      // window.open('http://10.10.0.112:31626/las/#/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.navbar {
  height: 3rem;
  overflow: hidden;
  position: relative;
  @include background_color('navbar_bg_color');
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 3rem;

    .user-icon {
      font-size: 20px;
      @include font_color('primary_titleColor');
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 0.5rem;
      height: 100%;
      font-size: 1.125rem;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.nav-btn-error {
  height: 1.3rem;
  width: 1.3rem;
  line-height: 1.3rem;
  color: #fff;
  cursor: pointer;
}
::v-deep .el-badge__content {
  border: 0;
  font-size: 0.5rem;
  height: 1.3rem;
  line-height: 1.3rem;
}
</style>
